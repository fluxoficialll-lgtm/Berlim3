/**
 * @file backend/service/audit/content-events.js
 * @description Logs de eventos relacionados à gestão de conteúdo (posts, reels, etc.).
 * Categoria do Log: CONTENT
 */

const auditLog = require('./audit-log');
const CATEGORY = 'CONTENT';

const contentEvents = {

    /**
     * Loga a criação de um novo conteúdo.
     * @param {string} userId - O ID do usuário que criou o conteúdo.
     * @param {string} contentType - O tipo de conteúdo (ex: 'POST', 'REEL', 'COMMENT').
     * @param {string} contentId - O ID do conteúdo criado.
     */
    contentCreated: (userId, contentType, contentId) =>
        auditLog.info(CATEGORY, `Conteúdo (${contentType}) criado por ${userId}`, { userId, contentType, contentId }),

    /**
     * Loga a exclusão de um conteúdo.
     * @param {string} actorId - O ID de quem excluiu (usuário ou moderador).
     * @param {string} contentId - O ID do conteúdo excluído.
     * @param {string} reason - A razão para a exclusão (ex: 'User action', 'Moderation').
     */
    contentDeleted: (actorId, contentId, reason) =>
        auditLog.info(CATEGORY, `Conteúdo ${contentId} excluído por ${actorId}`, { actorId, contentId, reason }),

    /**
     * Loga a modificação de um conteúdo.
     * @param {string} userId - O ID do usuário que modificou o conteúdo.
     * @param {string} contentId - O ID do conteúdo modificado.
     */
    contentModified: (userId, contentId) =>
        auditLog.info(CATEGORY, `Conteúdo ${contentId} modificado por ${userId}`, { userId, contentId }),

    /**
     * Loga uma ação de moderação em um conteúdo.
     * @param {string} moderatorId - O ID do moderador.
     * @param {string} contentId - O ID do conteúdo.
     * @param {string} action - A ação de moderação (ex: 'HIDDEN', 'FLAGGED', 'BANNED_USER').
     * @param {string} justification - A justificativa da moderação.
     */
    moderationAction: (moderatorId, contentId, action, justification) =>
        auditLog.warn(CATEGORY, `Ação de moderação (${action}) no conteúdo ${contentId} por ${moderatorId}`,
            { moderatorId, contentId, action, justification }),

    /**
     * Loga a falha na verificação de segurança de um conteúdo.
     * @param {string} contentId - O ID do conteúdo que falhou na verificação.
     * @param {string} service - O serviço de segurança que falhou (ex: 'ContentSafetyService').
     * @param {object} details - Detalhes da falha.
     */
    contentSafetyFailure: (contentId, service, details) =>
        auditLog.error(CATEGORY, `Falha de segurança no conteúdo ${contentId} via ${service}`,
            { contentId, service, details }),
};

module.exports = contentEvents;
