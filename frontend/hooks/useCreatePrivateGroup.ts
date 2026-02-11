
// frontend/hooks/useCreatePrivateGroup.ts
import { useCallback } from 'react';
import { useApi } from './useApi';

// Interface para o payload de criação de grupo privado
interface CreatePrivateGroupPayload {
  name: string;
  description: string;
  coverImage?: File;
}

interface UseCreatePrivateGroupReturn {
  isCreating: boolean;
  createPrivateGroup: (payload: CreatePrivateGroupPayload) => Promise<any>;
}

/**
 * 🎣 useCreatePrivateGroup
 *
 * Hook especializado para a criação de um novo grupo privado.
 */
export const useCreatePrivateGroup = (): UseCreatePrivateGroupReturn => {
  const { isLoading, execute } = useApi();

  const createPrivateGroup = useCallback(async (payload: CreatePrivateGroupPayload) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('accessType', 'private'); // Força o tipo de acesso
    if (payload.coverImage) {
      formData.append('coverImage', payload.coverImage);
    }

    // A rota da API é uma suposição
    const result = await execute('/api/groups/create', {
      method: 'POST',
      body: formData,
    });
    return result;
  }, [execute]);

  return {
    isCreating: isLoading,
    createPrivateGroup,
  };
};
