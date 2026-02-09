// Este arquivo define a página principal do Feed de conteúdo.

import React from 'react';
import { useFeed } from '../hooks/useFeed';
// Componentes de UI que compõem a página do Feed.
import { FeedItem } from './components/feed/FeedItem';
import { Footer } from './components/layout/Footer';
import { MainHeader } from './components/layout/MainHeader';

/**
 * Componente: Feed
 * Propósito: Renderiza a página principal do feed de posts da aplicação. Utiliza o hook `useFeed`
 * para abstrair toda a lógica de busca de dados, scroll infinito, interações com os posts (curtir,
 * deletar, etc.) e controle da UI. A página é composta pelo cabeçalho, a lista de posts e o footer
 * de navegação.
 */
export const Feed: React.FC = () => {
  // O hook `useFeed` centraliza a lógica, mantendo o componente declarativo e limpo.
  const {
    posts,                  // A lista de posts a ser exibida.
    uiVisible,              // Controla a visibilidade dos elementos de navegação.
    loading,                // Indica se os dados estão sendo carregados.
    hasMore,                // Usado para a lógica de scroll infinito.
    isMenuOpen,             // Controla o menu de ações flutuante.
    setIsMenuOpen,
    scrollContainerRef,     // Ref para o container principal que permite scroll.
    loaderRef,              // Ref para o elemento que dispara o carregamento de mais posts.
    currentUserId,          // ID do usuário logado.
    handlePostLike,         // Funções para interagir com um post.
    handlePostDelete,
    handleUserClick,
    handleCommentClick,
    handleShare,
    handleVote,
    handleCtaClick,
    navigate,               // Função de navegação.
  } = useFeed();

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      
      {/* Cabeçalho principal com filtros e atalhos de navegação. */}
      <MainHeader /*...*/ />

      {/* Navegação secundária para alternar entre Feed e Reels. */}
      <div className="fixed top-[85px] ...">{/* ... */}</div>

      {/* Container principal com a lista de posts e lógica de scroll. */}
      <main ref={scrollContainerRef} onScroll={/*...*/} className="flex-grow w-full ...">
        <div className="w-full max-w-[500px] mx-auto ...">

            {/* Exibe um spinner de carregamento inicial. */}
            {loading && posts.length === 0 && (/* ... */)}

            {/* Exibe uma mensagem se o feed estiver vazio. */}
            {!loading && posts.length === 0 && (/* ... */)}

            {/* Mapeia a lista de posts para o componente FeedItem. */}
            {posts.length > 0 && posts.map((post) => (
                <FeedItem 
                    key={post.id} 
                    post={post}
                    // ... (passa os handlers de interação para cada item)
                />
            ))}

            {/* Elemento de referência para o scroll infinito. */}
            <div ref={loaderRef} className="w-full h-24 ...">{/* ... */}</div>
        </div>
      </main>

      {/* Menu de Ações Flutuante (FAB) para criar novos conteúdos. */}
      {isMenuOpen && <div className="fixed inset-0 ..." onClick={() => setIsMenuOpen(false)}></div>}
      <div className={`fixed bottom-[180px] ... ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>{/* ... */}</div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`fixed bottom-[105px] ...`}>
          <i className="fa-solid fa-plus"></i>
      </button>

      {/* Footer principal da aplicação. */}
      <Footer visible={uiVisible} />
    </div>
  );
};