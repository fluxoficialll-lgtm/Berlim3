
// frontend/hooks/useVerifyEmail.ts
import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';

// Tipo para a resposta da API de verificação
interface VerificationResponse {
  success: boolean;
  message: string;
}

// Tipo para o retorno do hook
interface UseVerifyEmailReturn {
  isVerifying: boolean;
  verificationStatus: 'idle' | 'verifying' | 'success' | 'error';
  verificationMessage: string | null;
  verifyEmail: (token: string) => Promise<void>;
}

/**
 * 🎣 useVerifyEmail
 *
 * Gerencia o processo de verificação de e-mail a partir de um token.
 *
 * @returns Estado da verificação e a função para iniciar o processo.
 */
export const useVerifyEmail = (): UseVerifyEmailReturn => {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
  const { error, isLoading, execute } = useApi<VerificationResponse>();

  const verifyEmail = useCallback(async (token: string) => {
    setVerificationStatus('verifying');
    setVerificationMessage(null);

    // A rota e o método são suposições e devem ser confirmados pelo backend
    const response = await execute('/api/auth/verify-email', {
      method: 'POST',
      body: { token },
    });

    if (response?.success) {
      setVerificationStatus('success');
      setVerificationMessage(response.message || 'E-mail verificado com sucesso!');
    } else {
      setVerificationStatus('error');
      // Usa a mensagem de erro da API, se disponível
      setVerificationMessage(error || response?.message || 'Falha na verificação do e-mail.');
    }
  }, [execute, error]);

  return {
    isVerifying: isLoading,
    verificationStatus,
    verificationMessage,
    verifyEmail,
  };
};
