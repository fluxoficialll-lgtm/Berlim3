import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Group } from '@/types';
import { API_BASE } from '@/apiConfig';

// ✅ ARQUITETURA NOVA: A lógica de API agora vive diretamente no hook.
const RANKING_API_URL = `${API_BASE}/api/ranking/groups`;

/**
 * useGroupRanking
 * Gerencia a lógica para buscar e exibir os rankings de grupos com base na categoria da URL.
 */
export const useGroupRanking = () => {
    const { category } = useParams<{ category: string }>();
    const activeTab = (category === 'private' || category === 'vip' || category === 'public') 
        ? category 
        : 'public';

    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshRanking = useCallback(async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        
        try {
            // Substitui a chamada ao RankingService por uma chamada de API direta.
            const response = await fetch(`${RANKING_API_URL}/${activeTab}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Assumindo que a API retorna um objeto com uma propriedade `data` que contém os grupos
            setGroups(data.data || []); 

        } catch (error) {
            console.error("Failed to fetch group ranking:", error);
            setGroups([]); // Limpa os grupos em caso de erro
        } finally {
            if (!isSilent) setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        refreshRanking();
        // A antiga inscrição em tempo real foi removida. 
        // TODO: Implementar um listener de WebSocket para atualizações em tempo real se necessário.
    }, [refreshRanking]);

    return {
        groups,
        loading,
        activeTab
    };
};
