// Este arquivo define a página de Login.

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { trackingService } from '../services/trackingService';
import { API_BASE } from '../apiConfig';
// Importação de componentes modulares da feature de autenticação.
import { LoginInitialCard } from '../features/auth/components/LoginInitialCard';
import { LoginEmailCard } from '../features/auth/components/LoginEmailCard';
import { logger, LogCategory } from '../services/loggingService';

// Declaração para a variável global do Google Sign-In.
declare const google: any;

/**
 * Componente: Login
 * Propósito: Ponto de entrada para a autenticação do usuário. Esta página gerencia tanto o fluxo de
 * login com Google (OAuth) quanto o login tradicional com e-mail e senha. A UI é dividida em dois
 * componentes de card (`LoginInitialCard` e `LoginEmailCard`) para separar as duas opções.
 * Responsabilidades:
 * - Verificar se o usuário já está autenticado e redirecioná-lo.
 * - Inicializar e renderizar o botão de login do Google.
 * - Exibir o formulário de e-mail/senha quando solicitado.
 * - Chamar o `authService` para processar as tentativas de login.
 * - Gerenciar os estados de carregamento e erro durante o processo.
 * - Capturar parâmetros de tracking (ex: afiliados) da URL.
 */
export const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Estados para controle de UI e fluxo de login.
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const isProcessing = useRef(false); // Previne submissões duplas.

    // Função para lidar com o login via Google.
    const loginWithGoogle = useCallback(async (credential: string) => {
        // ... (lógica para chamar authService.loginWithGoogle, tratar erros e redirecionar)
    }, [navigate]);

    // Função para lidar com o login via e-mail e senha.
    const loginWithEmail = useCallback(async (email: string, password: string) => {
        // ... (lógica para chamar authService.login, tratar erros e redirecionar)
    }, [navigate]);

    // Efeito para redirecionar usuários já logados.
    useEffect(() => {
        if (authService.isAuthenticated()) {
            navigate('/feed', { replace: true });
        }
    }, [navigate]);

    // Efeito para inicializar o botão do Google SDK.
    useEffect(() => {
        if (showEmailForm) return; // Não inicializa se o form de email estiver visível
        // ... (lógica para buscar o client ID e renderizar o botão do Google)
    }, [showEmailForm, /*...*/]);

    return (
        <div className="min-h-screen ... flex items-center justify-center bg-[#050505]">
            <div className="w-full max-w-[400px] ... bg-white/5 backdrop-blur-2xl ...">
                {/* Alterna entre o card inicial e o card de login com e-mail. */}
                {showEmailForm ? (
                    <LoginEmailCard 
                        /* ... props para o formulário de e-mail ... */
                        onBackToGoogle={() => setShowEmailForm(false)}
                    />
                ) : (
                    <LoginInitialCard 
                        onSelectEmail={() => setShowEmailForm(true)}
                        /* ... props para o botão do Google ... */
                    />
                )}
                {/* Overlay de carregamento. */}
                {isLoading && (
                    <div className="absolute inset-0 ... flex items-center justify-center">
                        <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff]"></i>
                    </div>
                )}
            </div>
        </div>
    );
};