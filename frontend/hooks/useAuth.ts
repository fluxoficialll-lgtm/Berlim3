
import { useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { trackingService } from '../services/trackingService';
import { logger, LogCategory } from '../services/loggingService'; // 1. Importar o logger e as categorias

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isProcessing = useRef(false);
    const redirectPath = (location.state as any)?.from?.pathname;

    const handleRedirect = useCallback((user: any, isNewUser: boolean = false) => {
        const targetPath = isNewUser || (user && !user.isProfileCompleted)
            ? '/complete-profile'
            : sessionStorage.getItem('redirect_after_login') || redirectPath || '/feed';
        
        logger.info(LogCategory.NAVIGATION, 'Redirecionando usuário após login', { targetPath, userId: user.id });
        
        if (targetPath.includes('login')) {
             navigate('/feed', { replace: true });
             return;
        }

        if (sessionStorage.getItem('redirect_after_login')) sessionStorage.removeItem('redirect_after_login');
        navigate(targetPath, { replace: true });

    }, [navigate, redirectPath]);

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
                logger.info(LogCategory.AUTH, 'Login com Google bem-sucedido', { userId: result.user.id });
                const isNew = result.nextStep === '/complete-profile' || !result.user.isProfileCompleted;
                handleRedirect(result.user, isNew);
            } else {
                // Isso não deveria acontecer, mas é uma salvaguarda.
                throw new Error("Resposta de autenticação inválida do servidor.");
            }
        } catch (err: any) {
            logger.error(LogCategory.AUTH, 'Falha no login com Google', err);
            setError(err.message || 'Falha ao autenticar com Google.');
            setIsLoading(false);
            isProcessing.current = false;
        }
    }, [handleRedirect]);

    const loginWithEmail = useCallback(async (email: string, password: string) => {
        if (isProcessing.current) return;
        isProcessing.current = true;

        logger.info(LogCategory.AUTH, 'Tentativa de login com e-mail iniciada', { email });
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.login(email, password);
            if (result && result.user) {
                logger.info(LogCategory.AUTH, 'Login com e-mail bem-sucedido', { userId: result.user.id });
                const isNew = result.nextStep === '/complete-profile' || !result.user.isProfileCompleted;
                handleRedirect(result.user, isNew);
            } else {
                throw new Error("Resposta de autenticação de e-mail inválida.");
            }
        } catch (err: any) {
            logger.error(LogCategory.AUTH, 'Falha no login com e-mail', err, { email });
            setError(err.message || 'Credenciais de e-mail inválidas.');
            setIsLoading(false);
            isProcessing.current = false;
        }
    }, [handleRedirect]);

    return {
        isLoading,
        error,
        loginWithGoogle,
        loginWithEmail,
    };
};
