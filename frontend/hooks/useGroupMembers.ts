
// frontend/hooks/useGroupMembers.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
}

interface UseGroupMembersReturn {
  members: GroupMember[];
  isLoading: boolean;
  error: string | null;
  fetchMembers: (groupId: string) => Promise<void>;
}

/**
 * 🎣 useGroupMembers
 *
 * Busca e gerencia a lista de membros de um grupo específico.
 */
export const useGroupMembers = (): UseGroupMembersReturn => {
  const { data, error, isLoading, execute } = useApi<GroupMember[]>();

  const fetchMembers = useCallback(async (groupId: string) => {
    if (!groupId) return;
    await execute(`/api/groups/${groupId}/members`);
  }, [execute]);

  return {
    members: data || [],
    isLoading,
    error,
    fetchMembers,
  };
};
