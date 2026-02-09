// Este arquivo define a página de Configurações do aplicativo.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

// Importação de componentes da UI com caminhos corrigidos.
import { useModal } from './components/ModalSystem';
import { Footer } from './components/layout/Footer';
import { SettingItem } from './components/settings/SettingItem';
import { AccountGroup } from './components/settings/AccountGroup';
import { PrivacyGroup } from './components/settings/PrivacyGroup';
import { GeneralGroup } from './components/settings/GeneralGroup';

/**
 * Componente: Settings
 * Propósito: Renderiza a página principal de configurações do aplicativo. A página é organizada
 * em grupos lógicos de configurações (`AccountGroup`, `PrivacyGroup`, `GeneralGroup`) para
 * facilitar a navegação do usuário. Permite ao usuário gerenciar opções como a privacidade
 * da conta, filtro de conteúdo adulto, e realizar o logout do aplicativo. As interações
 * (como salvar uma preferência) são persistidas através do `authService` ou `localStorage`.
 */
export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const [isPrivate, setIsPrivate] = useState(false);

  // Carrega as configurações iniciais do usuário.
  useEffect(() => {
      const user = authService.getCurrentUser();
      if (user?.profile) setIsPrivate(user.profile.isPrivate);
  }, []);

  // Realiza o logout do usuário.
  const handleLogout = async () => {
    if (await showConfirm("Sair", "Deseja realmente sair?")) {
      authService.logout();
      navigate('/');
    }
  };

  // Alterna a privacidade da conta do usuário.
  const handleTogglePrivacy = () => {
    const newState = !isPrivate;
    setIsPrivate(newState);
    // Lógica para salvar a nova configuração no backend.
  };

  return (
    <div className="h-screen bg-[#0c0f14] ... flex flex-col">
      <header>{/* ... Cabeçalho da página ... */}</header>

      <main className="no-scrollbar">
        {/* Grupo de configurações da conta */}
        <AccountGroup />

        {/* Grupo de configurações de privacidade */}
        <PrivacyGroup 
            isPrivate={isPrivate}
            onTogglePrivacy={handleTogglePrivacy}
            // ... outras props de privacidade
        />

        {/* Grupo de configurações gerais */}
        <div className="settings-group">
            <h2>Geral</h2>
            <SettingItem icon="fa-palette" label="Temas do Chat" onClick={() => navigate('/settings/chat-themes')} />
            <GeneralGroup />
        </div>

        <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">Sair da Conta</button>
        </div>
      </main>

      <Footer />
    </div>
  );
};