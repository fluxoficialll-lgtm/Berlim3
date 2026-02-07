
import { createLogger, format, transports } from 'winston';

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.errors({ stack: true }),
    format.json()
);

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: logFormat,
    transports: [new transports.Console()],
    exitOnError: false,
});

export default logger;
