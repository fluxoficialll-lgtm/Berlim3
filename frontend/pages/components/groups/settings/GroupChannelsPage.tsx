
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Tipos ---
// Corrigido de '../../../' para '../../../../' para alcançar a pasta raíz de tipos.
import { Channel, ChannelSection } from '../../../../types';

// --- Componentes e Hooks Globais ---
// Corrigido de '../../../' para '../../' para alcançar o ModalSystem no diretório de componentes.
import { useModal } from '../../ModalSystem';

// --- Hooks e Componentes de Features ---
// Corrigido de '../../../' para '../../../../' para alcançar a pasta raíz de features.
import { useGroupSettings } from '../../../../features/groups/hooks/useGroupSettings';
import { ChannelsSection as ChannelsEditor } from '../../../../features/groups/components/settings/ChannelsSection';
import { ChannelsHeader } from '../../../../features/groups/components/settings/channels/ChannelsHeader';
import { ChannelsNotice } from '../../../../features/groups/components/settings/channels/ChannelsNotice';
import { ChannelOptionsModal } from '../../../../features/groups/components/settings/channels/ChannelOptionsModal';

/**
 * Componente: GroupChannelsPage
 * 
 * Propósito: Uma página completa para gerenciar a estrutura de canais e seções de um grupo.
 * Permite criar, renomear, reordenar e excluir canais e seções, além de configurar
 * permissões específicas de canais. É uma das páginas de configuração mais complexas.
 */
export const GroupChannelsPage: React.FC = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showConfirm, showPrompt } = useModal(); // Para diálogos de confirmação e entrada de texto.
    const { group, loading, form, handleSave } = useGroupSettings(); // Hook central de dados do grupo.

    // --- Estado do Modal de Opções ---
    const [optionsModal, setOptionsModal] = useState<{
        isOpen: boolean;
        target: Channel | ChannelSection | null; // O canal ou seção que está sendo editado.
        type: 'channel' | 'section';
    }>({ isOpen: false, target: null, type: 'channel' });

    // --- Renderização de Carregamento ---
    if (loading || !group) {
        return (
            <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center">
                <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl"></i>
            </div>
        );
    }

    // --- Lógica de Negócios ---

    // Verifica se a plataforma de vendas está ativa e pede confirmação para desativá-la.
    const checkExclusivity = async (): Promise<boolean> => {
        if (form.isSalesPlatformEnabled) {
            const confirmed = await showConfirm(
                "Modo Plataforma Ativo",
                "Você está usando o Modo Plataforma de Vendas. Criar canais customizados irá DESATIVAR o catálogo de pastas. Deseja prosseguir?",
                "Sim, Usar Canais",
                "Cancelar"
            );
            if (confirmed) {
                form.setIsSalesPlatformEnabled(false);
                return true;
            }
            return false;
        }
        return true;
    };

    // --- Manipuladores para Ações de UI ---

    const handleAddChannel = async (toSectionId?: string) => {
        if (!(await checkExclusivity())) return;
        const name = await showPrompt('Nome do Canal', 'Ex: Suporte, Avisos, VIP Chat');
        if (!name) return;
        // ... (lógica de criação do canal)
    };

    const handleAddSection = async () => {
        if (!(await checkExclusivity())) return;
        const title = await showPrompt('Nome da Seção', 'Ex: ÁREA DE CONTEÚDO');
        if (!title) return;
       // ... (lógica de criação da seção)
    };

    const handleOpenOptions = (target: Channel | ChannelSection, type: 'channel' | 'section') => {
        setOptionsModal({ isOpen: true, target, type });
    };

    const handleUpdateChannelProperties = (updates: Partial<Channel>) => {
        if (optionsModal.type !== 'channel' || !optionsModal.target) return;
        const cid = optionsModal.target.id;
        const updatedChannels = form.channels.map(c => c.id === cid ? { ...c, ...updates } : c);
        form.setChannels(updatedChannels);
        setOptionsModal(prev => ({ ...prev, target: { ...prev.target as Channel, ...updates } }));
    };

    // ... (outros manipuladores como handleDelete, handleUpdate, etc.)

    const handleBack = () => navigate(`/group-settings/${id}`);

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden">
            <ChannelsHeader onBack={handleBack} title="Estrutura de Canais" />

            <main className="flex-1 overflow-y-auto p-5 max-w-[600px] mx-auto w-full pb-32 no-scrollbar">
                <ChannelsNotice />

                {/* O componente ChannelsEditor recebe o estado e os manipuladores para renderizar a UI de edição. */}
                <ChannelsEditor 
                    channels={form.channels}
                    sections={form.channelSections}
                    onAddChannel={() => handleAddChannel()}
                    onAddSection={handleAddSection}
                    onOptions={handleOpenOptions}
                    // ... (outras props)
                />

                <button className="btn-save-fixed" onClick={handleSave}>Salvar Estrutura</button>
            </main>

            {/* Modal de Opções para editar um canal ou seção. */}
            {optionsModal.isOpen && (
                <ChannelOptionsModal 
                    isOpen={optionsModal.isOpen}
                    onClose={() => setOptionsModal({ ...optionsModal, isOpen: false })}
                    title={(optionsModal.target as any).name || (optionsModal.target as any).title}
                    type={optionsModal.type}
                    target={optionsModal.target}
                    onUpdateChannel={handleUpdateChannelProperties}
                    onAddChannelInside={optionsModal.type === 'section' ? () => handleAddChannel(optionsModal.target!.id) : undefined}
                />
            )}
        </div>
    );
};
