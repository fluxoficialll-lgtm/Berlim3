
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Hooks e Componentes de Features ---
// Caminhos corrigidos de '../../../' para '../../../../' para refletir a profundidade correta do arquivo.
import { useGroupSettings } from '../../../../features/groups/hooks/useGroupSettings';
import { MembersSection } from '../../../../features/groups/components/settings/MembersSection';

/**
 * Componente: GroupMembersPage
 * 
 * Propósito: Página de administração para gerenciar os membros de um grupo. Permite
 * buscar, visualizar, promover, rebaixar e remover membros. A lógica de 
 * interação é controlada pelo hook `useGroupSettings`.
 */
export const GroupMembersPage: React.FC = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // ID do grupo da URL.

    // --- Lógica de Negócios (do Hook) ---
    // O hook centraliza a busca de dados, o estado do formulário (incluindo a lista de membros e a busca)
    // e as ações de manipulação de membros.
    const { group, loading, isAdmin, handleMemberAction, form } = useGroupSettings();

    // --- Renderização de Carregamento ---
    if (loading || !group) {
        return (
            <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i>
            </div>
        );
    }

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden">
            {/* Cabeçalho da Página com contagem de membros */}
            <header className="flex items-center p-4 bg-[#0c0f14] border-b border-white/10 h-[65px] sticky top-0 z-50">
                <button onClick={() => navigate(`/group-settings/${id}`)} className="mr-4 text-white text-xl p-2 hover:bg-white/5 rounded-full transition-all">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="flex flex-col">
                    <h1 className="font-bold text-sm">Gerenciar Membros</h1>
                    <span className="text-[10px] text-[#00c2ff] font-black uppercase tracking-widest">{form.members.length} participantes</span>
                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-y-auto p-5 max-w-[600px] mx-auto w-full pb-10 no-scrollbar">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    {/* O componente MembersSection encapsula a lista de membros, a barra de busca e os menus de ação. */}
                    <MembersSection 
                        groupId={id || ''}
                        isAdmin={isAdmin}
                        members={form.members || []}
                        onAction={handleMemberAction} // Callback para promover/rebaixar/remover.
                        searchQuery={form.searchQuery}
                        onSearchChange={form.setSearchQuery}
                        availableRoles={form.roles || []}
                    />
                </div>
                
                {/* Card de Dica */}
                <div className="mt-8 bg-blue-500/5 border border-blue-500/10 p-5 rounded-2xl">
                    <p className="text-[10px] text-gray-500 leading-relaxed text-center italic">
                        "Como administrador, você pode promover membros a moderadores ou removê-los da comunidade em tempo real."
                    </p>
                </div>
            </main>
        </div>
    );
};
