// Este arquivo define a página "Meus Negócios".

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceService } from '../services/marketplaceService';
import { adService } from '../services/adService';
import { authService } from '../services/authService';
import { screenService, BusinessDashboardData } from '../services/screenService';
import { MarketplaceItem, AdCampaign } from '../types';

// Importação de componentes da UI com caminhos corrigidos.
import { useModal } from './components/ModalSystem';
import { ProductStoreList } from './components/store/ProductStoreList';
import { CampaignStoreList } from './components/store/CampaignStoreList';

/**
 * Componente: MyStore
 * Propósito: Renderiza o painel "Meus Negócios", onde os usuários podem gerenciar seus
 * produtos à venda no marketplace e suas campanhas de anúncios. A página utiliza um `screenService`
 * (BFF) para buscar dados agregados de produtos e campanhas. A UI é dividida em abas para
 * facilitar a navegação entre "Meus Produtos" e "Minhas Campanhas". Ações como deletar,
 * pausar e resumir estão disponíveis para cada item respectivo.
 */
export const MyStore: React.FC = () => {
  const navigate = useNavigate();
  const { showConfirm } = useModal();

  // Estado para controlar a aba ativa e os dados do painel.
  const [activeTab, setActiveTab] = useState<'products' | 'campaigns'>('products');
  const [dashboardData, setDashboardData] = useState<BusinessDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega os dados agregados do BFF.
  const loadAggregatedData = async () => {
    const user = authService.getCurrentUser();
    if (!user) return;
    try {
        const data = await screenService.getMyBusinessData(user.id);
        setDashboardData(data);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadAggregatedData();
  }, []);

  // Manipuladores para ações de exclusão e gerenciamento de campanha.
  const handleDeleteProduct = async (id: string, e: React.MouseEvent) => { /* ... */ };
  const handleEndCampaign = async (id: string, e: React.MouseEvent) => { /* ... */ };
  // ... (outros manipuladores)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <header>{/* ... Cabeçalho da página ... */}</header>

      <main className="no-scrollbar">
        {loading ? (
            <div className="flex ... justify-center">{/* Indicador de Carregamento */}</div>
        ) : dashboardData && (
            <div>
                <div className="store-tabs">
                    <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>... Produtos</button>
                    <button className={activeTab === 'campaigns' ? 'active' : ''} onClick={() => setActiveTab('campaigns')}>... Campanhas</button>
                </div>

                {activeTab === 'products' ? (
                    <ProductStoreList products={dashboardData.lists.products} onDelete={handleDeleteProduct} />
                ) : (
                    <CampaignStoreList campaigns={dashboardData.lists.campaigns} /* ... handlers ... */ />
                )}
            </div>
        )}
      </main>
    </div>
  );
};