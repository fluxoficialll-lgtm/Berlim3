
// frontend/hooks/useGroups.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImage: string;
}

interface UseGroupsReturn {
  groups: Group[];
  isLoading: boolean;
  error: string | null;
  fetchGroups: (filter?: 'user' | 'recommended') => Promise<void>;
}

/**
 * 🎣 useGroups
 *
 * Busca e gerencia uma lista de grupos (sejam do usuário ou recomendados).
 */
export const useGroups = (): UseGroupsReturn => {
  const { data, error, isLoading, execute } = useApi<Group[]>();

  const fetchGroups = useCallback(async (filter: 'user' | 'recommended' = 'user') => {
    const url = filter === 'user' ? '/api/users/groups' : '/api/groups/recommended';
    await execute(url);
  }, [execute]);

  useEffect(() => {
    // Carrega os grupos do usuário por padrão
    fetchGroups('user');
  }, [fetchGroups]);

  return {
    groups: data || [],
    isLoading,
    error,
    fetchGroups,
  };
};
