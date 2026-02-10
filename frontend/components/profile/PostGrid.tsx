// frontend/components/profile/PostGrid.tsx

import React from 'react';
import { Post } from '../../types';

interface PostGridProps {
  posts: Post[];
}

/**
 * Componente: PostGrid
 * Propósito: Exibe uma grade de posts de um usuário em seu perfil.
 * Cada post é uma miniatura que pode ser clicada para abrir a visualização completa.
 */
export const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Nenhum post ainda.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map(post => (
        <div key={post.id} className="aspect-square bg-gray-700">
          {/* A imagem do post será exibida aqui. */}
          <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
};