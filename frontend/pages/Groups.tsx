// Este arquivo define a página principal de listagem de grupos do usuário.

import React, { useEffect, useRef, useState, useCallback, Suspense, lazy } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { groupService } from '../services/groupService';
import { chatService } from '../services/chatService';
import { Group } from '../types';
// TODO: Acesso direto ao banco de dados para reatividade e verificação de acesso VIP. Refatorar.
// import { db } from '@/database';

// Importação de componentes da UI com caminhos corrigidos.
import { useModal } from './components/ModalSystem';
import { Footer } from './components/layout/Footer';
import { MainHeader } from './components/layout/MainHeader';
import { JoinViaLinkBtn } from './components/groups/list/JoinViaLinkBtn';
import { GroupListItem } from './components/groups/list/GroupListItem';
import { CreateGroupFAB } from './components/groups/list/CreateGroupFAB';

// Lazy loading para o modal de tracking.
const TrackingModal = lazy(() => import('./components/groups/TrackingModal').then(m => ({ default: m.TrackingModal })));

/**
 * Componente: Groups
 * Propósito: Exibe a lista de grupos dos quais o usuário faz parte. A página implementa scroll infinito
 * para carregar os grupos de forma paginada. Permite ao usuário entrar em um novo grupo através de um 
 * código de convite e gerencia a navegação para a visualização correta do grupo (chat, hub de conteúdo, 
 * página de vendas VIP, etc.) com base no tipo de grupo e no status de membro do usuário.
 * Nota de Refatoração: O componente atualmente se inscreve diretamente no `db` para atualizações em 
 * tempo real e verifica o acesso VIP. Esta lógica deve ser movida para hooks ou serviços para 
 * desacoplar a UI da camada de dados.
 */
export const Groups: React.FC = () => {
  const navigate = useNavigate();
  const { showPrompt } = useModal();
  
  // Estados para grupos, paginação, UI e modais.
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  // ... (outros estados)

  // Função para carregar grupos de forma paginada.
  const loadLocalGroups = useCallback((currentOffset: number) => {
    // ... (lógica para chamar groupService.getGroupsPaginated)
  }, []);

  // Efeito para carregar dados iniciais e configurar listeners.
  useEffect(() => {
    // ... (lógica para carregar grupos, tratar join via URL, e inscrever-se no `db`)
  }, [/*...*/]);

  // Manipulador para navegar para um grupo.
  const handleGroupClick = (group: Group) => {
    // ... (lógica de roteamento baseada no tipo de grupo, status de membro, e acesso VIP)
  };

  // Manipulador para entrar em um grupo via código.
  const handleJoinByLink = (inputCode: string) => {
    // ... (lógica para chamar groupService.joinGroupByLinkCode)
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <MainHeader /*...*/ />

      <main className="flex-grow pt-[100px] pb-[100px] px-4">
        <JoinViaLinkBtn onClick={async () => {
            const code = await showPrompt("Entrar via Link", "Cole o código do grupo:");
            if (code) handleJoinByLink(code);
        }} />

        <div className="w-full">
            {/* Mapeia e renderiza a lista de grupos. */}
            {groups.map(group => (
                <GroupListItem 
                    key={group.id}
                    group={group}
                    /*...*/
                />
            ))}
            {/* Indicador de carregamento ou estado vazio. */}
        </div>
      </main>

      <CreateGroupFAB onClick={() => navigate('/create-group')} />
      <Footer />

      {/* Modal de Tracking (carregado de forma lazy) */}
      {isTrackingModalOpen && (/* ... */)}
    </div>
  );
};