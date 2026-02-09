
import { User, AuthError } from '../../../types';
import { emailService } from '../../emailService';
import { cryptoService } from '../../cryptoService';
import { API_BASE } from '../../../apiConfig';
// import { db } from '@/database';
import { AccountSyncService } from '../../sync/AccountSyncService';
import { hydrationManager } from '../../sync/HydrationManager';
import { USE_MOCKS, MOCK_USERS } from '../../../mocks';

const API_URL = `${API_BASE}/api/auth`;

// Armazenará a função de atualização do authService
let notifyStateChange: (user: User | null) => void = () => {};

export const AuthFlow = {
    // --- NOVO: Injetor de dependência ---
    setUserUpdater(updater: (user: User | null) => void) {
        notifyStateChange = updater;
    },

    async performLoginSync(user: User) {
        // Persistência em cache e IndexedDB
        db.users.set(user);
        localStorage.setItem('auth_token', user.token || 'mock_token'); // Garante que o token está no LS
        db.auth.setCurrentUserId(user.id);

        // --- PONTO CRÍTICO --- 
        // Notifica o authService sobre a mudança de estado ANTES de qualquer outra coisa.
        notifyStateChange(user);
        // ---------------------

        hydrationManager.markReady('AUTH');
        
        if (!USE_MOCKS) {
            AccountSyncService.performFullSync().catch(console.error);
        }
    },

    async login(email: string, password: string): Promise<{ user: User; nextStep: string }> {
        if (USE_MOCKS) {
            const user = MOCK_USERS['creator'];
            await this.performLoginSync(user);
            return { user, nextStep: '/feed' };
        }

        const safeEmail = String(email || '').toLowerCase().trim();
        const hashed = await cryptoService.hashPassword(password);
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: safeEmail, password: hashed })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Falha no login.");

        // Anexa o token ao objeto de usuário para consistência
        data.user.token = data.token;

        await this.performLoginSync(data.user);
        return { user: data.user, nextStep: data.user.isBanned ? '/banned' : (!data.user.isProfileCompleted ? '/complete-profile' : '/feed') };
    },

    async loginWithGoogle(googleToken?: string, referredBy?: string): Promise<{ user: User; nextStep: string }> {
        if (USE_MOCKS) {
            const user = MOCK_USERS['user'];
            await this.performLoginSync(user);
            return { user, nextStep: '/feed' };
        }

        const response = await fetch(`${API_URL}/google`, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ googleToken, referredBy: referredBy || null }) 
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Falha no Google Auth.");
        
        // Anexa o token ao objeto de usuário
        data.user.token = data.token;

        await this.performLoginSync(data.user);
        return { user: data.user, nextStep: data.user.isBanned ? '/banned' : (data.isNew ? '/complete-profile' : '/feed') };
    },

    // ... (O restante das funções permanece o mesmo, mas agora performLoginSync notifica o estado global)

    async register(email: string, password: string, referredById?: string) {
        if (!email) throw new Error("E-mail é obrigatório.");
        const safeEmail = String(email).toLowerCase().trim();
        const hashed = await cryptoService.hashPassword(password);
        localStorage.setItem('temp_register_email', safeEmail);
        localStorage.setItem('temp_register_pw', hashed);
        if (referredById) localStorage.setItem('temp_referred_by_id', referredById);
        await this.sendVerificationCode(safeEmail);
    },

    async verifyCode(email: string, code: string, isResetFlow: boolean = false) {
        if (USE_MOCKS) return true;
        if (!email) throw new Error("E-mail não identificado para verificação.");
        
        const safeEmail = String(email).toLowerCase().trim();
        const session = JSON.parse(localStorage.getItem(`verify_${safeEmail}`) || '{}');
        if (!session.code || Date.now() > session.expiresAt) throw new Error(AuthError.CODE_EXPIRED);
        if (session.code !== code) throw new Error(AuthError.CODE_INVALID);
        
        if (!isResetFlow) {
            const response = await fetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: safeEmail, 
                    password: localStorage.getItem('temp_register_pw'), 
                    isVerified: true, 
                    referredById: localStorage.getItem('temp_referred_by_id') || undefined,
                    profile: { name: safeEmail.split('@')[0].replace(/[^a-z0-9]/g, ''), nickname: 'Novo Usuário', isPrivate: false }
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            data.user.token = 'session_' + Date.now(); // Simula um token de sessão
            await this.performLoginSync(data.user);
        }
        return true;
    },

    async sendVerificationCode(email: string, type: 'register' | 'reset' = 'register') {
        if (!email) return;
        const safeEmail = String(email).toLowerCase().trim();
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem(`verify_${safeEmail}`, JSON.stringify({ code, expiresAt: Date.now() + 900000 }));
        if (!USE_MOCKS) await emailService.sendVerificationCode(safeEmail, code, type);
        else alert(`[DEMO] Código: ${code}`);
    },

    async resetPassword(email: string, password: string) {
        if (!email) throw new Error("E-mail é obrigatório.");
        const safeEmail = String(email).toLowerCase().trim();
        const hashed = await cryptoService.hashPassword(password);
        const res = await fetch(`${API_URL}/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: safeEmail, password: hashed })
        });
        return res.json();
    }
};
