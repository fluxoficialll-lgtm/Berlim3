/**
 * @file backend/service/audit/financial-events.js
 * @description Logs de eventos financeiros críticos para auditoria e conformidade.
 * Categoria do Log: FINANCIAL
 */

const auditLog = require('./audit-log');
const CATEGORY = 'FINANCIAL';

const financialEvents = {

    /**
     * Loga uma transação financeira bem-sucedida.
     * @param {string} transactionType - O tipo de transação (ex: 'SALE', 'REFUND', 'PAYOUT').
     * @param {string} transactionId - O ID da transação.
     * @param {number} amount - O valor da transação.
     * @param {string} currency - A moeda (ex: 'BRL', 'USD').
     * @param {string} userId - O ID do usuário associado.
     */
    transactionSuccess: (transactionType, transactionId, amount, currency, userId) =>
        auditLog.info(CATEGORY, `💰 Transação [${transactionType}] de ${amount} ${currency} bem-sucedida`, { transactionType, transactionId, amount, currency, userId }),

    /**
     * Loga uma transação financeira malsucedida.
     * @param {string} transactionType - O tipo de transação.
     * @param {Error} error - O objeto de erro com o motivo da falha.
     * @param {object} metadata - Dados contextuais (ex: { userId, paymentGateway, attemptedAmount }).
     */
    transactionFailed: (transactionType, error, metadata = {}) =>
        auditLog.error(CATEGORY, `❌ Falha na transação [${transactionType}]`, { transactionType, error, metadata }),

    /**
     * Loga uma falha de comunicação com um gateway de pagamento.
     * @param {string} gatewayName - O nome do gateway (ex: 'Stripe', 'PayPal').
     * @param {Error} error - O erro retornado pela API do gateway.
     */
    paymentGatewayError: (gatewayName, error) =>
        auditLog.critical(CATEGORY, `💳 Falha de comunicação com o gateway de pagamento: ${gatewayName}`, { gatewayName, error }),

    /**
     * Loga uma tentativa de transação com um alto fator de risco detectada pelo sistema de fraude.
     * @param {string} transactionId - O ID da transação suspeita.
     * @param {string} reason - O motivo da suspeita (ex: 'high_risk_country', 'unusual_spending_pattern').
     * @param {number} riskScore - A pontuação de risco.
     */
    highRiskTransaction: (transactionId, reason, riskScore) =>
        auditLog.warn(CATEGORY, `🚩 Transação de alto risco detectada: ${transactionId}`, { transactionId, reason, riskScore }),
};

module.exports = financialEvents;
