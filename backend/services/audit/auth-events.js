/**
 * @file backend/service/audit/auth-events.js
 * @description Logs de eventos de autenticação e autorização.
 * Categoria do Log: AUTH
 */

const auditLog = require('./audit-log');
const CATEGORY = 'AUTH';

const authEvents = {

    /**
     * Loga uma tentativa de login bem-sucedida.
     * @param {string} userId - O ID do usuário que fez login.
     * @param {string} method - O método de login (ex: 'password', 'google', 'facebook').
     */
    loginSuccess: (userId, method) =>
        auditLog.info(CATEGORY, `✅ Login bem-sucedido para o usuário: ${userId}`, { userId, method }),

    /**
     * Loga uma tentativa de login malsucedida.
     * @param {string} email - O e-mail que foi usado na tentativa de login.
     * @param {string} reason - A razão da falha (ex: 'wrong_password', 'user_not_found').
     */
    loginFailed: (email, reason) =>
        auditLog.warn(CATEGORY, `❌ Falha no login para o e-mail: ${email}`, { email, reason }),

    /**
     * Loga o logout de um usuário.
     * @param {string} userId - O ID do usuário que fez logout.
     */
    logout: (userId) =>
        auditLog.info(CATEGORY, `👋 Logout do usuário: ${userId}`, { userId }),

    /**
     * Loga a atualização de um token de acesso.
     * @param {string} userId - O ID do usuário cujo token foi atualizado.
     */
    tokenRefreshed: (userId) =>
        auditLog.info(CATEGORY, `🔄 Token de acesso atualizado para o usuário: ${userId}`, { userId }),

    /**
     * Loga uma tentativa de acesso a um recurso sem a permissão necessária.
     * @param {string} userId - O ID do usuário que tentou o acesso.
     * @param {string} resource - O recurso que o usuário tentou acessar.
     * @param {string} requiredPermission - A permissão que era necessária.
     */
    permissionDenied: (userId, resource, requiredPermission) =>
        auditLog.error(CATEGORY, `🚫 Acesso negado ao recurso '${resource}' para o usuário: ${userId}`, { userId, resource, requiredPermission }),
};

module.exports = authEvents;
