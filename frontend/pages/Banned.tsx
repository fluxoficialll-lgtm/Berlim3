// Este arquivo define a página que é exibida a um usuário cuja conta foi banida.
// Ele informa ao usuário sobre a suspensão e fornece uma maneira de sair do aplicativo.

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

/**
 * Componente: Banned
 * Propósito: Tela de bloqueio para usuários banidos. Verifica o status de banimento do usuário;
 * se banido, exibe o motivo e opções para logout ou apelação. Se não estiver banido,
 * redireciona para o feed. 
 */
export const Banned: React.FC = () => {
    const navigate = useNavigate();
    const [reason, setReason] = useState('Violação das diretrizes da comunidade.');
    const user = authService.getCurrentUser();

    // Efeito para verificar o status do usuário e redirecionar se necessário.
    useEffect(() => {
        if (user && user.isBanned) {
            setReason(user.banReason || 'Violação das diretrizes da comunidade.');
        } else if (user && !user.isBanned) {
            // Se o usuário acessou esta página mas não está banido, redireciona para o feed.
            navigate('/feed', { replace: true });
        } else if (!user) {
            // Se não houver usuário logado, redireciona para a página inicial.
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

    // Função para fazer logout e redirecionar para a página inicial.
    const handleLogout = () => {
        authService.logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050505] text-white font-['Inter'] p-6 relative overflow-hidden">
            {/* Estilos específicos para esta página, incluindo a animação de brilho. */}
            <style>{`
                /* ... Estilos omitidos para brevidade ... */
            `}</style>

            <div className="ban-glow"></div>

            <div className="ban-card">
                <div className="ban-icon">
                    <i className="fa-solid fa-user-slash"></i>
                </div>
                
                <h1 className="text-2xl font-bold text-white mb-2">Conta Suspensa</h1>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Detectamos atividades que violam nossos Termos de Serviço. O acesso a esta conta foi restrito permanentemente.
                </p>

                {/* Caixa que exibe o motivo do banimento */}
                <div className="reason-box">
                    <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider mb-1">Motivo Oficial</div>
                    <div className="text-sm text-gray-200 italic">"{reason}"</div>
                </div>

                <button onClick={handleLogout} className="logout-btn">
                    <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Sair do Aplicativo
                </button>

                <div className="support-link">
                    Acha que cometemos um erro? <br/>
                    <a href="mailto:support@flux.com">Contestar decisão</a>
                </div>
            </div>
            
            <div className="mt-8 text-[10px] text-gray-700 font-bold uppercase tracking-[3px] z-10">
                FLUX SECURITY SYSTEM
            </div>
        </div>
    );
};