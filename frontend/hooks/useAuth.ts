
import { useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { trackingService } from '../services/trackingService';
import { logger, LogCategory } from '../services/loggingService';

/**
 * 🎣 useAuth (Hook de Autenticação)
 *
 * Este hook encapsula toda a lógica de autenticação do lado do cliente.
 * Ele fornece aos componentes da UI funções para executar o login (Google, E-mail)
 * e gerencia os estados de carregamento (loading), erros e o redirecionamento
 * do usuário após uma autenticação bem-sucedida.
 *
 * Abstrair essa lógica em um hook torna os componentes de UI mais limpos e reutilizáveis.
 */
export const useAuth = () => {
    // Estado para feedback visual na UI durante as chamadas de API.
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const navigate = useNavigate();
    const location = useLocation();

    // Trava para previnir múltiplas submissões de login (evita race conditions).
    const isProcessing = useRef(false);
    
    // Tenta recuperar o caminho de onde o usuário veio antes de chegar na tela de login.
    const redirectPath = (location.state as any)?.from?.pathname;

    /**
     * Gerencia para onde o usuário deve ser redirecionado após o login bem-sucedido.
     * A lógica de redirecionamento é uma parte crucial da experiência do usuário.
     */
    const handleRedirect = useCallback((user: any, isNewUser: boolean = false) => {
        // --- LÓGICA DE PRIORIDADE DE REDIRECIONAMENTO ---
        // 1. Prioridade Máxima: Onboarding de novos usuários ou perfis incompletos.
        // 2. Prioridade Alta: Redirecionamento pós-compra (ex: usuário comprou como convidado e depois logou).
        // 3. Padrão: Redireciona para a página anterior ao login ou para o feed.
        const targetPath = isNewUser || (user && !user.isProfileCompleted)
            ? '/complete-profile'
            : sessionStorage.getItem('redirect_after_login') || redirectPath || '/feed';
        
        logger.info(LogCategory.NAVIGATION, 'Redirecionando usuário após login', { targetPath, userId: user.id });
        
        // Salvaguarda: Evita que o usuário seja redirecionado para a própria tela de login.
        if (targetPath.includes('login')) {
             navigate('/feed', { replace: true });
             return;
        }

        // Se usamos o redirecionamento pós-compra, limpa o item da sessão para não ser usado novamente.
        if (sessionStorage.getItem('redirect_after_login')) sessionStorage.removeItem('redirect_after_login');
        
        // Executa o redirecionamento, substituindo a página de login no histórico do navegador.
        navigate(targetPath, { replace: true });

    }, [navigate, redirectPath]);

    /**
     * Orquestra o fluxo de login com Google.
     */
    const loginWithGoogle = useCallback(async (credential: string) => {
        if (isProcessing.current) return; // Previne clique duplo
        isProcessing.current = true;
        
        logger.info(LogCategory.AUTH, 'Tentativa de login com Google iniciada');
        setIsLoading(true);
        setError(null);
        
        try {
            // Verifica se há um código de afiliado na URL para atribuição.
            const referredBy = trackingService.getAffiliateRef() || undefined;
            const result = await authService.loginWithGoogle(credential, referredBy);
            
            if (result && result.user) {
                logger.info(LogCategory.AUTH, 'Login com Google bem-sucedido', { userId: result.user.id });
                const isNew = result.nextStep === '/complete-profile' || !result.user.isProfileCompleted;
                // Delega a lógica de redirecionamento para o handler especializado.
                handleRedirect(result.user, isNew);
            } else {
                throw new Error("Resposta de autenticação inválida do servidor.");
            }
        } catch (err: any) {
            logger.error(LogCategory.AUTH, 'Falha no login com Google', err);
            setError(err.message || 'Falha ao autenticar com Google.');
            setIsLoading(false);
            isProcessing.current = false;
        }
    }, [handleRedirect]);

    /**
     * Orquestra o fluxo de login com E-mail e Senha.
     */
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

    // Expõe o estado e as funções para os componentes da UI.
    return {
        isLoading,
        error,
        loginWithGoogle,
        loginWithEmail,
    };
};
