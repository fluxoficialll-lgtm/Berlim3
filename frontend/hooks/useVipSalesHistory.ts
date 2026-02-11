
// frontend/hooks/useVipSalesHistory.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para um item do histórico de vendas
interface SalesHistoryItem {
  id: string;
  saleDate: string;
  productName: string; // Ou nome do grupo VIP
  buyer: {
    id: string;
    name: string;
  };
  price: number;
  currency: string;
  paymentStatus: 'completed' | 'pending' | 'failed';
}

// A resposta da API pode incluir paginação
interface SalesHistoryResponse {
  sales: SalesHistoryItem[];
  totalSales: number;
  nextCursor?: string;
}

// Tipo para o retorno do hook
interface UseVipSalesHistoryReturn {
  salesHistory: SalesHistoryItem[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  fetchHistory: () => Promise<void>;
  fetchMoreHistory: () => Promise<void>;
}

/**
 * 🎣 useVipSalesHistory
 *
 * Busca e gerencia o histórico de vendas de um produto ou grupo VIP.
 *
 * @param entityId O ID da entidade (grupo, produto) para a qual buscar o histórico.
 * @returns Estado do histórico de vendas e funções para carregar e paginar os dados.
 */
export const useVipSalesHistory = (entityId: string): UseVipSalesHistoryReturn => {
  const [salesHistory, setSalesHistory] = useState<SalesHistoryItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const { data: initialData, error: initialError, isLoading: isInitialLoading, execute: executeInitial } = useApi<SalesHistoryResponse>();
  const { data: moreData, error: moreError, isLoading: isMoreLoading, execute: executeMore } = useApi<SalesHistoryResponse>();

  const fetchHistory = useCallback(async () => {
    if (!entityId) return;
    await executeInitial(`/api/sales/history/${entityId}`);
  }, [entityId, executeInitial]);

  const fetchMoreHistory = useCallback(async () => {
    if (!entityId || !nextCursor || isMoreLoading) return;
    setIsLoadingMore(true);
    await executeMore(`/api/sales/history/${entityId}?cursor=${nextCursor}`);
    setIsLoadingMore(false);
  }, [entityId, nextCursor, isMoreLoading, executeMore]);

  // Efeito para a carga inicial
  useEffect(() => {
    if (initialData) {
      setSalesHistory(initialData.sales);
      setNextCursor(initialData.nextCursor || null);
    }
  }, [initialData]);

  // Efeito para adicionar os dados da paginação
  useEffect(() => {
    if (moreData) {
      setSalesHistory(prev => [...prev, ...moreData.sales]);
      setNextCursor(moreData.nextCursor || null);
    }
  }, [moreData]);

  // Efeito para buscar o histórico ao montar o hook ou quando o entityId muda
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    salesHistory,
    isLoading: isInitialLoading,
    isLoadingMore,
    error: initialError || moreError,
    hasMore: !!nextCursor,
    fetchHistory,
    fetchMoreHistory,
  };
};
