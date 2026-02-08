
import { Capacitor } from '@capacitor/core';

/**
 * Configuração Central da API
 * Determina a URL base para as chamadas de API, considerando o ambiente (Web, Nativo, etc.).
 */

const getBaseUrl = (): string => {
    const isNative = Capacitor.isNativePlatform();
    
    // A URL da API é lida do gestor central de variáveis de ambiente
    const apiUrl = import.meta.env.VITE_API_URL;

    // Se estiver em um dispositivo nativo (Android/iOS)
    if (isNative) {
        // Se a URL for de localhost, converte para o IP do emulador que aponta para o host.
        // Isso é crucial para o desenvolvimento com emuladores.
        if (apiUrl.includes('localhost')) {
            return 'http://10.0.2.2:3000'; 
        }
        // Caso contrário, usa a URL configurada, removendo a barra final se houver.
        return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    }

    // Se for um ambiente web (navegador)
    // Se a URL não estiver definida ou se for o mesmo domínio do frontend, 
    // usamos um caminho relativo (''), permitindo que o navegador resolva.
    // Isso é comum quando a API e o SPA são servidos pelo mesmo servidor.
    try {
        const frontendOrigin = window.location.origin;
        if (!apiUrl || frontendOrigin.includes(new URL(apiUrl).hostname)) {
            return ''; // Caminho relativo
        }
    } catch (e) {
        // Se a apiUrl for inválida (ex: caminho relativo), falha segura para caminho relativo
        if (!apiUrl) return '';
    }
    
    // Para ambientes onde a API está em um domínio diferente, retorna a URL completa.
    return apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
};

// Exporta a URL base da API
export const API_BASE = getBaseUrl();

// Log para debugging durante o desenvolvimento
if (import.meta.env.MODE === 'development') {
    console.log(`[API Config] Base URL configurada para: \"${API_BASE || '(Caminho Relativo)'}\"`);
}
