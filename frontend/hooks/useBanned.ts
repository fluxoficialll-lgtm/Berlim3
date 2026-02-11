
// frontend/hooks/useBanned.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para um usuário banido
interface BannedUser {
  id: string;
  name: string;
  avatar: string;
  bannedAt: string;
  reason: string;
}

// Tipo para o retorno do hook
interface UseBannedReturn {
  bannedUsers: BannedUser[];
  isLoading: boolean;
  error: string | null;
  fetchBannedUsers: () => Promise<void>;
}

/**
 * 🎣 useBanned
 *
 * Gerencia a lista de usuários banidos.
 *
 * @returns Estado da lista de usuários banidos e a função para buscá-los.
 */
export const useBanned = (): UseBannedReturn => {
  const [bannedUsers, setBannedUsers] = useState<BannedUser[]>([]);
  const { data, error, isLoading, execute } = useApi<BannedUser[]>();

  const fetchBannedUsers = useCallback(async () => {
    // A rota da API é uma suposição
    await execute('/api/users/banned');
  }, [execute]);

  useEffect(() => {
    fetchBannedUsers();
  }, [fetchBannedUsers]);

  useEffect(() => {
    if (data) {
      setBannedUsers(data);
    }
  }, [data]);

  return { bannedUsers, isLoading, error, fetchBannedUsers };
};
