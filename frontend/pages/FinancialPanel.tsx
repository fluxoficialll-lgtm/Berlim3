// Este arquivo define o Painel Financeiro do usuário.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinancialData } from '../hooks/useFinancialData'; // Importa o hook recém-criado.
// Importação de componentes da UI financeira com caminhos corrigidos.
import { BalanceCard } from './components/financial/BalanceCard';
import { AffiliateCard } from './components/financial/AffiliateCard';
import { GatewayCard } from './components/financial/GatewayCard';

/**
 * Componente: FinancialPanel
 * Propósito: Apresenta um dashboard financeiro para o usuário. Esta página exibe o balanço de ganhos
 * (totais, de vendas próprias e de afiliados), permite filtrar por períodos, mostra estatísticas
 * de afiliados e o gateway de pagamento ativo.
 * 
 * Refatorado para usar o hook `useFinancialData`, que agora centraliza toda a lógica de negócios,
 * tornando o componente mais limpo e focado na apresentação.
 */
export const FinancialPanel: React.FC = () => {
  const navigate = useNavigate();
  
  // O hook `useFinancialData` fornece todos os dados e funções necessárias para a UI.
  const {
    selectedFilter,
    setSelectedFilter,
    activeProviderName,
    loading,
    currencyStats,
    affiliateStats,
  } = useFinancialData();

  // O componente agora é puramente de apresentação, recebendo os dados do hook.
  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <header className="flex items-center justify-between ...">
        {/* O cabeçalho da página permanece o mesmo. */}
      </header>
      <main className="pt-[80px] pb-[40px] ...">
        {/* Card principal com o balanço, filtros e totalizadores. */}
        <BalanceCard 
            stats={currencyStats}
            selectedFilter={selectedFilter}
            // Correção: A prop `filters` agora recebe um array de strings com os filtros disponíveis.
            // Idealmente, este array também viria do hook para manter a consistência.
            filters={['Disponível', 'Hoje', '7 dias', '30 dias', 'Últimos 12 meses']}
            onFilterChange={setSelectedFilter}
            loading={loading}
        />

        {/* Card com estatísticas de marketing e link de afiliado. */}
        {/* Correção: O comentário placeholder foi removido. */}
        {activeProviderName && <AffiliateCard affiliateStats={affiliateStats} />}
        
        {/* Card que mostra o provedor de pagamento ativo e permite gerenciá-lo. */}
        <GatewayCard 
            activeProvider={activeProviderName}
            onManage={() => navigate('/financial/providers')}
        />
      </main>
    </div>
  );
};