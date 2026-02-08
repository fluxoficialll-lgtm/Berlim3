
import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import envConfig from './config/env.js'; // Importa a configuração centralizada

// Importar o SDK do Firebase Functions
import { onRequest } from 'firebase-functions/v2/https';

// A conexão com o banco de dados deve ser feita uma vez quando a função é inicializada.
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  // Este endpoint agora será acessível em /api/ se for chamado pelo gateway do Firebase
  res.send('API is running inside a Cloud Function....');
});

// Os middlewares de erro devem ser adicionados depois das suas rotas
app.use(notFound);
app.use(errorHandler);

// Exporta a aplicação Express como uma Cloud Function chamada 'api'
export const api = onRequest(app);
