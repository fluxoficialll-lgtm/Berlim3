
import express from 'express';
import envConfig from '../config/env.js';

const router = express.Router();

/**
 * Endpoint para Expor Configurações Públicas ao Frontend
 *
 * Este endpoint fornece uma maneira segura de o frontend obter as variáveis de 
 * ambiente necessárias, sem expor segredos ou chaves de API sensíveis.
 */
router.get('/config', (req, res) => {
  try {
    // Apenas as variáveis seguras e necessárias para o cliente são expostas.
    const publicConfig = {
      // URL da API para o frontend se conectar
      API_URL: envConfig.VITE_API_URL,
      // ID do Cliente Google para autenticação no lado do cliente
      GOOGLE_CLIENT_ID: envConfig.VITE_GOOGLE_CLIENT_ID,
      // ID do Pixel do Facebook/Meta para tracking
      PIXEL_ID: envConfig.VITE_PIXEL_ID,
      // A URL pública do bucket de armazenamento, para exibir imagens e arquivos
      R2_PUBLIC_URL: envConfig.R2_PUBLIC_URL,
      // O ambiente atual (development, production, etc)
      NODE_ENV: envConfig.NODE_ENV,
    };

    res.json(publicConfig);

  } catch (error) {
    console.error('Erro ao obter a configuração para o frontend:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar configuração.' });
  }
});

export default router;
