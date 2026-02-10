
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { User } from '../../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoadingFallback = () => (
    <div className="h-screen w-full bg-[#0c0f14] flex items-center justify-center">
        <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl"></i>
    </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined); // undefined = estado inicial, não verificado
    const location = useLocation();

    useEffect(() => {
        // Assina o authService para receber atualizações de estado
        const unsubscribe = authService.subscribe(currentUser => {
            setUser(currentUser);
        });

        // Cleanup: cancela a assinatura quando o componente é desmontado
        return () => unsubscribe();
    }, []);

    // 1. Estado de Carregamento: Enquanto o estado do usuário ainda não foi determinado
    if (user === undefined) {
        return <LoadingFallback />;
    }

    // 2. Estado Não Autenticado: Após a verificação, se o usuário for nulo
    if (!user) {
        // Salva a rota para redirecionamento após o login
        if (location.pathname !== '/' && !location.pathname.includes('login')) {
            sessionStorage.setItem('redirect_after_login', location.pathname + location.search);
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // 3. Bloqueio para Usuários Banidos
    if (user.isBanned) {
        return <Navigate to="/banned" replace />;
    }

    // 4. Estado Autenticado: O usuário está logado e não está banido
    return <>{children}</>;
};
