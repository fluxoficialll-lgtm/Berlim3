// frontend/pages/Reels.tsx

import React from 'react';
import { useReels } from '../hooks/useReels';
import { ReelItem } from '../components/post/ReelItem';
import { ReelComments } from '../components/post/ReelComments';
import ReelsErrorBoundary from '../components/post/ReelsErrorBoundary';
import { Spinner } from '../components/ui/Spinner'; // Assumindo que temos um spinner

/**
 * Componente: Reels
 * Propósito: Renderiza a página do feed de Reels.
 */
export const Reels: React.FC = () => {
  const {
    loading,
    reels,
    activeReelIndex,
    activeReel,
    isCommentModalOpen,
    containerRef,
    navigate,
    handleCommentClick,
    closeCommentModal,
  } = useReels();

  if (loading) {
    return <Spinner />;
  }

  return (
    <ReelsErrorBoundary>
      <div className="reels-page h-screen bg-black snap-y snap-mandatory overflow-y-scroll">
        {/* Botões de navegação no topo */}
        <div className="absolute top-0 left-0 right-0 flex justify-center p-4 z-20 bg-gradient-to-b from-black to-transparent">
            <button className="px-4 py-2 text-white font-semibold rounded-lg" onClick={() => navigate('/feed')}>Feed</button>
            <button className="px-4 py-2 text-white font-bold rounded-lg bg-gray-700">Reels</button>
        </div>

        {/* Container para os vídeos */}
        <div ref={containerRef} className="w-full h-full">
          {reels.map((reel, index) => (
            <div key={reel.id} className="snap-start w-full h-screen flex justify-center items-center relative">
                <ReelItem 
                    reel={reel}
                    isActive={index === activeReelIndex}
                    onComment={() => handleCommentClick(reel.id)}
                />
            </div>
          ))}
        </div>

        {/* Modal de comentários */}
        <ReelComments
          reel={activeReel}
          isOpen={isCommentModalOpen}
          onClose={closeCommentModal}
        />
      </div>
    </ReelsErrorBoundary>
  );
};