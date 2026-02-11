
// frontend/hooks/useEditPost.ts
import { useCallback } from 'react';
import { useApi } from './useApi';

interface EditPostPayload {
  text?: string;
  // A edição de mídia pode ser mais complexa (adicionar/remover)
}

interface UseEditPostReturn {
  isUpdating: boolean;
  updatePost: (postId: string, payload: EditPostPayload) => Promise<any>;
}

/**
 * 🎣 useEditPost
 *
 * Gerencia a lógica para editar uma publicação existente.
 */
export const useEditPost = (): UseEditPostReturn => {
  const { isLoading, execute } = useApi();

  const updatePost = useCallback(async (postId: string, payload: EditPostPayload) => {
    const result = await execute(`/api/feed/posts/${postId}`, {
      method: 'PATCH',
      body: payload,
    });
    return result;
  }, [execute]);

  return {
    isUpdating: isLoading,
    updatePost,
  };
};
