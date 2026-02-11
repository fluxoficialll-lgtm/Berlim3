
// frontend/hooks/useFavorites.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface genérica para um item favorito
interface FavoriteItem {
  id: string;
  type: 'post' | 'product' | 'user';
  title: string;
  thumbnailUrl: string;
}

interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  isLoading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
  removeFromFavorites: (itemId: string) => Promise<void>;
}

/**
 * 🎣 useFavorites
 *
 * Gerencia a lista de itens favoritados pelo usuário.
 */
export const useFavorites = (): UseFavoritesReturn => {
  const { data, error, isLoading, execute } = useApi<FavoriteItem[]>();
  const { execute: executeRemove } = useApi();

  const fetchFavorites = useCallback(async () => {
    await execute('/api/users/favorites');
  }, [execute]);

  const removeFromFavorites = useCallback(async (itemId: string) => {
    await executeRemove(`/api/users/favorites/${itemId}`, { method: 'DELETE' });
    // Atualiza o estado local para refletir a remoção
    fetchFavorites();
  }, [executeRemove, fetchFavorites]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return {
    favorites: data || [],
    isLoading,
    error,
    fetchFavorites,
    removeFromFavorites,
  };
};
