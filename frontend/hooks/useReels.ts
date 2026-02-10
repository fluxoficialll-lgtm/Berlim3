// frontend/hooks/useReels.ts

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import { Post } from '../types';

/**
 * Hook: useReels
 * Propósito: Gerencia a lógica de negócios para a página de Reels.
 */
export const useReels = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);
    const [reels, setReels] = useState<Post[]>([]);
    const [activeReelIndex, setActiveReelIndex] = useState(0);
    const [activeReel, setActiveReel] = useState<Post | null>(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const fetchReels = useCallback(async () => {
        setLoading(true);
        try {
            const allPosts = await postService.getFeed();
            const reelPosts = allPosts.filter(post => post.type === 'reel');
            setReels(reelPosts);
        } catch (error) {
            console.error("Erro ao buscar os Reels:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReels();
    }, [fetchReels]);

    // Lógica para determinar o reel ativo com base no scroll pode ser adicionada aqui.

    const handleCommentClick = (reelId: string) => {
        const reel = reels.find(r => r.id === reelId);
        if (reel) {
            setActiveReel(reel);
            setIsCommentModalOpen(true);
        }
    };

    const closeCommentModal = () => {
        setIsCommentModalOpen(false);
        setActiveReel(null);
    };

    return {
        loading,
        reels,
        activeReelIndex,
        activeReel,
        isCommentModalOpen,
        containerRef,
        navigate,
        handleCommentClick,
        closeCommentModal,
    };
};