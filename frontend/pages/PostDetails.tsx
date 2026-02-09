// Este arquivo define a página de Detalhes de uma Publicação (Post).

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService } from '../services/postService';
import { Post } from '../types';
import { authService } from '../services/authService';

// Importação de componentes da UI com caminhos corrigidos.
import { FeedItem } from './components/feed/FeedItem';
import { FeedComments } from './components/feed/FeedComments';

/**
 * Componente: PostDetails
 * Propósito: Renderiza a visualização detalhada de uma única publicação. Esta página exibe
 * o `FeedItem` completo (conteúdo da postagem, autor, ações como curtir/compartilhar) e, abaixo
 * dele, a seção de comentários (`FeedComments`), onde os usuários podem ler e adicionar novos
 * comentários. A página é acessada via uma rota dinâmica com o ID da postagem.
 */
export const PostDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const currentUserId = authService.getCurrentUserId();

  // Busca os dados da postagem com base no ID da URL.
  useEffect(() => {
    if (id) {
      const foundPost = postService.getPostById(id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        navigate('/feed'); // Redireciona se a postagem não for encontrada.
      }
    }
  }, [id, navigate]);

  // Manipuladores para ações na postagem (curtir, compartilhar, votar).
  const handleLike = (postId: string) => { /* ... */ };
  const handleShare = (p: Post) => { /* ... */ };
  const handleVote = (postId: string, index: number) => { /* ... */ };

  if (!post) return <div>Carregando...</div>;

  return (
    <div className="min-h-[100dvh] ... bg-[#0c0f14] text-white">
      <header>{/* ... Cabeçalho da página ... */}</header>

      <main className="pt-[75px] ... mx-auto">
        {/* Componente que renderiza a própria postagem */}
        <FeedItem 
          post={post} 
          currentUserId={currentUserId}
          onLike={handleLike} 
          onShare={handleShare} 
          onVote={handleVote}
          // ... outras props ...
        />
        {/* Componente que renderiza os comentários da postagem */}
        {id && <FeedComments postId={id} />}
      </main>
    </div>
  );
};