// Este arquivo define a página de Leaderboard (Ranking de Criadores).

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { relationshipService } from '../services/relationshipService';
import { User } from '../types';
// Importação de componentes modulares da feature de leaderboard.
import { PodiumItem } from '../features/leaderboard/components/PodiumItem';
import { LeaderboardListItem } from '../features/leaderboard/components/LeaderboardListItem';

// Interface para o usuário ranqueado, estendendo o tipo User com a contagem de seguidores.
interface RankedUser extends User {
    followerCount: number;
}

/**
 * Componente: Leaderboard
 * Propósito: Renderiza uma página de ranking que classifica os criadores de conteúdo com base
 * no número de seguidores. Os três primeiros colocados são exibidos em um pódio de destaque,
 * enquanto os criadores restantes são listados abaixo. Os dados são obtidos através do
 * `relationshipService`. Clicar em um usuário navega para o seu perfil.
 */
export const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const [rankedUsers, setRankedUsers] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);

  // Efeito para carregar os dados do ranking ao montar o componente.
  useEffect(() => {
    const loadData = async () => {
        const ranked = await relationshipService.getTopCreators();
        setRankedUsers(ranked);
        setLoading(false);
    };
    loadData();
  }, []);

  // Navega para o perfil do usuário ao clicar.
  const handleUserClick = (username: string) => {
      if (!username) return;
      navigate(`/user/${username}`);
  };

  // Manipulador para voltar à página anterior.
  const handleBack = () => {
      navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <header>{/* ... Cabeçalho da página ... */}</header>

      <main>
        {loading ? (
            <div className="text-center ...">{/* Indicador de Carregamento */}</div>
        ) : (
            <>
                {/* Renderiza o pódio se houver pelo menos 3 usuários. */}
                {rankedUsers.length >= 3 && (
                    <div className="top-three-container">
                        <PodiumItem user={rankedUsers[1]} position={2} ... />
                        <PodiumItem user={rankedUsers[0]} position={1} ... />
                        <PodiumItem user={rankedUsers[2]} position={3} ... />
                    </div>
                )}

                {/* Renderiza a lista de usuários restantes. */}
                <div className="rank-list">
                    {rankedUsers.slice(rankedUsers.length >= 3 ? 3 : 0).map((user, index) => (
                        <LeaderboardListItem 
                            key={user.email}
                            user={user}
                            rank={rankedUsers.length >= 3 ? index + 4 : index + 1}
                            ...
                        />
                    ))}
                </div>

                {/* Exibe um estado vazio se não houver usuários no ranking. */}
                {rankedUsers.length === 0 && (
                    <div className="empty-state">...</div>
                )}
            </>
        )}
      </main>
    </div>
  );
};
