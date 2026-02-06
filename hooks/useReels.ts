import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReelsData } from './useReelsData';
import { useReelInteractions } from './useReelInteractions';
import { useReelComments } from './useReelComments';
import { useReelPlayer } from './useReelPlayer';
import { authService } from '../services/authService';

export const useReels = () => {
  const navigate = useNavigate();
  const { reels, setReels } = useReelsData();
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeReelIndex, reportWatchTime } = useReelPlayer(reels, containerRef);
  const { handleLike, handleDeleteReel, handleShare } = useReelInteractions(setReels);
  const { 
    isCommentModalOpen, setIsCommentModalOpen, currentComments, 
    commentText, setCommentText, replyingTo, setReplyingTo, 
    handleCommentClick, handleSendComment, handleDeleteComment, handleCommentLike 
  } = useReelComments(reels);
  
  const [expandedReels, setExpandedReels] = useState<Set<string>>(new Set());

  const currentUser = authService.getCurrentUser();
  const currentUserId = currentUser?.id;

  const toggleReadMore = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedReels(prev => {
        const next = new Set(prev);
        if (next.has(reelId)) next.delete(reelId);
        else next.add(reelId);
        return next;
    });
  };

  const handleCtaClick = (link?: string) => {
    if (link?.startsWith('http')) {
        window.open(link, '_blank');
    } else if (link) {
        navigate(link);
    }
  };

  return {
      navigate,
      containerRef,
      reels,
      activeReelIndex,
      expandedReels,
      isCommentModalOpen,
      setIsCommentModalOpen,
      currentComments,
      commentText,
      setCommentText,
      replyingTo,
      setReplyingTo,
      currentUserId,
      toggleReadMore,
      handleLike,
      handleDeleteReel,
      handleCommentClick,
      handleSendComment,
      handleDeleteComment,
      handleCommentLike,
      handleShare,
      reportWatchTime,
      handleCtaClick
  };
};
