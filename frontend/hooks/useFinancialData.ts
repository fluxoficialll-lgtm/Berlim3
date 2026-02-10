// frontend/hooks/useFinancialData.ts

import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { syncPayService } from '../services/syncPayService';
import { AffiliateStats } from '../types';
// A dependência de um componente de UI (`BalanceCard`) em um hook não é ideal,
// mas aceitável por agora para manter a tipagem `CurrencyCode` consistente.
import { CurrencyCode } from '../pages/components/financial/BalanceCard';

/**
 * Hook: useFinancialData
 * Propósito: Encapsula toda a lógica de negócios para o painel financeiro.
 *
 * Responsabilidades:
 * - Buscar dados financeiros do usuário (provedor de pagamento, estatísticas de afiliados).
 * - Calcular e atualizar as receitas (próprias, de afiliados e totais).
 * - Gerenciar o estado de carregamento (loading).
 * - Controlar os filtros de período selecionados pelo usuário.
 *
 * Este hook abstrai a complexidade da busca e manipulação de dados, permitindo
 * que o componente `FinancialPanel` se concentre apenas na apresentação da UI.
 */
export const useFinancialData = () => {
    // Estado para o filtro de período selecionado (ex: "Disponível", "Últimos 7 dias").
    const [selectedFilter, setSelectedFilter] = useState('Disponível');
    // Estado para o nome do provedor de pagamento ativo (ex: "Stripe", "PayPal").
    const [activeProviderName, setActiveProviderName] = useState<string>('');
    // Estado para controlar a exibição de loaders na UI enquanto os dados são carregados.
    const [loading, setLoading] = useState(true);
    // Estado para armazenar as estatísticas de ganhos, separadas por moeda.
    const [currencyStats, setCurrencyStats] = useState<Record<CurrencyCode, { total: number; own: number; affiliate: number }>>({
        BRL: { total: 0, own: 0, affiliate: 0 },
        USD: { total: 0, own: 0, affiliate: 0 },
        EUR: { total: 0, own: 0, affiliate: 0 },
    });
    // Estado para as estatísticas de afiliados (cliques, conversões, etc.).
    const [affiliateStats, setAffiliateStats] = useState<AffiliateStats | null>(null);

    // Função para calcular a receita, usando `useCallback` para otimização.
    // ATENÇÃO: A lógica aqui é um MOCK (simulação) e precisa ser substituída
    // pela implementação real que processa transações e filtros.
    const calculateRevenue = useCallback(() => {
        // Simula o cálculo de receita de vendas próprias e de afiliados.
        const ownRevenue = Math.random() * 10000;
        const affiliateRevenue = Math.random() * 2000;
        setCurrencyStats({
            BRL: { total: ownRevenue + affiliateRevenue, own: ownRevenue, affiliate: affiliateRevenue },
            USD: { total: (ownRevenue + affiliateRevenue) / 5, own: ownRevenue / 5, affiliate: affiliateRevenue / 5 },
            EUR: { total: (ownRevenue + affiliateRevenue) / 6, own: ownRevenue / 6, affiliate: affiliateRevenue / 6 },
        });
    }, []); // As dependências devem ser preenchidas quando a lógica real for implementada.

    // Função assíncrona para carregar os dados iniciais do painel.
    const loadData = async () => {
        setLoading(true);
        try {
            const user = authService.getCurrentUser();
            if (user) {
                // Busca o provedor de pagamento primário.
                const provider = await syncPayService.getPrimaryProvider(user.id);
                setActiveProviderName(provider?.providerName || 'Nenhum');

                // Busca as estatísticas de afiliados.
                const stats = await syncPayService.getAffiliateStats(user.id);
                setAffiliateStats(stats);
            }
            // Após buscar, calcula a receita inicial.
            calculateRevenue();
        } catch (error) {
            console.error("Falha ao carregar dados financeiros:", error);
        } finally {
            setLoading(false);
        }
    };

    // Efeito que executa `loadData` apenas uma vez, quando o hook é montado.
    useEffect(() => {
        loadData();
    }, []); // O array de dependências vazio garante a execução única.

    // Efeito que recalcula a receita sempre que o filtro `selectedFilter` é alterado.
    useEffect(() => {
        calculateRevenue();
    }, [selectedFilter, calculateRevenue]);

    // Retorna todos os estados e funções que o componente de UI precisa para funcionar.
    return {
        selectedFilter,
        setSelectedFilter,
        activeProviderName,
        loading,
        currencyStats,
        affiliateStats,
        loadData, // Expor `loadData` permite que a UI possa recarregar os dados se necessário.
    };
};