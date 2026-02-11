
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Hooks e Componentes de Features ---
// Caminhos corrigidos de '../../../' para '../../../../' para refletir a profundidade correta do arquivo.
import { useGroupSettings } from '../../../../features/groups/hooks/useGroupSettings';
import { InfoSection } from '../../../../features/groups/components/settings/InfoSection';

/**
 * Componente: GroupInfoPage
 * 
 * Propósito: Página de configurações para editar as informações básicas de um grupo,
 * como nome, descrição e imagem de capa. Utiliza o hook `useGroupSettings` para
 * gerenciar o estado do formulário e salvar as alterações.
 */
export const GroupInfoPage: React.FC = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // ID do grupo da URL.

    // --- Lógica de Negócios (do Hook) ---
    // Centraliza a lógica de busca de dados, estado do formulário e salvamento.
    const { group, loading, isOwner, handleSave, form } = useGroupSettings();

    // --- Renderização de Carregamento ---
    if (loading || !group) return null;

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden">
            {/* Cabeçalho da Página */}
            <header className="flex items-center p-4 bg-[#0c0f14] border-b border-white/10 h-[65px] sticky top-0 z-50">
                <button onClick={() => navigate(`/group-settings/${id}`)} className="mr-4 text-white text-xl">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="font-bold">Informações do Grupo</h1>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-y-auto p-5 max-w-[600px] mx-auto w-full">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    {/* 
                      O componente InfoSection encapsula os campos do formulário.
                      Ele recebe o estado e os setters do hook `useGroupSettings` via props.
                    */}
                    <InfoSection 
                        isOwner={isOwner}
                        groupName={form.groupName}
                        setGroupName={form.setGroupName}
                        description={form.description}
                        setDescription={form.setDescription}
                        coverImage={form.coverImage}
                        setCoverImage={form.setCoverImage}
                        groupType={group.isVip ? 'VIP' : (group.isPrivate ? 'PRIVADO' : 'PÚBLICO')}
                    />
                </div>
                
                {/* Botão Fixo para Salvar as Alterações */}
                <button className="btn-save-fixed" onClick={handleSave}>Salvar Informações</button>
            </main>
        </div>
    );
};
