/**
 * @file backend/service/audit/auth-events.js
 * @description Logs de eventos de autenticação e autorização para fins de segurança.
 * Categoria do Log: AUTH
 */

const auditLog = require('./audit-log');
const CATEGORY = 'AUTH';

const authEvents = {

    /**
     * Loga uma tentativa de login bem-sucedida.
     * @param {string} userId - O ID do usuário que fez o login.
     * @param {string} method - O método de login (ex: 'password', 'google-oauth').
     */
    loginSuccess: (userId, method) =>
        auditLog.info(CATEGORY, `Login bem-sucedido para o usuário: ${userId}`, { userId, method }),

    /**
     * Loga uma tentativa de login fracassada.
     * @param {string} username - O nome de usuário ou e-mail tentado.
     * @param {string} reason - A razão da falha (ex: 'Invalid password', 'User not found').
     */
    loginFailure: (username, reason) =>
        auditLog.warn(CATEGORY, `Tentativa de login fracassada para: ${username}`, { username, reason }),

    /**
     * Loga um evento de logout.
     * @param {string} userId - O ID do usuário que fez logout.
     */
    logout: (userId) =>
        auditLog.info(CATEGORY, `Logout do usuário: ${userId}`, { userId }),

    /**
     * Loga uma falha na renovação de token (ex: token expirado ou inválido).
     * @param {string} userId - O ID do usuário associado ao token.
     * @param {object} error - O erro que causou a falha na renovação.
     */
    tokenRefreshFailed: (userId, error) =>
        auditLog.error(CATEGORY, `Falha na renovação do token para o usuário: ${userId}`, { userId, error: error.message }),

    /**
     * Loga uma alteração de permissão para um usuário.
     * @param {string} adminId - O ID do administrador que realizou a alteração.
     * @param {string} targetUserId - O ID do usuário que teve a permissão alterada.
     * @param {string} permission - A permissão que foi alterada (ex: 'GROUP_ADMIN', 'CONTENT_MODERATOR').
     * @param {string} action - A ação realizada (ex: 'GRANTED', 'REVOKED').
     */
    permissionChanged: (adminId, targetUserId, permission, action) =>
        auditLog.info(CATEGORY, `Permissão ${permission} ${action} para o usuário ${targetUserId} por ${adminId}`,
            { adminId, targetUserId, permission, action }),

    /**
     * Loga um acesso não autorizado a um recurso.
     * @param {string} userId - O ID do usuário que tentou o acesso.
     * @param {string} resource - O recurso que foi tentado acessar (ex: '/admin/dashboard').
     */
    unauthorizedAccess: (userId, resource) =>
        auditLog.critical(CATEGORY, `Acesso não autorizado ao recurso: ${resource} pelo usuário: ${userId}`,
            { userId, resource }),
};

module.exports = authEvents;
