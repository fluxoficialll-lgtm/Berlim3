
import { UserProfile, NotificationSettings, SecuritySettings, PaymentProviderConfig, User } from '../../types';
import { AuthFlow } from './auth/AuthFlow';
import { UserDirectory } from './auth/UserDirectory';
import { IdentitySecurity } from './auth/IdentitySecurity';
import { ProfileManager } from './auth/ProfileManager';
import { PreferenceManager } from './auth/PreferenceManager';
import { trackingService } from './trackingService';

// --- Início: Sistema Reativo de Autenticação ---

type Subscriber = (user: User | null) => void;
let subscribers: Subscriber[] = [];
let currentUser: User | null = null;

// Tenta carregar o usuário do localStorage na inicialização
try {
    const data = localStorage.getItem('cached_user_profile');
    if (data) currentUser = JSON.parse(data);
} catch { 
    currentUser = null; 
}

const notifySubscribers = () => {
    for (const subscriber of subscribers) {
        subscriber(currentUser);
    }
};

const updateUser = (user: User | null) => {
    currentUser = user;
    if (user) {
        localStorage.setItem('cached_user_profile', JSON.stringify(user));
        localStorage.setItem('user_id', user.id);
    } else {
        localStorage.removeItem('cached_user_profile');
        localStorage.removeItem('user_id');
        localStorage.removeItem('auth_token');
    }
    notifySubscribers();
};

// Hook personalizado para reatividade
const useAuth = () => {
    const [user, setUser] = React.useState(currentUser);

    React.useEffect(() => {
        const subscriber = (newUser: User | null) => setUser(newUser);
        subscribers.push(subscriber);

        // Cleanup: remove o subscriber quando o componente desmontar
        return () => {
            subscribers = subscribers.filter(s => s !== subscriber);
        };
    }, []);

    return user;
};

// --- Fim: Sistema Reativo ---

// O AuthFlow precisará usar o `updateUser` para notificar mudanças.
// Passamos como uma dependência para evitar acoplamento forte.
AuthFlow.setUserUpdater(updateUser);

export const authService = {
    // --- NOVO: API Reativa ---
    subscribe: (callback: Subscriber) => {
        subscribers.push(callback);
        // Chama o callback imediatamente com o estado atual
        callback(currentUser);
        // Retorna uma função de unsubscribe
        return () => {
            subscribers = subscribers.filter(s => s !== callback);
        };
    },
    useAuth, // Exporta o hook para componentes React

    // --- API Existente (modificada para usar o estado em memória) ---
    isValidEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    isAuthenticated: () => !!currentUser && !!localStorage.getItem('auth_token'),

    // Delegados (sem alteração necessária, pois usam os getters abaixo)
    syncRemoteUsers: () => UserDirectory.syncRemoteUsers(authService.getCurrentUserId()),
    searchUsers: (q: string) => UserDirectory.searchUsers(q),
    fetchUserByHandle: (h: string, f?: string) => UserDirectory.fetchUserByHandle(h, f),
    getUserByHandle: (h: string) => UserDirectory.getUserByHandle(h),
    getAllUsers: () => UserDirectory.getAllUsers(),

    login: AuthFlow.login,
    loginWithGoogle: AuthFlow.loginWithGoogle,
    register: AuthFlow.register,
    verifyCode: AuthFlow.verifyCode,
    sendVerificationCode: AuthFlow.sendVerificationCode,
    resetPassword: AuthFlow.resetPassword,
    performLoginSync: (u: User) => AuthFlow.performLoginSync(u),

    updateHeartbeat: () => IdentitySecurity.updateHeartbeat(authService.getCurrentUserId()),
    getUserSessions: () => IdentitySecurity.getUserSessions(authService.getCurrentUserEmail()),
    revokeOtherSessions: () => {
        const email = authService.getCurrentUserEmail();
        return email ? IdentitySecurity.revokeOtherSessions(email) : Promise.resolve();
    },
    changePassword: (cur: string, nxt: string) => {
        const email = authService.getCurrentUserEmail();
        if (!email) throw new Error("Não autenticado");
        return IdentitySecurity.changePassword(email, cur, nxt);
    },

    completeProfile: (e: string, d: UserProfile) => ProfileManager.completeProfile(e, d),
    checkUsernameAvailability: (n: string) => ProfileManager.checkUsernameAvailability(n),

    updateNotificationSettings: (s: NotificationSettings) => {
        const email = authService.getCurrentUserEmail();
        return email ? PreferenceManager.updateNotificationSettings(email, s) : Promise.resolve();
    },
    updateSecuritySettings: (s: SecuritySettings) => {
        const email = authService.getCurrentUserEmail();
        return email ? PreferenceManager.updateSecuritySettings(email, s) : Promise.resolve();
    },
    updatePaymentConfig: (c: PaymentProviderConfig) => {
        const email = authService.getCurrentUserEmail();
        if (!email) {
            const cached = authService.getCurrentUser();
            if (cached?.email) return PreferenceManager.updatePaymentConfig(cached.email, c);
            throw new Error("Usuário não identificado para salvar configuração.");
        }
        return PreferenceManager.updatePaymentConfig(email, c);
    },

    // Getters agora leem do estado em memória reativo
    getCurrentUserId: () => currentUser?.id || null,
    getCurrentUserEmail: () => currentUser?.email || null,
    getCurrentUser: (): User | null => currentUser,

    logout: () => { 
        updateUser(null); // Limpa o estado do usuário localmente
        // TODO: Enviar uma requisição para o backend para invalidar a sessão/token na API.
        // Ex: axios.post('/api/auth/logout');
        sessionStorage.clear(); // Limpa dados da sessão do navegador
        trackingService.hardReset(); 
        window.location.href = '/#/'; // Redireciona para a home
    }
};

// Import React para o hook, se não estiver globalmente disponível
import React from 'react';
