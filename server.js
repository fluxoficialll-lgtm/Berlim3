
import http from 'http';
import app from './backend/app.js';
import initSocket from './backend/config/socket.js';
import envConfig from './backend/config/env.js';

// O envConfig agora é a fonte única da verdade para variáveis de ambiente.
const PORT = envConfig.PORT;

// Cria o servidor HTTP usando a aplicação Express configurada
const httpServer = http.createServer(app);

// Inicializa o Socket.io com o servidor HTTP
const io = initSocket(httpServer);

// Inicia o servidor para escutar na porta definida
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [System] Servidor Flux iniciado e escutando na porta ${PORT}.`);
});
