
// frontend/hooks/useTopGroupsVip.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para um Grupo VIP
interface VipGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  price: number;
  currency: string;
  coverImage: string;
}

// Tipo para o retorno do hook
interface UseTopGroupsVipReturn {
  groups: VipGroup[];
  isLoading: boolean;
  error: string | null;
  fetchTopVipGroups: () => Promise<void>;
}

/**
 * 🎣 useTopGroupsVip
 *
 * Busca e gerencia a lista dos principais grupos VIP da plataforma.
 *
 * @returns Estado da lista de grupos VIP e a função para recarregá-la.
 */
export const useTopGroupsVip = (): UseTopGroupsVipReturn => {
  const [groups, setGroups] = useState<VipGroup[]>([]);
  const { data, error, isLoading, execute } = useApi<VipGroup[]>();

  const fetchTopVipGroups = useCallback(async () => {
    // A rota da API é uma suposição e deve ser confirmada pelo backend
    await execute('/api/groups/top/vip');
  }, [execute]);

  // Efeito para buscar os dados quando o hook é montado
  useEffect(() => {
    fetchTopVipGroups();
  }, [fetchTopVipGroups]);

  // Efeito para atualizar o estado local quando os dados da API chegam
  useEffect(() => {
    if (data) {
      setGroups(data);
    }
  }, [data]);

  return { groups, isLoading, error, fetchTopVipGroups };
};
