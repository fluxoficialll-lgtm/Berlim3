
// frontend/hooks/useLike.ts
import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';

// Tipo para o retorno da API de like/unlike
interface LikeStatus {
  isLiked: boolean;
  likeCount: number;
}

// Tipo para o retorno do hook useLike
interface UseLikeReturn {
  isLiked: boolean;
  likeCount: number;
  isLoading: boolean;
  error: string | null;
  toggleLike: () => Promise<void>;
}

/**
 * 🎣 useLike (Hook para Likes)
 *
 * Gerencia o estado e a lógica de "curtir" e "descurtir" um post.
 * Abstrai as chamadas de API relacionadas a likes.
 *
 * @param postId O ID do post a ser curtido/descurtido.
 * @returns Um objeto com o estado do like e a função para alterná-lo.
 */
export const useLike = (postId: string): UseLikeReturn => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const { data, error, isLoading, execute } = useApi<LikeStatus>();

  // Efeito para buscar o estado inicial do like quando o postId muda
  useEffect(() => {
    const fetchInitialStatus = async () => {
      await execute(`/api/posts/${postId}/like-status`);
      if (data) {
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      }
    };

    if (postId) {
      fetchInitialStatus();
    }
  }, [postId, execute, data]);

  const toggleLike = useCallback(async () => {
    // Otimisticamente atualiza a UI
    setIsLiked(prev => !prev);
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));

    await execute(`/api/posts/${postId}/like`, {
      method: 'POST',
    });

    // Se a chamada de API falhar, reverte a UI
    if (error) {
      setIsLiked(prev => !prev);
      setLikeCount(prev => (isLiked ? prev + 1 : prev - 1));
    } else if (data) {
        // Sincroniza o estado com a resposta da API
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
    }
  }, [postId, execute, isLiked, error, data]);

  return { isLiked, likeCount, isLoading, error, toggleLike };
};
