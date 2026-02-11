
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Serviços ---
// Caminhos corrigidos de '../../' para '../../../' para alcançar o diretório raíz de serviços.
import { groupService } from '../../../services/groupService';
import { authService } from '../../../services/authService';

// --- Tipos ---
// Caminho corrigido para o diretório de tipos.
import { Group } from '../../../types';

// --- Subcomponentes de UI ---
// Caminhos corrigidos para o diretório de features.
import { OwnerControls } from '../../../features/groups/components/platform/OwnerControls';
import { PlatformGroupCard } from '../../../features/groups/components/platform/PlatformGroupCard';

/**
 * Componente: GroupSalesPlatformView
 * 
 * Propósito: Renderiza a "vitrine" ou hub principal da plataforma de vendas de um grupo.
 * Exibe seções, pastas de conteúdo e canais de chat. Também fornece controles 
 * para o dono e administradores do grupo.
 */
export const GroupSalesPlatformView: React.FC = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // ID do grupo da URL.

    // --- Estados ---
    const [group, setGroup] = useState<Group | null>(null);
    const [canManage, setCanManage] = useState(false); // O usuário atual pode gerenciar o grupo?

    // --- Efeito para carregar dados do grupo ---
    useEffect(() => {
        if (id) {
            const foundGroup = groupService.getGroupById(id);
            if (foundGroup) {
                setGroup(foundGroup);
                // Verifica se o usuário logado é o criador ou um administrador do grupo.
                const currentUserId = authService.getCurrentUserId();
                const hasPower = foundGroup.creatorId === currentUserId || foundGroup.adminIds?.includes(currentUserId || '');
                setCanManage(hasPower);
            } else {
                // Se o grupo não for encontrado, redireciona o usuário.
                navigate('/groups');
            }
        }
    }, [id, navigate]);

    // Não renderiza nada até o grupo ser carregado.
    if (!group) return null;

    // --- Manipuladores de Eventos ---
    const handleFolderClick = (folderId: string) => {
        navigate(`/group-folder/${group.id}/${folderId}`);
    };

    const handleChannelClick = (channelId: string) => {
        navigate(`/group-chat/${group.id}/${channelId}`);
    };

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            {/* Estilos específicos do componente. Uma abordagem de CSS-in-JS ou classes de utilidade poderia ser usada aqui. */}
            <style>{`
                /* ... estilos ... */
            `}</style>

            <header className="platform-header">
                <button onClick={() => navigate('/groups')} className="text-[#00c2ff] text-xl p-2 -ml-4">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="ml-2 flex flex-col">
                    <span className="text-[10px] font-black text-[#00c2ff] uppercase tracking-[3px]">Hub da Comunidade</span>
                </div>
            </header>

            {/* Controles de administrador/dono são renderizados condicionalmente. */}
            {canManage && <OwnerControls group={group} />}

            <main className="main-scroll-area p-5 pb-32">
                <div className="max-w-[600px] mx-auto w-full">
                    
                    <div className="mb-12">
                        <PlatformGroupCard group={group} />
                    </div>

                    {/* Mapeia e renderiza cada seção da plataforma de vendas. */}
                    {(group.salesPlatformSections || []).map(section => (
                        <section key={section.id} className="mb-12 animate-fade-in">
                            {/* ... Cabeçalho da Seção ... */}
                            
                            <div className="grid gap-3">
                                {/* Renderiza as pastas de conteúdo da seção. */}
                                {(section.folders || []).map(folder => (
                                    <div key={folder.id} className="folder-item-premium" onClick={() => handleFolderClick(folder.id)}>
                                        {/* ... Ícone e detalhes da pasta ... */}
                                    </div>
                                ))}

                                {/* Renderiza os canais de chat da seção. */}
                                {(section.channels || []).map(channel => (
                                    <div key={channel.id} className="folder-item-premium" onClick={() => handleChannelClick(channel.id)}>
                                       {/* ... Ícone e detalhes do canal ... */}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Estado de "nenhum conteúdo" se não houver seções. */}
                    {(!group.salesPlatformSections || group.salesPlatformSections.length === 0) && (
                        <div className="text-center py-20 opacity-30 border-2 border-dashed border-white/5 rounded-[40px] mt-4">
                            <i className="fa-solid fa-store-slash text-3xl text-gray-600 mb-4"></i>
                            <p className="font-black uppercase tracking-widest text-[11px]">Nenhum conteúdo disponível.</p>
                        </div>
                    )}

                   {/* ... Rodapé ... */}
                </div>
            </main>
        </div>
    );
};
