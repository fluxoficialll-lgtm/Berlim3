
// frontend/pages/PostDetails.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostDetails } from '../hooks/usePostDetails';
import { FeedItem } from './components/feed/FeedItem';
import { FeedComments } from './components/feed/FeedComments';
import { Spinner } from '../components/ui/Spinner';

export const PostDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = usePostDetails(id);
  
  // A lógica para obter o currentUserId precisará ser refatorada
  // para usar um hook de autenticação, mas por agora vamos focar na busca de dados.
  // const { currentUserId } = useAuth(); // Exemplo futuro

  // Placeholder para handlers de interação
  const handleLike = (postId: string) => console.log(`Liked ${postId}`);
  const handleShare = (p: any) => console.log(`Shared ${p.id}`);
  const handleVote = (postId: string, index: number) => console.log(`Voted on ${postId} at index ${index}`);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><Spinner /></div>;
  }

  if (error || !post) {
    return (
      <div className="text-center text-white p-8">
        <p>Post não encontrado.</p>
        <button onClick={() => navigate('/feed')} className="text-blue-500 mt-4">Voltar para o Feed</button>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#0c0f14] text-white">
      <header className="fixed top-0 left-0 w-full z-10 bg-[#0c0f14] h-[75px] flex items-center px-4">
        <button onClick={() => navigate(-1)} className="text-white">
            <i className="fa-solid fa-arrow-left"></i> Voltar
        </button>
      </header>
      <main className="pt-[75px] max-w-2xl mx-auto">
        <FeedItem
          post={post}
          // currentUserId={currentUserId} // Adicionar quando o hook de auth estiver pronto
          onLike={handleLike}
          onShare={handleShare}
          onVote={handleVote}
          onCommentClick={() => document.getElementById('comment-input')?.focus()}
          onCtaClick={(link) => window.open(link, '_blank')}
          onUserClick={(userId) => navigate(`/profile/${userId}`)}
          onPostDelete={(postId) => console.log(`Delete ${postId}`)} // Placeholder
        />
        <FeedComments postId={post.id} />
      </main>
    </div>
  );
};
