// Este arquivo define a página principal do Marketplace.

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceService } from '../services/marketplaceService';
import { authService } from '../services/authService';
// TODO: Acesso direto ao banco de dados para reatividade. Refatorar para usar um hook ou serviço.
// import { db } from '@/database';
import { MarketplaceItem } from '../types';

// Importação de componentes da UI com caminhos corrigidos.
import { MarketplaceHeader } from './components/marketplace/MarketplaceHeader';
import { MarketplaceSearchBar } from './components/marketplace/MarketplaceSearchBar';
import { CategoryBar } from './components/marketplace/CategoryBar';
import { ProductsGrid } from './components/marketplace/ProductsGrid';
import { MarketplaceFAB } from './components/marketplace/MarketplaceFAB';
import { Footer } from './components/layout/Footer';

/**
 * Componente: Marketplace
 * Propósito: Renderiza a página principal do marketplace, exibindo uma lista de produtos e serviços.
 * A página permite que os usuários pesquisem itens e os filtrem por categoria. Os dados são
 * buscados pelo `marketplaceService` e exibidos em uma grade de produtos. A página também
 * inclui um botão de ação flutuante (FAB) para criar novos anúncios.
 * Nota de Refatoração: O componente atualmente se inscreve diretamente no `db` para atualizações
 * em tempo real. Essa lógica deve ser abstraída para um hook ou gerenciada dentro do `marketplaceService`
 * para manter a separação de responsabilidades.
 */
export const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados para filtro, busca e dados.
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [allItems, setAllItems] = useState<MarketplaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar os itens do marketplace.
  const loadItems = useCallback(() => {
      const items = marketplaceService.getRecommendedItems();
      setAllItems(items || []);
      setIsLoading(false);
  }, []);

  // Efeito para carregar dados iniciais e se inscrever para atualizações.
  useEffect(() => {
      loadItems();
      // TODO: Refatorar a subscrição direta ao DB.
      // const unsubscribe = db.subscribe('marketplace', loadItems);
      // return () => unsubscribe();
  }, [loadItems]);

  // Memoiza a filtragem dos produtos para otimização.
  const filteredProducts = useMemo(() => {
    // ... (lógica de filtragem por categoria e termo de busca)
    return allItems;
  }, [allItems, activeCategory, searchTerm]);

  // Navega para a página do produto ao clicar.
  const handleProductClick = (item: MarketplaceItem) => {
      navigate(`/marketplace/product/${item.id}`);
  };

  return (
    <div className="h-screen flex flex-col ... bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)]">
      <MarketplaceHeader />

      <main className="flex-grow pt-[100px] ...">
        <MarketplaceSearchBar value={searchTerm} onChange={setSearchTerm} />
        <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />
        <ProductsGrid items={filteredProducts} isLoading={isLoading} onItemClick={handleProductClick} />
      </main>

      <MarketplaceFAB />
      <Footer />
    </div>
  );
};