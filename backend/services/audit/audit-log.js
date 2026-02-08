
import logger from '../../config/logger.js';

const logEvent = (level, eventType, details) => {
    const logObject = {
        eventType,
        ...details,
        trace: new Error().stack // Captura o stack trace para rastreabilidade
    };
    logger.log(level, eventType, logObject);
};

export const logAuditEvent = (eventType, details) => {
    logEvent('info', eventType, details);
};

export const logError = (eventType, message, error, details = {}) => {
    logger.error(eventType, {
        message,
        errorMessage: error.message,
        stack: error.stack,
        ...details
    });
};

export const logDebugTrace = (eventType, message, details = {}) => {
    logger.debug(eventType, { message, ...details });
};    
