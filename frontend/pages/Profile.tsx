// Este arquivo define a página de perfil de um usuário.

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile'; // Importação corrigida para o hook.
import { Spinner } from '../components/ui/Spinner';
import { PostGrid } from '../components/profile/PostGrid'; // Componente para exibir os posts.
import { ProfileHeader } from '../components/profile/ProfileHeader'; // Componente para o cabeçalho do perfil.

/**
 * Componente: Profile
 * Propósito: Exibe o perfil de um usuário, incluindo suas informações, 
 * foto, biografia e uma grade de seus posts.
 * 
 * Refatorado para usar o hook `useProfile` e componentes de UI separados,
 * seguindo as diretrizes de arquitetura do projeto.
 */
export const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  // O hook `useProfile` agora gerencia a lógica de busca de dados.
  // O `username` da URL é passado para o hook.
  const { user, posts, loading } = useProfile(username || '');

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div className="text-center text-white p-8">
        <p>Usuário não encontrado.</p>
        <button onClick={() => navigate('/')} className="text-blue-500 mt-4">Voltar para a Home</button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* O cabeçalho do perfil é um componente separado. */}
      <ProfileHeader user={user} postCount={posts.length} />

      <main className="p-4">
        {/* A grade de posts também é um componente separado. */}
        <PostGrid posts={posts} />
      </main>
    </div>
  );
};