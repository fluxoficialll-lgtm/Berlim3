// Este arquivo define a página onde os usuários escolhem o tipo de grupo que desejam criar.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService'; // Importado, mas não utilizado ativamente aqui.

/**
 * Componente: CreateGroup
 * Propósito: Página de seleção que apresenta os diferentes tipos de grupos que um usuário pode criar:
 * Público, Privado ou VIP. Cada opção navega para o respectivo formulário de criação.
 */
export const CreateGroup: React.FC = () => {
  const navigate = useNavigate();

  // Navega para a criação de um grupo VIP.
  const handleVipClick = () => {
      navigate('/create-group/vip');
  };

  // Retorna para a lista de grupos, substituindo a entrada no histórico de navegação.
  const handleBack = () => {
      navigate('/groups', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden">
      {/* Estilos CSS embutidos para este componente. */}
      <style>{/* ... Estilos omitidos para brevidade ... */}</style>

      <header>
        <button onClick={handleBack}>
            <i className="fa-solid fa-arrow-left"></i>
        </button>

        {/* Ícone central que leva ao feed */}
        <div 
            className="absolute left-1/2 -translate-x-1/2 ..."
            onClick={() => navigate('/feed')}
        >
             {/* ... Detalhes do ícone ... */}
        </div>

        {/* Botão de mensagens */}
        <button style={{marginLeft:'auto'}} onClick={() => navigate('/messages')}>
            <i className="fa-solid fa-message"></i>
        </button>
      </header>

      <main id="mainContent">
        <div id="creationContainer">
            <h1 className="page-title">Criar Novo Grupo</h1>

            {/* Card para criar Grupo Público */}
            <div className="group-type-card public" onClick={() => navigate('/create-group/public')}>
                <h2><i className="fa-solid fa-globe"></i> Grupo Público (Aberto)</h2>
                <p>Qualquer pessoa pode encontrar e entrar no grupo. Ideal para comunidades e interesses gerais.</p>
            </div>

            {/* Card para criar Grupo Privado */}
            <div className="group-type-card private" onClick={() => navigate('/create-group/private')}>
                <h2><i className="fa-solid fa-lock"></i> Grupo Privado (Fechado)</h2>
                <p>Visível por todos, mas requer aprovação ou convite para entrar. Ideal para times e família.</p>
            </div>

            {/* Card para criar Grupo VIP */}
            <div className="group-type-card vip" onClick={handleVipClick}>
                <h2><i className="fa-solid fa-crown"></i> Grupo VIP (Assinatura)</h2>
                <p>Requer pagamento ou assinatura para ter acesso ao conteúdo exclusivo. (Tag VIP Dourada).</p>
            </div>

        </div>
      </main>
    </div>
  );
};