
import envConfig from './env.js';

/**
 * Configurações de Autenticação (Backend)
 * 
 * Os valores são lidos a partir do gestor central de variáveis de ambiente.
 */

const getRedirectUri = () => {
    const baseUrl = (envConfig.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
    return `${baseUrl}/auth/callback`;
};

export const googleAuthConfig = {
    // Chave Pública
    clientId: envConfig.GOOGLE_CLIENT_ID,
    
    // Chave Privada
    clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
    
    // URI de Redirecionamento para o fluxo OAuth
    redirectUri: getRedirectUri()
};
