
// 🚀 Este serviço é o cliente para a API de Conversões (CAPI) do Facebook/Meta.
// O objetivo é enviar eventos de conversão (ex: Purchase, Lead) diretamente do nosso servidor para o Facebook.
// Isso aumenta a precisão do rastreamento de anúncios, pois não é afetado por bloqueadores de anúncios ou restrições de privacidade do navegador.

import crypto from 'crypto';
import { MetaAdsLogger } from './audit/MetaAdsLogger.js';

const FB_API_VERSION = 'v19.0';

/**
 * @name hashData
 * @private
 * @description Normaliza e hasheia um dado para o formato exigido pela CAPI.
 * A qualidade desta função é CRÍTICA para a taxa de correspondência (event match quality) no Facebook.
 * @param {string} data - O dado a ser hasheado (ex: email, telefone).
 * @param {string} type - O tipo de dado, para aplicar normalizações específicas.
 * @returns {string | undefined} O dado hasheado em SHA-256 ou undefined se a entrada for nula.
 */
const hashData = (data, type = 'default') => {
    // 1. Ignora dados nulos ou vazios.
    if (!data) return undefined;
    // 2. Se o dado já parece ser um hash SHA-256, retorna-o diretamente para evitar re-hashing.
    if (typeof data === 'string' && /^[a-f0-9]{64}$/i.test(data)) return data.toLowerCase();

    // 3. Normalização: Limpeza e padronização dos dados ANTES de hashear.
    let normalized = String(data).trim().toLowerCase();
    if (type === 'email') {
        // Remove todos os espaços em branco de um email.
        normalized = normalized.replace(/\s/g, '');
    } else if (type === 'phone') {
        // Remove tudo que não for dígito e padroniza para o formato brasileiro com código de país (55).
        normalized = normalized.replace(/\D/g, '');
        if (normalized.startsWith('0')) normalized = normalized.substring(1);
        if (normalized.length >= 10 && normalized.length <= 11) normalized = '55' + normalized;
    } else if (type === 'country') {
        // Garante que o código do país tenha apenas 2 caracteres.
        normalized = normalized.substring(0, 2);
    }

    // 4. Hashing: Cria o hash SHA-256 do dado normalizado.
    return crypto.createHash('sha256').update(normalized).digest('hex');
};

export const facebookCapi = {
    hashData,
    /**
     * @name sendEvent
     * @description Monta e envia um evento para a API de Conversões do Facebook.
     * @param {object} params - Parâmetros do evento.
     * @param {string} params.pixelId - O ID do Pixel do Facebook.
     * @param {string} params.accessToken - O Token de Acesso da CAPI.
     * @param {string} params.eventName - O nome do evento padrão ou customizado (ex: 'Purchase', 'Lead').
     * @param {string} params.origin - A origem da chamada ('server' ou 'browser').
     * @param {string} params.eventId - Um ID único para este evento, usado para desduplicação.
     * @param {string} params.url - A URL onde o evento ocorreu.
     * @param {object} params.eventData - Dados customizados do evento (ex: { value: 100, currency: 'BRL' }).
     * @param {object} params.userData - Dados do usuário para correspondência (PII).
     * @param {string} [params.testEventCode] - Código para testar eventos na interface do Facebook.
     * @returns {Promise<object>} O resultado da API do Facebook.
     */
    sendEvent: async ({ pixelId, accessToken, eventName, origin = 'server', eventId, url, eventData, userData, testEventCode }) => {
        if (!pixelId || !accessToken) {
            MetaAdsLogger.logEvent(eventName, origin, "Falha", "error", "Credenciais Ausentes");
            return { error: 'Missing credentials' };
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);

        // Monta o objeto `user_data` hasheando cada campo de PII (Informação Pessoalmente Identificável).
        const user_data = {
            em: userData.email ? [hashData(userData.email, 'email')] : undefined,    // Email
            ph: userData.phone ? [hashData(userData.phone, 'phone')] : undefined,    // Phone
            fn: userData.firstName ? [hashData(userData.firstName)] : undefined,    // First Name
            ln: userData.lastName ? [hashData(userData.lastName)] : undefined,    // Last Name
            country: userData.country ? [hashData(userData.country, 'country')] : undefined,
            external_id: userData.externalId ? [hashData(userData.externalId)] : undefined, // ID do usuário no nosso sistema
            client_ip_address: userData.ip,
            client_user_agent: userData.userAgent,
            fbp: userData.fbp, // Facebook Browser ID cookie
            fbc: userData.fbc  // Facebook Click ID cookie
        };

        // Monta o payload final no formato exigido pela Graph API.
        const payload = {
            data: [{
                event_name: eventName,
                event_time: currentTimestamp,
                event_source_url: url,
                event_id: eventId,
                action_source: origin === 'browser' ? "website" : "system", // O Facebook chama eventos de servidor de "system".
                // Remove quaisquer campos de `user_data` que sejam `undefined`.
                user_data: Object.fromEntries(Object.entries(user_data).filter(([_, v]) => v !== undefined)),
                custom_data: {
                    ...eventData,
                    value: eventData.value ? Number(eventData.value) : undefined,
                    currency: eventData.currency || 'BRL'
                }
            }]
        };

        // Se um código de teste for fornecido, adiciona ao payload para depuração na interface do Facebook.
        if (testEventCode) payload.test_event_code = testEventCode;

        try {
            const fbUrl = `https://graph.facebook.com/${FB_API_VERSION}/${pixelId}/events?access_token=${accessToken}`;
            const response = await fetch(fbUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            
            // Loga o resultado (sucesso ou erro) para auditoria.
            if (result.error) {
                MetaAdsLogger.logEvent(eventName, origin, "Hashing", "error", result.error.message);
            } else {
                const status = testEventCode ? "test" : "success";
                MetaAdsLogger.logEvent(eventName, origin, "Hashing", status);
            }
            return result;
        } catch (error) {
            MetaAdsLogger.logEvent(eventName, origin, "Hashing", "error", error.message);
            throw error;
        }
    }
};
