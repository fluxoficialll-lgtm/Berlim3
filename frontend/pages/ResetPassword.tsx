
// React e hooks para gerenciamento de estado e navegação.
import React, { useState, useEffect } from 'react';
// Hook do React Router para redirecionar o usuário.
import { useNavigate } from 'react-router-dom';

// Componentes de UI reutilizáveis com caminhos corrigidos.
import { AuthLayout } from './components/Layout';
import { Input } from './components/Input';
import { Button } from './components/Button';

// Serviço de autenticação para interagir com a API.
import { authService } from '../services/authService';
// Tipos de erro de autenticação para mensagens consistentes.
import { AuthError } from '../types';

/**
 * Página de Redefinição de Senha.
 * Permite que um usuário que esqueceu a senha defina uma nova.
 * Esta página só deve ser acessível após o usuário ter solicitado
 * a redefinição e inserido o e-mail na página anterior.
 */
export const ResetPassword: React.FC = () => {
  // Hook para programaticamente navegar entre as rotas.
  const navigate = useNavigate();

  // Estados do componente
  const [password, setPassword] = useState(''); // Armazena a nova senha.
  const [confirm, setConfirm] = useState('');   // Armazena a confirmação da senha.
  const [error, setError] = useState('');       // Armazena mensagens de erro para o usuário.
  const [loading, setLoading] = useState(false); // Controla o estado de carregamento do formulário.
  
  // O e-mail para o qual a senha está sendo redefinida é recuperado do localStorage.
  // Ele foi salvo lá na etapa anterior (página "Esqueci minha senha").
  const email = localStorage.getItem('reset_email');

  // Efeito que executa ao carregar o componente.
  // Garante que o usuário só possa acessar esta página se houver um e-mail de redefinição.
  useEffect(() => {
    if (!email) {
      // Se não houver e-mail, redireciona o usuário de volta para o início do fluxo.
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  /**
   * Valida os campos do formulário antes do envio.
   * @returns Uma string de erro se a validação falhar, ou null se for bem-sucedida.
   */
  const validate = () => {
      if (!password) return "Nova senha obrigatória";
      if (password.length < 6) return AuthError.PASSWORD_TOO_SHORT;
      if (!confirm) return "Confirme sua senha";
      if (password !== confirm) return AuthError.PASSWORDS_DONT_MATCH;
      return null; // Nenhum erro encontrado.
  };

  /**
   * Manipula o evento de submissão do formulário.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página).
    
    // Valida os campos e exibe um erro se necessário.
    const valError = validate();
    if (valError) {
        setError(valError);
        return;
    }

    setLoading(true); // Ativa o indicador de carregamento.
    setError('');     // Limpa erros anteriores.
    
    try {
        // Apenas prossiga se o e-mail for válido.
        if (email) {
            // Chama o serviço de autenticação para redefinir a senha.
            await authService.resetPassword(email, password);
            
            // Limpa o e-mail do localStorage para segurança.
            localStorage.removeItem('reset_email'); 
            
            alert("Senha alterada com sucesso!");
            
            // Redireciona para a página de login.
            navigate('/');
        }
    } catch (err: any) {
        // Exibe qualquer erro retornado pela API.
        setError(err.message);
    } finally {
        // Desativa o indicador de carregamento, independentemente do resultado.
        setLoading(false);
    }
  };

  // Determina se o botão de submit deve estar habilitado, considerando também o estado de loading.
  const isValid = password.length >= 6 && password === confirm && !loading;

  // Renderiza o layout e o formulário da página.
  return (
    <AuthLayout title="Redefinir Senha" subtitle="Crie uma nova senha">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de entrada para a nova senha */}
        <Input 
          label="Nova Senha" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
        />
        
        {/* Campo de entrada para confirmar a nova senha */}
        <Input 
          label="Confirmar Senha" 
          type="password" 
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repita a nova senha"
        />

        {/* Exibe a mensagem de erro, se houver */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Botão de submissão do formulário */}
        <Button type="submit" disabled={!isValid} isLoading={loading}>
          Salvar nova senha
        </Button>
      </form>
    </AuthLayout>
  );
};