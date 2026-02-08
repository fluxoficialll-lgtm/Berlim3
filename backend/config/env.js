
import { env } from "node:process";
import dotenv from 'dotenv';
import path from 'path';

// Configuração do dotenv para carregar o arquivo .env da raiz do projeto.
// Esta abordagem permite que as variáveis de ambiente definidas no provedor de hospedagem
// (process.env) tenham prioridade se já existirem, e carrega do .env se não existirem.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Gestor Central de Variáveis de Ambiente (Backend)
 *
 * Este arquivo centraliza o acesso a todas as variáveis de ambiente.
 * A lógica é a seguinte:
 * 1. Tenta carregar as variáveis de um arquivo `.env` na raiz do projeto.
 * 2. Se o arquivo não existir, ou uma variável específica não estiver definida nele,
 *    o sistema utilizará as variáveis de ambiente globais (fornecidas pelo
 *    ambiente de hospedagem, como Render, Vercel, etc.).
 */

const envConfig = {
    // Ambiente da Aplicação: 'development', 'production', ou 'test'
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Porta do Servidor
    PORT: process.env.PORT || 3000,

    // URL de Conexão com o Banco de Dados PostgreSQL
    // Será lida do .env ou das variáveis de ambiente do host.
    DATABASE_URL: process.env.DATABASE_URL,

    // Credenciais do Google OAuth 2.0
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    
    // URL pública da API do backend (usada para callbacks do OAuth e outros)
    VITE_API_URL: process.env.VITE_API_URL,

    // Token secreto para proteger endpoints administrativos
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,

    // Credenciais para o Gateway de Pagamento SyncPay
    SYNC_PAY_CLIENT_ID: process.env.SYNC_PAY_CLIENT_ID,
    SYNC_PAY_CLIENT_SECRET: process.env.SYNC_PAY_CLIENT_SECRET
};

// --- Validação de Sanidade ---
// Em ambiente de produção, é crucial garantir que as variáveis críticas estejam definidas.
if (envConfig.NODE_ENV === 'production') {
    const requiredKeys = [
        'DATABASE_URL',
        'GOOGLE_CLIENT_ID',
        'GOOGLE_CLIENT_SECRET',
        'VITE_API_URL',
        'ADMIN_TOKEN'
    ];

    const missingKeys = requiredKeys.filter(key => !envConfig[key]);

    if (missingKeys.length > 0) {
        console.error('❌ ERRO CRÍTICO: As seguintes variáveis de ambiente estão ausentes:');
        missingKeys.forEach(key => console.error(`  - ${key}`));
        
        // Impede a inicialização do servidor se variáveis críticas estiverem faltando em produção.
        throw new Error('Servidor interrompido devido à ausência de variáveis de ambiente críticas.');
    }
}

export default envConfig;
