/**
 * @file backend/service/audit/external-api-events.js
 * @description Logs de eventos para todas as chamadas a APIs externas.
 * Categoria do Log: EXTERNAL_API
 */

const auditLog = require('./audit-log');
const CATEGORY = 'EXTERNAL_API';

const externalApiEvents = {

    /**
     * Loga o início de uma chamada para uma API externa.
     * @param {string} serviceName - O nome do serviço externo (ex: 'STRIPE', 'GOOGLE_MAPS').
     * @param {string} endpoint - O endpoint que está sendo chamado (ex: '/v1/charges').
     */
    apiRequestInitiated: (serviceName, endpoint) =>
        auditLog.info(CATEGORY, `🛰️ Chamada para API externa [${serviceName}] iniciada`, { serviceName, endpoint, state: 'INITIATED' }),

    /**
     * Loga uma resposta bem-sucedida de uma API externa.
     * @param {string} serviceName - O nome do serviço.
     * @param {string} endpoint - O endpoint chamado.
     * @param {number} statusCode - O status code HTTP da resposta (ex: 200, 201).
     * @param {number} duration - A duração da chamada em milissegundos.
     */
    apiRequestSuccess: (serviceName, endpoint, statusCode, duration) =>
        auditLog.info(CATEGORY, `✅ Sucesso na chamada para [${serviceName}] (${duration}ms)`, { serviceName, endpoint, statusCode, duration, state: 'SUCCESS' }),

    /**
     * Loga uma falha na chamada para uma API externa.
     * @param {string} serviceName - O nome do serviço.
     * @param {string} endpoint - O endpoint que falhou.
     * @param {Error} error - O erro (pode ser um erro de rede, timeout, ou status code 4xx/5xx).
     * @param {number} duration - A duração da chamada até a falha.
     */
    apiRequestFailed: (serviceName, endpoint, error, duration) =>
        auditLog.error(CATEGORY, `❌ Falha na chamada para [${serviceName}] (${duration}ms)`, { serviceName, endpoint, error, duration, state: 'FAILED' }),

    /**
     * Loga uma mudança de estado em um circuit breaker para uma API externa.
     * Útil para detectar quando um serviço externo está instável.
     * @param {string} serviceName - O nome do serviço.
     * @param {string} state - O novo estado do circuit breaker ('OPEN', 'CLOSED', 'HALF_OPEN').
     */
    apiCircuitBreakerStateChange: (serviceName, state) =>
        auditLog.warn(CATEGORY, `⚡ O circuit breaker para [${serviceName}] mudou para o estado: ${state}`, { serviceName, state }),
};

module.exports = externalApiEvents;
