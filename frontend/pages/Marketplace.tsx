
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../../hooks/useMarketplace'; // ✅ ARQUITETURA NOVA: Importa o hook.
import { MarketplaceItem } from '@/types';

// Importação de componentes da UI.
import { MarketplaceHeader } from './components/marketplace/MarketplaceHeader';
import { MarketplaceSearchBar } from './components/marketplace/MarketplaceSearchBar';
import { CategoryBar } from './components/marketplace/CategoryBar';
import { ProductsGrid } from './components/marketplace/ProductsGrid';
import { MarketplaceFAB } from './components/marketplace/MarketplaceFAB';
import { Footer } from './components/layout/Footer';

/**
 * ✅ ARQUITETURA NOVA: Página Marketplace refatorada.
 * A lógica de estado e busca de dados foi completamente movida para o hook `useMarketplace`.
 * A página agora é um componente "burro" (dumb component), responsável apenas por renderizar a UI
 * com os dados e funções que recebe do hook.
 */
export const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  
  // ✅ ARQUITETURA NOVA: A página consome o hook para obter dados e manipuladores.
  const {
    items,
    isLoading,
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
  } = useMarketplace();

  // A lógica de navegação permanece na página, pois é uma responsabilidade da UI.
  const handleProductClick = (item: MarketplaceItem) => {
      navigate(`/marketplace/product/${item.id}`);
  };

  return (
    <div className="h-screen flex flex-col ... bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)]">
      <MarketplaceHeader />

      <main className="flex-grow pt-[100px] ...">
        {/* Os componentes da UI recebem os dados e callbacks do hook */}
        <MarketplaceSearchBar value={searchTerm} onChange={setSearchTerm} />
        <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />
        <ProductsGrid items={items} isLoading={isLoading} onItemClick={handleProductClick} />
      </main>

      <MarketplaceFAB />
      <Footer />
    </div>
  );
};
