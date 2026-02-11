
// frontend/hooks/usePostDetails.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para o Post detalhado
interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images: string[];
  videoUrl?: string;
  tags: string[];
  createdAt: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

// Tipo para o retorno do hook
interface UsePostDetailsReturn {
  post: Post | null;
  isLoading: boolean;
  error: string | null;
  fetchPost: (postId: string) => Promise<void>;
}

/**
 * 🎣 usePostDetails (Hook para Detalhes do Post)
 *
 * Gerencia a busca e a exibição de um post específico.
 *
 * @param postId O ID do post a ser buscado.
 * @returns Estado do post e a função para buscá-lo.
 */
export const usePostDetails = (postId: string): UsePostDetailsReturn => {
  const { data, error, isLoading, execute } = useApi<Post>();

  const fetchPost = useCallback(async (currentPostId: string) => {
    await execute(`/api/posts/${currentPostId}`);
  }, [execute]);

  // Efeito para buscar o post quando o ID muda
  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId, fetchPost]);

  return { post: data, isLoading, error, fetchPost };
};
