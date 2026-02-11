
// Importa tipos de dados e serviços necessários de outras partes do aplicativo.
import { User, AuthError } from '../../../types';
import { emailService } from '../../emailService';
import { cryptoService } from '../../cryptoService';
import { API_BASE } from '../../../apiConfig';
// A dependência direta do banco de dados (db) foi comentada, sugerindo uma refatoração futura.
// import { db } from '@/database'; 
import { AccountSyncService } from '../../sync/AccountSyncService';
import { hydrationManager } from '../../sync/HydrationManager';
// A importação de mocks foi corrigida para o caminho correto.
import { USE_MOCKS, MOCK_USERS } from '../../mocks';

// Define a URL base para as chamadas de API de autenticação.
const API_URL = `${API_BASE}/api/auth`;

/**
 * Variável de Módulo: notifyStateChange
 * 
 * Armazena uma função de callback que será usada para notificar o authService (ou qualquer
 * outro "ouvinte") sobre mudanças no estado de autenticação do usuário (ex: login, logout).
 * Isso desacopla o fluxo de autenticação do gerenciador de estado principal.
 */
let notifyStateChange: (user: User | null) => void = () => {};

/**
 * Objeto: AuthFlow
 * 
 * Orquestra todo o processo de autenticação, incluindo login, registro,
 * verificação de código, recuperação de senha e sincronização de dados do usuário.
 * Este objeto atua como uma camada de serviço que lida com a lógica de negócios
 * e a comunicação com a API.
 */
export const AuthFlow = {
    /**
     * Injeta a função de callback para atualizar o estado do usuário.
     * @param updater A função que recebe o objeto do usuário (ou null) e atualiza o estado global.
     */
    setUserUpdater(updater: (user: User | null) => void) {
        notifyStateChange = updater;
    },

    /**
     * Sincroniza o estado do usuário após um login bem-sucedido.
     * Esta função centraliza as ações pós-login.
     * @param user O objeto do usuário que acabou de fazer login.
     */
    async performLoginSync(user: User) {
        // Persiste o token de autenticação no localStorage para manter a sessão entre as atualizações da página.
        localStorage.setItem('auth_token', user.token || 'mock_token');

        // Notifica o sistema (através do callback injetado) que o usuário mudou.
        // Este é um passo CRÍTICO para garantir que a UI reaja imediatamente ao login.
        notifyStateChange(user);

        // Sinaliza ao gerenciador de "hidratação" que a parte de autenticação está pronta.
        hydrationManager.markReady('AUTH');
        
        // Se o sistema não estiver usando dados mocados, inicia a sincronização completa da conta em segundo plano.
        if (!USE_MOCKS) {
            AccountSyncService.performFullSync().catch(console.error);
        }
    },

    /**
     * Realiza o login com e-mail e senha.
     * @param email O e-mail do usuário.
     * @param password A senha do usuário.
     * @returns Uma promessa que resolve com o usuário e o próximo passo (rota) no aplicativo.
     */
    async login(email: string, password: string): Promise<{ user: User; nextStep: string }> {
        // Se estiver usando mocks, retorna um usuário falso e evita a chamada de API.
        if (USE_MOCKS) {
            const user = MOCK_USERS['creator'];
            await this.performLoginSync(user);
            return { user, nextStep: '/feed' };
        }

        // Limpa e normaliza o e-mail antes de enviar para a API.
        const safeEmail = String(email || '').toLowerCase().trim();
        // Criptografa a senha antes de enviá-la.
        const hashed = await cryptoService.hashPassword(password);
        
        // Realiza a chamada de API para o endpoint de login.
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: safeEmail, password: hashed })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Falha no login.");

        // Anexa o token JWT recebido ao objeto do usuário para uso futuro.
        data.user.token = data.token;

        // Executa a rotina de pós-login.
        await this.performLoginSync(data.user);
        // Determina para qual página o usuário deve ser redirecionado.
        return { user: data.user, nextStep: data.user.isBanned ? '/banned' : (!data.user.isProfileCompleted ? '/complete-profile' : '/feed') };
    },

    /**
     * Lida com o fluxo de autenticação via Google.
     * @param googleToken O token recebido do Google.
     * @param referredBy ID do usuário que o indicou (opcional).
     * @returns O usuário e a próxima rota.
     */
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
        
        data.user.token = data.token;

        await this.performLoginSync(data.user);
        // Redireciona para completar o perfil se for um novo usuário.
        return { user: data.user, nextStep: data.user.isBanned ? '/banned' : (data.isNew ? '/complete-profile' : '/feed') };
    },

    /**
     * Inicia o processo de registro.
     * Armazena temporariamente os dados e envia um código de verificação por e-mail.
     */
    async register(email: string, password: string, referredById?: string) {
        if (!email) throw new Error("E-mail é obrigatório.");
        const safeEmail = String(email).toLowerCase().trim();
        const hashed = await cryptoService.hashPassword(password);
        // Armazena dados no localStorage para serem usados após a verificação do código.
        localStorage.setItem('temp_register_email', safeEmail);
        localStorage.setItem('temp_register_pw', hashed);
        if (referredById) localStorage.setItem('temp_referred_by_id', referredById);
        await this.sendVerificationCode(safeEmail);
    },

    /**
     * Verifica o código de 6 dígitos enviado ao e-mail do usuário.
     * Se o código for válido e não for um fluxo de reset de senha, finaliza o registro.
     */
    async verifyCode(email: string, code: string, isResetFlow: boolean = false) {
        if (USE_MOCKS) return true;
        if (!email) throw new Error("E-mail não identificado para verificação.");
        
        const safeEmail = String(email).toLowerCase().trim();
        // Recupera a sessão de verificação do localStorage.
        const session = JSON.parse(localStorage.getItem(`verify_${safeEmail}`) || '{}');
        // Valida o código e seu tempo de expiração.
        if (!session.code || Date.now() > session.expiresAt) throw new Error(AuthError.CODE_EXPIRED);
        if (session.code !== code) throw new Error(AuthError.CODE_INVALID);
        
        // Se não for um fluxo de reset, cria o usuário no banco.
        if (!isResetFlow) {
            const response = await fetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: safeEmail, 
                    password: localStorage.getItem('temp_register_pw'), 
                    isVerified: true, 
                    referredById: localStorage.getItem('temp_referred_by_id') || undefined,
                    // Cria um perfil básico inicial para o usuário.
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

    /**
     * Gera e envia um código de verificação para o e-mail do usuário.
     */
    async sendVerificationCode(email: string, type: 'register' | 'reset' = 'register') {
        if (!email) return;
        const safeEmail = String(email).toLowerCase().trim();
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        // Armazena o código e o tempo de expiração no localStorage.
        localStorage.setItem(`verify_${safeEmail}`, JSON.stringify({ code, expiresAt: Date.now() + 900000 })); // 15 minutos
        if (!USE_MOCKS) {
            await emailService.sendVerificationCode(safeEmail, code, type);
        } else {
            // Em modo de desenvolvimento, exibe o código em um alerta para facilitar o teste.
            alert(`[DEMO] Código: ${code}`);
        }
    },

    /**
     * Conclui o fluxo de redefinição de senha.
     */
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
