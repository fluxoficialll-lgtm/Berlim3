
// frontend/hooks/useGroupRole.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo que o papel do usuário é uma string
type UserGroupRole = 'admin' | 'moderator' | 'member' | 'guest';

interface UseGroupRoleReturn {
  role: UserGroupRole | null;
  isLoading: boolean;
  fetchRole: (groupId: string, userId: string) => Promise<void>;
  updateRole: (groupId: string, userId: string, newRole: UserGroupRole) => Promise<void>;
}

/**
 * 🎣 useGroupRole
 *
 * Gerencia o papel (role) de um usuário dentro de um grupo específico.
 */
export const useGroupRole = (): UseGroupRoleReturn => {
  const { data, isLoading, execute } = useApi<UserGroupRole>();
  const { execute: executeUpdate } = useApi();

  const fetchRole = useCallback(async (groupId: string, userId: string) => {
    if (!groupId || !userId) return;
    await execute(`/api/groups/${groupId}/members/${userId}/role`);
  }, [execute]);

  const updateRole = useCallback(async (groupId: string, userId: string, newRole: UserGroupRole) => {
    await executeUpdate(`/api/groups/${groupId}/members/${userId}/role`, {
      method: 'PUT',
      body: { role: newRole },
    });
    // Opcionalmente, recarregar o papel após a atualização
    fetchRole(groupId, userId);
  }, [executeUpdate, fetchRole]);

  return {
    role: data,
    isLoading,
    fetchRole,
    updateRole,
  };
};
