
// ⚙️ Importando as dependências essenciais
import dotenv from 'dotenv';
dotenv.config(); // Garante que as variáveis de ambiente sejam carregadas no início de tudo!

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import router from './routes/index.js'; // 🗺️ Nossas rotas principais da API
import configRoutes from './routes/configRoutes.js'; // 🔧 Rotas de configuração
import initSocket from './config/socket.js'; // 🔌 Lógica do Socket.IO
import envConfig from './config/env.js'; // 🔑 Configurações de ambiente

// 🚀 Inicializando o aplicativo Express
const app = express();

// 📂 Configurando caminhos de diretório para ES Modules (o padrão do projeto)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- MIDDLEWARES GLOBAIS ---
// 🚪 Habilita o CORS para permitir que o frontend (em outro domínio) acesse a API
app.use(cors());
// 📦 Middleware para entender requisições com corpo em JSON
app.use(express.json());

// --- ROTAS DA API ---
// 🛣️ Define que todas as rotas principais serão acessadas com o prefixo /api
app.use('/api', router);
// 🔩 Define o mesmo para as rotas de configuração
app.use('/api', configRoutes);

// --- SERVINDO O FRONTEND ---
// 🌳 Aponta para a pasta 'dist' do frontend, onde estão os arquivos da build (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// --- ROTA CORINGA (Fallback) ---
// 🔄 Para qualquer outra requisição que não seja da API, manda o index.html do frontend.
// Isso é essencial para que as rotas do React/Vue/Angular funcionem (Single Page Application)!
app.get(/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
// 🔢 Pega a porta das nossas variáveis de ambiente
const PORT = envConfig.PORT;

// 🏗️ Cria o servidor HTTP usando o app Express
const httpServer = http.createServer(app);

// ✨ Inicializa o Socket.IO, conectando-o ao nosso servidor HTTP
const io = initSocket(httpServer);

// 🎉 Inicia o servidor e o coloca para "ouvir" na porta definida!
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [System] Servidor Flux iniciado e escutando na porta ${PORT}.`);
});
