
import { User, UserProfile, NotificationSettings, SecuritySettings, PaymentProviderConfig } from '../../types';
import { MOCK_USERS } from './';

// --- Constantes para as chaves do localStorage ---
// Evita erros de digitação e centraliza os nomes das chaves.
const TOKEN_KEY = 'auth_token'; // Chave para o token de autenticação.
const CACHE_KEY = 'cached_user_profile'; // Chave para o perfil do usuário em cache.
const USER_ID_KEY = 'user_id'; // Chave para o ID do usuário.

// --- Serviço de Autenticação Mock (para desenvolvimento) ---
// Este serviço simula o comportamento da API de autenticação sem fazer chamadas de rede.
// Utiliza o localStorage para persistir o estado de login no navegador.
export const authService = {
  // Valida se uma string tem o formato de um e-mail.
  isValidEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  
  // Verifica se o usuário está autenticado (se existe um token).
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  // Simula o processo de login com e-mail e senha.
  login: async (email: string, password: string) => {
    const cleanEmail = email.toLowerCase().trim();
    // Procura o usuário no objeto de usuários mockados.
    let user = Object.values(MOCK_USERS).find(u => u.email === cleanEmail);
    
    // Se o usuário não existir, cria um novo usuário mockado para teste.
    if (!user) {
        user = {
            id: 'u-mock-' + Math.random().toString(36).substr(2, 5),
            email: cleanEmail,
            isVerified: true,
            isProfileCompleted: true,
            profile: { 
                name: cleanEmail.split('@')[0], 
                nickname: 'Usuário Teste', 
                isPrivate: false,
                photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanEmail}`
            }
        };
    }

    // Salva o estado de autenticação no localStorage.
    localStorage.setItem(TOKEN_KEY, 'mock_token_' + Date.now());
    localStorage.setItem(CACHE_KEY, JSON.stringify(user));
    localStorage.setItem(USER_ID_KEY, user.id);
    
    // Retorna o usuário e o próximo passo (para onde redirecionar).
    return { 
        user, 
        nextStep: user.isProfileCompleted ? '/feed' : '/complete-profile' 
    };
  },

  // Simula o login com Google.
  loginWithGoogle: async (token?: string, referredBy?: string) => {
    const user = MOCK_USERS['creator']; // Usa um usuário mockado padrão.
    localStorage.setItem(TOKEN_KEY, 'mock_token_google_' + Date.now());
    localStorage.setItem(CACHE_KEY, JSON.stringify(user));
    localStorage.setItem(USER_ID_KEY, user.id);
    return { user, nextStep: '/feed' };
  },

  // Simula o início do processo de registro.
  register: async (email: string, password: string, referredBy?: string) => {
    localStorage.setItem('temp_register_email', email.toLowerCase().trim());
    return true;
  },

  // Simula a verificação de um código (ex: 2FA ou confirmação de e-mail).
  verifyCode: async (email: string, code: string) => {
    const mockUser = {
        id: 'u-' + Math.random().toString(36).substr(2, 9),
        email: email.toLowerCase().trim(),
        isVerified: true,
        isProfileCompleted: false,
        profile: { name: email.split('@')[0], isPrivate: false }
    };
    localStorage.setItem(TOKEN_KEY, 'mock_token_' + Date.now());
    localStorage.setItem(CACHE_KEY, JSON.stringify(mockUser));
    localStorage.setItem(USER_ID_KEY, mockUser.id);
    return true;
  },

  // Simula o envio de um código de verificação.
  sendVerificationCode: async (email: string) => {
      console.log("[MOCK] O código de verificação é: 123456");
  },
  
  // Simula a finalização do perfil do usuário após o registro.
  completeProfile: async (email: string, data: UserProfile) => {
    const user = authService.getCurrentUser();
    if (user) {
        user.profile = data;
        user.isProfileCompleted = true;
        localStorage.setItem(CACHE_KEY, JSON.stringify(user));
        return user;
    }
    throw new Error("Sessão expirada. Não foi possível completar o perfil.");
  },

  // Obtém o ID do usuário atual do localStorage.
  getCurrentUserId: () => localStorage.getItem(USER_ID_KEY),
  // Obtém o e-mail do usuário atual.
  getCurrentUserEmail: () => authService.getCurrentUser()?.email || null,
  // Obtém o objeto completo do usuário atual do cache.
  getCurrentUser: (): User | null => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      try { return JSON.parse(cached); } catch(e) { return null; }
  },
  
  // Simula o processo de logout.
  logout: () => {
    // Limpa todas as informações de autenticação do localStorage.
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(USER_ID_KEY);
    // Redireciona o usuário para a página inicial.
    window.location.href = '/#/';
  },

  // Retorna todos os usuários mockados.
  getAllUsers: () => Object.values(MOCK_USERS),
  
  // Simula a busca de usuários.
  searchUsers: async (q: string) => {
      const term = q.toLowerCase();
      return Object.values(MOCK_USERS).filter(u => 
        u.profile?.name?.toLowerCase().includes(term) || 
        u.profile?.nickname?.toLowerCase().includes(term)
      );
  },

  // Simula a busca de um usuário pelo seu @handle.
  fetchUserByHandle: async (handle: string) => {
      const clean = handle.replace('@', '').toLowerCase();
      return Object.values(MOCK_USERS).find(u => u.profile?.name === clean);
  },

  // Simula a obtenção de um usuário pelo seu @handle (versão síncrona).
  getUserByHandle: (handle: string) => {
      const clean = handle.replace('@', '').toLowerCase();
      return Object.values(MOCK_USERS).find(u => u.profile?.name === clean);
  },

  // Funções mockadas que não precisam de implementação detalhada para o desenvolvimento.
  updateHeartbeat: () => {},
  checkUsernameAvailability: async () => true,
  updateNotificationSettings: async () => {},
  updateSecuritySettings: async () => {},

  // Simula a atualização das configurações de pagamento.
  updatePaymentConfig: async (config: PaymentProviderConfig) => {
      const user = authService.getCurrentUser();
      if (user) {
          const configs = user.paymentConfigs || {};
          if (config.isConnected) {
              configs[config.providerId] = config;
              user.paymentConfig = config; // Mantém compatibilidade com a estrutura antiga.
          } else {
              delete configs[config.providerId];
              if (user.paymentConfig?.providerId === config.providerId) {
                  delete user.paymentConfig;
              }
          }
          
          user.paymentConfigs = { ...configs };
          localStorage.setItem(CACHE_KEY, JSON.stringify(user));
          
          // Dispara um evento de 'storage' para notificar outras abas/componentes da mudança.
          window.dispatchEvent(new Event('storage'));
      }
  },

  // Funções mockadas que retornam valores padrão.
  getUserSessions: () => [],
  revokeOtherSessions: async () => {},
  resetPassword: async () => ({ success: true }),
  changePassword: async (current: string, next: string) => { return { success: true }; },
  syncRemoteUsers: async () => {} // Não faz nada, pois não há sincronização real.
};
