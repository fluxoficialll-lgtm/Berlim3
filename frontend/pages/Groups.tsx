
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroups } from '../../hooks/useGroups'; // ✅ ARQUITETURA NOVA
import { useModal } from '../components/ModalSystem';

// Componentes de UI
import { Footer } from '../components/layout/Footer';
import { MainHeader } from '../components/layout/MainHeader';
import { JoinViaLinkBtn } from '../components/groups/list/JoinViaLinkBtn';
import { GroupListItem } from '../components/groups/list/GroupListItem';
import { CreateGroupFAB } from '../components/groups/list/CreateGroupFAB';
import { Spinner } from '../components/ui/Spinner';

/**
 * ✅ ARQUITETURA NOVA: Página de Grupos refatorada.
 * A lógica foi movida para o hook `useGroups`.
 */
export const Groups: React.FC = () => {
  const navigate = useNavigate();
  const { showPrompt, showAlert } = useModal();
  
  const {
    groups,
    isLoading,
    error,
    hasMore,
    handleJoinByLink,
    handleGroupClick,
    loadMoreGroups, // Para o scroll infinito
  } = useGroups();

  const onJoin = async () => {
    const code = await showPrompt("Entrar com Código", "Cole o código do convite:");
    if (code) {
      try {
        const newGroup = await handleJoinByLink(code);
        showAlert("Sucesso!", `Você entrou no grupo ${newGroup.name}.`);
        handleGroupClick(newGroup); // Navega para o grupo recém-ingressado
      } catch (err: any) {
        showAlert("Erro ao Entrar", err.message);
      }
    }
  };

  const renderContent = () => {
    if (isLoading && groups.length === 0) {
        return <div className="flex justify-center p-8"><Spinner /></div>;
    }
    if (error) {
        return <div className="text-center text-red-500 p-8">{error}</div>;
    }
    if (groups.length === 0) {
        return <div className="text-center text-gray-400 p-8">Você ainda não faz parte de nenhum grupo.</div>;
    }
    return groups.map(group => (
        <GroupListItem 
            key={group.id}
            group={group}
            onClick={() => handleGroupClick(group)}
        />
    ));
  };

  // Lógica para scroll infinito pode ser adicionada aqui, observando um elemento no final da lista

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white flex flex-col">
      <MainHeader title="Grupos" />

      <main className="flex-grow pt-[80px] pb-[100px] px-4">
        <JoinViaLinkBtn onClick={onJoin} />
        
        <div className="w-full max-w-lg mx-auto mt-4 space-y-3">
            {renderContent()}
        </div>

        {hasMore && !isLoading && (
            <div className="text-center p-4">
                <button onClick={loadMoreGroups} className="text-blue-500">Carregar mais</button>
            </div>
        )}

      </main>

      <CreateGroupFAB onClick={() => navigate('/create-group')} />
      <Footer />
    </div>
  );
};
