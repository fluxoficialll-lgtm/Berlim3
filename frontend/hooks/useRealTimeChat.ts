
// frontend/hooks/useRealTimeChat.ts
import { useState, useEffect, useCallback, useRef } from 'react';

// Supondo a mesma interface de mensagem do useChat
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
interface UseRealTimeChatReturn {
  messages: ChatMessage[];
  isConnected: boolean;
  error: string | null;
  sendMessage: (content: string) => void;
}

/**
 * 🎣 useRealTimeChat (Hook para Chat em Tempo Real com WebSockets)
 *
 * Gerencia uma conexão WebSocket para uma conversa específica, permitindo
 * comunicação em tempo real.
 *
 * @param conversationId O ID da conversa para se conectar.
 * @returns O estado da conexão, as mensagens e a função para enviar novas mensagens.
 */
export const useRealTimeChat = (conversationId: string): UseRealTimeChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const webSocketRef = useRef<WebSocket | null>(null);

  // Efeito para estabelecer e gerenciar a conexão WebSocket
  useEffect(() => {
    if (!conversationId) {
      return;
    }

    // Define a URL do WebSocket (substitua pela sua URL de produção)
    const wsUrl = `wss://your-websocket-api.com/chat/${conversationId}`;

    webSocketRef.current = new WebSocket(wsUrl);
    const ws = webSocketRef.current;

    ws.onopen = () => {
      console.log('WebSocket conectado!');
      setIsConnected(true);
      setError(null);
      // Opcional: pode ser necessário buscar o histórico de mensagens via API REST ao conectar
    };

    ws.onmessage = (event) => {
      try {
        const newMessage = JSON.parse(event.data) as ChatMessage;
        setMessages(prevMessages => [...prevMessages, newMessage]);
      } catch (e) {
        console.error('Erro ao parsear mensagem do WebSocket:', e);
      }
    };

    ws.onerror = (event) => {
      console.error('Erro no WebSocket:', event);
      setError('Ocorreu um erro na conexão em tempo real.');
      setIsConnected(false);
    };

    ws.onclose = () => {
      console.log('WebSocket desconectado.');
      setIsConnected(false);
      // Opcional: Lógica de reconexão pode ser implementada aqui
    };

    // Limpa a conexão ao desmontar o componente
    return () => {
      ws.close();
    };
  }, [conversationId]);

  const sendMessage = useCallback((content: string) => {
    if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
      const messagePayload = {
        conversationId,
        content,
        // O backend deve preencher o resto (author, timestamp, etc.)
      };
      webSocketRef.current.send(JSON.stringify(messagePayload));
    } else {
      console.warn('WebSocket não está conectado. Mensagem não enviada.');
    }
  }, [conversationId]);

  return { messages, isConnected, error, sendMessage };
};
