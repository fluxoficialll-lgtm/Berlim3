// frontend/components/profile/ProfileHeader.tsx

import React from 'react';
import { User } from '../../types';

interface ProfileHeaderProps {
  user: User;
  postCount: number;
}

/**
 * Componente: ProfileHeader
 * Propósito: Exibe o cabeçalho da página de perfil, incluindo a foto,
 * nome, biografia e estatísticas do usuário.
 */
export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, postCount }) => {
  return (
    <header className="flex flex-col items-center p-4 bg-gray-800 rounded-b-lg">
      <img src={user.profilePicture} alt={user.name} className="w-24 h-24 rounded-full border-4 border-gray-700" />
      <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
      <p className="text-sm text-gray-400">@{user.username}</p>
      <p className="text-center mt-2 max-w-md">{user.bio}</p>
      <div className="flex space-x-4 mt-4">
        <div>
          <p className="font-bold text-center">{postCount}</p>
          <p className="text-gray-400">Posts</p>
        </div>
        {/* Outras estatísticas (seguidores, seguindo) podem ser adicionadas aqui. */}
      </div>
    </header>
  );
};