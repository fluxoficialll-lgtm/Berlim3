
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { trackingService } from '../services/trackingService';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleRedirect = useCallback((user: any, isNewUser: boolean = false) => {
        if (isNewUser || (user && !user.isProfileCompleted)) {
            navigate('/complete-profile', { replace: true });
            return;
        }

        const pendingRedirect = sessionStorage.getItem('redirect_after_login') || (location.state as any)?.from?.pathname;
        if (pendingRedirect && pendingRedirect !== '/' && !pendingRedirect.includes('login')) {
            sessionStorage.removeItem('redirect_after_login');
            navigate(pendingRedirect, { replace: true });
        } else {
            navigate('/feed', { replace: true });
        }
    }, [navigate, location.state]);

    const loginWithGoogle = useCallback(async (credential: string) => {
        if (isLoading) return;
        
        setIsLoading(true);
        setError(null);
        
        try {
            if (!credential) throw new Error("Credencial do Google inválida.");
            
            const referredBy = trackingService.getAffiliateRef() || undefined;
            const result = await authService.loginWithGoogle(credential, referredBy);
            
            if (result && result.user) {
                const isNew = result.nextStep === '/complete-profile' || !result.user.isProfileCompleted;
                handleRedirect(result.user, isNew);
            } else {
                throw new Error("Resposta de autenticação inválida.");
            }
        } catch (err: any) {
            setError(err.message || 'Falha ao autenticar com Google.');
            setIsLoading(false);
        }
    }, [isLoading, handleRedirect]);

    const loginWithEmail = async (email: string, password: string) => {
        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.login(email, password);
            if (result && result.user) {
                const isNew = result.nextStep === '/complete-profile' || !result.user.isProfileCompleted;
                handleRedirect(result.user, isNew);
            } else {
                 throw new Error("Resposta de autenticação inválida.");
            }
        } catch (err: any) {
            setError(err.message || 'Credenciais de e-mail inválidas.');
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        loginWithGoogle,
        loginWithEmail,
    };
};
