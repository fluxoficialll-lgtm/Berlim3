
// frontend/hooks/useCreatePost.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para o payload de criação de post
interface CreatePostPayload {
  text: string;
  media?: File[]; // Imagens ou vídeos
  groupId?: string; // Se for um post em um grupo
}

interface UseCreatePostReturn {
  isCreating: boolean;
  createPost: (payload: CreatePostPayload) => Promise<any>;
}

/**
 * 🎣 useCreatePost
 *
 * Gerencia a lógica para criar uma nova publicação no feed do usuário ou em um grupo.
 */
export const useCreatePost = (): UseCreatePostReturn => {
  const { isLoading, execute } = useApi();

  const createPost = useCallback(async (payload: CreatePostPayload) => {
    // A rota pode depender se o post é para um grupo ou para o feed geral
    const url = payload.groupId ? `/api/groups/${payload.groupId}/posts` : '/api/feed/posts';

    // Lidar com upload de mídia (semelhante ao useCreateMarketplaceItem)
    const formData = new FormData();
    formData.append('text', payload.text);
    if (payload.media) {
      payload.media.forEach(file => formData.append('media', file));
    }

    const result = await execute(url, {
      method: 'POST',
      body: formData,
    });
    return result;
  }, [execute]);

  return {
    isCreating: isLoading,
    createPost,
  };
};
