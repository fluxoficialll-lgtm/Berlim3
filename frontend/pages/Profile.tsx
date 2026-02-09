// Este arquivo define a página de Perfil do usuário logado.

import React from 'react';
// O hook useProfile abstrai toda a lógica de busca de dados e manipulação de estado.
import { useProfile } from './hooks/useProfile';

// Importação de componentes da UI com caminhos corrigidos.
import { FollowListModal } from './components/profile/FollowListModal';
import { FeedItem } from './components/feed/FeedItem';
import { Footer } from './components/layout/Footer';
import { AvatarPreviewModal } from './components/ui/AvatarPreviewModal';
import { ProfileHeader } from './features/profile/components/ProfileHeader';
import { ProfileInfoCard } from './features/profile/components/ProfileInfoCard';
import { ProfileTabNav } from './features/profile/components/ProfileTabNav';
import { ProfileReelsGrid } from './features/profile/components/tabs/ProfileReelsGrid';
import { ProfileProductsGrid } from './features/profile/components/tabs/ProfileProductsGrid';

/**
 * Componente: Profile
 * Propósito: Renderiza a página de perfil do usuário atualmente logado. A lógica complexa de busca
 * de dados (posts, produtos, informações do usuário) e manipulação de estado é abstraída pelo
 * hook `useProfile`. O componente se concentra em renderizar a UI, que inclui um cartão de
 * informações do perfil, estatísticas (posts, seguidores, seguindo) e uma navegação por abas
 * para exibir diferentes tipos de conteúdo, como posts de texto, fotos, vídeos (Reels) e produtos
 * do marketplace. Também gerencia modais para exibir listas de seguidores/seguindo e para
 * visualizar a foto de perfil.
 */
export const Profile: React.FC = () => {
  // O hook `useProfile` fornece todos os dados e funções necessárias para o componente.
  const {
    navigate,
    activeTab,
    setActiveTab,
    myPosts,
    myProducts,
    user,
    // ... outros estados e handlers do hook
  } = useProfile();

  return (
    <div className="profile-page h-screen ... flex flex-col overflow-hidden">
      <ProfileHeader /* ... */ />

      <main className="flex-grow ...">
        <div style={{width:'100%', maxWidth:'500px', margin:'0 auto'}}>
            
            <ProfileInfoCard /* ... props para info do usuário e stats ... */ />

            <div className="profile-tabs-container">
                <ProfileTabNav 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    hasProducts={myProducts.length > 0}
                />

                <div className="tab-content">
                    {/* Renderização condicional do conteúdo da aba ativa */}
                    {activeTab === 'posts' && <div className="post-list">{/* ... lista de posts ... */}</div>}
                    {activeTab === 'products' && <ProfileProductsGrid products={myProducts} /* ... */ />}
                    {activeTab === 'reels' && <ProfileReelsGrid reels={myPosts.filter(p => p.type === 'video')} /* ... */ />}
                </div>
            </div>
        </div>
      </main>

      <Footer />

      <FollowListModal /* ... */ />
      <AvatarPreviewModal /* ... */ />
    </div>
  );
};