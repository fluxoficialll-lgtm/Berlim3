/**
 * @file backend/service/audit/data-sync-events.js
 * @description Logs de eventos para processos de sincronização de dados do cliente (após login, reconexão, etc.).
 * Categoria do Log: DATA_SYNC
 */

const auditLog = require('./audit-log');
const CATEGORY = 'DATA_SYNC';

const dataSyncEvents = {

    /**
     * Loga o início de um processo de sincronização de dados para o cliente.
     * @param {string} userId - O ID do usuário para quem os dados estão sendo sincronizados.
     * @param {string} trigger - O gatilho para a sincronização (ex: 'POST_LOGIN', 'APP_RESUME').
     */
    syncStarted: (userId, trigger) =>
        auditLog.info(CATEGORY, `🔄 Sincronização de dados iniciada para o usuário ${userId}`, { userId, trigger, state: 'STARTED' }),

    /**
     * Loga o sucesso na sincronização de uma unidade de dados específica.
     * @param {string} userId - O ID do usuário.
     * @param {string} dataType - O tipo de dado sincronizado (ex: 'PROFILE', 'SETTINGS', 'NOTIFICATIONS').
     * @param {number} duration - O tempo que levou para sincronizar esta unidade de dados.
     */
    syncTaskSuccess: (userId, dataType, duration) =>
        auditLog.info(CATEGORY, `✅ Tarefa de sincronização '${dataType}' concluída (${duration}ms)`, { userId, dataType, duration, state: 'TASK_SUCCESS' }),

    /**
     * Loga a falha na sincronização de uma unidade de dados específica.
     * @param {string} userId - O ID do usuário.
     * @param {string} dataType - O tipo de dado que falhou ao sincronizar.
     * @param {Error} error - O erro que causou a falha.
     */
    syncTaskFailed: (userId, dataType, error) =>
        auditLog.error(CATEGORY, `❌ Falha na tarefa de sincronização '${dataType}' para o usuário ${userId}`, { userId, dataType, error, state: 'TASK_FAILED' }),

    /**
     * Loga a conclusão bem-sucedida de todo o processo de sincronização.
     * @param {string} userId - O ID do usuário.
     * @param {number} totalDuration - O tempo total do processo de sincronização.
     */
    syncCompleted: (userId, totalDuration) =>
        auditLog.info(CATEGORY, `🎉 Sincronização de dados concluída com sucesso para ${userId} (${totalDuration}ms)`, { userId, totalDuration, state: 'COMPLETED' }),

    /**
     * Loga uma falha crítica que impede a continuação da experiência do usuário.
     * Acontece se uma tarefa essencial (como buscar o perfil) falhar.
     * @param {string} userId - O ID do usuário.
     * @param {string} failedDataType - O tipo de dado essencial que falhou.
     * @param {number} totalDuration - O tempo total até a falha.
     */
    syncFailed: (userId, failedDataType, totalDuration) =>
        auditLog.critical(CATEGORY, `💥 Falha crítica na sincronização de dados para ${userId} no item '${failedDataType}'`, { userId, failedDataType, totalDuration, state: 'FAILED' }),
};

module.exports = dataSyncEvents;
