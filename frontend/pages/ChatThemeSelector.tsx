// Este arquivo define a página onde o usuário pode selecionar um tema visual para a interface de chat.
// Ele inclui a definição dos temas, a lógica para aplicá-los e a UI para a seleção.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Definição da estrutura de dados para um tema de chat.
interface ChatTheme {
  id: string;
  name: string;
  colors: { /* ...definição de cores... */ };
}

// Array com todos os temas disponíveis.
const themes: ChatTheme[] = [
  // ... objetos de tema ...
];

// Hook customizado para gerenciar a lógica de tema.
const useChatTheme = () => {
    const [theme, setTheme] = useState(themes[0]);

    // Efeito para carregar o tema salvo do localStorage ao iniciar.
    useEffect(() => {
        const savedThemeId = localStorage.getItem('chatTheme') || 'default';
        const savedTheme = themes.find(t => t.id === savedThemeId) || themes[0];
        setTheme(savedTheme);
    }, []);

    // Efeito para aplicar as cores do tema como variáveis CSS globais.
    useEffect(() => {
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            // Converte camelCase para kebab-case para a variável CSS.
            const cssVar = `--chat-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
            root.style.setProperty(cssVar, value);
        });
        localStorage.setItem('chatTheme', theme.id);
    }, [theme]);

    return { theme, setTheme, themes };
};

/**
 * Componente: ChatThemeSelector
 * Propósito: Permite ao usuário visualizar e selecionar um tema visual para as conversas.
 * O tema selecionado é salvo no localStorage e aplicado dinamicamente em toda a aplicação
 * através de variáveis CSS.
 */
export const ChatThemeSelector: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme, themes } = useChatTheme();

  const handleBack = () => navigate(-1);

  // Componente interno para renderizar o card de pré-visualização de um tema.
  const ThemePreviewCard: React.FC<{ t: ChatTheme }> = ({ t }) => (
    <div 
        onClick={() => setTheme(t)}
        style={{ background: t.colors.background, border: `2px solid ${t.id === theme.id ? '#00c2ff' : t.colors.bubbleBorder}` }}
        className="cursor-pointer rounded-2xl p-4 transition-all duration-300 transform hover:scale-105"
    >
        {/* ... UI de pré-visualização do tema ... */}
        <h3 style={{ color: t.colors.text }} className="text-center font-bold text-sm mt-4">{t.name}</h3>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0c0f14] text-white font-['Inter'] flex flex-col">
      <header className="flex items-center p-4 bg-[#1a1d21] border-b border-gray-800">
        {/* ... cabeçalho da página ... */}
      </header>

      <main className="flex-grow p-5 overflow-y-auto">
        <p className="text-gray-400 text-center mb-8 text-sm">Selecione um tema para personalizar sua experiência em todas as conversas.</p>
        <div className="grid grid-cols-2 gap-5">
            {/* Mapeia e renderiza os cards de pré-visualização de cada tema. */}
            {themes.map(t => <ThemePreviewCard key={t.id} t={t} />)}
        </div>
      </main>
    </div>
  );
};