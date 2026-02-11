
// frontend/hooks/useSearch.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

// Tipos genéricos para os resultados da busca
interface SearchResults<T> {
  results: T[];
  total: number;
  page: number;
  limit: number;
}

// Tipo para o retorno do hook
interface UseSearchReturn<T> {
  results: T[];
  isLoading: boolean;
  error: string | null;
  search: (query: string, filter?: Record<string, any>) => Promise<void>;
}

/**
 * 🎣 useSearch (Hook para Busca)
 *
 * Realiza buscas na API em diferentes categorias (posts, usuários, produtos).
 *
 * @param searchType O tipo de conteúdo a ser buscado: 'posts', 'users', 'products'.
 * @returns Estado da busca e a função para executá-la.
 */
export const useSearch = <T,>(searchType: 'posts' | 'users' | 'products'): UseSearchReturn<T> => {
  const [results, setResults] = useState<T[]>([]);
  const { data, error, isLoading, execute } = useApi<SearchResults<T>>();

  const search = useCallback(async (query: string, filter: Record<string, any> = {}) => {
    const searchParams = new URLSearchParams({
      q: query,
      ...filter,
    }).toString();
    
    await execute(`/api/search/${searchType}?${searchParams}`);

    if (data) {
      setResults(data.results);
    }
  }, [searchType, execute, data]);

  return { results, isLoading, error, search };
};
