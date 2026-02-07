/**
 * @file backend/service/audit/navigation-events.js
 * @description Logs de eventos de fluxo de navegação para análise de UX e depuração de funis.
 * Categoria do Log: NAVIGATION
 */

const auditLog = require('./audit-log');
const CATEGORY = 'NAVIGATION';

const navigationEvents = {

    /**
     * Loga o início de um fluxo de navegação multi-etapas.
     * @param {string} flowName - O nome do fluxo (ex: 'ONBOARDING', 'CHECKOUT').
     * @param {string} userId - O ID do usuário iniciando o fluxo.
     * @param {object} metadata - Dados iniciais do fluxo (ex: { itemId, source }).
     */
    flowStarted: (flowName, userId, metadata = {}) =>
        auditLog.info(CATEGORY, `🚀 Fluxo '${flowName}' iniciado pelo usuário ${userId}`, { flowName, userId, step: 'START', state: 'STARTED', metadata }),

    /**
     * Loga a conclusão bem-sucedida de uma etapa dentro de um fluxo.
     * @param {string} flowName - O nome do fluxo.
     * @param {string} stepName - O nome da etapa concluída (ex: 'PROFILE_PICTURE_UPLOAD').
     * @param {string} userId - O ID do usuário.
     * @param {object} metadata - Dados contextuais da etapa.
     */
    flowStepCompleted: (flowName, stepName, userId, metadata = {}) =>
        auditLog.info(CATEGORY, `✅ Etapa '${stepName}' do fluxo '${flowName}' concluída`, { flowName, stepName, userId, state: 'COMPLETED', metadata }),

    /**
     * Loga uma falha em uma etapa do fluxo.
     * @param {string} flowName - O nome do fluxo.
     * @param {string} stepName - O nome da etapa que falhou.
     * @param {string} userId - O ID do usuário.
     * @param {Error} error - O objeto de erro que causou a falha.
     * @param {object} metadata - Dados que podem ter levado ao erro.
     */
    flowStepFailed: (flowName, stepName, userId, error, metadata = {}) =>
        auditLog.error(CATEGORY, `❌ Falha na etapa '${stepName}' do fluxo '${flowName}'`, { flowName, stepName, userId, state: 'FAILED', error, metadata }),

    /**
     * Loga o abandono de um fluxo pelo usuário.
     * @param {string} flowName - O nome do fluxo abandonado.
     * @param {string} lastCompletedStep - A última etapa que o usuário concluiu com sucesso.
     * @param {string} userId - O ID do usuário.
     */
    flowAbandoned: (flowName, lastCompletedStep, userId) =>
        auditLog.warn(CATEGORY, `🚫 Fluxo '${flowName}' abandonado pelo usuário ${userId}`, { flowName, lastCompletedStep, userId, state: 'ABANDONED' }),

    /**
     * Loga um redirecionamento inesperado ou uma quebra de fluxo.
     * @param {string} fromUrl - A URL de origem.
     * @param {string} toUrl - A URL de destino.
     * @param {string} userId - O ID do usuário.
     * @param {string} reason - A razão do redirecionamento (ex: 'UNAUTHENTICATED', 'INVALID_STATE').
     */
    unexpectedRedirect: (fromUrl, toUrl, userId, reason) =>
        auditLog.warn(CATEGORY, `↪️ Redirecionamento inesperado de ${fromUrl} para ${toUrl}`, { fromUrl, toUrl, userId, reason }),
};

module.exports = navigationEvents;
