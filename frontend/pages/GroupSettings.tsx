// Este arquivo define a página principal de configurações de um grupo.

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGroupSettings } from '../features/groups/hooks/useGroupSettings';
// Importação do componente de item de configuração com caminho corrigido.
import { SettingItem } from './components/settings/SettingItem';

/**
 * Componente: GroupSettings
 * Propósito: Serve como o painel de controle central para a gestão de um grupo. Esta página
 * é acessível apenas por administradores e pelo dono do grupo. Ela agrega e fornece links
 * para todas as sub-seções de configuração, incluindo:
 * - Estrutura e Identidade (informações, estatísticas).
 * - Segurança e Moderação (cargos, acesso, regras).
 * - Monetização e Escala (checkout, faturamento, funil VIP).
 * Utiliza um hook customizado (`useGroupSettings`) para encapsular a lógica de busca de dados
 * e verificação de permissões.
 */
export const GroupSettings: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { 
        group, loading, isOwner, isAdmin, handleLeaveDelete 
    } = useGroupSettings();

    // Efeito de segurança: Redireciona usuários não autorizados.
    useEffect(() => {
        if (!loading && group && !isAdmin) {
            navigate(`/group-chat/${id}`, { replace: true });
        }
    }, [loading, group, isAdmin, navigate, id]);

    // Renderiza um estado de carregamento enquanto os dados e permissões são validados.
    if (loading || !group || !id) {
        return <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center"><i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i></div>;
    }

    // Componentes de badge para a UI.
    const NewBadge = () => <span className="bg-[#00c2ff] ...">NEW</span>;
    const ActiveBadge = () => <div className="flex items-center ...">...</div>;

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
            <header>{/* ... Cabeçalho da página ... */}</header>

            <main className="no-scrollbar">
                {/* Seção 1: Estrutura e Identidade */}
                <div className="settings-group">
                    <h2>Estrutura e Identidade</h2>
                    <SettingItem icon="fa-circle-info" label="Informações Principais" onClick={() => navigate(`/group-settings/${id}/info`)} />
                    <SettingItem icon="fa-chart-simple" label="Estatísticas" onClick={() => navigate(`/group-settings/${id}/stats`)} />
                </div>

                {/* Seção 2: Segurança e Moderação */}
                <div className="settings-group">
                    <h2>Segurança e Moderação</h2>
                    <SettingItem icon="fa-id-card-clip" label="Gestão de Cargos" onClick={() => navigate(`/group-settings/${id}/roles`)} />
                    <SettingItem icon="fa-users" label="Lista de Membros" onClick={() => navigate(`/group-settings/${id}/members`)} />
                </div>

                {/* Seção 3: Monetização e Escala */}
                <div className="settings-group">
                    <h2>Monetização e Escala</h2>
                    <SettingItem icon="fa-cash-register" label="Configurações de Checkout" onClick={() => navigate(`/group-settings/${id}/checkout-config`)} />
                    <SettingItem icon="fa-chart-pie" label="Faturamento Detalhado" onClick={() => navigate(`/group-revenue/${id}`)} />
                </div>

                {/* Seção 4: Zona Crítica (Sair/Excluir) */}
                <div className="logout-container">
                    <h2 className="text-[11px] ...">Zona Crítica</h2>
                    <button onClick={() => handleLeaveDelete('leave')} className="danger-btn">Sair do Grupo</button>
                    {isOwner && (
                        <button onClick={() => handleLeaveDelete('delete')} className="danger-btn">Excluir Permanentemente</button>
                    )}
                </div>
            </main>
        </div>
    );
};