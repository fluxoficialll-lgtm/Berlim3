/**
 * @file backend/service/audit/user-events.js
 * @description Logs de eventos relacionados ao ciclo de vida e gerenciamento do usuário.
 * Categoria do Log: USER
 */

const auditLog = require('./audit-log');
const CATEGORY = 'USER';

const userEvents = {

    /**
     * Loga a criação de um novo usuário.
     * @param {string} userId - O ID do novo usuário.
     * @param {string} signUpMethod - O método de cadastro (ex: 'password', 'google').
     */
    userCreated: (userId, signUpMethod) =>
        auditLog.info(CATEGORY, `✨ Novo usuário criado: ${userId}`, { userId, signUpMethod }),

    /**
     * Loga a exclusão de uma conta de usuário.
     * @param {string} userId - O ID do usuário excluído.
     * @param {string} deletedBy - Quem executou a exclusão ('self' ou o ID de um admin).
     */
    userDeleted: (userId, deletedBy) =>
        auditLog.info(CATEGORY, `🗑️ Conta de usuário excluída: ${userId}`, { userId, deletedBy }),

    /**
     * Loga uma solicitação de redefinição de senha.
     * @param {string} email - O e-mail para o qual a redefinição foi solicitada.
     */
    passwordResetRequested: (email) =>
        auditLog.info(CATEGORY, `🔑 Solicitação de redefinição de senha para: ${email}`, { email }),

    /**
     * Loga a conclusão bem-sucedida de uma redefinição de senha.
     * @param {string} userId - O ID do usuário que redefiniu a senha.
     */
    passwordResetCompleted: (userId) =>
        auditLog.info(CATEGORY, `✅ Senha redefinida com sucesso para o usuário: ${userId}`, { userId }),

    /**
     * Loga a atualização de informações do perfil de um usuário.
     * @param {string} userId - O ID do usuário que foi atualizado.
     * @param {string[]} updatedFields - Os campos que foram alterados (ex: ['name', 'profile_picture']).
     */
    profileUpdated: (userId, updatedFields) =>
        auditLog.info(CATEGORY, `👤 Perfil do usuário ${userId} atualizado`, { userId, updatedFields }),
};

module.exports = userEvents;
