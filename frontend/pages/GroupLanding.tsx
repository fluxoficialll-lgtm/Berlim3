
// React e hooks para estado, efeitos e roteamento.
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Serviços para buscar dados do grupo e de autenticação.
import { groupService } from '../services/groupService';
import { authService } from '../services/authService';

// Tipos e lógica de negócio.
import { Group } from '../types';
import { CapacityValidator } from '../features/groups/logic/CapacityValidator';

// Componentes de UI (caminho corrigido).
import { GroupCapacityBadge } from './components/groups/ui/GroupCapacityBadge';

/**
 * Página de Destino (Landing Page) de um Grupo.
 * Exibida para não-membros, apresentando informações do grupo e uma opção para entrar.
 */
export const GroupLanding: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // ID do grupo da URL.

  // Estados do componente
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    if (id) {
      // Busca o grupo usando o serviço (que utiliza um mock local).
      const foundGroup = groupService.getGroupById(id);
      const currentUserId = authService.getCurrentUserId();

      if (foundGroup) {
        // Se o usuário já for membro, redireciona diretamente para o chat ou canais.
        if (currentUserId && foundGroup.memberIds?.includes(currentUserId)) {
            const hasExtraChannels = foundGroup.channels && foundGroup.channels.length > 0;
            navigate(hasExtraChannels ? `/group/${id}/channels` : `/group-chat/${id}`, { replace: true });
            return;
        }

        setGroup(foundGroup);
        
        // Verifica o status do usuário em relação ao grupo (membro, banido, etc.).
        if (currentUserId) {
            setIsMember(foundGroup.memberIds?.includes(currentUserId) || false);
            setRequestSent(foundGroup.pendingMemberIds?.includes(currentUserId) || false);
            setIsBanned(foundGroup.bannedUserIds?.includes(currentUserId) || false);
        }

        // CORREÇÃO DE ARQUITETURA:
        // O código original tentava acessar o banco de dados diretamente (`db.users.get`)
        // para buscar o criador e contar membros online. Isso é uma violação da arquitetura
        // cliente-servidor e foi removido. Agora, usamos valores padrão ou mocks.

        // Mock para contagem de usuários online (estimativa).
        const estimatedOnline = Math.floor((foundGroup.memberIds?.length || 1) / 4) + 1;
        setOnlineCount(estimatedOnline);
      }
      
      setLoading(false);
    }
  }, [id, navigate]);

  /**
   * Manipula a ação de entrar no grupo.
   */
  const handleJoinAction = () => {
      if (!group || !id) return;
      if (isBanned) return; // Não permite entrar se estiver banido.

      // Valida a capacidade do grupo antes de permitir a entrada.
      if (CapacityValidator.isFull(group)) {
          alert("Lamentamos, mas este grupo atingiu o limite máximo de participantes.");
          return;
      }
      
      // Tenta entrar no grupo através do serviço.
      const result = groupService.joinGroup(id);
      if (result === 'joined') {
          const hasExtraChannels = group.channels && group.channels.length > 0;
          navigate(hasExtraChannels ? `/group/${id}/channels` : `/group-chat/${id}`);
      } else if (result === 'pending') {
          setRequestSent(true); // Atualiza a UI para mostrar que a solicitação foi enviada.
      }
  };

  // Exibe um indicador de carregamento enquanto busca os dados.
  if (loading) return <div className="h-screen bg-[#0c0f14] flex items-center justify-center text-white"><i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i></div>;
  // Exibe uma mensagem se o grupo não for encontrado.
  if (!group) return <div className="h-screen bg-[#0c0f14] flex flex-col items-center justify-center text-white p-6"><h1 className="text-xl font-bold">Grupo não encontrado</h1></div>;

  // Renderização principal da página.
  return (
    <div className="min-h-screen bg-[#0c0f14] text-white font-['Inter'] flex flex-col overflow-x-hidden">
        {/* Estilos embutidos para a página */}
        <style>{`
            .landing-hero { width: 100%; height: 300px; position: relative; overflow: hidden; }
            .hero-bg { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.4) blur(10px); transform: scale(1.1); }
            .hero-content { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 5; text-align: center; padding: 0 16px; }
            .group-avatar-large { width: 120px; height: 120px; border-radius: 32px; border: 4px solid #00c2ff; background: #1a1e26; object-fit: cover; margin-bottom: 20px; }
            .landing-body { flex-grow: 1; padding: 30px 24px; background: #0c0f14; border-radius: 30px 30px 0 0; margin-top: -30px; position: relative; z-index: 10; }
            .stat-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(255,255,255,0.05); border-radius: 20px; font-size: 12px; }
            .join-btn-large { width: 100%; padding: 18px; border: none; border-radius: 16px; background: #00c2ff; color: #000; font-size: 16px; font-weight: 800; cursor: pointer; text-transform: uppercase; transition: background-color 0.2s; }
            .join-btn-large:disabled { background: #333; color: #777; cursor: not-allowed; opacity: 0.7; }
        `}</style>
        
        {/* Botão para voltar à lista de grupos */}
        <button className="absolute top-5 left-5 z-50 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center border border-white/10" onClick={() => navigate('/groups')}><i className="fa-solid fa-arrow-left"></i></button>
        
        <div className="landing-hero">
            <img src={group.coverImage || 'https://via.placeholder.com/800'} className="hero-bg" alt="Fundo do Grupo" />
            <div className="hero-content">
                <img src={group.coverImage || 'https://via.placeholder.com/150'} className="group-avatar-large" alt="Avatar do Grupo" />
                <h1 className="text-2xl font-black text-white">{group.name}</h1>
                <div className="flex flex-col items-center gap-3 mt-4">
                    <GroupCapacityBadge group={group} />
                    <div className="flex gap-3">
                        <div className="stat-badge"><i className="fa-solid fa-user-group"></i> {group.memberIds?.length || 0} membros</div>
                        <div className="stat-badge"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_green]"></div> {onlineCount} online</div>
                    </div>
                </div>
            </div>
        </div>

        <main className="landing-body">
            <div className="text-center text-gray-400 mb-8 leading-relaxed">{group.description || "Bem-vindo a esta comunidade!"}</div>
            
            {/* Lógica de renderização do botão de ação */}
            {isBanned ? (
                <button className="join-btn-large !bg-red-500 !text-white" disabled>Você foi banido</button>
            ) : requestSent ? (
                <button className="join-btn-large !bg-gray-800" disabled>Solicitação Enviada</button>
            ) : (
                <button 
                    className="join-btn-large"
                    onClick={handleJoinAction}
                    disabled={CapacityValidator.isFull(group)}
                >
                    {CapacityValidator.isFull(group) ? 'Grupo Lotado' : (isMember ? 'Acessar Conversa' : 'Entrar no Grupo')}
                </button>
            )}
        </main>
    </div>
  );
};
