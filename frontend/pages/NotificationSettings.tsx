// Este arquivo define a página de Configurações de Notificação.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { NotificationSettings as INotificationSettings } from '../types';

// Importação de componentes da UI com caminhos corrigidos.
import { useModal } from './components/ModalSystem';
import { GlobalPauseCard } from './components/notifications/settings/GlobalPauseCard';
import { SocialSection } from './components/notifications/settings/SocialSection';
import { CommunicationSection } from './components/notifications/settings/CommunicationSection';
import { BusinessSection } from './components/notifications/settings/BusinessSection';
import { EmailPreferencesSection } from './components/notifications/settings/EmailPreferencesSection';

/**
 * Componente: NotificationSettings
 * Propósito: Fornece uma interface para o usuário gerenciar suas preferências de notificação.
 * A página é dividida em seções lógicas (Social, Comunicação, Negócios, etc.) e permite
 * ao usuário ativar ou desativar tipos específicos de notificações push e por e-mail.
 * As configurações são carregadas do `authService` e salvas de forma otimista, com um
 * indicador de sincronização na UI.
 */
export const NotificationSettings: React.FC = () => {
    const navigate = useNavigate();
    const { showAlert } = useModal();
    
    const [settings, setSettings] = useState<INotificationSettings>({ /* ... valores padrão ... */ });
    const [isSyncing, setIsSyncing] = useState(false);

    // Carrega as configurações salvas do usuário ao montar o componente.
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user?.notificationSettings) {
            setSettings(user.notificationSettings);
        }
    }, []);

    // Função para alternar uma configuração e salvar no backend.
    const toggleSetting = async (key: keyof INotificationSettings) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        setSettings(newSettings); // Atualização otimista
        setIsSyncing(true);

        try {
            await authService.updateNotificationSettings(newSettings);
        } catch (error) {
            // Reverte em caso de erro.
            setSettings(settings);
            showAlert("Erro", "Não foi possível salvar suas preferências.");
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
            <header>{/* ... Cabeçalho com indicador de sincronização ... */}</header>

            <main className="flex-1 overflow-y-auto ...">
                <GlobalPauseCard enabled={settings.pauseAll} onToggle={() => toggleSetting('pauseAll')} />

                <div className="space-y-2 mt-6">
                    {/* Seções de configurações, desabilitadas se pauseAll estiver ativo */}
                    <SocialSection settings={settings} onToggle={toggleSetting} disabled={settings.pauseAll} />
                    <CommunicationSection settings={settings} onToggle={toggleSetting} disabled={settings.pauseAll} />
                    <BusinessSection settings={settings} onToggle={toggleSetting} disabled={settings.pauseAll} />
                    <EmailPreferencesSection settings={settings} onToggle={toggleSetting} />
                </div>
            </main>
        </div>
    );
};