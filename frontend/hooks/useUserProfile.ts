
// frontend/hooks/useUserProfile.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para o perfil do usuário
interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
  posts: any[]; // Simplificado, idealmente um tipo Post[]
}

// Tipo para o retorno do hook
interface UseUserProfileReturn {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
}

/**
 * 🎣 useUserProfile (Hook para Perfil de Usuário)
 *
 * Gerencia a busca e a exibição do perfil de um usuário.
 *
 * @param userId O ID do usuário a ser buscado.
 * @returns Estado do perfil e a função para buscá-lo.
 */
export const useUserProfile = (userId: string): UseUserProfileReturn => {
  const { data, error, isLoading, execute } = useApi<UserProfile>();

  const fetchProfile = useCallback(async (currentUserId: string) => {
    await execute(`/api/users/${currentUserId}/profile`);
  }, [execute]);

  // Efeito para buscar o perfil quando o ID do usuário muda
  useEffect(() => {
    if (userId) {
      fetchProfile(userId);
    }
  }, [userId, fetchProfile]);

  return { profile: data, isLoading, error, fetchProfile };
};
