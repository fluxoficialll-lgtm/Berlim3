/**
 * @file backend/service/audit/audit-log.js
 * @description O serviço central de logging e auditoria estruturada.
 * Este módulo padroniza todos os logs da aplicação para facilitar a análise em produção.
 */

const LOG_LEVELS = {
    INFO: 'INFO',       // Para eventos de rotina importantes (ex: serviço iniciado).
    WARN: 'WARN',       // Para anomalias que não são erros (ex: tentativa de login com senha errada).
    ERROR: 'ERROR',     // Para erros de execução que são tratados (ex: falha na validação de dados).
    CRITICAL: 'CRITICAL' // Para erros que quebram uma funcionalidade (ex: falha de conexão com o banco).
};

/**
 * Escreve um log estruturado no formato JSON para o console.
 * @param {string} level - O nível do log (INFO, WARN, ERROR, CRITICAL).
 * @param {string} category - A categoria do evento (ex: AUTH, FINANCIAL, DATABASE).
 * @param {string} message - A mensagem descritiva do log.
 * @param {object} details - Um objeto com detalhes adicionais e contextualizados.
 */
function writeLog(level, category, message, details = {}) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        category,
        message,
        details,
    };

    // Garante que a stack trace seja incluída para erros, o que é CRUCIAL para a depuração.
    if (details.error instanceof Error) {
        logEntry.stack = details.error.stack;
        details.error = {
            message: details.error.message,
            name: details.error.name,
            ...details.error
        };
    }

    // Usar console.log para o output padrão. Em produção, isso será capturado por serviços de log.
    console.log(JSON.stringify(logEntry, null, 2));
}

const auditLog = {
    info: (category, message, details) => writeLog(LOG_LEVELS.INFO, category, message, details),
    warn: (category, message, details) => writeLog(LOG_LEVELS.WARN, category, message, details),
    error: (category, message, details) => writeLog(LOG_LEVELS.ERROR, category, message, details),
    critical: (category, message, details) => writeLog(LOG_LEVELS.CRITICAL, category, message, details),
};

module.exports = auditLog;
