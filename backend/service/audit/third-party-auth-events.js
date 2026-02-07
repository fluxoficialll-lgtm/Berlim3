/**
 * @file backend/service/audit/third-party-auth-events.js
 * @description Logs de eventos para fluxos de autenticação de terceiros (Google, Facebook, etc.).
 * Categoria do Log: THIRD_PARTY_AUTH
 */

const auditLog = require('./audit-log');
const CATEGORY = 'THIRD_PARTY_AUTH';

const thirdPartyAuthEvents = {

    /**
     * Loga o início de uma tentativa de autenticação com um provedor terceiro.
     * @param {string} provider - O provedor de autenticação (ex: 'GOOGLE', 'FACEBOOK').
     * @param {string} flowType - O tipo de fluxo (ex: 'LOGIN', 'SIGNUP', 'LINK_ACCOUNT').
     */
    authFlowInitiated: (provider, flowType) =>
        auditLog.info(CATEGORY, `🚀 Fluxo de autenticação com ${provider} iniciado`, { provider, flowType, step: 'INITIATED' }),

    /**
     * Loga o recebimento do callback do provedor, contendo o código de autorização ou token.
     * @param {string} provider - O provedor.
     * @param {boolean} hasAuthCode - Confirma se o código de autorização foi recebido.
     * @param {object} queryParams - Os parâmetros da query recebidos no callback (para depuração).
     */
    callbackReceived: (provider, hasAuthCode, queryParams) =>
        auditLog.info(CATEGORY, `📥 Callback de ${provider} recebido`, { provider, step: 'CALLBACK_RECEIVED', hasAuthCode, queryParams }),

    /**
     * Loga uma falha no callback, como um erro de permissão negada pelo usuário.
     * @param {string} provider - O provedor.
     * @param {object} errorDetails - O objeto de erro retornado pelo provedor.
     */
    callbackFailed: (provider, errorDetails) =>
        auditLog.error(CATEGORY, `❌ Falha no callback de ${provider}`, { provider, step: 'CALLBACK_FAILED', errorDetails }),

    /**
     * Loga o sucesso na verificação do token/código com o provedor e a obtenção do perfil.
     * @param {string} provider - O provedor.
     * @param {string} userEmail - O e-mail do usuário retornado pelo provedor.
     */
    profileVerified: (provider, userEmail) =>
        auditLog.info(CATEGORY, `✅ Perfil de ${provider} verificado com sucesso para ${userEmail}`, { provider, step: 'PROFILE_VERIFIED', userEmail }),

    /**
     * Loga uma falha na verificação do token (ex: token inválido, expirado ou API do provedor fora do ar).
     * @param {string} provider - O provedor.
     * @param {Error} error - O erro detalhado da falha na verificação.
     */
    profileVerificationFailed: (provider, error) =>
        auditLog.critical(CATEGORY, `🚨 Falha ao verificar perfil de ${provider}`, { provider, step: 'PROFILE_VERIFICATION_FAILED', error }),

    /**
     * Loga o momento em que o sistema associa o login do terceiro a uma conta de usuário interna (encontrando ou criando).
     * @param {string} provider - O provedor.
     * @param {string} userId - O ID do usuário interno.
     * @param {boolean} isNewUser - Se a conta foi criada neste fluxo.
     */
    userAccountAssociated: (provider, userId, isNewUser) =>
        auditLog.info(CATEGORY, `🔗 Conta interna ${userId} associada ao login de ${provider}`, { provider, userId, isNewUser, step: 'ACCOUNT_ASSOCIATED' }),

    /**
     * Loga a conclusão bem-sucedida de todo o fluxo de autenticação.
     * @param {string} provider - O provedor.
     * @param {string} userId - O ID do usuário interno.
     */
    authFlowCompleted: (provider, userId) =>
        auditLog.info(CATEGORY, `🏁 Fluxo de autenticação com ${provider} concluído para ${userId}`, { provider, userId, step: 'COMPLETED' }),
};

module.exports = thirdPartyAuthEvents;
