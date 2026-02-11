
// frontend/hooks/useFeed.ts
import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';

// Supondo uma interface de Post consistente com outros hooks
interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  videoUrl?: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

// A resposta da API de feed pode incluir informações de paginação
interface FeedResponse {
  posts: Post[];
  nextCursor?: string; // Um cursor para carregar a próxima página
}

// Tipo para o retorno do hook
interface UseFeedReturn {
  posts: Post[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  fetchFeed: () => Promise<void>;
  fetchMorePosts: () => Promise<void>;
}

/**
 * 🎣 useFeed (Hook para o Feed Principal)
 *
 * Gerencia a busca, a exibição e a paginação do feed principal de posts.
 *
 * @returns Estado do feed e funções para carregar e paginar os posts.
 */
export const useFeed = (): UseFeedReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  
  // Hook de API para a carga inicial
  const { data: initialData, error: initialError, isLoading: isInitialLoading, execute: executeInitial } = useApi<FeedResponse>();
  
  // Hook de API para a paginação ("carregar mais")
  const { data: moreData, error: moreError, isLoading: isMoreLoading, execute: executeMore } = useApi<FeedResponse>();

  const fetchFeed = useCallback(async () => {
    await executeInitial('/api/feed');
  }, [executeInitial]);

  const fetchMorePosts = useCallback(async () => {
    if (!nextCursor || isMoreLoading) return;
    setIsLoadingMore(true);
    await executeMore(`/api/feed?cursor=${nextCursor}`);
    setIsLoadingMore(false);
  }, [nextCursor, isMoreLoading, executeMore]);

  // Efeito para a carga inicial
  useEffect(() => {
    if (initialData) {
      setPosts(initialData.posts);
      setNextCursor(initialData.nextCursor || null);
    }
  }, [initialData]);

  // Efeito para adicionar os posts da paginação
  useEffect(() => {
    if (moreData) {
      setPosts(prevPosts => [...prevPosts, ...moreData.posts]);
      setNextCursor(moreData.nextCursor || null);
    }
  }, [moreData]);

  // Efeito para buscar o feed ao montar o componente
  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return {
    posts,
    isLoading: isInitialLoading,
    isLoadingMore,
    error: initialError || moreError,
    hasMore: !!nextCursor,
    fetchFeed, // Para permitir "puxar para atualizar"
    fetchMorePosts,
  };
};
