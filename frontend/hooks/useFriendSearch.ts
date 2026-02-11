
// frontend/hooks/useFriendSearch.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

interface SearchedUser {
  id: string;
  name: string;
  avatar: string;
  isFriend: boolean;
}

interface UseFriendSearchReturn {
  results: SearchedUser[];
  isLoading: boolean;
  search: (query: string) => Promise<void>;
}

/**
 * 🎣 useFriendSearch
 *
 * Realiza uma busca por usuários/amigos na plataforma.
 */
export const useFriendSearch = (): UseFriendSearchReturn => {
  const { data, isLoading, execute } = useApi<SearchedUser[]>();

  const search = useCallback(async (query: string) => {
    if (!query) {
      // Limpa os resultados se a busca for vazia
      execute('', { data: [] }); // Supõe que o `execute` pode limpar o estado
      return;
    }
    await execute(`/api/search/users?q=${encodeURIComponent(query)}`);
  }, [execute]);

  return {
    results: data || [],
    isLoading,
    search,
  };
};
