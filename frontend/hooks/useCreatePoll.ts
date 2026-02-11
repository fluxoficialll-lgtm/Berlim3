
// frontend/hooks/useCreatePoll.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

// Interface para as opções da enquete
interface PollOption {
  text: string;
}

// Interface para o payload de criação da enquete
interface CreatePollPayload {
  question: string;
  options: PollOption[];
  // Opcional: groupId para enquetes em grupos
  groupId?: string;
}

interface UseCreatePollReturn {
  isCreating: boolean;
  createPoll: (payload: CreatePollPayload) => Promise<any>;
}

/**
 * 🎣 useCreatePoll
 *
 * Gerencia a lógica para a criação de uma nova enquete no feed ou em um grupo.
 */
export const useCreatePoll = (): UseCreatePollReturn => {
  const { isLoading, execute } = useApi();

  const createPoll = useCallback(async (payload: CreatePollPayload) => {
    // A rota pode variar dependendo se é uma enquete de feed ou de grupo
    const url = payload.groupId ? `/api/groups/${payload.groupId}/polls` : '/api/feed/polls';

    const result = await execute(url, {
      method: 'POST',
      body: payload,
    });
    return result;
  }, [execute]);

  return {
    isCreating: isLoading,
    createPoll,
  };
};
