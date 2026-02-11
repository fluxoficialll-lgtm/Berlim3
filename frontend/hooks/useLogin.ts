
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '@/apiConfig';

// Supondo que exista um serviço de autenticação para gerenciar o token
// import { authManager } from '../services/authManager'; 

export const useLogin = () => {
  const navigate = useNavigate();

  // Estado da UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Efeito para verificar se o usuário já está logado
  useEffect(() => {
    // const token = authManager.getToken();
    // if (token) {
    //   navigate('/feed', { replace: true });
    // }
  }, [navigate]);

  const handleLogin = useCallback(async (loginFn: Promise<any>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginFn;
      // authManager.setToken(result.token);
      navigate('/feed', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro no login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const loginWithGoogle = useCallback((credential: string) => {
    const loginPromise = fetch(`${API_BASE}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    }).then(res => res.ok ? res.json() : Promise.reject(new Error('Falha no login com Google')));
    
    handleLogin(loginPromise);
  }, [handleLogin]);

  const loginWithEmail = useCallback((email: string, password: string) => {
    const loginPromise = fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }).then(async res => {
        if (!res.ok) {
            const { error } = await res.json();
            throw new Error(error || 'Credenciais inválidas');
        }
        return res.json();
    });

    handleLogin(loginPromise);
  }, [handleLogin]);

  return {
    isLoading,
    error,
    showEmailForm,
    setShowEmailForm,
    loginWithGoogle,
    loginWithEmail,
    setError, // Para limpar o erro, se necessário
  };
};
