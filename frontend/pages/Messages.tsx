// Este arquivo define a página principal de Mensagens (lista de chats).

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { chatService } from '../services/chatService';
import { notificationService } from '../services/notificationService';

// Importação de componentes da UI com caminhos corrigidos.
import { MessagesMenuModal } from './components/chat/MessagesMenuModal';
import { MainHeader } from './components/layout/MainHeader';
import { MessageListItem } from './components/chat/MessageListItem';
import { MessagesEmptyState } from './components/chat/MessagesEmptyState';
import { MessagesFooter } from './components/chat/MessagesFooter';
import { Contact } from '../types';

/**
 * Componente: Messages
 * Propósito: Renderiza a lista de conversas do usuário. Busca os chats através do `chatService`,
 * os formata e os exibe em uma lista. Permite entrar em uma conversa, selecionar múltiplos chats
 * para exclusão e acessar um menu de ações (ex: marcar tudo como lido).
 */
export const Messages: React.FC = () => {
  const navigate = useNavigate();
  // Estado para armazenar os contatos (chats formatados).
  const [contacts, setContacts] = useState<Contact[]>([]);
  // Estado para controlar a visibilidade do modal de menu.
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  // Estado para ativar/desativar o modo de seleção de mensagens.
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  // Estado para armazenar os IDs das mensagens selecionadas.
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Função para carregar e formatar os chats do usuário.
  const loadChats = useCallback(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return;
    const rawChats = chatService.getAllChats();
    // Formata os dados brutos dos chats para o formato esperado pela UI.
    const formattedContacts: Contact[] = rawChats.map(chat => {
        const otherParticipant = chat.participants.find(p => p.id !== currentUser.uid);
        return {
            id: chat.id,
            name: otherParticipant?.name || 'Unknown User',
            lastMessage: chat.messages[chat.messages.length - 1]?.content || '',
            lastMessageTime: chat.messages[chat.messages.length - 1]?.timestamp || '',
            avatar: otherParticipant?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg',
            unreadCount: chat.unreadCount || 0,
        };
    });
    setContacts(formattedContacts);
  }, []);

  // Efeito para carregar os chats ao montar o componente.
  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // Alterna a seleção de um item no modo de seleção.
  const handleToggleSelection = (contactId: string) => {
    setSelectedIds(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  // Manipulador para o clique em um contato: navega ou seleciona.
  const handleContactClick = (contact: Contact) => {
    if (isSelectionMode) {
      handleToggleSelection(contact.id);
    } else {
      navigate(`/chat/${contact.id}`);
    }
  };

  // Ativa o modo de seleção após um clique longo.
  const handleLongPress = (contactId: string) => {
    if (!isSelectionMode) {
        setIsSelectionMode(true);
        handleToggleSelection(contactId);
    }
  };

  // Sai do modo de seleção e limpa os itens selecionados.
  const handleExitSelectionMode = () => {
      setIsSelectionMode(false);
      setSelectedIds([]);
  };

  // Deleta os chats selecionados.
  const handleDeleteSelected = () => {
      chatService.deleteChats(selectedIds);
      loadChats();
      handleExitSelectionMode();
      notificationService.showSuccess('Chats deletados com sucesso!');
  };

  // Marca todas as mensagens como lidas.
  const handleMarkAllAsRead = () => {
      console.log("Marking all chats as read");
      setIsMenuModalOpen(false);
      notificationService.showSuccess('Todas as mensagens foram marcadas como lidas!');
  };

  return (
    <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white flex flex-col">
        {/* Cabeçalho principal com título e ações dependendo do modo de seleção. */}
        <MainHeader title="Mensagens" onMenuClick={() => setIsMenuModalOpen(true)} isSelectionMode={isSelectionMode} selectionCount={selectedIds.length} onExitSelectionMode={handleExitSelectionMode} />

        <main className="flex-grow overflow-y-auto">
            <div className="w-full">
                {/* Renderiza a lista de contatos ou um estado de vazio. */}
                {contacts.length > 0 ? contacts.map(contact => (
                    <MessageListItem 
                      key={contact.id}
                      contact={contact}
                      isSelected={selectedIds.includes(contact.id)}
                      onLongPress={() => handleLongPress(contact.id)}
                      onClick={() => handleContactClick(contact)}
                    />
                )) : (
                    <MessagesEmptyState />
                )}
            </div>
        </main>

        {/* Rodapé com ações para o modo de seleção. */}
        <MessagesFooter 
            isSelectionMode={isSelectionMode}
            onDelete={handleDeleteSelected}
            selectedCount={selectedIds.length}
        />

        {/* Modal de menu com ações adicionais. */}
        <MessagesMenuModal 
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
            onMarkAllRead={handleMarkAllAsRead}
        />
    </div>
  );
};
