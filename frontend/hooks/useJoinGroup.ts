
// frontend/hooks/useJoinGroup.ts
import { useCallback } from 'react';
import { useApi } from './useApi';

interface UseJoinGroupReturn {
  isJoining: boolean;
  joinGroup: (groupId: string) => Promise<any>;
}

/**
 * 🎣 useJoinGroup
 *
 * Gerencia a ação de um usuário entrar em um grupo.
 */
export const useJoinGroup = (): UseJoinGroupReturn => {
  const { isLoading, execute } = useApi();

  const joinGroup = useCallback(async (groupId: string) => {
    // Ação pode variar se o grupo for público ou privado (solicitação)
    const result = await execute(`/api/groups/${groupId}/join`, {
      method: 'POST',
    });
    return result;
  }, [execute]);

  return {
    isJoining: isLoading,
    joinGroup,
  };
};
