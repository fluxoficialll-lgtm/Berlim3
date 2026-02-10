// frontend/components/post/ReelComments.tsx

import React from 'react';
import { Post, Comment } from '../../types';

interface ReelCommentsProps {
  reel: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente: ReelComments
 * Propósito: Exibe um modal com os comentários de um Reel específico.
 */
export const ReelComments: React.FC<ReelCommentsProps> = ({ reel, isOpen, onClose }) => {
  if (!isOpen || !reel) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-4 w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Comentários</h2>
          <button onClick={onClose}>X</button>
        </div>
        
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {/* A lista de comentários seria mapeada aqui */}
          {reel.comments?.map((comment: Comment) => (
            <div key={comment.id} className="flex items-start space-x-2">
              <img src={comment.author.profilePicture} alt={comment.author.name} className="w-8 h-8 rounded-full"/>
              <div>
                <p><span className="font-bold">{comment.author.username}</span> {comment.text}</p>
                <p className="text-xs text-gray-400">{comment.timestamp}</p>
              </div>
            </div>
          ))}
          {reel.comments?.length === 0 && <p className="text-gray-400">Nenhum comentário ainda.</p>}
        </div>

        {/* Formulário para adicionar um novo comentário */}
        <div className="mt-4">
          {/* ... */}
        </div>
      </div>
    </div>
  );
};