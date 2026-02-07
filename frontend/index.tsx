
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { validateEnvironment } from './services/environmentValidator';
import { initNetworkInterceptor } from './services/telemetry/NetworkInterceptor';
import { logger, LogCategory } from './services/loggingService'; // Importa o logger

// 1. Validação de Infraestrutura antes do boot
validateEnvironment();

// 2. Inicialização de Telemetria e Observabilidade
initNetworkInterceptor();

// 3. Captura Global de Erros (Safety Net) usando o novo logger
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e) => {
    // Ignora erros comuns e não críticos de ResizeObserver
    if (e.message && e.message.includes('ResizeObserver loop')) {
        e.stopImmediatePropagation();
        return;
    }
    // Garante que o objeto de erro real seja passado para o logger
    const errorToLog = e.error || new Error(e.message || 'Erro global desconhecido');
    logger.critical(
        LogCategory.LIFECYCLE, 
        'Erro global não capturado (window.onerror)', 
        errorToLog,
        { colno: e.colno, lineno: e.lineno, filename: e.filename }
    );
  });

  window.addEventListener('unhandledrejection', (e) => {
    const reason = e.reason || new Error('Rejeição de promise não tratada');
    logger.critical(
        LogCategory.LIFECYCLE, 
        'Rejeição de promise não tratada (unhandledrejection)', 
        reason
    );
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  const criticalError = new Error("Elemento root não encontrado para montar a aplicação.");
  logger.critical(LogCategory.LIFECYCLE, criticalError.message, criticalError);
  throw criticalError;
}

const root = createRoot(rootElement);
root.render(
    <App />
);
