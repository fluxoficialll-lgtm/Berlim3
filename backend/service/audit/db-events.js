/**
 * @file backend/service/audit/db-events.js
 * @description Logs de eventos do banco de dados para monitoramento de performance e erros.
 * Categoria do Log: DATABASE
 */

const auditLog = require('./audit-log');
const CATEGORY = 'DATABASE';

const dbEvents = {

    /**
     * Loga uma consulta lenta que excedeu o threshold definido.
     * @param {string} query - A query SQL que foi executada.
     * @param {number} duration - A duração da query em milissegundos.
     * @param {object} params - Os parâmetros utilizados na query.
     */
    slowQuery: (query, duration, params) =>
        auditLog.warn(CATEGORY, `Consulta lenta detectada (${duration}ms)`, { query, duration, params }),

    /**
     * Loga um erro em uma transação do banco de dados.
     * @param {string} operation - A operação onde o erro ocorreu (ex: 'COMMIT', 'ROLLBACK').
     * @param {object} error - O objeto de erro do banco de dados.
     */
    transactionError: (operation, error) =>
        auditLog.error(CATEGORY, `Erro na transação do BD durante ${operation}`, {
            errorMessage: error.message,
            errorCode: error.code,
            errorStack: error.stack,
        }),

    /**
     * Loga uma falha de conexão com o banco de dados.
     * @param {object} error - O objeto de erro da conexão.
     */
    connectionFailed: (error) =>
        auditLog.critical(CATEGORY, 'Falha ao conectar com o banco de dados', {
            errorMessage: error.message,
            errorCode: error.code,
        }),

    /**
     * Loga o início e o fim de um processo de migração do schema.
     * @param {string} status - 'STARTED' ou 'COMPLETED'.
     * @param {string} version - A versão da migração.
     */
    schemaMigration: (status, version) =>
        auditLog.info(CATEGORY, `Migração do schema ${status}: versão ${version}`, { status, version }),

    /**
     * Loga um erro durante a migração do schema.
     * @param {string} version - A versão da migração que falhou.
     * @param {object} error - O objeto de erro.
     */
    migrationError: (version, error) =>
        auditLog.error(CATEGORY, `Erro na migração do schema versão ${version}`, {
            version,
            errorMessage: error.message,
            errorStack: error.stack,
        }),
};

module.exports = dbEvents;
