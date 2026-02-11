
// frontend/hooks/useFriends.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  onlineStatus: 'online' | 'offline' | 'away';
}

interface UseFriendsReturn {
  friends: Friend[];
  isLoading: boolean;
  error: string | null;
  fetchFriends: () => Promise<void>;
  removeFriend: (friendId: string) => Promise<void>;
}

/**
 * 🎣 useFriends
 *
 * Gerencia a lista de amigos do usuário logado.
 */
export const useFriends = (): UseFriendsReturn => {
  const { data, error, isLoading, execute } = useApi<Friend[]>();
  const { execute: executeRemove } = useApi();

  const fetchFriends = useCallback(async () => {
    await execute('/api/users/friends');
  }, [execute]);

  const removeFriend = useCallback(async (friendId: string) => {
    await executeRemove('/api/users/friends/remove', {
      method: 'POST',
      body: { friendId },
    });
    fetchFriends(); // Recarrega a lista de amigos
  }, [executeRemove, fetchFriends]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return {
    friends: data || [],
    isLoading,
    error,
    fetchFriends,
    removeFriend,
  };
};
