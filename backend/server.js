
import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import envConfig from './config/env.js'; // Importa a configuração centralizada

const startServer = async () => {
  try {
    // Garante que a conexão com o banco de dados seja estabelecida antes de iniciar o servidor
    await connectDB();
  } catch (error) {
    // Se a conexão com o banco de dados falhar, o servidor não será iniciado.
    // Isso evita erros obscuros e deixa claro qual é o problema.
    console.error('❌ Falha ao conectar ao banco de dados. O servidor não foi iniciado.', error);
    process.exit(1); // Encerra o processo com um código de erro.
  }

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.send('API is running...');
  });

  // Middlewares de erro devem ser adicionados após as rotas
  app.use(notFound);
  app.use(errorHandler);

  // Usa a porta definida no ambiente (pelo Firebase Studio ou Render) ou 3000 como padrão.
  const PORT = envConfig.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`✅ Server running in ${envConfig.NODE_ENV} mode on port ${PORT}`);
  });
};

// Inicia o servidor
startServer();
