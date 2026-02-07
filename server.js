
import http from 'http';
import app from './backend/app.js';
import { initSocket } from './backend/config/socket.js';
import { setupMiddlewares } from './backend/config/middleware.js';

// Função auxiliar para obter argumentos da linha de comando
const getArgValue = (argName) => {
  const argIndex = process.argv.indexOf(argName);
  return argIndex !== -1 && process.argv.length > argIndex + 1 ? process.argv[argIndex + 1] : null;
};

// Determina a porta, priorizando argumento CLI, .env e, por fim, um padrão
const cliPort = getArgValue('--port');
const PORT = cliPort || process.env.PORT || 3000;

// Cria o servidor HTTP usando a aplicação Express configurada
const httpServer = http.createServer(app);

// Inicializa o Socket.io com o servidor HTTP
const io = initSocket(httpServer);

// Configura middlewares que dependem do Socket.io
// Esta função deve ser ajustada para injetar 'io' no app, se necessário
setupMiddlewares(app, io);

// Inicia o servidor para escutar na porta definida
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [System] Servidor Flux iniciado e escutando na porta ${PORT}.`);
});
