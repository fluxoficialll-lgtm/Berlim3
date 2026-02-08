/**
 * @file backend/service/audit/content-events.js
 * @description Logs de eventos relacionados à gestão e moderação de conteúdo.
 * Categoria do Log: CONTENT
 */

const auditLog = require('./audit-log');
const CATEGORY = 'CONTENT';

const contentEvents = {

    /**
     * Loga a criação de um novo conteúdo.
     * @param {string} contentId - O ID do conteúdo criado.
     * @param {string} contentType - O tipo de conteúdo (ex: 'post', 'comment', 'image').
     * @param {string} authorId - O ID do autor.
     */
    contentCreated: (contentId, contentType, authorId) =>
        auditLog.info(CATEGORY, `📝 Conteúdo '${contentType}' criado`, { contentId, contentType, authorId }),

    /**
     * Loga a exclusão de um conteúdo.
     * @param {string} contentId - O ID do conteúdo excluído.
     * @param {string} deletedBy - O ID de quem excluiu (pode ser o próprio autor ou um moderador).
     */
    contentDeleted: (contentId, deletedBy) =>
        auditLog.info(CATEGORY, `🗑️ Conteúdo '${contentId}' excluído`, { contentId, deletedBy }),

    /**
     * Loga a aprovação de um conteúdo por um moderador.
     * @param {string} contentId - O ID do conteúdo aprovado.
     * @param {string} moderatorId - O ID do moderador.
     */
    contentApproved: (contentId, moderatorId) =>
        auditLog.info(CATEGORY, `✅ Conteúdo '${contentId}' aprovado`, { contentId, moderatorId }),

    /**
     * Loga a rejeição de um conteúdo por um moderador.
     * @param {string} contentId - O ID do conteúdo rejeitado.
     * @param {string} moderatorId - O ID do moderador.
     * @param {string} reason - A razão da rejeição.
     */
    contentRejected: (contentId, moderatorId, reason) =>
        auditLog.warn(CATEGORY, `❌ Conteúdo '${contentId}' rejeitado`, { contentId, moderatorId, reason }),

    /**
     * Loga a falha de um serviço externo de segurança (ex: filtro de profanidade).
     * @param {string} serviceName - O nome do serviço (ex: 'PERSPECTIVE_API').
     * @param {string} contentId - O ID do conteúdo que estava sendo analisado.
     * @param {Error} error - O erro retornado pelo serviço.
     */
    securityServiceFailed: (serviceName, contentId, error) =>
        auditLog.critical(CATEGORY, `🛡️ Falha no serviço de segurança '${serviceName}'`, { serviceName, contentId, error }),
};

module.exports = contentEvents;
