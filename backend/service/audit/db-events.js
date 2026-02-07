/**
 * @file backend/service/audit/db-events.js
 * @description Logs de eventos de interação com o banco de dados.
 * Categoria do Log: DATABASE
 */

const auditLog = require('./audit-log');
const CATEGORY = 'DATABASE';

const dbEvents = {

    /**
     * Loga uma falha crítica de conexão com o banco de dados.
     * @param {string} dbName - O nome do banco de dados (ex: 'primary_db').
     * @param {Error} error - O erro da falha de conexão.
     */
    connectionFailed: (dbName, error) =>
        auditLog.critical(CATEGORY, `🚨 Falha de conexão com o banco de dados: ${dbName}`, { dbName, error }),

    /**
     * Loga a execução de uma consulta que excedeu o limite de tempo.
     * @param {string} query - A consulta SQL que foi executada.
     * @param {number} duration - A duração em milissegundos.
     * @param {string} user - O usuário ou serviço que executou a consulta.
     */
    slowQuery: (query, duration, user) =>
        auditLog.warn(CATEGORY, `🐢 Consulta lenta detectada (${duration}ms)`, { query, duration, user }),

    /**
     * Loga um erro genérico durante a execução de uma transação ou consulta.
     * @param {string} operation - A operação que estava sendo tentada (ex: 'INSERT', 'UPDATE').
     * @param {string} table - A tabela afetada.
     * @param {Error} error - O erro retornado pelo driver do banco.
     */
    queryError: (operation, table, error) =>
        auditLog.error(CATEGORY, `❌ Erro na operação de ${operation} na tabela ${table}`, { operation, table, error }),

    /**
     * Loga um evento de rollback em uma transação.
     * @param {string} transactionId - O ID da transação que sofreu rollback.
     * @param {string} reason - O motivo do rollback.
     */
    transactionRolledBack: (transactionId, reason) =>
        auditLog.warn(CATEGORY, `⏪ Rollback na transação ${transactionId}`, { transactionId, reason }),
};

module.exports = dbEvents;
