
import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { API_BASE } from '@/apiConfig';

const REELS_API_URL = `${API_BASE}/api/reels`;

type CategoryFilter = 'relevant' | 'recent' | 'watched' | 'unwatched' | 'liked';

export const useReelsSearch = () => {
  // Estados para resultados, carregamento e filtros
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('relevant');

  /**
   * ✅ ARQUITETURA NOVA: Lógica de busca com debounce movida para o hook.
   * A função constrói a URL da API com os parâmetros de busca e categoria.
   */
  useEffect(() => {
    const fetchReels = async () => {
      setIsLoading(true);
      try {
        // Constrói a URL com os parâmetros de busca
        const params = new URLSearchParams({
          term: searchTerm,
          category: activeCategory,
        });
        const response = await fetch(`${REELS_API_URL}/search?${params}`);

        if (!response.ok) {
          throw new Error('Falha ao buscar reels');
        }
        const data: Post[] = await response.json();
        setResults(data || []);
      } catch (error) {
        console.error("Erro ao buscar reels:", error);
        setResults([]); // Limpa os resultados em caso de erro
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce: espera 400ms após o usuário parar de digitar para fazer a busca.
    const timeoutId = setTimeout(fetchReels, 400);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, activeCategory]);

  // Retorna os dados e os manipuladores para a UI
  return {
    results,
    isLoading,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
  };
};
