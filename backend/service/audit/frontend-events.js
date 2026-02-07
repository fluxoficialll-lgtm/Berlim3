/**
 * @file backend/service/audit/frontend-events.js
 * @description Logs de eventos de renderização e interações importantes no frontend.
 * Categoria do Log: FRONTEND
 */

const auditLog = require('./audit-log');
const CATEGORY = 'FRONTEND';

const frontendEvents = {

    /**
     * Loga quando uma página principal ou view é renderizada com sucesso.
     * @param {string} pageName - O nome da página (ex: 'FEED', 'PROFILE', 'LOGIN').
     * @param {string} userId - O ID do usuário, se autenticado.
     */
    pageRenderSuccess: (pageName, userId) =>
        auditLog.info(CATEGORY, `📄 Página '${pageName}' renderizada com sucesso`, { pageName, userId, event: 'PAGE_RENDER_SUCCESS' }),

    /**
     * Loga uma falha na renderização de uma página ou de um componente crítico.
     * @param {string} pageName - O nome da página ou componente que falhou.
     * @param {Error} error - O erro que causou a falha.
     * @param {string} userId - O ID do usuário, se disponível.
     */
    pageRenderFailed: (pageName, error, userId) =>
        auditLog.error(CATEGORY, `❌ Falha ao renderizar a página '${pageName}'`, { pageName, userId, error, event: 'PAGE_RENDER_FAILED' }),

    /**
     * Loga o início de uma ação assíncrona importante iniciada pelo usuário no frontend.
     * @param {string} actionName - O nome da ação (ex: 'LOAD_FEED_DATA', 'SUBMIT_POST').
     * @param {string} userId - O ID do usuário.
     */
    asyncActionStarted: (actionName, userId) =>
        auditLog.info(CATEGORY, `⏳ Iniciando ação assíncrona: '${actionName}'`, { actionName, userId, event: 'ASYNC_ACTION_STARTED' }),
};

module.exports = frontendEvents;
