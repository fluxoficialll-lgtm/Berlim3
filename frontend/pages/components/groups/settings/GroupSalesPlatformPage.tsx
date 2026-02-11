
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Hooks, Componentes e Tipos ---
// Corrigido de '../../../' para '../../../../' para alcançar o diretório raíz de features e types.
// Corrigido de '../../../' para '../../' para o ModalSystem.
import { useGroupSettings } from '../../../../features/groups/hooks/useGroupSettings';
import { useModal } from '../../ModalSystem';
import { PlatformStatusCard } from '../../../../features/groups/components/settings/sales-platform/PlatformStatusCard';
import { PlatformStructureEditor } from '../../../../features/groups/components/settings/sales-platform/PlatformStructureEditor';
import { PlatformInfoBox } from '../../../../features/groups/components/settings/sales-platform/PlatformInfoBox';
import { FolderOptionsModal } from '../../../../features/groups/components/settings/sales-platform/FolderOptionsModal';
import { ChannelOptionsModal } from '../../../../features/groups/components/settings/channels/ChannelOptionsModal';
import { SalesFolder, SalesSection, Channel } from '../../../../types';

/**
 * Componente: GroupSalesPlatformPage
 * 
 * Propósito: Página de configuração para o "Modo Hub" ou "Plataforma de Vendas".
 * Permite aos administradores ativar e organizar uma vitrine de conteúdo, estruturada
 * em seções, pastas e canais de chat. É uma feature avançada para monetização de grupos.
 */
export const GroupSalesPlatformPage: React.FC = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { group, loading, handleSave, form } = useGroupSettings();
    const { showPrompt } = useModal(); // Para criar novas pastas/canais com um nome.

    // --- Estado do Modal de Opções ---
    const [optionsModal, setOptionsModal] = useState<{
        isOpen: boolean;
        target: SalesFolder | SalesSection | Channel | null; // Item a ser editado.
        type: 'folder' | 'section' | 'channel';
    }>({ isOpen: false, target: null, type: 'folder' });

    // --- Renderização de Carregamento ---
    if (loading || !group) {
        return (
            <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i>
            </div>
        );
    }

    // --- Manipuladores de Ações ---

    const handleToggleStatus = async () => {
        form.setIsSalesPlatformEnabled(!form.isSalesPlatformEnabled);
    };

    const handleOpenOptions = (target: SalesFolder | SalesSection | Channel, type: 'folder' | 'section' | 'channel') => {
        setOptionsModal({ isOpen: true, target, type });
    };

    // ... (Manipuladores para atualizar, adicionar e remover itens da estrutura)

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden">
            {/* Cabeçalho */}
            <header className="flex items-center p-4 bg-[#0c0f14] border-b border-white/10 h-[65px] sticky top-0 z-50">
                <button onClick={() => navigate(`/group-settings/${id}`)} className="mr-4 text-white text-xl">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="font-bold">Configuração do Modo Hub</h1>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-y-auto p-5 max-w-[600px] mx-auto w-full pb-32 no-scrollbar">
                <div className="flex flex-col gap-6">
                    {/* Card para Ativar/Desativar a plataforma */}
                    <PlatformStatusCard 
                        enabled={form.isSalesPlatformEnabled} 
                        onToggle={handleToggleStatus} 
                    />

                    {/* Editor de Estrutura (visível apenas se a plataforma estiver ativa) */}
                    {form.isSalesPlatformEnabled && (
                        <PlatformStructureEditor 
                            sections={form.salesPlatformSections}
                            onSectionsChange={form.setSalesPlatformSections}
                            onOptions={handleOpenOptions}
                        />
                    )}

                    <div className="mt-2">
                        <PlatformInfoBox />
                    </div>
                </div>

                <button className="btn-save-fixed" onClick={handleSave}>Salvar Estrutura do Hub</button>
            </main>

            {/* Modais para edição de canais, pastas e seções */}
            {/* ... */}
        </div>
    );
};
