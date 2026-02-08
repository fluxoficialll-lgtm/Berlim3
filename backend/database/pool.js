
import pg from 'pg';
import envConfig from '../config/env.js';

const { Pool } = pg;

// A validação agora é feita no módulo 'env.js'
if (!envConfig.DATABASE_URL) {
    console.error("❌ ERRO CRÍTICO: DATABASE_URL não definida. Verifique sua configuração de ambiente.");
}

const poolConfig = {
    connectionString: envConfig.DATABASE_URL,
    ssl: envConfig.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 25,
    allowExitOnIdle: false 
};

export const pool = new Pool(poolConfig);

pool.on('error', (err) => {
    console.error('🚨 [POSTGRES] Erro inesperado no pool:', err.message);
});

/**
 * Wrapper de query com inteligência de auto-recuperação
 */
export const query = async (text, params) => {
    try {
        return await pool.query(text, params);
    } catch (error) {
        // Código 42P01 = undefined_table (A tabela sumiu ou o banco foi zerado)
        if (error.code === '42P01') {
            console.error(`⚠️ [DB_HEAL]: A tabela referenciada não existe. Tentando reconstruir estrutura...`);
            // Lançamos um erro customizado que o manager pode capturar
            error.isMissingTable = true;
        }
        
        console.error(`❌ [DB_QUERY_ERROR]: ${error.message}`);
        throw error;
    }
};
