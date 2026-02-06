
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { marketplaceService } from '@/services/marketplaceService';
import { authService } from '@/services/authService';
import { chatService } from '@/services/chatService';
import { db } from '@/database';
import { MarketplaceItem, Comment } from '@/types';
import { useModal } from '@/components/ModalSystem';
import { MarketplaceCommentService } from '@/services/real/comments/MarketplaceCommentService'; // 1. Importando o novo serviço

// Componentes Modulares
import '@/features/marketplace/components/details/ProductDetails.css';
import { ProductHeader } from '@/features/marketplace/components/details/ProductHeader';
import { ProductMediaGallery } from '@/features/marketplace/components/details/ProductMediaGallery';
import { ProductInfo } from '@/features/marketplace/components/details/ProductInfo';
import { ProductSellerCard } from '@/features/marketplace/components/details/ProductSellerCard';
import { ProductDescription } from '@/features/marketplace/components/details/ProductDescription';
import { ProductBottomBar } from '@/features/marketplace/components/details/ProductBottomBar';
import { ProductLightbox } from '@/features/marketplace/components/details/ProductLightbox';
import { CommentSheet } from '@/components/ui/comments/CommentSheet';

export const ProductDetailsV2: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showConfirm, showAlert } = useModal();

  // State
  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [questions, setQuestions] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);
  const [zoomedMedia, setZoomedMedia] = useState<{ url: string, type: 'image' | 'video' } | null>(null);
  
  const currentUser = authService.getCurrentUser();
  const currentUserId = currentUser?.id;

  // 2. Busca de comentários (perguntas) refatorada
  const fetchComments = useCallback(async () => {
    if (!id) return;
    setLoadingComments(true);
    try {
        const fetchedComments = await MarketplaceCommentService.getComments(id);
        setQuestions(fetchedComments);
    } catch (error) {
        console.error("Falha ao carregar perguntas:", error);
    } finally {
        setLoadingComments(false);
    }
  }, [id]);

  // Efeito para buscar o item e as perguntas
  useEffect(() => {
    if (id) {
      const foundItem = marketplaceService.getItemById(id);
      if (foundItem) {
        setItem(foundItem);
        fetchComments(); // Busca os comentários da API
        if (currentUser && (currentUser.email === foundItem.sellerId || currentUser.id === foundItem.sellerId)) {
          setIsSeller(true);
        }
      } else {
        showAlert("Erro", "Produto não encontrado.");
        navigate('/marketplace');
      }
    }
    setLoading(false);
  }, [id, currentUser, navigate, showAlert, fetchComments]);

  const handleChat = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser || !item || isSeller) return;
    try {
      const chatId = await chatService.startChatWithProductContext(item.sellerId, item.id);
      navigate(`/chat/${chatId}`);
    } catch (err) {
      console.error(err);
      showAlert("Erro", "Não foi possível iniciar a conversa. Tente novamente.");
    }
  };

  const handleDelete = () => {
    showConfirm("Excluir Anúncio", "Tem certeza que deseja excluir permanentemente?", "Excluir", "Cancelar")
      .then(confirmed => {
        if (confirmed && id) {
          marketplaceService.deleteItem(id);
          navigate('/marketplace', { replace: true });
        }
      });
  };

  // 3. Lógica de enviar pergunta refatorada
  const handleSendQuestion = async () => {
    if (!commentText.trim() || !item || !currentUser) return;

    if (replyingTo) {
      // TODO: Migrar lógica de resposta para MarketplaceCommentService
      marketplaceService.addReply(item.id, replyingTo.id, commentText, currentUser);
      setReplyingTo(null);
      setCommentText('');
      await fetchComments();
    } else {
      try {
        await MarketplaceCommentService.addComment(item.id, commentText.trim());
        setCommentText('');
        await fetchComments();
      } catch (error) {
          console.error("Falha ao enviar pergunta:", error);
      }
    }
  };

  // 4. Lógica de deletar pergunta refatorada
  const handleDeleteQuestion = async (commentId: string) => {
    if (!item) return;
    if (await showConfirm("Excluir pergunta", "Deseja excluir sua pergunta?", "Excluir", "Cancelar")){
        try {
            await MarketplaceCommentService.deleteComment(commentId);
            await fetchComments();
        } catch(error) {
            console.error("Falha ao deletar pergunta:", error);
        }
    }
  };
  
  const handleLikeQuestion = (commentId: string) => {
    // TODO: Migrar para MarketplaceCommentService
    if (item) marketplaceService.toggleCommentLike(item.id, commentId);
  };

  const navigateToStore = () => {
    if (item) navigate(`/user/${item.sellerName}`, { state: { activeTab: 'products' } });
  };

  const openComments = () => setIsCommentModalOpen(true);
  const closeComments = () => setIsCommentModalOpen(false);
  const openLightbox = (media: {url: string, type: 'image' | 'video'}) => setZoomedMedia(media);
  const closeLightbox = () => setZoomedMedia(null);

  const mediaItems = useMemo(() => {
    if (!item) return [];
    return [{ type: 'video', url: item.video }, { type: 'image', url: item.image }, ...item.images?.map(i => ({ type: 'image', url: i })) || []].filter(m => m.url);
  }, [item]);

  if (loading || !item) return <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white"><i className="fa-solid fa-circle-notch fa-spin text-2xl"></i></div>;

  return (
    <div className="min-h-screen bg-[#0c0f14] text-white font-['Inter'] flex flex-col relative pb-[90px]">
      <ProductHeader isSeller={isSeller} productId={item.id} onDelete={handleDelete} onReport={() => showAlert("Reportado", "Obrigado!")}/>
      <div className="product-container">
        <ProductMediaGallery mediaItems={mediaItems} onMediaClick={openLightbox}/>
        <div className="details-wrapper">
          <div className="detail-card product-info-card">
            <ProductInfo title={item.title} price={item.price} location={item.location} category={item.category} timestamp={item.timestamp}/>
          </div>
          <ProductSellerCard sellerName={item.sellerName || 'Vendedor'} sellerAvatar={item.sellerAvatar} onClick={navigateToStore} />
          <div className="detail-card product-description-card">
            <ProductDescription description={item.description} />
          </div>
          <button className="qa-trigger-btn" onClick={openComments}>
            <span className="font-bold text-sm"><i className="fa-regular fa-comments mr-2 text-[#00c2ff]"></i> Perguntas ({questions.length})</span>
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
      <ProductBottomBar isSeller={isSeller} onDelete={handleDelete} onChat={handleChat} />
      <ProductLightbox media={zoomedMedia} onClose={closeLightbox} />
      <CommentSheet 
        isOpen={isCommentModalOpen} 
        onClose={closeComments} 
        title={`Perguntas (${questions.length})`}
        comments={questions} 
        loading={loadingComments}
        commentText={commentText} 
        onCommentTextChange={setCommentText}
        onSend={handleSendQuestion} 
        onLike={handleLikeQuestion} 
        onDelete={handleDeleteQuestion} 
        onUserClick={(u) => navigate(`/user/${u.replace('@', '')}`)} 
        currentUserId={currentUserId} 
        replyingTo={replyingTo} 
        onCancelReply={() => setReplyingTo(null)}
        onReplyClick={(cid, user) => setReplyingTo({ id: cid, username: user })} 
        placeholder={isSeller ? "Responda a dúvida..." : "Escreva sua dúvida..."}
      />
    </div>
  );
};
