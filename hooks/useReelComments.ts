
import { useState, useCallback } from 'react';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { recommendationService } from '../services/recommendationService';
import { useModal } from '../components/ModalSystem';
import { Post, Comment } from '../types';
import { ReelsCommentService } from '../services/real/comments/ReelsCommentService'; // 1. Importando o novo serviço

export const useReelComments = (reels: Post[]) => {
  const { showConfirm } = useModal();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [currentComments, setCurrentComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);

  // 2. Função centralizada para buscar comentários via API
  const fetchComments = useCallback(async (reelId: string) => {
    setLoadingComments(true);
    try {
      const comments = await ReelsCommentService.getComments(reelId);
      setCurrentComments(comments);
    } catch (error) {
      console.error("Falha ao carregar comentários do Reel:", error);
      setCurrentComments([]); // Limpa em caso de erro
    } finally {
      setLoadingComments(false);
    }
  }, []);

  // 3. handleCommentClick agora usa fetchComments
  const handleCommentClick = (reelId: string) => {
    setActiveReelId(reelId);
    setIsCommentModalOpen(true);
    fetchComments(reelId);
  };

  // 4. handleSendComment refatorado
  const handleSendComment = async () => {
    if (!activeReelId || !commentText.trim()) return;
    const u = authService.getCurrentUser();
    if (!u) return;

    if (replyingTo) {
      // TODO: Migrar lógica de resposta para ReelsCommentService
      const username = u.profile?.name || 'user';
      const userAvatar = u.profile?.photoUrl;
      const success = postService.addReply(activeReelId, replyingTo.id, commentText.trim(), username, userAvatar);
      if (success) {
        setReplyingTo(null);
        setCommentText('');
        fetchComments(activeReelId);
      }
    } else {
      try {
        await ReelsCommentService.addComment(activeReelId, commentText.trim());
        setCommentText('');
        await fetchComments(activeReelId);

        // Mantém a interação com o serviço de recomendação
        if (u.email) {
          const post = reels.find(r => r.id === activeReelId);
          if (post) recommendationService.recordInteraction(u.email, post, 'comment');
        }
      } catch (error) {
        console.error("Falha ao enviar comentário no Reel:", error);
      }
    }
  };

  // 5. handleDeleteComment refatorado
  const handleDeleteComment = async (commentId: string) => {
    if (!activeReelId) return;
    if (await showConfirm("Excluir comentário", "Deseja excluir este comentário?", "Excluir", "Cancelar")) {
      try {
        await ReelsCommentService.deleteComment(commentId);
        await fetchComments(activeReelId);
      } catch (error) {
        console.error("Falha ao deletar comentário do Reel:", error);
      }
    }
  };

  const handleCommentLike = (commentId: string) => {
    if (!activeReelId) return;
    // TODO: Migrar para ReelsCommentService
    postService.toggleCommentLike(activeReelId, commentId);
  };

  const closeModal = () => {
      setIsCommentModalOpen(false);
      setActiveReelId(null);
      setCurrentComments([]);
  }

  return {
    isCommentModalOpen,
    setIsCommentModalOpen: closeModal, // Garante que o estado seja limpo ao fechar
    currentComments,
    loadingComments,
    commentText,
    setCommentText,
    replyingTo,
    setReplyingTo,
    handleCommentClick,
    handleSendComment,
    handleDeleteComment,
    handleCommentLike,
  };
};
