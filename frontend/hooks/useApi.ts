
// frontend/hooks/useApi.ts
import { useState, useCallback } from 'react';

// Define o tipo para os parâmetros de uma requisição API
type ApiRequestParams = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
};

// Define o tipo para o retorno do hook useApi
interface UseApiReturn<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  execute: (url: string, params?: ApiRequestParams) => Promise<void>;
}

/**
 * 🎣 useApi (Hook de API Genérico)
 *
 * Um hook reutilizável para realizar chamadas de API com fetch.
 * Gerencia o estado de carregamento, erros e os dados retornados.
 *
 * @returns Um objeto contendo os dados, o estado de erro, o estado de carregamento e a função para executar a chamada.
 */
export const useApi = <T,>(): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(async (url: string, params: ApiRequestParams = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: params.method || 'GET',
        headers: { 'Content-Type': 'application/json', ...params.headers },
        body: params.body ? JSON.stringify(params.body) : undefined,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Erro na requisição: ${response.statusText}`);
      }

      setData(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, execute };
};
