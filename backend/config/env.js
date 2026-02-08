
import dotenv from 'dotenv';
import path from 'path';

// Carrega as variáveis de ambiente do arquivo .env na raiz do projeto.
// As variáveis definidas no ambiente de hospedagem (ex: Render) terão prioridade.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Gestor Central de Variáveis de Ambiente (Backend)
 *
 * Este objeto exporta todas as variáveis de ambiente necessárias para a aplicação,
 * buscando-as em `process.env`. Isso centraliza a configuração e torna o
 * acesso às variáveis mais explícito e seguro.
 */
const envConfig = {
  // --- Configurações Gerais ---
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  APP_URL: process.env.APP_URL,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,

  // --- Tokens e Segredos ---
  ADMIN_TOKEN: process.env.ADMIN_TOKEN,
  JWT_SECRET: process.env.JWT_SECRET,
  USER_TOKEN: process.env.USER_TOKEN,

  // --- Banco de Dados ---
  DATABASE_URL: process.env.DATABASE_URL,

  // --- Autenticação Google ---
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  // --- API da Render ---
  RENDER_API_KEY: process.env.RENDER_API_KEY,

  // --- Upload de Arquivos (Cloudflare R2 / S3) ---
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
  R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,

  // --- Envio de E-mail (SMTP) ---
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,

  // --- URLs de API (Frontend) ---
  VITE_API_URL: process.env.VITE_API_URL,
  VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,

  // --- Pagamentos ---
  PAYMENT_API_URL: process.env.PAYMENT_API_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  SYNC_PAY_CLIENT_ID: process.env.SYNC_PAY_CLIENT_ID,
  SYNC_PAY_CLIENT_SECRET: process.env.SYNC_PAY_CLIENT_SECRET,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
  PAYPAL_MERCHANT_ID: process.env.PAYPAL_MERCHANT_ID,
};

// Validação: Verifica se as variáveis essenciais estão presentes
const requiredVariables = [
  'DATABASE_URL',
  'JWT_SECRET',
  'ADMIN_TOKEN'
];

const missingVariables = requiredVariables.filter(key => !envConfig[key]);

if (missingVariables.length > 0) {
  console.error('❌ ERRO CRÍTICO: As seguintes variáveis de ambiente estão ausentes:');
  missingVariables.forEach(key => console.error(`  - ${key}`));
  // Em um ambiente de produção, é crucial parar a execução se variáveis essenciais estiverem faltando.
  if (envConfig.NODE_ENV === 'production') {
    process.exit(1);
  }
}

export default envConfig;
