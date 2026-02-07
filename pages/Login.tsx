
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { trackingService } from '../services/trackingService';
import { API_BASE } from '../apiConfig';
import { LoginInitialCard } from '../features/auth/components/LoginInitialCard';
import { LoginEmailCard } from '../features/auth/components/LoginEmailCard';
import { logger, LogCategory } from '../services/loggingService';
import { User } from '../types';

declare const google: any;

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const isProcessing = useRef(false);

    // Efeito para NAVEGAR/RECARREGAR QUANDO o usuário for autenticado com sucesso
    useEffect(() => {
        // Só age se não estiver carregando e houver um usuário definido
        if (!isLoading && loggedInUser) {
            logger.info(LogCategory.NAVIGATION, 'useEffect detectou usuário, forçando reload para /feed', { userId: loggedInUser.id });
            window.location.href = '/feed';
        }
    }, [isLoading, loggedInUser]);

    const loginWithGoogle = useCallback(async (credential: string) => {
        if (isProcessing.current) return;
        isProcessing.current = true;
        
        logger.info(LogCategory.AUTH, 'Tentativa de login com Google iniciada');
        setIsLoading(true);
        setError(null);
        
        try {
            const referredBy = trackingService.getAffiliateRef() || undefined;
            const result = await authService.loginWithGoogle(credential, referredBy);
            
            if (result && result.user) {
                logger.info(LogCategory.AUTH, 'Login com Google bem-sucedido, definindo usuário no estado', { userId: result.user.id });
                setLoggedInUser(result.user);
            } else {
                throw new Error("Resposta de autenticação inválida do servidor.");
            }
        } catch (err: any) {
            logger.error(LogCategory.AUTH, 'Falha no login com Google', err);
            setError(err.message || 'Falha ao autenticar com Google.');
        } finally {
            // **CORREÇÃO CRÍTICA**: Garante que o estado de carregamento seja desativado
            // e o processamento seja liberado, tanto em sucesso quanto em falha.
            setIsLoading(false);
            isProcessing.current = false;
        }
    }, []);

    const loginWithEmail = useCallback(async (email: string, password: string) => {
        if (isProcessing.current) return;
        isProcessing.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.login(email, password);
            if (result && result.user) {
                setLoggedInUser(result.user);
            } else {
                throw new Error("Resposta de autenticação de e-mail inválida.");
            }
        } catch (err: any) {
            setError(err.message || 'Credenciais de e-mail inválidas.');
        } finally {
            // Garante que o estado de carregamento seja desativado
            setIsLoading(false);
            isProcessing.current = false;
        }
    }, []);
    
    const [pageLoading, setPageLoading] = useState(true);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const GOOGLE_BTN_ID = 'googleButtonDiv';

    useEffect(() => { trackingService.captureUrlParams(); }, [location]);

    // Efeito de checagem inicial. Se já estiver logado, redireciona.
    useEffect(() => {
        if (authService.isAuthenticated()) {
            navigate('/feed', { replace: true });
        } else {
            setPageLoading(false);
        }
    }, [navigate]);

    const handleGoogleResponse = useCallback((response: any) => {
        if (response?.credential) {
            loginWithGoogle(response.credential);
        } else {
            logger.error(LogCategory.AUTH, "Resposta de credencial do Google inválida", response);
        }
    }, [loginWithGoogle]);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginWithEmail(email, password);
    };

    // Efeito de inicialização do botão do Google
    useEffect(() => {
        if (pageLoading || showEmailForm) return;
        let isMounted = true;
        const initGoogle = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/auth/config`);
                const config = await res.json();
                const clientId = config.clientId;
                if (!isMounted || !clientId || clientId.includes("CONFIGURADO")) return;

                const interval = setInterval(() => {
                    const googleBtn = document.getElementById(GOOGLE_BTN_ID);
                    if (typeof google !== 'undefined' && google.accounts && googleBtn) {
                        clearInterval(interval);
                        google.accounts.id.initialize({ client_id: clientId, callback: handleGoogleResponse, auto_select: false });
                        google.accounts.id.renderButton(googleBtn, { theme: 'filled_black', size: 'large', width: '400' });
                    }
                }, 100);
            } catch (err) { logger.error(LogCategory.AUTH, "Falha ao inicializar Google Client", err); }
        };
        initGoogle();
        return () => { isMounted = false; };
    }, [pageLoading, showEmailForm, handleGoogleResponse]);

    if (pageLoading) return null;

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white font-['Inter'] relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]"></div>
            </div>
            <div className="w-full max-w-[400px] mx-4 bg-white/5 backdrop-blur-2xl rounded-[32px] p-10 border border-white/10 shadow-2xl relative z-10 flex flex-col items-center">
                {showEmailForm ? (
                    <LoginEmailCard 
                        email={email} setEmail={setEmail} password={password} setPassword={setPassword}
                        onSubmit={handleEmailSubmit} onBackToGoogle={() => setShowEmailForm(false)}
                        loading={isLoading} error={error || ''}
                    />
                ) : (
                    <LoginInitialCard 
                        onSelectEmail={() => setShowEmailForm(true)} googleButtonId={GOOGLE_BTN_ID}
                        loading={pageLoading} googleProcessing={isLoading}
                    />
                )}
                {isLoading && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-[32px] flex items-center justify-center z-50">
                        <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl"></i>
                    </div>
                )}
            </div>
        </div>
    );
};
