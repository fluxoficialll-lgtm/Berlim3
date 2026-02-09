
// 🏆 Este serviço contém a lógica de negócios para classificar e filtrar os rankings de grupos.
// Ele é o cérebro por trás de quais grupos aparecem no topo das listas.
// Por acessar o banco de dados diretamente, ele foi projetado para ser usado exclusivamente no backend.

import { db } from '../database'; // Acesso simulado ao banco de dados
import { Group } from '../types';    // Tipagem que define a estrutura de um objeto de Grupo

export const GroupRankingService = {
    /**
     * Calcula a pontuação de um grupo para fins de ranking.
     * A pontuação é uma combinação do número de membros com um bônus por atividade recente.
     * @param {Group} group - O objeto do grupo a ser pontuado.
     * @returns {number} A pontuação final calculada para o grupo.
     */
    calculateScore: (group: Group): number => {
        // A base da pontuação é o número de membros. Se não houver, começa em 0.
        const memberCount = group.memberIds?.length || 0;
        const now = Date.now(); // Timestamp atual em milissegundos.

        // O campo 'timestamp' do grupo armazena a última atividade. Usamos 0 como padrão se não existir.
        const lastActivity = group.timestamp || 0;

        // --- Lógica do Bônus "Trending" ---
        // Verificamos se a última atividade ocorreu nas últimas 24 horas (86.400.000 milissegundos).
        const isTrending = (now - lastActivity) < 86400000; 
        
        // Grupos "em alta" (trending) recebem um bônus fixo de 500 pontos.
        const trendingBonus = isTrending ? 500 : 0;

        // --- Fórmula Final da Pontuação ---
        // Cada membro vale 100 pontos. Somamos a isso o bônus de atividade recente.
        // Ex: Um grupo com 10 membros e atividade recente terá (10 * 100) + 500 = 1500 pontos.
        // Ex: O mesmo grupo sem atividade recente terá (10 * 100) + 0 = 1000 pontos.
        return (memberCount * 100) + trendingBonus;
    },

    /**
     * Recupera uma lista de grupos para uma categoria específica, já filtrada e ordenada pela pontuação.
     * Esta função acessa o banco de dados diretamente e, portanto, só deve ser executada no backend.
     * @param {'public' | 'private' | 'vip'} category - A categoria de grupos a ser listada.
     * @returns {Group[]} Uma lista de grupos filtrados e ordenados do maior para o menor score.
     */
    getRankedList: (category: 'public' | 'private' | 'vip'): Group[] => {
        // 1. Pega todos os grupos do banco de dados. Em uma aplicação real, isso seria otimizado com paginação.
        const allGroups: Group[] = db.groups.getAll();
        
        // 2. Filtra os grupos com base na categoria solicitada.
        const filtered = allGroups.filter(g => {
            if (category === 'vip') return g.isVip; // Apenas grupos VIP
            if (category === 'private') return g.isPrivate && !g.isVip; // Apenas privados (não-VIP)
            return !g.isPrivate && !g.isVip; // Apenas públicos
        });

        // 3. Ordena os grupos filtrados. A função sort() usa o calculateScore para comparar dois grupos (a, b).
        // A ordem `b - a` garante uma classificação decrescente (do maior para o menor).
        return filtered.sort((a, b) => {
            return GroupRankingService.calculateScore(b) - GroupRankingService.calculateScore(a);
        });
    }
};
