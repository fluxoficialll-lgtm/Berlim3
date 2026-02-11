
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useUserProfile'; // ✅ ARQUITETURA NOVA: Importa o hook.

// Importação de Componentes de UI
import { VisitorHeader } from '../../features/user-profile/components/VisitorHeader';
import { VisitorInfoCard } from '../../features/user-profile/components/VisitorInfoCard';
import { VisitorBlockedState, VisitorPrivateState } from '../../features/user-profile/components/VisitorStates';
import { ProfileTabNav } from '../../features/profile/components/ProfileTabNav';
import { ProfileReelsGrid } from '../../features/profile/components/tabs/ProfileReelsGrid';
import { ProfileProductsGrid } from '../../features/profile/components/tabs/ProfileProductsGrid';
import { FeedItem } from '../components/feed/FeedItem';
import { Footer } from '../components/layout/Footer';
import { AvatarPreviewModal } from '../components/ui/AvatarPreviewModal';
import { Spinner } from '../components/ui/Spinner'; // Assumindo que exista um spinner

/**
 * ✅ ARQUITETURA NOVA: Página UserProfile refatorada.
 * A lógica de busca, estado e ações foi completamente movida para o hook `useUserProfile`.
 * A página agora é um componente "burro" (dumb component), focado exclusivamente na renderização da UI.
 */
export const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  // ✅ ARQUITETURA NOVA: Consome o hook para obter todos os dados e manipuladores.
  const {
    user,
    posts,
    products,
    isLoading,
    error,
    isMe,
    isBlocked,
    isFollowing,
    activeTab,
    setActiveTab,
    handleFollow,
    handleBlock,
    handleMessage,
  } = useUserProfile(username || '');
  
  // (O estado de preview do avatar pode permanecer aqui, pois é um estado de UI puro e local)
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  // Renderização de estado de carregamento ou erro
  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><Spinner /></div>;
  }

  if (error || !user) {
    return <div className="h-screen flex justify-center items-center text-white">{error || 'Usuário não encontrado'}</div>;
  }

  const isContentVisible = isMe || !user.isPrivate || isFollowing;
  const canMessage = !isMe && isContentVisible;

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white flex flex-col">
      <VisitorHeader 
        onBack={() => navigate(-1)}
        username={user.username}
        isMe={isMe}
        isBlocked={isBlocked}
        onToggleBlock={handleBlock}
        onReport={() => alert('Denunciar usuário')}
      />

      <main className="flex-grow overflow-y-auto pt-[80px] pb-[100px]">
        <div className="max-w-xl mx-auto">
          {isBlocked ? (
            <VisitorBlockedState />
          ) : (
            <>
              <VisitorInfoCard 
                avatar={user.avatar}
                nickname={user.nickname}
                username={user.username}
                bio={user.bio}
                stats={{ posts: posts.length, followers: user.followersCount, following: user.followingCount }} // Dados do hook
                isMe={isMe}
                isBlocked={isBlocked}
                relationStatus={isFollowing ? 'following' : 'none'} // Derivado do estado do hook
                isFollowLoading={false} // (WIP no hook)
                canMessage={canMessage}
                onFollowClick={handleFollow} // Handler do hook
                onMessageClick={handleMessage} // Handler do hook
                onAvatarClick={() => setIsPreviewOpen(true)}
              />

              {isContentVisible ? (
                <div>
                  <ProfileTabNav 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    hasProducts={products.length > 0}
                  />
                  <div className="p-2">
                    {activeTab === 'posts' && posts.filter(p => p.type !== 'video' && p.type !== 'photo').map(post => <FeedItem key={post.id} post={post} />)}
                    {activeTab === 'fotos' && posts.filter(p => p.type === 'photo').map(post => <FeedItem key={post.id} post={post} />)}
                    {activeTab === 'reels' && <ProfileReelsGrid reels={posts.filter(p => p.type === 'video')} onReelClick={(p) => navigate(`/reels/${p.id}`)} />}
                    {activeTab === 'products' && <ProfileProductsGrid products={products} onProductClick={(p) => navigate(`/marketplace/product/${p.id}`)} />}
                  </div>
                </div>
              ) : (
                <VisitorPrivateState />
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
      <AvatarPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} imageSrc={user.avatar} username={user.nickname} />
    </div>
  );
};
