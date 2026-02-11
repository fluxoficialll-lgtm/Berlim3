
// frontend/hooks/useConversations.ts
import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para uma conversa resumida
interface ConversationSummary {
  id: string;
  lastMessage: {
    content: string;
    timestamp: string;
  };
  otherUser: {
    id: string;
    name: string;
    avatar: string;
  };
  unreadCount: number;
}

// Tipo para o retorno do hook
interface UseConversationsReturn {
  conversations: ConversationSummary[];
  isLoading: boolean;
  error: string | null;
  fetchConversations: () => Promise<void>;
}

/**
 * 🎣 useConversations (Hook para Lista de Conversas)
 *
 * Gerencia a busca e a exibição da lista de conversas do usuário.
 *
 * @returns Estado da lista de conversas e a função para buscá-la.
 */
export const useConversations = (): UseConversationsReturn => {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const { data, error, isLoading, execute } = useApi<ConversationSummary[]>();

  const fetchConversations = useCallback(async () => {
    await execute('/api/conversations');
    if (data) {
      setConversations(data);
    }
  }, [execute, data]);

  // Efeito para buscar as conversas ao inicializar o hook
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return { conversations, isLoading, error, fetchConversations };
};
