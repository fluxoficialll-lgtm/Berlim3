
import React from 'react';
import { useMessageList } from '../../hooks/useMessageList'; // ✅ ARQUITETURA NOVA

// Componentes de UI
import { MainHeader } from '../components/layout/MainHeader';
import { MessageListItem } from '../components/chat/MessageListItem';
import { MessagesEmptyState } from '../components/chat/MessagesEmptyState';
import { MessagesFooter } from '../components/chat/MessagesFooter';
import { Spinner } from '../components/ui/Spinner';

/**
 * ✅ ARQUITETURA NOVA: Página de Lista de Mensagens refatorada.
 * A lógica foi movida para o hook `useMessageList`.
 */
export const Messages: React.FC = () => {
  const {
    contacts,
    isLoading,
    error,
    isSelectionMode,
    selectedIds,
    startSelection,
    handleContactClick,
    exitSelectionMode,
    deleteSelected,
  } = useMessageList();

  const renderContent = () => {
    if (isLoading) {
        return <div className="flex justify-center p-8"><Spinner /></div>;
    }
    if (error) {
        return <div className="text-center text-red-500 p-8">{error}</div>;
    }
    if (contacts.length === 0) {
        return <MessagesEmptyState />;
    }
    return contacts.map(contact => (
        <MessageListItem 
          key={contact.id}
          contact={contact}
          isSelected={selectedIds.includes(contact.id)}
          onLongPress={() => startSelection(contact.id)}
          onClick={() => handleContactClick(contact)}
        />
    ));
  };

  return (
    <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white flex flex-col">
        <MainHeader 
            title="Mensagens"
            isSelectionMode={isSelectionMode} 
            selectionCount={selectedIds.length} 
            onExitSelectionMode={exitSelectionMode} 
        />

        <main className="flex-grow overflow-y-auto">
            <div className="w-full">
                {renderContent()}
            </div>
        </main>

        <MessagesFooter 
            isSelectionMode={isSelectionMode}
            onDelete={deleteSelected}
            selectedCount={selectedIds.length}
        />
    </div>
  );
};
