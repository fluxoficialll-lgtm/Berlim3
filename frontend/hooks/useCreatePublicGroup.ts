
// frontend/hooks/useCreatePublicGroup.ts
import { useCallback } from 'react';
import { useApi } from './useApi';

// Interface para o payload de criação de grupo público
interface CreatePublicGroupPayload {
  name: string;
  description: string;
  coverImage?: File;
}

interface UseCreatePublicGroupReturn {
  isCreating: boolean;
  createPublicGroup: (payload: CreatePublicGroupPayload) => Promise<any>;
}

/**
 * 🎣 useCreatePublicGroup
 *
 * Hook especializado para a criação de um novo grupo público.
 */
export const useCreatePublicGroup = (): UseCreatePublicGroupReturn => {
  const { isLoading, execute } = useApi();

  const createPublicGroup = useCallback(async (payload: CreatePublicGroupPayload) => {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('accessType', 'public'); // Força o tipo de acesso
    if (payload.coverImage) {
      formData.append('coverImage', payload.coverImage);
    }

    const result = await execute('/api/groups/create', {
      method: 'POST',
      body: formData,
    });
    return result;
  }, [execute]);

  return {
    isCreating: isLoading,
    createPublicGroup,
  };
};
