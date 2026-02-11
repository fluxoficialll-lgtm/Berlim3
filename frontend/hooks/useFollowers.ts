
// frontend/hooks/useFollowers.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

interface Follower {
  id: string;
  name: string;
  avatar: string;
}

interface UseFollowersReturn {
  followers: Follower[];
  isLoading: boolean;
  error: string | null;
  fetchFollowers: (userId: string) => Promise<void>;
}

/**
 * 🎣 useFollowers
 *
 * Busca e gerencia a lista de seguidores de um usuário específico.
 */
export const useFollowers = (): UseFollowersReturn => {
  const { data, error, isLoading, execute } = useApi<Follower[]>();

  const fetchFollowers = useCallback(async (userId: string) => {
    if (!userId) return;
    await execute(`/api/users/${userId}/followers`);
  }, [execute]);

  // A chamada inicial pode ser acionada a partir da página

  return {
    followers: data || [],
    isLoading,
    error,
    fetchFollowers,
  };
};
