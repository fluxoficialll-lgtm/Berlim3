
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGroupChat } from '../../hooks/useGroupChat'; // ✅ ARQUITETURA NOVA
import { useModal } from '../components/ModalSystem';

// Componentes de UI
import { Virtuoso } from 'react-virtuoso';
import { ChatHeader } from '../components/chat/ChatHeader';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageItem } from '../components/chat/MessageItem';
import { Spinner } from '../components/ui/Spinner';
import { GroupMenuModal } from '../components/groups/menu/GroupMenuModal';

/**
 * ✅ ARQUITETURA NOVA: Página de Chat de Grupo refatorada.
 * Toda a lógica foi movida para o hook `useGroupChat`.
 */
export const GroupChat: React.FC = () => {
  const navigate = useNavigate();
  const { id, channelId } = useParams<{ id: string; channelId?: string }>();
  const { showOptions } = useModal();

  const {
    group,
    messages,
    isLoading,
    error,
    isCreator,
    isAdmin,
    isSelectionMode,
    selectedMessageIds,
    sendMessage,
    deleteMessages,
    toggleMessageSelection,
    cancelSelection,
  } = useGroupChat(id!, channelId);

  const [isMenuModalOpen, setIsMenuModalOpen] = React.useState(false);

  const handleDelete = async () => {
    const target = await showOptions("Excluir Mensagem", [
      { label: 'Excluir para mim', value: 'me' },
      { label: 'Excluir para todos', value: 'all', isDestructive: true }
    ]);
    if (target) {
      deleteMessages(selectedMessageIds, target === 'all');
    }
  };

  if (isLoading && !group) {
    return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className={`h-[100dvh] flex flex-col overflow-hidden bg-gray-900 text-white`}>
      <ChatHeader
        title={group?.name || ''}
        subtitle={`#${channelId || 'Geral'}`}
        avatar={group?.coverImage}
        onBack={() => navigate('/groups')}
        isSelectionMode={isSelectionMode}
        selectedCount={selectedMessageIds.length}
        onCancelSelection={cancelSelection}
        onDeleteSelection={handleDelete}
        onMenuClick={() => setIsMenuModalOpen(true)}
      />

      <main className="flex-grow pt-[60px]">
          <Virtuoso
              className="no-scrollbar"
              data={messages}
              initialTopMostItemIndex={messages.length - 1}
              followOutput="smooth"
              itemContent={(index, msg) => (
                  <MessageItem
                    key={msg.id}
                    msg={msg}
                    // isMe={msg.senderId === currentUserId} // Lógica viria do hook de auth
                    isSelectionMode={isSelectionMode}
                    isSelected={selectedMessageIds.includes(msg.id)}
                    onSelect={() => toggleMessageSelection(msg.id)}
                    onStartSelection={() => toggleMessageSelection(msg.id)} // Simplificado
                  />
              )}
          />
      </main>

      {!isSelectionMode && (
          <ChatInput onSendMessage={sendMessage} placeholder={`Conversar...`} />
      )}

      <GroupMenuModal 
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        isCreator={isCreator}
        isAdmin={isAdmin}
        onSettings={() => navigate(`/group-settings/${id}`)}
        // ... outras props
      />
    </div>
  );
};
