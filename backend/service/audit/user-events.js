/**
 * @file backend/service/audit/user-events.js
 * @description Logs de eventos relacionados ao ciclo de vida e ações dos usuários.
 * Categoria do Log: USER
 */

const auditLog = require('./audit-log');
const CATEGORY = 'USER';

const userEvents = {

    /**
     * Loga a criação de uma nova conta de usuário.
     * @param {string} userId - O ID do novo usuário.
     * @param {string} source - A origem do registro (ex: 'direct', 'google', 'facebook').
     */
    userCreated: (userId, source) =>
        auditLog.info(CATEGORY, `Nova conta de usuário criada: ${userId}`, { userId, source }),

    /**
     * Loga a atualização de um perfil de usuário.
     * @param {string} userId - O ID do usuário que atualizou o perfil.
     * @param {object} updatedFields - Os campos que foram atualizados (ex: { email, new_password_set }).
     */
    profileUpdated: (userId, updatedFields) =>
        auditLog.info(CATEGORY, `Perfil do usuário ${userId} atualizado`, { userId, updatedFields }),

    /**
     * Loga a desativação de uma conta de usuário.
     * @param {string} userId - O ID do usuário desativado.
     * @param {string} reason - O motivo da desativação (ex: 'user_request', 'admin_action').
     */
    accountDeactivated: (userId, reason) =>
        auditLog.warn(CATEGORY, `Conta do usuário ${userId} desativada`, { userId, reason }),

    /**
     * Loga uma solicitação de redefinição de senha.
     * @param {string} email - O e-mail para o qual a redefinição foi solicitada.
     */
    passwordResetRequested: (email) =>
        auditLog.info(CATEGORY, `Solicitação de redefinição de senha para: ${email}`, { email }),

    /**
     * Loga a conclusão bem-sucedida de uma redefinição de senha.
     * @param {string} userId - O ID do usuário que redefiniu a senha.
     */
    passwordResetCompleted: (userId) =>
        auditLog.info(CATEGORY, `Redefinição de senha concluída para o usuário: ${userId}`, { userId }),

    /**
     * Loga a verificação de e-mail de um usuário.
     * @param {string} userId - O ID do usuário que verificou o e-mail.
     */
    emailVerified: (userId) =>
        auditLog.info(CATEGORY, `E-mail verificado para o usuário: ${userId}`, { userId }),
};

module.exports = userEvents;
