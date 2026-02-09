
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js';
import configRoutes from './routes/configRoutes.js'; // Importa a nova rota de configuração

const app = express();

// ES Module-friendly way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Todas as rotas da API serão prefixadas com /api
app.use('/api', router);
app.use('/api', configRoutes); // Usa a nova rota de configuração com o prefixo /api

// Servir os arquivos estáticos da aplicação React
// A pasta 'dist' será criada dentro de 'frontend' após o build
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Para qualquer outra rota, servir o index.html do frontend
// Isso permite que o React Router controle a navegação
app.get(/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

// O server.js agora é o responsável por iniciar o servidor.
// Então, a chamada app.listen() é removida deste arquivo.

export default app;
