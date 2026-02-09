
// 🇵🇵 Este serviço é a ponte de comunicação com a API REST do PayPal.
// Ele encapsula a lógica de autenticação (OAuth2), criação de pedidos e captura de pagamentos.

import axios from 'axios';

// Define a URL da API do PayPal com base no ambiente (Produção ou Sandbox).
const PAYPAL_API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com';

/**
 * @name getAccessToken
 * @private
 * @description Obtém um token de acesso OAuth2 do PayPal, que é necessário para autenticar todas as outras chamadas à API.
 * @param {string} clientId - O Client ID da API do vendedor.
 * @param {string} clientSecret - O Client Secret da API do vendedor.
 * @returns {Promise<string>} O token de acesso.
 */
const getAccessToken = async (clientId, clientSecret) => {
    // O PayPal usa autenticação HTTP Basic com o Client ID e Secret codificados em Base64.
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    try {
        const response = await axios.post(`${PAYPAL_API_URL}/v1/oauth2/token`, 'grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('PayPal Auth Error:', error.response?.data || error.message);
        throw new Error('Falha na autenticação com o PayPal.');
    }
};

export const paypalService = {
    /**
     * @name verifyCredentials
     * @description Verifica se as credenciais (clientId, clientSecret) são válidas, tentando obter um token de acesso.
     */
    verifyCredentials: async (clientId, clientSecret) => {
        return await getAccessToken(clientId, clientSecret);
    },

    /**
     * @name createOrder
     * @description Cria um pedido (Order) no PayPal. Este é o primeiro passo do fluxo de pagamento.
     * @param {string} clientId - Client ID do vendedor.
     * @param {string} clientSecret - Client Secret do vendedor.
     * @param {number} amount - O valor da transação.
     * @param {string} currency - A moeda (ex: 'BRL').
     * @param {string} description - Descrição do produto/serviço.
     * @returns {Promise<{id: string, status: string, approvalLink: string}>} Retorna o ID do pedido e o link para o cliente aprovar o pagamento.
     */
    createOrder: async (clientId, clientSecret, amount, currency = 'BRL', description = '') => {
        const token = await getAccessToken(clientId, clientSecret);
        
        const payload = {
            intent: 'CAPTURE', // A intenção é capturar o pagamento imediatamente após a aprovação.
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: amount.toFixed(2) // O valor deve ser uma string com duas casas decimais.
                },
                description: description
            }],
            application_context: {
                brand_name: 'Flux Platform', // Nome que aparece na tela de checkout do PayPal.
                user_action: 'PAY_NOW',      // Rótulo do botão final para o cliente.
                shipping_preference: 'NO_SHIPPING' // Essencial para produtos digitais.
            }
        };

        try {
            const response = await axios.post(`${PAYPAL_API_URL}/v2/checkout/orders`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // O `approvalLink` é a URL crucial para onde o cliente deve ser redirecionado.
            const approvalLink = response.data.links.find(link => link.rel === 'approve')?.href;
            
            return {
                id: response.data.id,
                status: response.data.status,
                approvalLink
            };
        } catch (error) {
            console.error('PayPal Create Order Error:', error.response?.data || error.message);
            throw new Error('Falha ao criar pedido no PayPal.');
        }
    },

    /**
     * @name checkStatus
     * @description Verifica o status de um pedido e, se APROVADO pelo cliente, captura o pagamento.
     * Este é o segundo passo crítico do fluxo de pagamento.
     * @param {string} clientId - Client ID do vendedor.
     * @param {string} clientSecret - Client Secret do vendedor.
     * @param {string} orderId - O ID do pedido do PayPal a ser verificado/capturado.
     * @returns {Promise<{status: string, details?: object, note?: string}>} O status final do pagamento.
     */
    checkStatus: async (clientId, clientSecret, orderId) => {
        const token = await getAccessToken(clientId, clientSecret);
        
        try {
            // 1. Verifica o status atual do pedido.
            const checkRes = await axios.get(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // 2. Se o cliente APROVOU o pagamento, nós devemos CAPTURAR o dinheiro.
            if (checkRes.data.status === 'APPROVED') {
                // A chamada para `/capture` efetivamente transfere os fundos.
                const captureRes = await axios.post(`${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`, {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                return { 
                    status: 'paid', // Nosso status interno.
                    details: captureRes.data // Detalhes completos da captura.
                };
            }

            // Se o status já for 'COMPLETED', significa que a captura já ocorreu.
            if (checkRes.data.status === 'COMPLETED') {
                return { status: 'paid', details: checkRes.data };
            }

            // Para qualquer outro status (ex: 'CREATED', 'SAVED'), o pagamento está pendente.
            return { status: 'pending', rawStatus: checkRes.data.status };

        } catch (error) {
            console.error('PayPal Capture/Status Error:', error.response?.data || error.message);
            // Erro 422 (Unprocessable Entity) geralmente significa que a captura já foi feita.
            if (error.response?.status === 422) {
                return { status: 'paid', note: 'Pagamento provavelmente já capturado.' };
            }
            throw new Error('Falha ao verificar/capturar status no PayPal.');
        }
    }
};
