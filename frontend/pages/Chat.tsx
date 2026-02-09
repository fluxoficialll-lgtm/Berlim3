// Este arquivo define a interface principal para uma conversa de chat individual.

import React from 'react';
import { useChat } from '../hooks/useChat'; // Importação correta, pois `hooks` é irmão de `pages`.
import { Virtuoso } from 'react-virtuoso'; // Biblioteca para renderização de listas longas com alta performance.

// Componentes da UI de Chat (caminhos corrigidos).
import { ChatHeader } from './components/chat/ChatHeader';
import { ChatInput } from './components/chat/ChatInput';
import { MessageItem } from './components/chat/MessageItem';
import { ChatMenuModal } from './components/chat/ChatMenuModal';

/**
 * Componente: Chat
 * Propósito: Tela de conversa individual. Utiliza o hook `useChat` para gerenciar o estado e a lógica do chat,
 * como envio de mensagens, seleção, busca, etc. A lista de mensagens é renderizada com `react-virtuoso`
 * para garantir a performance, mesmo com milhares de mensagens.
 */
export const Chat: React.FC = () => {
  // O hook `useChat` centraliza toda a lógica de negócio da tela de chat.
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
    setPlayingAudioId,
    zoomedMedia,
    setZoomedMedia,
    isMenuModalOpen,
    setIsMenuModalOpen,
    currentUserEmail,
    handleSendMessage,
    handleToggleSelection,
    handleStartSelection,
    handleDeleteSelected,
    handleBlockUser,
    filteredMessages,
  } = useChat();

  return (
    <div className="messages-page h-[100dvh] flex flex-col overflow-hidden" style={{ background: 'radial-gradient(circle at top left, #0c0f14, #0a0c10)', color: '#fff' }}>
      {/* Cabeçalho do Chat: exibe informações de contato e controles de ação. */}
      <ChatHeader
        title={contactName}
        subtitle={isBlocked ? 'Bloqueado' : contactStatus}
        avatar={contactAvatar}
        onBack={() => navigate(-1)}
        onMenuClick={() => setIsMenuModalOpen(true)}
        isSelectionMode={isSelectionMode}
        selectionCount={selectedIds.length}
        onExitSelectionMode={() => { setIsSelectionMode(false); setSelectedIds([]); }}
        onDeleteSelected={handleDeleteSelected}
        isSearchOpen={isSearchOpen}
        onSearchChange={setSearchTerm}
        onCloseSearch={() => setIsSearchOpen(false)}
        searchTerm={searchTerm}
      />

      <main style={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', paddingTop: '60px' }}>
            {/* Lista de mensagens virtualizada para performance. */}
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
                        isSelected={selectedIds.includes(msg.id)}
                        onToggleSelection={handleToggleSelection}
                        onStartSelection={handleStartSelection}
                        onZoomMedia={setZoomedMedia}
                        playingAudioId={playingAudioId}
                        onPlayAudio={setPlayingAudioId}
                        searchTerm={searchTerm}
                    />
                )}
            />
      </main>

      {/* Campo de entrada de texto, visível apenas se não estiver em modo de seleção. */}
      {!isSelectionMode && (
        <ChatInput
            onSendMessage={handleSendMessage}
            isBlocked={isBlocked}
        />
      )}

      {/* Modal de menu com opções adicionais (pesquisar, bloquear, etc.). */}
      <ChatMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onSearchClick={() => {
            setIsMenuModalOpen(false);
            setIsSearchOpen(true);
        }}
        onBlockClick={() => {
            handleBlockUser();
            setIsMenuModalOpen(false);
        }}
        onClearChatClick={() => {
            // Placeholder for clear chat functionality
            console.log("Clear chat clicked");
            setIsMenuModalOpen(false);
        }}
        isBlocked={isBlocked}
      />

      {/* Overlay para visualização de mídia em tela cheia. */}
      {zoomedMedia && (
          <div className="fixed inset-0 z-[60] bg-black bg-opacity-95 flex items-center justify-center p-2" onClick={() => setZoomedMedia(null)}>
              <img src={zoomedMedia.url} className="max-w-full max-h-full object-contain" alt="Zoomed media"/>
          </div>
      )}
    </div>
  );
};
