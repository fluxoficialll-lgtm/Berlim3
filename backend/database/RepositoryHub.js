
import { dataHub } from './dataHub.js';
import { query } from './pool.js';

/**
 * RepositoryHub
 * Centraliza a exportação de todos os repositórios do sistema.
 */
export const RepositoryHub = {
    ...dataHub,
    query: query,

    // Métodos administrativos legados ou utilitários globais
    admin: {
        async getFinancialStats() {
            const res = await query(`
                SELECT 
                    SUM((data->>'platformProfit')::numeric) as total_profit,
                    SUM(amount) as total_seller_payouts,
                    COUNT(*) as total_sales
                FROM financial_transactions 
                WHERE type = 'sale' AND status = 'paid'
            `);
            return res.rows[0] || { total_profit: 0, total_seller_payouts: 0, total_sales: 0 };
        },
        async recordIp(userId, ip, ua) { /* Implementação futura */ }
    }
};
