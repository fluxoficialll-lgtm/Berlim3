
// frontend/hooks/useChat.ts
import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para uma mensagem de chat
interface ChatMessage {
  id: string;
  conversationId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
}

// Tipo para o retorno do hook
interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
}

/**
 * 🎣 useChat (Hook para Conversa Individual)
 *
 * Gerencia as mensagens dentro de uma conversa específica, incluindo a busca
 * de mensagens existentes e o envio de novas.
 *
 * @param conversationId O ID da conversa ativa.
 * @returns O estado da conversa e as funções para interagir com ela.
 */
export const useChat = (conversationId: string): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { data, error, isLoading, execute } = useApi<ChatMessage[] | ChatMessage>();

  const fetchMessages = useCallback(async (currentConversationId: string) => {
    await execute(`/api/conversations/${currentConversationId}/messages`);
    if (data && Array.isArray(data)) {
      setMessages(data);
    }
  }, [execute, data]);

  const sendMessage = useCallback(async (currentConversationId: string, content: string) => {
    // A API pode retornar a mensagem recém-criada
    await execute(`/api/conversations/${currentConversationId}/messages`, {
      method: 'POST',
      body: { content },
    });
    // Adiciona a nova mensagem à lista para uma UI reativa
    if (data && !Array.isArray(data)) {
      const newMessage = data as ChatMessage;
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }
  }, [execute, data]);

  // Efeito para buscar mensagens ao mudar a conversationId
  // E para simular real-time com polling (uma abordagem melhor seria WebSockets)
  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId);

      const intervalId = setInterval(() => {
        fetchMessages(conversationId);
      }, 5000); // Polling a cada 5 segundos

      // Limpa o intervalo quando o componente desmontar ou a conversationId mudar
      return () => clearInterval(intervalId);
    }
  }, [conversationId, fetchMessages]);

  return { messages, isLoading, error, fetchMessages, sendMessage };
};
