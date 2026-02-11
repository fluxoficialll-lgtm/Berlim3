// frontend/hooks/useVipSales.ts

import { useState, useEffect, useCallback } from 'react';
import { groupService } from '../services/groupService';
import { Sale, VipGroup } from '../types';

/**
 * Hook: useVipSales
 * Propósito: Gerencia a lógica de negócios para a página de vendas de um grupo VIP.
 *
 * Responsabilidades:
 * - Buscar as informações do grupo VIP.
 * - Buscar a lista de vendas do grupo.
 * - Gerenciar o estado de carregamento.
 */
export const useVipSales = (groupId: string) => {
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState<VipGroup | null>(null);
    const [sales, setSales] = useState<Sale[]>([]);

    const fetchVipSalesData = useCallback(async () => {
        if (!groupId) return;

        setLoading(true);
        try {
            // Busca os detalhes do grupo e as vendas simultaneamente.
            const [groupData, salesData] = await Promise.all([
                groupService.getVipGroupDetails(groupId),
                groupService.getVipGroupSales(groupId),
            ]);

            setGroup(groupData);
            setSales(salesData);

        } catch (error) {
            console.error("Erro ao buscar dados de vendas VIP:", error);
        } finally {
            setLoading(false);
        }
    }, [groupId]);

    useEffect(() => {
        fetchVipSalesData();
    }, [fetchVipSalesData]);

    return {
        loading,
        group,
        sales,
    };
};