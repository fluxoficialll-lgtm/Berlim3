
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReelsSearch } from '../../hooks/useReelsSearch'; // ✅ ARQUITETURA NOVA: Importa o hook.
import { Post } from '@/types';

// Importação de componentes (assumindo que existam ou seriam criados)
// import { SearchHeader } from './components/reels/SearchHeader';
// import { ReelsGrid } from './components/reels/ReelsGrid';

/**
 * ✅ ARQUITETURA NOVA: Página ReelsSearch refatorada.
 * A lógica de busca, debounce e estado foi movida para o hook `useReelsSearch`.
 * A página agora é um componente "burro" (dumb component), focado na renderização da UI.
 */
export const ReelsSearch: React.FC = () => {
  const navigate = useNavigate();

  // ✅ ARQUITETURA NOVA: Consome o hook para obter dados e manipuladores.
  const {
    results,
    isLoading,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
  } = useReelsSearch();

  const handleReelClick = (reel: Post) => {
    navigate(`/reels/${reel.id}`);
  };

  return (
    <div className="min-h-screen bg-[#0c0f14] ... flex flex-col">
      <header>
        {/* Componentes de UI recebem estado e callbacks do hook */}
        {/* <SearchHeader 
          searchTerm={searchTerm} 
          onSearchTermChange={setSearchTerm} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        /> */}
      </header>

      <main>
        {/* <ReelsGrid 
          reels={results} 
          isLoading={isLoading} 
          onReelClick={handleReelClick} 
        /> */}
      </main>
    </div>
  );
};
