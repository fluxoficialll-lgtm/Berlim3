
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { Post, Comment } from '../types';
import { db } from '@/database';
import { useModal } from '../components/ModalSystem';
import { FeedItem } from '../components/feed/FeedItem';
import { CommentItem } from '../components/ui/comments/CommentItem';
import { FeedCommentService } from '../services/real/comments/FeedCommentService'; // 1. Importando o novo serviço

export const PostDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showConfirm } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);
  
  const currentUser = authService.getCurrentUser();
  const currentUserId = currentUser?.id;

  // 2. Busca de comentários agora é separada e usa o novo serviço
  const fetchComments = useCallback(async () => {
    if (!id) return;
    setLoadingComments(true);
    try {
        const fetchedComments = await FeedCommentService.getComments(id);
        setComments(fetchedComments);
    } catch (error) {
        console.error("Falha ao carregar comentários:", error);
        // Opcional: mostrar um erro para o usuário
    } finally {
        setLoadingComments(false);
    }
  }, [id]);
  
  // Efeito para buscar o post e os comentários iniciais
  useEffect(() => {
    if (id) {
        // A busca do post principal pode continuar vindo do cache para performance
        const foundPost = postService.getPostById(id);
        if (foundPost) { 
            setPost(foundPost);
            fetchComments(); // Busca os comentários da API
        } else {
            navigate('/feed');
        }
    }
  }, [id, navigate, fetchComments]);
  
  // Inscrição para atualizações do post (curtidas, etc.), mas não mais para comentários
  useEffect(() => {
    const loadPostData = () => {
        if (id) {
            const foundPost = postService.getPostById(id);
            if(foundPost) setPost(foundPost);
        }
    };
    const unsub = db.subscribe('posts', loadPostData);
    return () => unsub();
  }, [id]);


  const handleLike = (postId: string) => {
    postService.toggleLike(postId);
  };

  // 3. Lógica de enviar comentário refatorada
  const handleSendComment = async () => {
      if (!commentText.trim() || !post) return;

      if (replyingTo) {
          // TODO: A lógica de resposta ainda usa o serviço antigo.
          // Isso pode ser migrado para o FeedCommentService no futuro.
          const username = currentUser?.profile?.name || "Visitante";
          const avatar = currentUser?.profile?.photoUrl;
          const success = postService.addReply(post.id, replyingTo.id, commentText.trim(), username, avatar);
          if (success) {
              setReplyingTo(null);
              setCommentText('');
              fetchComments(); // Atualiza a lista com a nova resposta
          }
      } else {
          try {
              await FeedCommentService.addComment(post.id, commentText.trim());
              setCommentText('');
              await fetchComments(); // Atualiza a lista com o novo comentário
          } catch (error) {
              console.error("Falha ao enviar comentário:", error);
          }
      }
  };

  const handleReplyClick = (id: string, username: string) => {
      setReplyingTo({ id, username });
      setTimeout(() => inputRef.current?.focus(), 100);
  };

  // 4. Lógica de deletar comentário refatorada
  const handleDeleteComment = async (commentId: string) => {
    if (!post) return;
    if (await showConfirm("Excluir comentário", "Deseja excluir este comentário?", "Excluir", "Cancelar")) {
        try {
            await FeedCommentService.deleteComment(commentId);
            await fetchComments(); // Atualiza a lista após a exclusão
        } catch (error) {
            console.error("Falha ao excluir comentário:", error);
        }
    }
  };

  const handleCommentLike = (commentId: string) => {
      if (!post) return;
      // TODO: Migrar para o FeedCommentService
      if (postService.toggleCommentLike(post.id, commentId)) {
          // A atualização aqui ainda depende do sistema antigo (db.subscribe)
          // O ideal seria o fetchComments, mas a API precisaria retornar o estado de like
          const updatedComments = comments.map(c => 
              c.id === commentId 
              ? { ...c, likes: (c.likes || 0) + 1 } // Simulação otimista
              : c
          );
          setComments(updatedComments);
      }
  };

  if (!post) return <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">Carregando...</div>;

  return (
    <div className="min-h-[100dvh] flex flex-col font-['Inter'] overflow-hidden bg-[#0c0f14] text-white">
      <header className="flex items-center justify-between p-4 bg-[#0c0f14] fixed w-full top-0 z-50 border-b border-white/10 h-[65px]">
        <button onClick={() => navigate(-1)} className="text-[#00c2ff] text-xl p-2 hover:bg-white/5 rounded-full transition-all">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="text-xs font-black uppercase tracking-[2px]">Publicação</span>
        <div className="w-10"></div>
      </header>

      <main className="pt-[75px] pb-[130px] w-full max-w-[500px] mx-auto flex-grow overflow-y-auto no-scrollbar px-3">
          <FeedItem 
            post={post} 
            currentUserId={currentUserId} 
            onLike={handleLike} 
            onDelete={()=>{}} 
            onUserClick={(u)=>navigate(`/user/${u.replace('@','')}`)} 
            onCommentClick={()=>{}} 
            onShare={async (p) => {
                const url = `${window.location.origin}/#/post/${p.id}`;
                if (navigator.share) await navigator.share({ url });
                else { navigator.clipboard.writeText(url); alert('Link copiado!'); }
            }} 
            onVote={(pid, idx) => {
                // Lógica de votação mantida
                if (pid === post.id && post.pollOptions && post.votedOptionIndex == null) {
                    db.posts.update({ ...post, votedOptionIndex: idx });
                }
            }}
            onCtaClick={(l)=>l?.startsWith('http')?window.open(l,'_blank'):navigate(l||'')}
          />

          <div className="p-4 flex-grow">
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="h-4 w-1 bg-[#00c2ff] rounded-full shadow-[0_0_10px_#00c2ff]"></div>
                <h3 className="text-sm font-black text-white uppercase tracking-[3px]">Comentários ({comments.length})</h3>
            </div>
            
            <div className="space-y-1">
              {loadingComments ? (
                <div className="text-center py-20 opacity-50"><i className="fa-solid fa-circle-notch fa-spin text-3xl"></i></div>
              ) : comments.length > 0 ? comments.map(c => (
                  <CommentItem 
                    key={c.id} 
                    comment={c} 
                    onReplyClick={handleReplyClick} 
                    onLike={handleCommentLike} 
                    onDelete={handleDeleteComment} 
                    onUserClick={(u)=>navigate(`/user/${u.replace('@','')}`)} 
                    currentUserId={currentUserId}
                  />
              )) : (
                <div className="text-center py-20 opacity-20 border-2 border-dashed border-white/5 rounded-[32px]">
                    <i className="fa-regular fa-comment-dots text-5xl mb-4"></i>
                    <p className="font-bold uppercase tracking-widest text-xs">Seja o primeiro a comentar</p>
                </div>
              )}
            </div>
          </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#1a1e26] border-t border-white/10 p-4 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
            {replyingTo && (
                <div className="flex items-center justify-between py-2 mb-3 bg-[#00c2ff11] px-4 rounded-xl text-xs text-gray-300 border-l-2 border-[#00c2ff] animate-slide-up">
                    <span>Respondendo a <strong className="text-[#00c2ff]">@{replyingTo.username.replace(/^@/, '')}</strong></span>
                    <button onClick={()=>setReplyingTo(null)} className="text-gray-500 hover:text-white">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}
            <div className="flex gap-3 items-center max-w-[500px] mx-auto">
              <input 
                ref={inputRef}
                type="text" 
                placeholder={replyingTo ? `Responda @${replyingTo.username.replace(/^@/, '')}...` : "Escreva um comentário..."} 
                value={commentText} 
                onChange={(e) => setCommentText(e.target.value)} 
                onKeyDown={(e)=>e.key==='Enter'&&handleSendComment()} 
                className="flex-grow bg-[#0c0f14] border border-white/10 rounded-2xl px-5 py-3.5 text-white outline-none text-sm focus:border-[#00c2ff] transition-all placeholder-gray-700" 
              />
              <button 
                onClick={handleSendComment} 
                disabled={!commentText.trim()} 
                className="bg-[#00c2ff] w-12 h-12 rounded-2xl flex items-center justify-center text-black disabled:opacity-30 disabled:grayscale transition-all active:scale-90 shadow-lg shadow-[#00c2ff1a]"
              >
                <i className="fa-solid fa-paper-plane text-sm"></i>
              </button>
            </div>
      </div>
    </div>
  );
};
