
// frontend/hooks/useCreateReel.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

interface CreateReelPayload {
  video: File;
  caption: string;
  // Outros metadados, como música, localização, etc.
}

interface UseCreateReelReturn {
  isUploading: boolean;
  uploadReel: (payload: CreateReelPayload) => Promise<any>;
}

/**
 * 🎣 useCreateReel
 *
 * Gerencia o upload e a publicação de um novo Reel.
 */
export const useCreateReel = (): UseCreateReelReturn => {
  const { isLoading, execute } = useApi();

  const uploadReel = useCallback(async (payload: CreateReelPayload) => {
    const formData = new FormData();
    formData.append('video', payload.video);
    formData.append('caption', payload.caption);

    const result = await execute('/api/reels/upload', {
      method: 'POST',
      body: formData,
    });
    return result;
  }, [execute]);

  return {
    isUploading: isLoading,
    uploadReel,
  };
};
