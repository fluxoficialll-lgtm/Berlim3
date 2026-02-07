/**
 * @file backend/service/audit/financial-events.js
 * @description Logs de eventos financeiros críticos para auditoria e depuração.
 * Categoria do Log: FINANCIAL
 */

const auditLog = require('./audit-log');
const CATEGORY = 'FINANCIAL';

const financialEvents = {

    /**
     * Loga o início de uma transação financeira complexa.
     * @param {string} operation - A operação sendo iniciada (ex: 'PAYOUT_REQUEST', 'REFUND_PROCESSING').
     * @param {object} details - Detalhes da operação (ex: { userId, amount, currency }).
     */
    transactionStarted: (operation, details) =>
        auditLog.info(CATEGORY, `Início da operação financeira: ${operation}`, details),

    /**
     * Loga o sucesso de uma transação financeira.
     * @param {string} operation - A operação concluída.
     * @param {object} details - Detalhes da transação (ex: { transactionId, finalAmount }).
     */
    transactionSuccess: (operation, details) =>
        auditLog.info(CATEGORY, `Sucesso na operação financeira: ${operation}`, details),

    /**
     * Loga uma falha em uma transação financeira.
     * @param {string} operation - A operação que falhou.
     * @param {object} errorInfo - Informações sobre o erro (ex: { error, userId, details }).
     */
    transactionFailed: (operation, errorInfo) =>
        auditLog.error(CATEGORY, `Falha na operação financeira: ${operation}`, errorInfo),

    /**
     * Loga uma anomalia financeira que requer investigação.
     * @param {string} anomaly - Descrição da anomalia (ex: 'Negative user balance').
     * @param {object} details - Detalhes para investigação (ex: { userId, balance, history }).
     */
    anomalyDetected: (anomaly, details) =>
        auditLog.warn(CATEGORY, `Anomalia financeira detectada: ${anomaly}`, details),

    /**
     * Loga uma falha crítica no gateway de pagamento.
     * @param {string} gateway - O nome do gateway (ex: 'Stripe', 'PayPal').
     * @param {object} error - O objeto de erro retornado pelo gateway.
     */
    gatewayFailure: (gateway, error) =>
        auditLog.critical(CATEGORY, `Falha crítica no gateway de pagamento: ${gateway}`, {
            errorMessage: error.message,
            errorStack: error.stack,
            gatewayDetails: error.response // Assumindo que a resposta do erro esteja aqui
        }),
};

module.exports = financialEvents;
