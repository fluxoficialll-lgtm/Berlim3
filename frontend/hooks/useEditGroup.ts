
// frontend/hooks/useEditGroup.ts
import { useCallback } from 'react';
import { useApi } from './useApi';

// Interface para o payload de edição do grupo
interface EditGroupPayload {
  name?: string;
  description?: string;
  coverImage?: File;
}

interface UseEditGroupReturn {
  isUpdating: boolean;
  updateGroup: (groupId: string, payload: EditGroupPayload) => Promise<any>;
}

/**
 * 🎣 useEditGroup
 *
 * Gerencia a lógica de atualização das informações de um grupo existente.
 */
export const useEditGroup = (): UseEditGroupReturn => {
  const { isLoading, execute } = useApi();

  const updateGroup = useCallback(async (groupId: string, payload: EditGroupPayload) => {
    const formData = new FormData();

    if (payload.name) formData.append('name', payload.name);
    if (payload.description) formData.append('description', payload.description);
    if (payload.coverImage) formData.append('coverImage', payload.coverImage);

    // Usa o método PATCH para atualizações parciais
    const result = await execute(`/api/groups/${groupId}`, {
      method: 'PATCH',
      body: formData,
    });
    return result;
  }, [execute]);

  return {
    isUpdating: isLoading,
    updateGroup,
  };
};
