
// frontend/hooks/useChatThemeSelector.ts
import { useState, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo que a API retorne uma lista de temas
interface ChatTheme {
  id: string;
  name: string;
  thumbnailUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

// Tipo para o retorno do hook
interface UseChatThemeSelectorReturn {
  themes: ChatTheme[];
  isSaving: boolean;
  saveTheme: (themeId: string) => Promise<void>;
}

/**
 * 🎣 useChatThemeSelector
 *
 * Gerencia a seleção e salvamento do tema para um chat específico.
 *
 * @param conversationId O ID da conversa para a qual o tema será aplicado.
 */
export const useChatThemeSelector = (conversationId: string) => {
  // Supondo que os temas são carregados de uma fonte estática ou de uma API
  const [themes] = useState<ChatTheme[]>([]); // Pode ser preenchido via API call
  const { isLoading, execute } = useApi();

  const saveTheme = useCallback(async (themeId: string) => {
    if (!conversationId) return;
    await execute(`/api/chat/${conversationId}/theme`, {
      method: 'POST',
      body: { themeId },
    });
    // Poderia haver uma atualização de estado local para o tema atual
  }, [conversationId, execute]);

  // Lógica para carregar os temas (se não forem estáticos) iria aqui

  return {
    themes,
    isSaving: isLoading,
    saveTheme,
  };
};
