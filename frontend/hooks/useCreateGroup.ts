
// frontend/hooks/useCreateGroup.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para a criação de um grupo
interface GroupCreationPayload {
  name: string;
  description: string;
  accessType: 'public' | 'private' | 'vip';
  // Outros campos como imagem de capa, etc.
}

// Tipo para o retorno do hook
interface UseCreateGroupReturn {
  isCreating: boolean;
  createGroup: (payload: GroupCreationPayload) => Promise<any>; // O retorno pode ser o objeto do grupo criado
}

/**
 * 🎣 useCreateGroup
 *
 * Gerencia a lógica e o estado para a criação de um novo grupo.
 */
export const useCreateGroup = (): UseCreateGroupReturn => {
  const { isLoading, execute } = useApi();

  const createGroup = useCallback(async (payload: GroupCreationPayload) => {
    // A rota da API é uma suposição
    const result = await execute('/api/groups/create', {
      method: 'POST',
      body: payload,
    });
    return result;
  }, [execute]);

  return {
    isCreating: isLoading,
    createGroup,
  };
};
