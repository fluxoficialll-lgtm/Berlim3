import React from 'react';
import { useChat } from '../hooks/useChat';
import { Virtuoso } from 'react-virtuoso';
import { ChatHeader } from '../components/chat/ChatHeader';
import { ChatInput } from '../components/chat/ChatInput';
import { MessageItem } from '../components/chat/MessageItem';
import { ChatMenuModal } from '../components/chat/ChatMenuModal';

export const Chat: React.FC = () => {
  const {
    navigate,
    chatId,
    messages,
    contactName,
    contactHandle,
    contactAvatar,
    contactStatus,
    isBlocked,
    virtuosoRef,
    isSelectionMode,
    setIsSelectionMode,
    selectedIds,
    setSelectedIds,
    isSearchOpen,
    setIsSearchOpen,
    searchTerm,
    setSearchTerm,
    playingAudioId,
    zoomedMedia,
    setZoomedMedia,
    isMenuModalOpen,
    setIsMenuModalOpen,
    currentUserEmail,
    handleSendMessage,
    handleToggleSelection,
    handleStartSelection,
    handleDeleteSelected,
    filteredMessages,
  } = useChat();

  return (
    <div className="messages-page h-[100dvh] flex flex-col overflow-hidden" style={{ background: 'radial-gradient(circle at top left, #0c0f14, #0a0c10)', color: '#fff' }}>
      <ChatHeader
        title={contactName}
        subtitle={isBlocked ? 'Bloqueado' : contactStatus}
        avatar={contactAvatar}
        onBack={() => navigate('/messages')}
        onInfoClick={() => contactHandle && navigate(`/user/${contactHandle}`)}
        isSelectionMode={isSelectionMode}
        selectedCount={selectedIds.length}
        onCancelSelection={() => { setIsSelectionMode(false); setSelectedIds([]); }}
        onDeleteSelection={handleDeleteSelected}
        isSearchOpen={isSearchOpen}
        onToggleSearch={() => { setIsSearchOpen(!isSearchOpen); setSearchTerm(''); }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onMenuClick={() => setIsMenuModalOpen(true)}
      />

      <main style={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', paddingTop: '60px' }}>
            <Virtuoso
                ref={virtuosoRef}
                style={{ height: '100%', paddingBottom: '80px' }}
                data={filteredMessages}
                initialTopMostItemIndex={filteredMessages.length - 1}
                followOutput="smooth"
                itemContent={(index, msg) => (
                    <MessageItem
                        key={msg.id}
                        msg={msg}
                        isMe={msg.senderEmail?.toLowerCase() === currentUserEmail}
                        isSelectionMode={isSelectionMode}
                        isSelected={selectedIds.includes(msg.id)}
                        onSelect={handleToggleSelection}
                        onStartSelection={handleStartSelection}
                        onMediaClick={(url, type) => setZoomedMedia({ url, type })}
                        onProductClick={(pid) => navigate(`/marketplace/product/${pid}`)}
                        playingAudioId={playingAudioId}
                        onPlayAudio={() => {}}
                    />
                )}
            />
      </main>

      {!isSelectionMode && (
        <ChatInput
            onSendMessage={handleSendMessage}
            onSendAudio={() => {}}
            onFileSelect={() => {}}
            isBlocked={isBlocked}
            isUploading={false} // This should be handled by the hook
        />
      )}

      <ChatMenuModal 
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        isBlocked={isBlocked}
        onSearch={() => setIsSearchOpen(true)}
        onSelect={() => setIsSelectionMode(true)}
        onBlock={() => {}}
        onClear={() => {}}
      />

      {zoomedMedia && (
          <div className="fixed inset-0 z-[60] bg-black bg-opacity-95 flex items-center justify-center p-2" onClick={() => setZoomedMedia(null)}>
              <img src={zoomedMedia.url} className="max-w-full max-h-full object-contain" />
          </div>
      )}
    </div>
  );
};
