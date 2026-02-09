
// 📚 Este arquivo é o "Bibliotecário Chefe" do nosso sistema de dados.
// Ele centraliza o acesso a todos os "livros" (repositórios), fornecendo um ponto de entrada único e consistente para interagir com o banco de dados.

import { dataHub } from './dataHub.js'; // Importa a coleção de todos os repositórios individuais.
import { query } from './pool.js';      // Importa a função de baixo nível para executar queries SQL.

/**
 * @name RepositoryHub
 * @description
 * Centraliza e exporta todos os repositórios de dados do sistema, funcionando como um Singleton de acesso.
 * Ele também pode conter métodos que abrangem múltiplos domínios de dados ou funções administrativas globais.
 */
export const RepositoryHub = {
    // --- AGREGAÇÃO DE REPOSITÓRIOS ---
    // O "spread operator" (...) pega todos os repositórios exportados do dataHub 
    // e os torna diretamente acessíveis através do RepositoryHub.
    // Ex: Em vez de `dataHub.users.findById`, podemos usar `RepositoryHub.users.findById`.
    ...dataHub,

    // --- MÉTODOS DE ACESSO DIRETO ---
    // Expõe a função de query de baixo nível para casos onde um repositório não é necessário.
    // Útil para queries complexas, joins ou operações que não se encaixam em um modelo específico.
    query: query,

    // --- MÓDULO ADMINISTRATIVO LEGADO ---
    // Métodos que servem a propósitos administrativos ou que consultam dados de forma agregada.
    admin: {
        /**
         * Calcula estatísticas financeiras globais da plataforma.
         * @returns {Promise<object>} Um objeto com o lucro total da plataforma, o total pago aos vendedores e o número total de vendas.
         */
        async getFinancialStats() {
            const sqlQuery = `
                SELECT 
                    -- Soma todo o lucro da plataforma, convertendo o JSONB para número
                    SUM((data->>'platformProfit')::numeric) as total_profit,
                    -- Soma o valor líquido total pago aos vendedores
                    SUM(amount) as total_seller_payouts,
                    -- Conta o número total de transações de venda bem-sucedidas
                    COUNT(*) as total_sales
                FROM financial_transactions 
                WHERE type = 'sale' AND status = 'paid'
            `;
            const res = await query(sqlQuery);
            // Retorna a primeira linha do resultado, ou um objeto zerado se não houver dados.
            return res.rows[0] || { total_profit: 0, total_seller_payouts: 0, total_sales: 0 };
        },

        /**
         * Registra o endereço IP e User-Agent de um usuário (placeholder).
         * @param {string} userId - O ID do usuário.
         * @param {string} ip - O endereço IP do usuário.
         * @param {string} ua - O User-Agent do navegador do usuário.
         */
        async recordIp(userId, ip, ua) { 
            // TODO: Implementar a lógica de registro de IP, possivelmente em uma tabela de logs de acesso.
            console.log(`[Audit] IP registrado para ${userId}: ${ip} (UA: ${ua})`);
            /* Exemplo de implementação futura:
            await query('INSERT INTO user_access_logs (user_id, ip_address, user_agent) VALUES ($1, $2, $3)', [userId, ip, ua]);
            */
         }
    }
};
