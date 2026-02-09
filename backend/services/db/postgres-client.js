import pg from 'pg';
import { dbEvents } from '../services/audit/db-events.js';

// --- Configuração de Tipos do PostgreSQL ---
// Por padrão, o node-postgres (pg) pode converter números grandes (bigint) para strings para evitar perda de precisão em JavaScript.
// Esta linha força a conversão do tipo de dado de ID 20 (BIGINT) do PostgreSQL para um `number` do JavaScript.
// É uma decisão de design segura aqui, assumindo que os IDs não excederão `Number.MAX_SAFE_INTEGER`.
pg.types.setTypeParser(20, (val) => parseInt(val, 10));

/**
 * 🐘 PostgresClient (Cliente PostgreSQL)
 *
 * Um wrapper centralizado e robusto para todas as interações com o banco de dados PostgreSQL.
 * Esta classe implementa o padrão Singleton para gerenciar um único pool de conexões para toda a aplicação,
 * o que é crucial para performance e gerenciamento eficiente de recursos.
 *
 * Principais Responsabilidades:
 * - **Gerenciamento do Pool de Conexões**: Configura e mantém um pool de conexões reutilizáveis com o banco.
 * - **Execução de Queries Centralizada**: Fornece um único método `query()` para executar comandos SQL.
 * - **Observabilidade e Auditoria**: Integra-se com o `dbEvents` para logar erros, conexões e, mais importante, queries lentas.
 */
class PostgresClient {
    constructor() {
        /**
         * @property {pg.Pool} pool - A instância do pool de conexões do node-postgres.
         */
        this.pool = new pg.Pool({
            connectionString: process.env.DATABASE_URL, // A URL de conexão é fornecida pela variável de ambiente.
            
            // --- Configurações de Performance e Resiliência do Pool ---
            max: 20, // Número máximo de clientes (conexões) no pool. Ajuste baseado na carga da aplicação e nos limites do banco.
            idleTimeoutMillis: 30000, // Tempo (ms) que uma conexão pode ficar ociosa no pool antes de ser fechada.
            connectionTimeoutMillis: 2000, // Tempo (ms) para esperar por uma conexão antes de lançar um erro.
        });

        // Adiciona um listener para eventos de erro no pool. Isso é crucial para logar problemas
        // que afetam o pool como um todo, como falhas de conexão de rede persistentes.
        this.pool.on('error', (err) => {
            // Loga o erro de conexão usando o sistema de auditoria.
            dbEvents.connectionError(err);
        });
    }

    /**
     * Executa uma query no banco de dados com instrumentação (logging e medição de performance) integrada.
     * Esta é a única forma pela qual o resto da aplicação deve interagir com o banco.
     *
     * @param {string} queryName - Um nome único e funcional para a query (ex: 'createUser', 'findActiveSessions'). Usado para logging.
     * @param {string} text - O comando SQL parametrizado (usando $1, $2, etc., para prevenir SQL Injection).
     * @param {Array} params - Um array de valores para substituir os parâmetros na string SQL.
     * @returns {Promise<pg.QueryResult>} O resultado da query, conforme retornado pelo node-postgres.
     * @throws {Error} Lança o erro original da query para que a camada de serviço possa tratá-lo.
     */
    async query(queryName, text, params) {
        const start = Date.now();
        try {
            const res = await this.pool.query(text, params);
            const duration = Date.now() - start;
            
            // Envia a duração da query para o sistema de eventos, que decidirá se ela foi lenta ou não.
            dbEvents.slowQuery(queryName, duration, params);
            
            return res;
        } catch (error) {
            // Em caso de erro, loga informações de diagnóstico detalhadas através do sistema de eventos.
            dbEvents.queryError(queryName, error, params);
            
            // Re-lança o erro para que a lógica de negócios que chamou a query saiba que a operação falhou
            // e possa tomar as ações apropriadas (ex: retornar um erro 500 para o cliente).
            throw error;
        }
    }
}

// Exporta uma única instância (Singleton) do cliente. 
// Isso garante que `new PostgresClient()` seja chamado apenas uma vez em todo o ciclo de vida da aplicação.
export const postgresClient = new PostgresClient();