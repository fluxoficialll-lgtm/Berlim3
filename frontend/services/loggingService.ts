
// services/loggingService.ts
import { authService } from './authService';

/**
 * Níveis de severidade do log, inspirados em padrões da indústria.
 */
export enum LogLevel {
  DEBUG = 'DEBUG',       // Informações detalhadas para depuração.
  INFO = 'INFO',         // Eventos de rotina e marcos importantes.
  WARN = 'WARN',         // Anomalias ou situações inesperadas que não são erros fatais.
  ERROR = 'ERROR',       // Erros de execução que foram tratados, mas indicam um problema.
  CRITICAL = 'CRITICAL', // Erros que quebram uma funcionalidade ou toda a aplicação.
}

/**
 * Categorias de eventos para agrupar logs por funcionalidade.
 */
export enum LogCategory {
  AUTH = 'AUTH',                 // Relacionado à autenticação, login, registro, permissões.
  API = 'API',                   // Relacionado a todas as chamadas de rede.
  UI = 'UI',                     // Erros ou eventos na camada de interface (renderização, interação).
  PAYMENT = 'PAYMENT',             // Relacionado a fluxos de pagamento (Stripe, PayPal, etc).
  LIFECYCLE = 'LIFECYCLE',       // Eventos do ciclo de vida da aplicação (inicialização, erros globais).
  NAVIGATION = 'NAVIGATION',         // Relacionado a roteamento e transições de página.
  GENERAL = 'GENERAL',             // Categoria padrão para eventos não especificados.
}

interface LogDetails {
  // Permite anexar qualquer dado estruturado ao log para contexto.
  [key: string]: any;
}

/**
 * A estrutura de um log padronizado.
 */
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: LogCategory;
  message: string;
  url: string;
  user: { id: string | null; email: string | null; };
  details: LogDetails;
  stack?: string; // O stack trace, presente para logs de erro.
}

class LoggingService {
  private getContext() {
    const user = authService.getCurrentUser();
    return {
      url: typeof window !== 'undefined' ? window.location.href : '',
      user: {
        id: user?.id || null,
        email: user?.email || null,
      },
    };
  }

  private write(level: LogLevel, category: LogCategory, message: string, details: LogDetails = {}) {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      ...this.getContext(),
      details,
    };

    // A parte mais CRUCIAL: Se um erro real foi passado, extrai sua mensagem e stack trace.
    if (details.error instanceof Error) {
      logEntry.message = `${message} - ${details.error.message}`;
      logEntry.stack = details.error.stack;
      // Remove o objeto de erro redundante para evitar duplicação
      delete details.error;
    }

    // Em uma aplicação real, aqui você enviaria o log para um serviço externo (Datadog, Sentry, etc.)
    // Por agora, usamos os métodos do console, aplicando formatação para legibilidade.
    const output = JSON.stringify(logEntry, null, 2);

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`[${category}] - ${message}`, logEntry);
        break;
      case LogLevel.INFO:
        console.info(`[${category}] - ${message}`, logEntry);
        break;
      case LogLevel.WARN:
        console.warn(`[${category}] - ${message}`, logEntry);
        break;
      case LogLevel.ERROR:
      case LogLevel.CRITICAL:
        console.error(`[${category}] - ${message}`, logEntry);
        break;
    }
  }

  // Métodos públicos para facilidade de uso
  public debug(category: LogCategory, message: string, details?: LogDetails) {
    this.write(LogLevel.DEBUG, category, message, details);
  }

  public info(category: LogCategory, message: string, details?: LogDetails) {
    this.write(LogLevel.INFO, category, message, details);
  }

  public warn(category: LogCategory, message: string, details?: LogDetails) {
    this.write(LogLevel.WARN, category, message, details);
  }

  public error(category: LogCategory, message: string, error: Error, details?: LogDetails) {
    this.write(LogLevel.ERROR, category, message, { ...details, error });
  }

  public critical(category: LogCategory, message: string, error: Error, details?: LogDetails) {
    this.write(LogLevel.CRITICAL, category, message, { ...details, error });
  }
}

// Exporta uma instância singleton para ser usada em toda a aplicação.
export const logger = new LoggingService();
