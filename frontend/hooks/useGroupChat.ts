
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, ChatMessage } from '@/types';
import { API_BASE } from '@/apiConfig';

// Supondo que você tenha um hook de autenticação
// import { useAuth } from './useAuth';

export const useGroupChat = (groupId: string, channelId?: string) => {
  const navigate = useNavigate();
  // const { user } = useAuth(); // Exemplo
  const currentUserId = 'user-1'; // Placeholder

  // Estado dos Dados
  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado da UI e Interação
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMessageIds, setSelectedMessageIds] = useState<string[]>([]);

  const chatIdentifier = useMemo(() => `${groupId}_${channelId || 'general'}`, [groupId, channelId]);

  /**
   * ✅ ARQUITETURA NOVA: Lógica de busca de dados centralizada.
   */
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Validar acesso e buscar dados do grupo em paralelo
      const groupResponse = await fetch(`${API_BASE}/api/groups/${groupId}`);
      if (!groupResponse.ok) throw new Error('Acesso negado ou grupo não encontrado.');
      const groupData: Group = await groupResponse.json();
      setGroup(groupData);

      // 2. Buscar mensagens do canal
      const messagesResponse = await fetch(`${API_BASE}/api/chats/${chatIdentifier}/messages`);
      if (!messagesResponse.ok) throw new Error('Não foi possível carregar as mensagens.');
      const messagesData: ChatMessage[] = await messagesResponse.json();
      setMessages(messagesData || []);

    } catch (err: any) {
      setError(err.message);
      // Poderia redirecionar aqui se o erro for de acesso negado
      // navigate('/groups');
    } finally {
      setIsLoading(false);
    }
  }, [groupId, channelId, chatIdentifier, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // =========================================================
  // Handlers (Ações)
  // =========================================================

  const sendMessage = async (text: string) => {
    // Lógica para enviar a mensagem via API
    const tempId = `temp_${Date.now()}`;
    const newMessage = { id: tempId, text, senderId: currentUserId, status: 'sending' };
    // @ts-ignore
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await fetch(`${API_BASE}/api/chats/${chatIdentifier}/messages`, {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const savedMessage = await response.json();
      setMessages(prev => prev.map(m => m.id === tempId ? savedMessage : m));
    } catch (err) {
      setMessages(prev => prev.map(m => m.id === tempId ? { ...m, status: 'failed' } : m));
    }
  };

  const deleteMessages = async (ids: string[], forEveryone: boolean) => {
    // Lógica para deletar mensagens via API
    setMessages(prev => prev.filter(m => !ids.includes(m.id)));
    setIsSelectionMode(false);
    setSelectedMessageIds([]);

    await fetch(`${API_BASE}/api/chats/${chatIdentifier}/messages`, {
        method: 'DELETE',
        body: JSON.stringify({ messageIds: ids, forEveryone }),
    });
  };

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessageIds(prev => {
        const newSelection = prev.includes(messageId) 
            ? prev.filter(id => id !== messageId)
            : [...prev, messageId];
        if (newSelection.length === 0) setIsSelectionMode(false);
        else setIsSelectionMode(true);
        return newSelection;
    });
  };

  const cancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedMessageIds([]);
  };

  return {
    group,
    messages,
    isLoading,
    error,
    isCreator: group?.creatorId === currentUserId,
    isAdmin: group?.adminIds?.includes(currentUserId || ''),
    isSelectionMode,
    selectedMessageIds,
    sendMessage,
    deleteMessages,
    toggleMessageSelection,
    cancelSelection,
  };
};
