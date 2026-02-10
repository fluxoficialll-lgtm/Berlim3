// frontend/components/post/ReelItem.tsx

import React from 'react';
import { Post } from '../../types';

interface ReelItemProps {
  reel: Post;
  isActive: boolean; // Para controlar a reprodução do vídeo
  onComment: () => void;
}

/**
 * Componente: ReelItem
 * Propósito: Renderiza um único item de Reel (vídeo) no feed.
 */
export const ReelItem: React.FC<ReelItemProps> = ({ reel, isActive, onComment }) => {
  // A lógica para tocar ou pausar o vídeo com base na prop `isActive` seria implementada aqui.

  return (
    <div className={`reel-item ${isActive ? 'active' : ''}`}>
      {/* O vídeo ocuparia a maior parte do espaço */}
      <video src={reel.videoUrl} className="w-full h-full object-cover" loop muted={!isActive} playsInline />
      
      <div className="absolute bottom-0 left-0 p-4 text-white z-10">
        {/* Informações do autor e legenda */}
        <p className="font-bold">@{reel.author.username}</p>
        <p>{reel.caption}</p>
      </div>

      <div className="absolute bottom-0 right-0 p-4 flex flex-col items-center space-y-4 z-10">
        {/* Ações como Like, Comentário, Share */}
        <button className="text-white">
          {/* Ícone de Like */}
          <p>{reel.likes} Likes</p>
        </button>
        <button onClick={onComment} className="text-white">
          {/* Ícone de Comentário */}
        </button>
        {/* Outros botões de ação */}
      </div>
    </div>
  );
};