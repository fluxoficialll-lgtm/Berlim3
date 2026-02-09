// Este arquivo define o Painel Financeiro do usuário.

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { syncPayService } from '../services/syncPayService';
import { AffiliateStats } from '../types';
// Importação de componentes da UI financeira com caminhos corrigidos.
import { BalanceCard, CurrencyCode } from './components/financial/BalanceCard';
import { AffiliateCard } from './components/financial/AffiliateCard';
import { GatewayCard } from './components/financial/GatewayCard';

/**
 * Componente: FinancialPanel
 * Propósito: Apresenta um dashboard financeiro para o usuário. Esta página exibe o balanço de ganhos
 * (totais, de vendas próprias e de afiliados), permite filtrar por períodos, mostra estatísticas
 * de afiliados e o gateway de pagamento ativo. A lógica de cálculo de receita e busca de dados
 * é contida neste componente.
 */
export const FinancialPanel: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados para controle de filtros, dados e UI.
  const [selectedFilter, setSelectedFilter] = useState('Disponível');
  const [activeProviderName, setActiveProviderName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  const [currencyStats, setCurrencyStats] = useState<Record<CurrencyCode, { total: number; own: number; affiliate: number }>>({ /*...*/ });
  const [affiliateStats, setAffiliateStats] = useState<AffiliateStats | null>(null);

  // Função para calcular a receita com base no filtro selecionado.
  const calculateRevenue = useCallback(() => {
    // ... (lógica para processar transações e dados de afiliados)
  }, [/*...*/]);

  // Função para carregar todos os dados financeiros do usuário.
  const loadData = async () => {
      setLoading(true);
      // ... (lógica para buscar dados dos services `authService` e `syncPayService`)
      setLoading(false);
  };

  // Efeitos para carregar dados na montagem e recalcular ao mudar filtros.
  useEffect(() => { loadData(); }, []);
  useEffect(() => { calculateRevenue(); }, [calculateRevenue]);

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <header className="flex items-center justify-between ...">
        {/* ... Cabeçalho da página ... */}
      </header>
      <main className="pt-[80px] pb-[40px] ...">
        {/* Card principal com o balanço, filtros e totalizadores. */}
        <BalanceCard 
            stats={currencyStats}
            selectedFilter={selectedFilter}
            filters={/*...*/}
            onFilterChange={setSelectedFilter}
            loading={loading}
        />

        {/* Card com estatísticas de marketing e link de afiliado. */}
        {activeProviderName && <AffiliateCard affiliateStats={affiliateStats} /*...*/ />}
        
        {/* Card que mostra o provedor de pagamento ativo e permite gerenciá-lo. */}
        <GatewayCard 
            activeProvider={activeProviderName}
            onManage={() => navigate('/financial/providers')}
        />
      </main>
    </div>
  );
};