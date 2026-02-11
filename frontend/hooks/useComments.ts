
// frontend/hooks/useComments.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo que a interface de um comentário seja esta
interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

// Tipo para o retorno do hook useComments
interface UseCommentsReturn {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  fetchComments: (postId: string) => Promise<void>;
  createComment: (postId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
}

/**
 * 🎣 useComments (Hook para Comentários)
 *
 * Gerencia a lógica de busca, criação e exclusão de comentários para um post.
 * Utiliza o `useApi` para abstrair as chamadas de API.
 *
 * @param postId O ID do post para o qual os comentários serão gerenciados.
 * @returns Um objeto com o estado dos comentários e as funções para interagir com eles.
 */
export const useComments = (postId: string): UseCommentsReturn => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { data, error, isLoading, execute } = useApi<Comment[] | Comment>();

  const fetchComments = useCallback(async (currentPostId: string) => {
    await execute(`/api/posts/${currentPostId}/comments`);
    if (data && Array.isArray(data)) {
      setComments(data);
    }
  }, [execute, data]);

  const createComment = useCallback(async (currentPostId: string, content: string) => {
    // A API de criação pode retornar o comentário recém-criado
    await execute(`/api/posts/${currentPostId}/comments`, {
      method: 'POST',
      body: { content },
    });
    // Adiciona o novo comentário à lista existente para uma UI mais reativa
    if (data && !Array.isArray(data)) {
        const newComment = data as Comment;
        setComments(prevComments => [...prevComments, newComment]);
    }
  }, [execute, data]);

  const deleteComment = useCallback(async (commentId: string) => {
    await execute(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
    // Remove o comentário da lista para atualizar a UI
    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
  }, [execute]);

  // Efeito para carregar os comentários quando o postId mudar
  useState(() => {
    if (postId) {
      fetchComments(postId);
    }
  });

  return {
    comments,
    isLoading,
    error,
    fetchComments,
    createComment,
    deleteComment,
  };
};
