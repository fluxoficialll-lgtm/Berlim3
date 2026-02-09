
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import router from './routes/index.js';
import configRoutes from './routes/configRoutes.js';
import initSocket from './config/socket.js';
import envConfig from './config/env.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/api', configRoutes);

// Correctly serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.get(/.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = envConfig.PORT;

const httpServer = http.createServer(app);

const io = initSocket(httpServer);

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [System] Servidor Flux iniciado e escutando na porta ${PORT}.`);
});
