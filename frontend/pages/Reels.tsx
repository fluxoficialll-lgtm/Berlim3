// Este arquivo define a página do feed de Reels (vídeos curtos).

import React, { useState } from 'react';
// O hook useReels gerencia a lógica complexa de carregamento e interação dos vídeos.
import { useReels } from './hooks/useReels';

// Importação de componentes da UI com caminhos corrigidos.
import { ReelItem } from './features/reels/components/ReelItem';
import { ReelComments } from './features/reels/components/ReelComments';
import ReelsErrorBoundary from './features/reels/components/ReelsErrorBoundary';
import { Post } from './types';
import { authService } from './services/authService';

/**
 * Componente: Reels
 * Propósito: Renderiza um feed de vídeos curtos em tela cheia, com rolagem vertical, similar
 * ao TikTok ou Instagram Reels. A lógica de busca dos vídeos, gerenciamento de qual "Reel"
 * está ativo na tela, interações (like, share), e o "infinite scroll" são abstraídos pelo
 * hook `useReels`. Cada vídeo é renderizado por um componente `ReelItem`. A página também
 * inclui um modal de comentários (`ReelComments`) que é aberto quando o usuário clica para
 * comentar em um vídeo específico.
 */
export const Reels: React.FC = () => {
  // O hook `useReels` fornece todos os dados e callbacks necessários.
  const {
    navigate,
    containerRef,
    reels,
    activeReelIndex,
    // ... outros estados e handlers do hook
  } = useReels();
  
  const [activeReel, setActiveReel] = useState<Post | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  // Abre o modal de comentários para o reel selecionado.
  const handleCommentClick = (reelId: string) => {
      const reel = reels.find(r => r.id === reelId);
      if (reel) {
          setActiveReel(reel);
          setIsCommentModalOpen(true);
      }
  }

  return (
    <ReelsErrorBoundary>
      <div className="reels-page">
        <div className="view-buttons-container">
            <button className="view-btn" onClick={() => navigate('/feed')}>Feed</button>
            <button className="view-btn active">Reels</button>
        </div>

        {/* Container com scroll para os vídeos */}
        <div id="reelsContent" ref={containerRef}>
          {reels.map((reel, index) => (
            <div key={reel.id} className="reel-container-wrapper">
                <ReelItem 
                    reel={reel}
                    isActive={index === activeReelIndex} // Controla a reprodução do vídeo
                    onComment={() => handleCommentClick(reel.id)}
                    // ... outras props
                />
            </div>
          ))}
        </div>

        {/* Modal de comentários, aberto sob demanda */}
        <ReelComments
          reel={activeReel}
          isOpen={isCommentModalOpen}
          onClose={() => setIsCommentModalOpen(false)}
        />
      </div>
    </ReelsErrorBoundary>
  );
};