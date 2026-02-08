
import pg from 'pg';
import envConfig from './env.js';

const { Pool } = pg;

// A connection pool é mais eficiente para gerenciar múltiplas conexões
const pool = new Pool({
  connectionString: envConfig.DATABASE_URL,
  // Adicionar configuração SSL se estiver em produção e o provedor exigir
  ssl: envConfig.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const connectDB = async () => {
  try {
    // Testa a conexão pegando um cliente do pool
    const client = await pool.connect();
    console.log('PostgreSQL Connected');
    // Libera o cliente de volta para o pool
    client.release();
  } catch (error) {
    console.error(`Error connecting to PostgreSQL: ${error.message}`);
    process.exit(1);
  }
};

// Exporta o pool para que possa ser usado para fazer queries em outros arquivos
export { pool };
// Exporta a função de conexão para ser usada no server.js
export default connectDB;
