import { useState } from 'react';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { recommendationService } from '../services/recommendationService';
import { useModal } from '../components/ModalSystem';
import { Post, Comment } from '../types';

export const useReelComments = (reels: Post[]) => {
  const { showConfirm } = useModal();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [currentComments, setCurrentComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);

  const handleCommentClick = (reelId: string) => {
    const post = postService.getPostById(reelId);
    if (post) {
      setActiveReelId(reelId);
      setCurrentComments(post.commentsList || []);
      setIsCommentModalOpen(true);
    }
  };

  const handleSendComment = async () => {
    if (!activeReelId || !commentText.trim()) return;
    const u = authService.getCurrentUser();
    if (!u) return;

    const username = u.profile?.name || 'user';
    const userAvatar = u.profile?.photoUrl;

    if (replyingTo) {
      const success = postService.addReply(activeReelId, replyingTo.id, commentText.trim(), username, userAvatar);
      if (success) setReplyingTo(null);
    } else {
      await postService.addComment(activeReelId, commentText.trim(), username, userAvatar);
      if (u.email) {
        const post = reels.find(r => r.id === activeReelId);
        if (post) recommendationService.recordInteraction(u.email, post, 'comment');
      }
    }
    setCommentText('');
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!activeReelId) return;
    if (await showConfirm("Excluir comentário", "Deseja excluir este comentário?", "Excluir", "Cancelar")) {
      await postService.deleteComment(activeReelId, commentId);
    }
  };

  const handleCommentLike = (commentId: string) => {
    if (!activeReelId) return;
    postService.toggleCommentLike(activeReelId, commentId);
  };

  return {
    isCommentModalOpen,
    setIsCommentModalOpen,
    currentComments,
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
