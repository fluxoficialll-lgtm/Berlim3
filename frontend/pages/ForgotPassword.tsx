// Este arquivo define a página de recuperação de senha.

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
// Importação de componentes da feature de autenticação.
import { RecoveryEmailCard } from '../features/auth/components/RecoveryEmailCard';
import { CodeVerificationCard } from '../features/auth/components/CodeVerificationCard';

/**
 * Componente: ForgotPassword
 * Propósito: Gerencia o fluxo de redefinição de senha. É um processo de dois estágios:
 * 1. Estágio 'email': O usuário insere seu e-mail para receber um código de verificação.
 * 2. Estágio 'code': O usuário insere o código recebido para verificar sua identidade. Após a
 *    verificação bem-sucedida, ele é redirecionado para a página de criação de uma nova senha.
 * Os componentes visuais para cada estágio são importados do diretório `features/auth`.
 */
export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados para controlar o fluxo, dados do formulário e UI.
  const [email, setEmail] = useState('');
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [stage, setStage] = useState<'email' | 'code'>('email');
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Efeito para o contador de reenvio de código.
  useEffect(() => {
    // ... (lógica do timer)
  }, [timer]);

  // Manipulador para o envio do e-mail de recuperação.
  const handleEmailSubmit = async (e: React.FormEvent) => {
    // ... (chama authService.sendVerificationCode)
  };

  // Manipulador para a verificação do código.
  const handleVerifyCode = async (e: React.FormEvent) => {
    // ... (chama authService.verifyCode e redireciona em caso de sucesso)
  };

  return (
    <div className="h-screen w-full bg-[#0c0f14] ... flex items-center justify-center ...">
        <header>{/* ... Cabeçalho com botão de voltar ... */}</header>

        {/* Renderiza o card apropriado com base no estágio atual do fluxo. */}
        {stage === 'email' ? (
            <RecoveryEmailCard 
                email={email} setEmail={setEmail} loading={loading}
                onSubmit={handleEmailSubmit} /*...*/ 
            />
        ) : (
            <CodeVerificationCard 
                email={email} code={code} setCode={setCode}
                onSubmit={handleVerifyCode} onResend={handleEmailSubmit}
                timer={timer} loading={loading} error={error} /*...*/
            />
        )}
    </div>
  );
};
