
// backend/service/audit/audit-log.js

const { createLogger, format, transports } = require('winston');

// O formato JSON é ideal para plataformas de logging estruturado como a Render.
const logFormat = format.combine(
    // Adiciona um timestamp em formato padronizado
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    // Garante que o stack trace de erros seja logado
    format.errors({ stack: true }),
    // Formata a saída final como JSON
    format.json()
);

// Criamos um logger principal que escreve para o console.
// A Render irá capturar esse stream (stdout/stderr).
const logger = createLogger({
    // O nível de log a ser capturado. Em produção, isso pode ser 'info', 
    // mas para depuração, 'debug' é melhor. Pode ser controlado por uma variável de ambiente.
    level: process.env.LOG_LEVEL || 'debug',
    format: logFormat,
    // O transporte principal será o Console.
    transports: [new transports.Console()],
    // Não encerra a aplicação em exceções não tratadas
    exitOnError: false,
});

/**
 * Loga um evento de auditoria de alto nível (ações importantes do usuário).
 * @param {string} eventName - Nome do evento (e.g., 'USER_LOGIN_SUCCESS').
 * @param {object} details - Detalhes do evento (e.g., { userId, ipAddress }).
 */
const logAuditEvent = (eventName, details) => {
    // Eventos de auditoria são logados com nível 'info'.
    logger.info(eventName, { log_type: 'AUDIT', ...details });
};

/**
 * Loga um traço de depuração detalhado para o fluxo interno da aplicação.
 * @param {string} category - Categoria do log (e.g., 'AUTH_FLOW').
 * @param {string} message - Mensagem do log.
 * @param {object} [data] - Dados suplementares opcionais.
 */
const logDebugTrace = (category, message, data = {}) => {
    // Logs de depuração usam o nível 'debug'.
    logger.debug(message, { log_type: 'TRACE', category, ...data });
};

/**
 * Loga um erro de forma estruturada.
 * @param {string} category - Categoria onde o erro ocorreu.
 * @param {string} message - Mensagem de erro amigável.
 * @param {Error} error - O objeto de erro capturado.
 * @param {object} [data] - Dados contextuais adicionais.
 */
const logError = (category, message, error, data = {}) => {
    logger.error(message, {
        log_type: 'ERROR',
        category,
        error: {
            message: error.message,
            stack: error.stack,
        },
        ...data,
    });
};

// CORREÇÃO: Usando module.exports para compatibilidade com CommonJS
module.exports = {
    logAuditEvent,
    logDebugTrace,
    logError,
    logger,
};
