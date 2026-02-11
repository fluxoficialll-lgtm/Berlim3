
// frontend/hooks/useCreateMarketplaceItem.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para a criação de um item no marketplace
interface MarketplaceItemPayload {
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: File[]; // Ou um array de URLs após o upload
}

// Tipo para o retorno do hook
interface UseCreateMarketplaceItemReturn {
  isCreating: boolean;
  createItem: (payload: MarketplaceItemPayload) => Promise<any>;
}

/**
 * 🎣 useCreateMarketplaceItem
 *
 * Gerencia a lógica para criar e publicar um novo item no marketplace.
 */
export const useCreateMarketplaceItem = (): UseCreateMarketplaceItemReturn => {
  const { isLoading, execute } = useApi();

  const createItem = useCallback(async (payload: MarketplaceItemPayload) => {
    // A lógica de upload de imagens seria tratada aqui ou dentro da chamada de API
    // Por exemplo, usando FormData se a API aceitar multipart/form-data
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      if (key === 'images') {
        payload.images.forEach(image => formData.append('images', image));
      } else {
        formData.append(key, (payload as any)[key]);
      }
    });

    const result = await execute('/api/marketplace/items/create', {
      method: 'POST',
      body: formData, // Enviando como FormData
    });

    return result;
  }, [execute]);

  return {
    isCreating: isLoading,
    createItem,
  };
};
