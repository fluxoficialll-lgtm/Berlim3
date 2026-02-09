// Este arquivo define a página de busca global de usuários.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { relationshipService } from '../services/relationshipService';
import { authService } from '../services/authService';
import { chatService } from '../services/chatService';
import { User } from '../types';
// TODO: Acesso direto ao banco de dados. Considerar refatoração.
// import { db } from '@/database';
// Importação do hook de modal com caminho corrigido.
import { useModal } from './components/ModalSystem';

/**
 * Componente: GlobalSearch
 * Propósito: Fornece uma interface para buscar usuários em toda a plataforma. Permite aos usuários
 * encontrar outras pessoas, ver seu status de seguimento (seguindo, solicitado, etc.),
 * iniciar uma conversa ou visitar seu perfil. 
 * Nota de Refatoração: O componente usa `db.subscribe` para reatividade, o que acopla a UI
 * diretamente à camada de dados. Uma abordagem melhor seria usar um hook customizado (ex: `useRelationshipStatus`)
 * que encapsularia essa lógica de subscrição.
 */
export const GlobalSearch: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useModal();
  
  // Estados para o termo de busca, resultados, e controle de UI.
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Efeito para realizar a busca com debounce via API.
  useEffect(() => {
    // ... (lógica de debounce e chamada ao authService.searchUsers)
  }, [searchTerm]);

  // Efeito para subscrição a mudanças nos relacionamentos (seguir/deixar de seguir).
  useEffect(() => {
    // const unsubRel = db.subscribe('relationships', () => { /*...*/ });
    // return () => unsubRel();
  }, []);

  // Manipulador para seguir/deixar de seguir um usuário.
  const handleAction = async (user: User) => {
    // ... (chama relationshipService.followUser ou unfollowUser)
  };

  // Manipuladores para navegação (perfil e mensagem).
  const handleProfileClick = (username: string) => { /*...*/ };
  const handleMessageClick = (user: User) => { /*...*/ };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <style>{/* ... Estilos embutidos ... */}</style>

      <header>{/* ... Cabeçalho da página ... */}</header>

      <main>
        <div className="search-container">
            <div className="search-input-wrapper">
                <i className={`fa-solid ${loading ? 'fa-circle-notch fa-spin' : 'fa-magnifying-glass'}`}></i>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /*...*/ />
            </div>
        </div>

        <div className="user-list">
            {/* Mapeia a lista de usuários para exibir os resultados. */}
            {filteredUsers.map(user => {
                const username = user.profile?.name || 'unknown';
                const status = relationshipService.isFollowing(username);
                // ...

                return (
                    <div key={user.email} className="user-item" onClick={() => handleProfileClick(username)}>
                        {/* ... Avatar e informações do usuário ... */}
                        <div className="action-buttons">
                            {/* ... Botões de Mensagem e Seguir/Deixar de Seguir ... */}
                        </div>
                    </div>
                );
            })}
            
            {/* Mensagem de estado vazio ou inicial. */}
            {filteredUsers.length === 0 && !loading && (/* ... */)}
        </div>
      </main>
    </div>
  );
};
