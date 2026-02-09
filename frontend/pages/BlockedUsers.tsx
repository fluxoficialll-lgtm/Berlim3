// Este arquivo define a página onde os usuários podem ver e gerenciar a lista de usuários que eles bloquearam.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa o serviço de chat para gerenciar bloqueios e os tipos de dados.
import { chatService } from '../services/chatService';
import { ChatData } from '../types';

/**
 * Componente: BlockedUsers
 * Propósito: Exibe uma lista de todos os usuários bloqueados pelo usuário atual.
 * Permite que o usuário desbloqueie contatos diretamente desta lista.
 */
export const BlockedUsers: React.FC = () => {
  const navigate = useNavigate();
  // Estado para armazenar a lista de chats/usuários bloqueados.
  const [blockedChats, setBlockedChats] = useState<ChatData[]>([]);

  // Efeito para carregar a lista de usuários bloqueados ao montar o componente.
  useEffect(() => {
    loadBlockedUsers();
  }, []);

  // Função para buscar todos os chats, filtrar pelos que estão bloqueados e atualizar o estado.
  const loadBlockedUsers = () => {
    const allChatsMap = chatService.getAllChats();
    const allChats = Object.values(allChatsMap);
    const blocked = allChats.filter(chat => chat.isBlocked);
    setBlockedChats(blocked);
  };

  // Função para lidar com o desbloqueio de um usuário.
  const handleUnblock = (chatId: string | number) => {
    if (window.confirm("Deseja realmente desbloquear este usuário?")) {
      chatService.toggleBlock(chatId.toString());
      // Atualiza o estado local para remover o usuário da lista sem recarregar a página.
      setBlockedChats(prev => prev.filter(chat => chat.id.toString() !== chatId.toString()));
    }
  };

  // Função para navegar de volta para a página anterior ou para as configurações.
  const handleBack = () => {
      if (window.history.state && window.history.state.idx > 0) {
          navigate(-1);
      } else {
          navigate('/settings');
      }
  };

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
      {/* Estilos CSS embutidos para este componente. */}
      <style>{`
        /* ... Estilos omitidos para brevidade ... */
      `}</style>

      <header>
        <button onClick={handleBack} aria-label="Voltar">
            <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Usuários Bloqueados</h1>
      </header>

      <main>
        {/* Renderiza a lista de usuários bloqueados ou um estado de vazio. */}
        {blockedChats.length > 0 ? (
            blockedChats.map(chat => (
                <div key={chat.id} className="blocked-user-item">
                    <div className="user-info">
                        <div className="user-avatar">
                            {chat.contactName.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-name">{chat.contactName}</div>
                    </div>
                    <button 
                        className="unblock-btn"
                        onClick={() => handleUnblock(chat.id)}
                    >
                        Desbloquear
                    </button>
                </div>
            ))
        ) : (
            <div className="empty-state">
                <i className="fa-solid fa-user-shield"></i>
                <p>Você não tem nenhum usuário bloqueado.</p>
            </div>
        )}
      </main>
    </div>
  );
};