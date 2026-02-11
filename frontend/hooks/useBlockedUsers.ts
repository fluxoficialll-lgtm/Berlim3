
// frontend/hooks/useBlockedUsers.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para um usuário bloqueado
interface BlockedUser {
  id: string;
  name: string;
  avatar: string;
}

// Tipo para o retorno do hook
interface UseBlockedUsersReturn {
  blockedUsers: BlockedUser[];
  isLoading: boolean;
  error: string | null;
  unblockUser: (userId: string) => Promise<void>;
  fetchBlockedUsers: () => Promise<void>;
}

/**
 * 🎣 useBlockedUsers
 *
 * Gerencia a lista de usuários bloqueados pelo usuário logado.
 *
 * @returns Estado da lista de bloqueados e funções para buscar e desbloquear usuários.
 */
export const useBlockedUsers = (): UseBlockedUsersReturn => {
  const { data, error, isLoading, execute } = useApi<BlockedUser[]>();
  const { execute: executeUnblock } = useApi(); // Hook de API para a ação de desbloquear

  const fetchBlockedUsers = useCallback(async () => {
    await execute('/api/users/blocked');
  }, [execute]);

  const unblockUser = useCallback(async (userId: string) => {
    await executeUnblock(`/api/users/unblock/${userId}`, { method: 'POST' });
    // Otimistamente remove o usuário da lista ou recarrega a lista
    fetchBlockedUsers(); // Recarrega para garantir consistência
  }, [executeUnblock, fetchBlockedUsers]);

  useEffect(() => {
    fetchBlockedUsers();
  }, [fetchBlockedUsers]);

  return {
    blockedUsers: data || [],
    isLoading,
    error,
    unblockUser,
    fetchBlockedUsers,
  };
};
