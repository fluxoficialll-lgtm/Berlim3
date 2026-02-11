
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../../hooks/useSettings'; // ✅ ARQUITETURA NOVA

// Componentes de UI
import { Footer } from '../components/layout/Footer';
import { SettingItem } from '../components/settings/SettingItem';
import { AccountGroup } from '../components/settings/AccountGroup';
import { PrivacyGroup } from '../components/settings/PrivacyGroup';
import { GeneralGroup } from '../components/settings/GeneralGroup';
import { Spinner } from '../components/ui/Spinner';

/**
 * ✅ ARQUITETURA NOVA: Página de Configurações refatorada.
 * A lógica foi movida para o hook `useSettings`.
 */
export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const {
    isPrivate,
    isLoading,
    error,
    handleLogout,
    handleTogglePrivacy,
  } = useSettings();

  return (
    <div className="h-screen bg-[#0c0f14] text-white flex flex-col font-['Inter']">
      <header className="flex items-center p-4 border-b border-white/10">
          <button onClick={() => navigate(-1)} className="mr-4">
              <i className="fa-solid fa-arrow-left text-xl"></i>
          </button>
          <h1 className="text-xl font-bold">Configurações</h1>
      </header>

      <main className="flex-grow overflow-y-auto p-4 no-scrollbar">
        {isLoading ? (
            <div className="flex justify-center items-center h-full"><Spinner /></div>
        ) : error ? (
            <div className="text-center text-red-500">{error}</div>
        ) : (
            <div className="space-y-8">
                <AccountGroup />
                <PrivacyGroup 
                    isPrivate={isPrivate}
                    onTogglePrivacy={handleTogglePrivacy}
                />
                <div className="settings-group">
                    <h2 className="text-lg font-semibold mb-2 text-gray-400">Geral</h2>
                    <SettingItem icon="fa-palette" label="Temas do Chat" onClick={() => navigate('/settings/chat-themes')} />
                    <GeneralGroup />
                </div>
                <div className="pt-4">
                    <button onClick={handleLogout} className="w-full text-center py-3 bg-red-600/20 text-red-400 rounded-lg font-semibold">
                        Sair da Conta
                    </button>
                </div>
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
