// Este arquivo define a página principal de Mensagens (lista de chats).

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { chatService } from '../services/chatService';
import { notificationService } from '../services/notificationService';
// TODO: Refatorar. Acesso direto ao DB para reatividade. Idealmente, o serviço deveria gerenciar isso.
// import { db } from '@/database'; 

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
 * Nota de Refatoração: Este componente possui uma forte dependência direta do banco de dados (`db.subscribe`)
 * para reatividade. Essa lógica deve ser movida para o `chatService` para desacoplar a UI da camada de dados
 * e simplificar o componente.
 */
export const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Função para carregar e formatar os chats do usuário.
  const loadChats = useCallback(() => {
    const rawChats = chatService.getAllChats();
    // ... (Lógica complexa de formatação dos dados do chat, que deveria estar no serviço)
    const formattedContacts = []; // Resultado da formatação.
    setContacts(formattedContacts);
  }, []);

  // Efeito para carregar chats e se inscrever para atualizações.
  useEffect(() => {
    loadChats();
    // TODO: Remover subscrição direta ao DB.
    // const unsubscribe = db.subscribe('chats', loadChats);
    // return () => unsubscribe();
  }, [loadChats]);

  // Manipulador para navegar para um chat específico ou selecionar um item.
  const handleContactClick = (contact: Contact) => {
    if (isSelectionMode) {
        // ... (lógica de seleção)
    } else {
        navigate(`/chat/${contact.id}`);
    }
  };

  return (
    <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
        <MainHeader /* ... configuração do cabeçalho ... */ />

        <main className="flex-grow ...">
            {isSelectionMode && (/* Barra de contagem de seleção */)}
            
            <div className="w-full">
                {contacts.length > 0 ? contacts.map(contact => (
                    <MessageListItem 
                      key={contact.id}
                      contact={contact}
                      /* ... props ... */
                      onClick={() => handleContactClick(contact)}
                    />
                )) : (
                    <MessagesEmptyState />
                )}
            </div>
        </main>

        <MessagesFooter /* ... props ... */ />

        <MessagesMenuModal 
            isOpen={isMenuModalOpen}
            onClose={() => setIsMenuModalOpen(false)}
            /* ... outras ações do menu ... */
        />
    </div>
  );
};