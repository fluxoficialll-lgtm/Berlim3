
// frontend/hooks/useFollow.ts
import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';

// Tipo para o retorno da API de follow/unfollow
interface FollowStatus {
  isFollowing: boolean;
  followerCount: number;
}

// Tipo para o retorno do hook useFollow
interface UseFollowReturn {
  isFollowing: boolean;
  followerCount: number;
  isLoading: boolean;
  error: string | null;
  toggleFollow: () => Promise<void>;
}

/**
 * 🎣 useFollow (Hook para Seguir)
 *
 * Gerencia o estado e a lógica de "seguir" e "deixar de seguir" um usuário.
 * Abstrai as chamadas de API relacionadas a essa funcionalidade.
 *
 * @param userId O ID do usuário a ser seguido/deixado de seguir.
 * @returns Um objeto com o estado de "seguir" e a função para alterná-lo.
 */
export const useFollow = (userId: string): UseFollowReturn => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const { data, error, isLoading, execute } = useApi<FollowStatus>();

  // Efeito para buscar o estado inicial de "seguir" quando o userId muda
  useEffect(() => {
    const fetchInitialStatus = async () => {
      await execute(`/api/users/${userId}/follow-status`);
      if (data) {
        setIsFollowing(data.isFollowing);
        setFollowerCount(data.followerCount);
      }
    };

    if (userId) {
      fetchInitialStatus();
    }
  }, [userId, execute, data]);

  const toggleFollow = useCallback(async () => {
    // Otimisticamente atualiza a UI
    setIsFollowing(prev => !prev);
    setFollowerCount(prev => (isFollowing ? prev - 1 : prev + 1));

    await execute(`/api/users/${userId}/follow`, {
      method: 'POST',
    });

    // Se a chamada de API falhar, reverte a UI
    if (error) {
      setIsFollowing(prev => !prev);
      setFollowerCount(prev => (isFollowing ? prev + 1 : prev - 1));
    } else if (data) {
        // Sincroniza o estado com a resposta da API
        setIsFollowing(data.isFollowing);
        setFollowerCount(data.followerCount);
    }
  }, [userId, execute, isFollowing, error, data]);

  return { isFollowing, followerCount, isLoading, error, toggleFollow };
};
