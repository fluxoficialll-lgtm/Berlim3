/**
 * @file backend/service/audit/index.js
 * @description Ponto de entrada central para todos os eventos de auditoria do sistema.
 * Este arquivo exporta todos os loggers de eventos específicos, facilitando a importação em outras partes do sistema.
 */

const authEvents = require('./auth-events');
const contentEvents = require('./content-events');
const dataSyncEvents = require('./data-sync-events');
const dbEvents = require('./db-events');
const externalApiEvents = require('./external-api-events');
const financialEvents = require('./financial-events');
const frontendEvents = require('./frontend-events');
const navigationEvents = require('./navigation-events');
const thirdPartyAuthEvents = require('./third-party-auth-events');
const userEvents = require('./user-events');

/**
 * Módulo unificado que expõe todos os loggers de auditoria.
 * Agora, em vez de importar cada arquivo de log separadamente, basta importar este módulo.
 * 
 * Exemplo de uso em outro arquivo:
 * const audit = require('./backend/service/audit');
 * audit.auth.loginSuccess('user123', 'password');
 * audit.dataSync.syncTaskFailed('user123', 'PROFILE', new Error('User not found'));
 * audit.externalApi.apiRequestFailed('STRIPE', '/v1/charges', new Error('Invalid API Key'), 350);
 * audit.frontend.pageRenderSuccess('FEED', 'user123');
 * audit.financial.transactionFailed('PAYOUT', { error: new Error('Insufficient funds') });
 * audit.navigation.flowStarted('CHECKOUT', 'user456');
 * audit.thirdPartyAuth.authFlowInitiated('GOOGLE', 'LOGIN');
 */
module.exports = {
    auth: authEvents,
    content: contentEvents,
    dataSync: dataSyncEvents,
    database: dbEvents,
    externalApi: externalApiEvents,
    financial: financialEvents,
    frontend: frontendEvents,
    navigation: navigationEvents,
    thirdPartyAuth: thirdPartyAuthEvents,
    user: userEvents,
};
