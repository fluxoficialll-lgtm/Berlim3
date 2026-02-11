
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE } from '@/apiConfig';
import { AuthError } from '../types'; // Supondo que o tipo exista

const isValidEmail = (email: string) => {
    // Regex simples para validação de email
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const useRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Estado da UI e validação
  const [errors, setErrors] = useState<{email?: string, password?: string, confirm?: string, form?: string}>({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [referredBy, setReferredBy] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref) setReferredBy(ref);
  }, [location.search]);

  useEffect(() => {
    const newErrors: any = {};
    if (email && !isValidEmail(email)) newErrors.email = AuthError.INVALID_FORMAT;
    if (password && password.length < 6) newErrors.password = AuthError.PASSWORD_TOO_SHORT;
    if (confirmPassword && password !== confirmPassword) newErrors.confirm = AuthError.PASSWORDS_DONT_MATCH;

    setErrors(newErrors);
    const allFilled = email && password && confirmPassword && termsAccepted;
    setIsValid(!!allFilled && Object.keys(newErrors).length === 0);
  }, [email, password, confirmPassword, termsAccepted]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, referredBy }),
      });
      if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || 'Falha ao registrar.');
      }
      navigate('/verify-email');
    } catch (err: any) {
      setErrors(prev => ({ ...prev, form: err.message }));
    } finally {
      setLoading(false);
    }
  }, [isValid, email, password, referredBy, navigate]);

  return {
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    termsAccepted, setTermsAccepted,
    errors,
    loading,
    isValid,
    referredBy,
    handleSubmit,
  };
};
