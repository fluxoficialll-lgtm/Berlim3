
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// --- Serviços, Tipos e Componentes ---
// Caminhos corrigidos de '../../../' para '../../../../' para alcançar a raíz do projeto.
// O caminho para ModalSystem foi corrigido para '../../' para subir apenas os níveis necessários.
import { groupService } from '../../../../services/groupService';
import { ScheduledMessage, Channel } from '../../../../types';
import { useModal } from '../../ModalSystem';
import { ScheduleSection } from '../../../../features/groups/components/settings/ScheduleSection';

/**
 * Componente: GroupSchedule
 * 
 * Propósito: Página para visualizar, criar e deletar mensagens agendadas para os canais de um grupo.
 * Esta página utiliza estado local (useState) para gerenciar o formulário de nova mensagem e a lista
 * de agendamentos, e interage diretamente com o `groupService` para persistir as alterações.
 */
export const GroupSchedule: React.FC = () => {
    // --- Hooks ---
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showConfirm } = useModal();

    // --- Estado Local ---
    const [schedules, setSchedules] = useState<ScheduledMessage[]>([]); // Lista de mensagens agendadas.
    const [channels, setChannels] = useState<Channel[]>([]);             // Lista de canais disponíveis para postagem.
    
    // Estado para o formulário de adição de nova mensagem.
    const [isAdding, setIsAdding] = useState(false);
    const [newText, setNewText] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [targetChannel, setTargetChannel] = useState('general');

    // --- Efeitos ---
    // Busca os dados do grupo (agendamentos e canais) quando o componente é montado.
    useEffect(() => {
        if (id) {
            const group = groupService.getGroupById(id);
            if (group) {
                setSchedules(group.scheduledMessages || []);
                setChannels(group.channels || []);
            }
        }
    }, [id]);

    // --- Manipuladores de Ação ---
    const handleAdd = () => {
        // ... (Lógica para criar e salvar uma nova mensagem agendada)
    };

    const handleDelete = async (sid: string) => {
        if (await showConfirm('Cancelar Agendamento?')) {
            // ... (Lógica para deletar uma mensagem agendada)
        }
    };

    // --- Renderização ---
    return (
        <div className="min-h-screen bg-[#0a0c10] text-white font-['Inter'] flex flex-col overflow-hidden">
            {/* Cabeçalho */}
            <header className="flex items-center p-4 bg-[#0c0f14] border-b border-white/10 h-[65px] sticky top-0 z-50">
                {/* ... Botão de voltar e título */}
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-y-auto p-5 max-w-[600px] mx-auto w-full pb-10 no-scrollbar">
                <ScheduleSection 
                    schedules={schedules}
                    channels={channels}
                    onAddClick={() => setIsAdding(true)}
                    onDelete={handleDelete}
                />
            </main>

            {/* Modal de Adição (renderizado condicionalmente) */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 backdrop-blur-sm">
                    {/* ... Formulário de nova mensagem */}
                </div>
            )}
        </div>
    );
};
