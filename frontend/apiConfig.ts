
import { Capacitor } from '@capacitor/core';
import { getConfig } from './services/configService';

const getBaseUrl = (): string => {
  const config = getConfig(); // Obtém a configuração já carregada
  const apiUrl = config.API_URL;

  if (Capacitor.isNativePlatform()) {
    // Em ambiente nativo, a URL da API deve ser sempre a URL completa.
    // A lógica de conversão para '10.0.2.2' é mantida para emuladores Android.
    if (apiUrl.includes('localhost')) {
      return 'http://10.0.2.2:3000'; // IP especial do Android Studio para o localhost da máquina host
    }
    return apiUrl;
  }

  // Em um ambiente web, se a API estiver no mesmo domínio, usamos um caminho relativo.
  // Isso evita problemas com CORS e simplifica a configuração.
  // A verificação é feita comparando a origem da janela com a origem da API.
  try {
    const frontendOrigin = window.location.origin;
    const apiOrigin = new URL(apiUrl).origin;
    if (frontendOrigin === apiOrigin) {
      return '/api'; // Usa um caminho relativo que será tratado pelo proxy ou mesmo servidor
    }
  } catch (e) {
    // Se a URL da API for inválida ou relativa, o que pode acontecer em dev, retorna um caminho relativo.
    return '/api'; 
  }

  // Se a API estiver em um domínio diferente, retorna a URL completa.
  return apiUrl;
};

// Exporta a URL base da API
export const API_BASE = getBaseUrl();

// O log de desenvolvimento agora pode obter o modo do configService
const config = getConfig();
if (config.NODE_ENV === 'development') {
    console.log(`[API Config] Base URL configurada para: "${API_BASE || '(Caminho Relativo)'}"`);
}
