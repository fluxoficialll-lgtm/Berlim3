
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Hooks e Componentes de Features ---
// Caminhos corrigidos de '../../../' para '../../../../' para refletir a profundidade correta do arquivo.
import { useGroupSettings } from '../../../../features/groups/hooks/useGroupSettings';
import { AccessSection } from '../../../../features/groups/components/settings/AccessSection';

/**
 * Componente: GroupAccessPage
 * 
 * Propósito: Página dedicada às configurações de acesso e convites de um grupo.
 * Permite que administradores gerenciem a aprovação de novos membros, visualizem
 * solicitações pendentes e gerenciem links de convite.
 * Utiliza o hook `useGroupSettings` para obter e manipular os dados do grupo.
 */
export const GroupAccessPage: React.FC = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // ID do grupo da URL

    // --- Lógica de Negócios (do Hook) ---
    // O hook `useGroupSettings` centraliza a busca de dados do grupo e a lógica de permissões.
    const { group, loading, isAdmin, handlePendingAction, form } = useGroupSettings();

    // Exibe um estado de nulo/carregamento enquanto os dados do grupo estão sendo buscados.
    if (loading || !group) return null;

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden">
            {/* Cabeçalho da Página */}
            <header className="flex items-center p-4 bg-[#0c0f14] border-b border-white/10 h-[65px] sticky top-0 z-50">
                <button onClick={() => navigate(`/group-settings/${id}`)} className="mr-4 text-white text-xl">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="font-bold">Acesso e Convites</h1>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-y-auto p-5 max-w-[600px] mx-auto w-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    {/* 
                      O componente AccessSection é o principal elemento de UI desta página.
                      Ele recebe todas as propriedades e callbacks necessários para funcionar,
                      mantendo esta página (o container) limpa e focada no layout.
                    */}
                    <AccessSection 
                        groupId={id!}
                        isAdmin={isAdmin}
                        approveMembers={form.approveMembers}
                        setApproveMembers={form.setApproveMembers}
                        pendingRequests={form.pendingRequests}
                        handlePendingAction={handlePendingAction}
                        links={form.links}
                        setLinks={form.setLinks}
                    />
                </div>
                {/* Botão fixo para navegação de volta, uma alternativa ao botão do cabeçalho. */}
                <button className="btn-save-fixed" onClick={() => navigate(`/group-settings/${id}`)}>Voltar ao Menu</button>
            </main>
        </div>
    );
};
