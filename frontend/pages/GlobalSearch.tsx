// Este arquivo define a página de busca global de usuários.

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { relationshipService } from '../services/relationshipService';
import { authService } from '../services/authService';
import { chatService } from '../services/chatService';
import { User } from '../types';
import { useModal } from './components/ModalSystem';
import { debounce } from '../utils/debounce';

/**
 * Componente: GlobalSearch
 * Propósito: Fornece uma interface para buscar usuários em toda a plataforma. Permite aos usuários
 * encontrar outras pessoas, ver seu status de seguimento (seguindo, solicitado, etc.),
 * iniciar uma conversa ou visitar seu perfil.
 */
export const GlobalSearch: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useModal();
  
  // Estados para o termo de busca, resultados, e controle de UI.
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [relationships, setRelationships] = useState<any>({}); // Estado para reatividade

  const currentUser = authService.getCurrentUser();

  // Efeito para carregar o estado inicial dos relacionamentos
  useEffect(() => {
    if(currentUser) {
        // Simula o carregamento de dados de relacionamento que seriam reativos
        setRelationships(relationshipService.getRelationships(currentUser.uid));
    }
  }, [currentUser]);

  // Lógica de busca com debounce
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (term.trim() === '') {
        setUsers([]);
        setLoading(false);
        return;
      }
      const results = await authService.searchUsers(term);
      setUsers(results);
      setLoading(false);
    }, 300), // 300ms de delay
    []
  );

  useEffect(() => {
    setLoading(true);
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Manipulador para seguir/deixar de seguir um usuário.
  const handleAction = async (targetUser: User) => {
    if (!currentUser || !targetUser.profile?.name) return;
    setProcessingId(targetUser.email);
    try {
        const currentStatus = relationshipService.getRelationshipStatus(currentUser.uid, targetUser.profile.name);
        if (currentStatus === 'following' || currentStatus === 'requested') {
            await relationshipService.unfollowUser(currentUser.uid, targetUser.profile.name);
        } else {
            await relationshipService.followUser(currentUser.uid, targetUser.profile.name, targetUser.isPrivate || false);
        }
        // Força a re-renderização atualizando o estado dos relacionamentos
        setRelationships({...relationshipService.getRelationships(currentUser.uid)});
    } catch (error) {
        showAlert('Erro', 'Ocorreu um erro ao processar a sua solicitação.');
    } finally {
        setProcessingId(null);
    }
  };

  // Navega para a página de perfil do usuário.
  const handleProfileClick = (username: string) => {
    if(username) navigate(`/user/${username}`);
  };

  // Inicia uma conversa com o usuário.
  const handleMessageClick = async (targetUser: User) => {
    if (!currentUser || !targetUser.profile?.name) return;
    const chatId = await chatService.createChat(currentUser.uid, targetUser.email, targetUser.profile.name);
    if (chatId) {
        navigate(`/chat/${chatId}`);
    }
  };

  const filteredUsers = useMemo(() => {
      return users.filter(user => user.email !== currentUser?.email);
  }, [users, currentUser]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white flex flex-col font-sans">
      <header className="flex items-center p-4 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-2xl">
            <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-bold ml-4">Buscar</h1>
      </header>

      <main className="flex-grow p-4">
        <div className="search-container mb-4">
            <div className="search-input-wrapper relative">
                <i className={`fa-solid ${loading ? 'fa-circle-notch fa-spin' : 'fa-magnifying-glass'} absolute left-3 top-1/2 -translate-y-1/2 text-gray-400`}></i>
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Buscar usuários..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>

        <div className="user-list space-y-2">
            {filteredUsers.map(user => {
                const username = user.profile?.name || 'unknown';
                const status = relationshipService.getRelationshipStatus(currentUser?.uid ?? '', username);
                const isProcessing = processingId === user.email;
                
                return (
                    <div key={user.email} className="user-item bg-gray-900/70 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center" onClick={() => handleProfileClick(username)}>
                            <img src={user.profile?.photoUrl || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="Avatar" className="w-12 h-12 rounded-full mr-4"/>
                            <div>
                                <p className="font-bold">{username}</p>
                                <p className="text-sm text-gray-400">{user.followers?.length ?? 0} seguidores</p>
                            </div>
                        </div>
                        
                        <div className="action-buttons flex items-center space-x-2">
                            <button onClick={() => handleMessageClick(user)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"><i className="fa-solid fa-paper-plane"></i></button>
                            <button onClick={() => handleAction(user)} disabled={isProcessing} className={`px-4 py-2 rounded-full font-semibold text-sm ${status === 'following' ? 'bg-red-500' : 'bg-blue-500'} disabled:opacity-50`}>
                                {isProcessing ? '...' : (status === 'following' ? 'Deixar de Seguir' : (status === 'requested' ? 'Solicitado' : 'Seguir'))}
                            </button>
                        </div>
                    </div>
                );
            })}
            
            {/* Mensagem de estado vazio ou inicial. */}
            {filteredUsers.length === 0 && !loading && searchTerm.length > 0 && (
                <div className="text-center py-10 text-gray-500">
                    <p>Nenhum usuário encontrado.</p>
                </div>
            )}
             {searchTerm.length === 0 && !loading && (
                <div className="text-center py-10 text-gray-500">
                    <p>Busque por usuários para ver os resultados.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};
