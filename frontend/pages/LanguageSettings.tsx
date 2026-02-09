// Este arquivo define a página de configurações de idioma.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { preferenceService } from '../services/real/preferenceService';

// Constante com os idiomas suportados pela aplicação.
export const LANGUAGES = [
    { id: 'pt', label: 'Português', flag: '🇧🇷', nativeName: 'Brasil' },
    { id: 'en', label: 'English', flag: '🇺🇸', nativeName: 'United States' },
    { id: 'es', label: 'Español', flag: '🇪🇸', nativeName: 'España' }
];

/**
 * Componente: LanguageSettings
 * Propósito: Renderiza uma página onde o usuário pode selecionar o idioma de sua preferência
 * para a interface da aplicação. A seleção atual é destacada e, ao escolher um novo idioma,
 * a preferência é salva através do `preferenceService`. Esta alteração afeta apenas a UI,
 * não traduzindo conteúdo gerado por usuários.
 */
export const LanguageSettings: React.FC = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    const currentLangId = user?.language || localStorage.getItem('app_language') || 'pt';

    // Manipulador para salvar a nova preferência de idioma.
    const handleLanguageSelect = async (langId: string) => {
        if (user?.email) {
            await preferenceService.updateLanguage(user.email, langId);
            // Em um app real, aqui ocorreria a mudança de idioma (ex: i18next.changeLanguage).
            navigate(-1); // Volta para a página anterior.
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
            <header>{/* ... Cabeçalho da página ... */}</header>

            <main className="no-scrollbar">
                <div className="text-center mb-8 ...">
                    <i className="fa-solid fa-language text-4xl"></i>
                </div>

                <div className="lang-list">
                    {/* Mapeia os idiomas disponíveis para renderizar as opções. */}
                    {LANGUAGES.map((lang) => (
                        <div 
                            key={lang.id}
                            className={`lang-card ${currentLangId === lang.id ? 'active' : ''}`}
                            onClick={() => handleLanguageSelect(lang.id)}
                        >
                            <div className="lang-info">
                                <span className="lang-flag">{lang.flag}</span>
                                <div className="lang-texts">
                                    <span className="lang-label">{lang.label}</span>
                                    <span className="lang-native">{lang.nativeName}</span>
                                </div>
                            </div>
                            {/* Exibe um ícone de "check" para o idioma selecionado. */}
                            {currentLangId === lang.id && (
                                <div className="check-icon"><i className="fa-solid fa-check"></i></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-10 p-6 bg-white/5 ...">
                    <p className="text-[11px] text-gray-500 ...">
                        Alterar o idioma afetará apenas a interface do sistema...
                    </p>
                </div>
            </main>
        </div>
    );
};
