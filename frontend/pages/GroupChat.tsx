
// React e hooks essenciais para o funcionamento do componente.
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// Hooks do React Router para navegação e acesso a parâmetros da URL.
import { useNavigate, useParams } from 'react-router-dom';

// Serviços que abstraem a lógica de negócio e comunicação com APIs (mocks).
import { groupService } from '../services/groupService';
import { chatService } from '../services/chatService'; 
import { authService } from '../services/authService';

// Tipos de dados para garantir a consistência.
import { Group, ChatMessage } from '../types';

// Hook para o sistema de modais e fluxo de validação de acesso (caminhos corrigidos).
import { useModal } from './components/ModalSystem';
import { useAccessValidationFlow } from '../flows/groups/AccessValidationFlow';

// Componentes de UI para a tela de chat (caminhos corrigidos).
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'; // Lista virtualizada para performance.
import { ChatHeader } from './components/chat/ChatHeader';
import { ChatInput } from './components/chat/ChatInput';
import { MessageItem } from './components/chat/MessageItem';
import { GroupMenuModal } from './components/groups/menu/GroupMenuModal';

/**
 * Componente principal da tela de Chat de Grupo.
 * Gerencia o estado das mensagens, informações do grupo e interações do usuário.
 */
export const GroupChat: React.FC = () => {
  const navigate = useNavigate();
  const { id, channelId } = useParams<{ id: string, channelId?: string }>();
  const { showOptions } = useModal(); 
  const { validateGroupAccess } = useAccessValidationFlow();
  
  // Estados do componente
  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isCreator, setIsCreator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedMsgIds, setSelectedMsgIds] = useState<number[]>([]);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const virtuosoRef = useRef<VirtuosoHandle>(null); // Ref para controlar a lista virtual.
  const currentUserEmail = authService.getCurrentUserEmail()?.toLowerCase();
  const currentUserId = authService.getCurrentUserId();

  // ID único para o chat atual, baseado no grupo e no canal.
  const currentChatId = useMemo(() => `${id}_${channelId || 'general'}`, [id, channelId]);

  // Função para carregar as mensagens do chat a partir do serviço.
  const loadMessages = useCallback(() => { 
    if (currentChatId) {
        const chatData = chatService.getChat(currentChatId);
        // Filtra mensagens que o usuário excluiu para si mesmo.
        const visibleMessages = (chatData.messages || []).filter(m => 
            !(m.deletedBy || []).includes(currentUserEmail || '')
        );
        setMessages(visibleMessages.sort((a, b) => a.id - b.id)); 
    }
  }, [currentChatId, currentUserEmail]);

  // Efeito principal: valida o acesso e carrega os dados iniciais do grupo e do chat.
  useEffect(() => {
      if (id) {
          const hasAccess = validateGroupAccess(id);
          if (!hasAccess) return; // Se não tiver acesso, o flow de validação já redirecionou.

          const loadedGroup = groupService.getGroupById(id);
          if (loadedGroup) {
              setGroup(loadedGroup);
              const isOwner = loadedGroup.creatorId === currentUserId;
              const isAdm = isOwner || (currentUserId && loadedGroup.adminIds?.includes(currentUserId));
              setIsCreator(isOwner);
              setIsAdmin(!!isAdm);
              
              loadMessages(); // Carrega as mensagens iniciais.
              chatService.markChatAsRead(currentChatId); // Marca o chat como lido.
          }
      }
  }, [id, channelId, currentChatId, loadMessages, validateGroupAccess, currentUserId]);

  // ARQUITETURA: Real-time via `db.subscribe` foi REMOVIDO.
  // O `useEffect` abaixo foi removido pois tentava acessar o banco de dados do backend
  // diretamente do cliente, o que é uma violação de arquitetura e quebra o build.
  // A implementação correta de real-time exigiria uma API com WebSockets.
  /*
  useEffect(() => {
      const unsub = db.subscribe('chats', loadMessages);
      return () => unsub();
  }, [loadMessages]);
  */

  // Manipula o envio de uma nova mensagem.
  const handleSendMessage = (text: string) => {
      const userInfo = authService.getCurrentUser();
      const newMessage: ChatMessage = {
          id: Date.now(),
          senderName: userInfo?.profile?.nickname || userInfo?.profile?.name || 'Você',
          senderAvatar: userInfo?.profile?.photoUrl,
          senderEmail: userInfo?.email,
          text, type: 'sent', contentType: 'text',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent',
          deletedBy: []
      };
      chatService.sendMessage(currentChatId, newMessage);
      loadMessages(); // Recarrega as mensagens após enviar (simulando atualização).
  };

  // Inicia o modo de seleção de mensagens.
  const handleStartSelection = (msgId: number) => {
      setIsSelectionMode(true);
      setSelectedMsgIds([msgId]);
      if (navigator.vibrate) navigator.vibrate(10); // Feedback tátil.
  };

  // Alterna a seleção de uma mensagem.
  const handleToggleSelection = (msgId: number) => {
      setSelectedMsgIds(prev => {
          const next = prev.includes(msgId) ? prev.filter(id => id !== msgId) : [...prev, msgId];
          if (next.length === 0) setIsSelectionMode(false); // Desativa o modo de seleção se nada estiver selecionado.
          return next;
      });
  };

  // Exclui as mensagens selecionadas.
  const handleDeleteSelected = async () => {
    if (selectedMsgIds.length === 0) return;
    
    // Mostra um modal de opções para o tipo de exclusão.
    const target = await showOptions("Excluir Mensagem", [
        { label: 'Excluir para mim', value: 'me', icon: 'fa-solid fa-user' },
        { label: 'Excluir para todos', value: 'all', icon: 'fa-solid fa-users', isDestructive: true }
    ]);

    if (target) {
        await chatService.deleteMessages(currentChatId, selectedMsgIds, target);
        setIsSelectionMode(false);
        setSelectedMsgIds([]);
        loadMessages(); // Recarrega as mensagens para refletir a exclusão.
    }
  };

  // Nome do canal ativo para exibição no header.
  const activeChannelName = useMemo(() => {
      if (!channelId || channelId === 'general') return 'Geral';
      return group?.channels?.find(c => c.id === channelId)?.name || 'Tópico';
  }, [group, channelId]);

  return (
    <div className={`h-[100dvh] flex flex-col overflow-hidden`} style={{ background: 'radial-gradient(circle at top left, #0c0f14, #0a0c10)', color: '#fff' }}>
      <ChatHeader
        title={group?.name || 'Carregando...'}
        subtitle={`#${activeChannelName}`}
        avatar={group?.coverImage}
        onBack={() => navigate('/groups')}
        isSelectionMode={isSelectionMode}
        selectedCount={selectedMsgIds.length}
        onCancelSelection={() => { setIsSelectionMode(false); setSelectedMsgIds([]); }}
        onDeleteSelection={handleDeleteSelected}
        onMenuClick={() => setIsMenuModalOpen(true)}
      />

      <main style={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', paddingTop: '60px' }}>
          <Virtuoso
              ref={virtuosoRef}
              style={{ flex: 1, paddingBottom: '80px' }}
              data={messages}
              initialTopMostItemIndex={messages.length - 1}
              followOutput="smooth"
              itemContent={(index, msg) => (
                  <MessageItem
                    key={msg.id}
                    msg={msg}
                    isMe={msg.senderEmail?.toLowerCase() === currentUserEmail}
                    isSelectionMode={isSelectionMode}
                    isSelected={selectedMsgIds.includes(msg.id)}
                    onSelect={handleToggleSelection}
                    onStartSelection={handleStartSelection}
                    onMediaClick={() => {}}
                    playingAudioId={null}
                    onPlayAudio={() => {}}
                  />
              )}
          />
      </main>

      {!isSelectionMode && (
          <ChatInput
            onSendMessage={handleSendMessage}
            onSendAudio={() => {}} // Funcionalidade a ser implementada.
            onFileSelect={() => {}} // Funcionalidade a ser implementada.
            canPost={true}
            placeholder={`Conversar em #${activeChannelName}...`}
          />
      )}

      <GroupMenuModal 
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        isCreator={isCreator}
        isAdmin={isAdmin}
        onSearch={() => {}} // Funcionalidade a ser implementada.
        onClear={() => {}} // Funcionalidade a ser implementada.
        onSettings={() => navigate(`/group-settings/${id}`)}
        onDelete={() => {}} // Funcionalidade a ser implementada.
        onLeave={() => {}} // Funcionalidade a ser implementada.
      />
    </div>
  );
};
