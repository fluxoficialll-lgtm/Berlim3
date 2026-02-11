
// frontend/hooks/useFollowing.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

interface FollowingUser {
  id: string;
  name: string;
  avatar: string;
}

interface UseFollowingReturn {
  following: FollowingUser[];
  isLoading: boolean;
  error: string | null;
  fetchFollowing: (userId: string) => Promise<void>;
  unfollowUser: (targetUserId: string) => Promise<void>;
}

/**
 * 🎣 useFollowing
 *
 * Busca e gerencia a lista de usuários que um usuário específico está seguindo.
 */
export const useFollowing = (): UseFollowingReturn => {
  const { data, error, isLoading, execute } = useApi<FollowingUser[]>();
  const { execute: executeUnfollow } = useApi();

  const fetchFollowing = useCallback(async (userId: string) => {
    if (!userId) return;
    await execute(`/api/users/${userId}/following`);
  }, [execute]);

  const unfollowUser = useCallback(async (targetUserId: string) => {
    await executeUnfollow('/api/users/unfollow', {
      method: 'POST',
      body: { userId: targetUserId },
    });
    // Atualiza a lista após deixar de seguir
    // Este é um exemplo, o ideal é ter o ID do usuário logado para refazer a busca
  }, [executeUnfollow]);

  return {
    following: data || [],
    isLoading,
    error,
    fetchFollowing,
    unfollowUser,
  };
};
