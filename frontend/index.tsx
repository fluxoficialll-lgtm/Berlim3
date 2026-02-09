
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { validateEnvironment } from './services/environmentValidator';
import { initNetworkInterceptor } from './services/telemetry/NetworkInterceptor';
import { logger, LogCategory } from './services/loggingService';
import { initializeAppConfig } from './services/configService'; // Importa o inicializador de configuração

// Função de inicialização assíncrona
async function main() {
  try {
    // 1. Carrega a configuração da aplicação ANTES de tudo
    await initializeAppConfig();
    logger.info(LogCategory.LIFECYCLE, 'Configuração da aplicação carregada com sucesso.');

    // 2. Validação de Infraestrutura antes do boot
    validateEnvironment();

    // 3. Inicialização de Telemetria e Observabilidade
    initNetworkInterceptor();

    // 4. Captura Global de Erros (Safety Net)
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (e) => {
        if (e.message && e.message.includes('ResizeObserver loop')) {
          e.stopImmediatePropagation();
          return;
        }
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
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

  } catch (error) {
    logger.critical(LogCategory.LIFECYCLE, 'Falha crítica na inicialização da aplicação.', error);
    // Exibe uma mensagem de erro para o usuário
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = '<div style="text-align: center; margin-top: 50px;"><h1>Erro Crítico</h1><p>A aplicação não pôde ser iniciada. Por favor, contate o suporte.</p></div>';
    }
  }
}

// Inicia a aplicação
main();
