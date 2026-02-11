
// frontend/hooks/useAuth.ts
import { useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Tipos para clareza
interface AuthResult {
  user: any; // Idealmente, um tipo User definido
  nextStep?: string;
  isNewUser?: boolean;
}

/**
 * 🎣 useAuth (Hook de Autenticação)
 *
 * Refatorado para ser independente de serviços legados.
 * Este hook encapsula a lógica de autenticação do cliente, comunicando-se diretamente
 * com a API do backend via `fetch`. Ele gerencia o estado de carregamento, erros e 
 * redireciona o usuário após um login bem-sucedido.
 */
export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();
    const location = useLocation();
    const isProcessing = useRef(false);

    const redirectPath = (location.state as any)?.from?.pathname;

    /**
     * Extrai o código de afiliado dos parâmetros da URL.
     * Substitui a dependência do `trackingService`.
     */
    const getAffiliateRef = (): string | null => {
        const params = new URLSearchParams(window.location.search);
        return params.get('ref');
    };

    const handleRedirect = useCallback((user: any, isNew: boolean = false) => {
        const targetPath = isNew || (user && !user.isProfileCompleted)
            ? '/complete-profile'
            : sessionStorage.getItem('redirect_after_login') || redirectPath || '/feed';
        
        if (targetPath.includes('login')) {
             navigate('/feed', { replace: true });
             return;
        }

        if (sessionStorage.getItem('redirect_after_login')) {
            sessionStorage.removeItem('redirect_after_login');
        }
        
        navigate(targetPath, { replace: true });
    }, [navigate, redirectPath]);

    const loginWithGoogle = useCallback(async (credential: string) => {
        if (isProcessing.current) return;
        isProcessing.current = true;
        
        setIsLoading(true);
        setError(null);
        
        try {
            const referredBy = getAffiliateRef();
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential, referredBy }),
            });

            const result: AuthResult = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Falha na autenticação com Google.');
            }
            
            if (result && result.user) {
                const isNew = result.nextStep === '/complete-profile' || result.isNewUser;
                handleRedirect(result.user, isNew);
            } else {
                throw new Error("Resposta de autenticação inválida do servidor.");
            }
        } catch (err: any) {
            setError(err.message || 'Falha ao autenticar com Google.');
        } finally {
            setIsLoading(false);
            isProcessing.current = false;
        }
    }, [handleRedirect]);

    const loginWithEmail = useCallback(async (email: string, password: string) => {
        if (isProcessing.current) return;
        isProcessing.current = true;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result: AuthResult = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Credenciais de e-mail inválidas.');
            }

            if (result && result.user) {
                const isNew = result.nextStep === '/complete-profile' || result.isNewUser;
                handleRedirect(result.user, isNew);
            } else {
                throw new Error("Resposta de autenticação de e-mail inválida.");
            }
        } catch (err: any) {
            setError(err.message || 'Credenciais de e-mail inválidas.');
        } finally {
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
