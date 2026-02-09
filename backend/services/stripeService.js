
// 💳 Este serviço atua como uma ponte (bridge) para a API da Stripe.
// Ele encapsula toda a lógica de comunicação com a Stripe, como criar checkouts e processar webhooks.
// Nota: Este serviço utiliza chamadas REST diretas com `axios`, não o SDK oficial da Stripe (stripe-node).

import axios from 'axios';
import { dbManager } from '../database/databaseManager.js';
import { FeeEngine } from './financial/FeeEngine.js';

// Chave secreta da plataforma (FLUX), usada para orquestrar pagamentos e coletar taxas de aplicação.
const PLATFORM_STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const STRIPE_API_BASE = 'https://api.stripe.com/v1'; // URL base da API da Stripe

export const stripeService = {
    /**
     * @name verifyCredentials
     * @description
     * Verifica se uma chave secreta da Stripe é válida, tentando buscar os detalhes da conta associada.
     * Útil para quando um vendedor (sub-merchant) conecta sua própria conta Stripe.
     * @param {string} secretKey - A chave secreta da Stripe a ser verificada.
     * @returns {Promise<object>} Os dados da conta Stripe se a chave for válida.
     * @throws {Error} Lança um erro se a autenticação falhar.
     */
    verifyCredentials: async (secretKey) => {
        try {
            // Faz uma chamada GET para o endpoint `/account` da Stripe.
            const response = await axios.get(`${STRIPE_API_BASE}/account`, {
                auth: { username: secretKey, password: '' } // Autenticação HTTP Basic com a chave como username
            });
            return response.data;
        } catch (error) {
            console.error('Stripe Auth Error:', error.response?.data || error.message);
            const stripeError = error.response?.data?.error?.message;
            throw new Error(stripeError || 'Falha na autenticação com a Stripe. Verifique sua Secret Key.');
        }
    },

    /**
     * @name createCheckoutSession
     * @description
     * Cria uma sessão de Checkout na Stripe. Este é o coração do processo de pagamento.
     * A sessão gerada tem uma URL para a qual o cliente é redirecionado para pagar.
     * A lógica inclui o cálculo e a cobrança automática da taxa da plataforma (split de pagamento).
     * @param {object} group - O objeto do grupo/produto que está sendo vendido.
     * @param {string} sellerId - O ID do usuário vendedor.
     * @param {string} successUrl - A URL para redirecionar após um pagamento bem-sucedido.
     * @param {string} cancelUrl - A URL para redirecionar se o cliente cancelar.
     * @returns {Promise<{id: string, url: string}>} O ID e a URL da sessão de checkout criada.
     */
    createCheckoutSession: async (group, sellerId, successUrl, cancelUrl) => {
        try {
            const grossAmount = parseFloat(group.price); // Valor bruto da venda

            // 1. Calcula as taxas da plataforma usando o FeeEngine
            const feeData = await FeeEngine.calculateTransaction(grossAmount, sellerId, {
                provider: 'stripe',
                method: 'card',
                country: 'BR',
                currency: group.currency || 'BRL'
            });

            // 2. Monta os parâmetros para a chamada da API da Stripe
            const isSubscription = group.accessType === 'temporary';
            const params = new URLSearchParams(); // Stripe usa `x-www-form-urlencoded` para a API de Sessões
            
            params.append('mode', isSubscription ? 'subscription' : 'payment'); // Define se é pagamento único ou assinatura
            params.append('automatic_payment_methods[enabled]', 'true'); // Permite que a Stripe mostre os melhores métodos de pagamento

            // 3. Configura os detalhes do item que está sendo comprado
            params.append('line_items[0][price_data][currency]', (group.currency || 'BRL').toLowerCase());
            params.append('line_items[0][price_data][product_data][name]', `VIP: ${group.name}`);
            params.append('line_items[0][price_data][unit_amount]', Math.round(grossAmount * 100)); // O valor deve ser em centavos
            
            if (isSubscription) {
                params.append('line_items[0][price_data][recurring][interval]', 'month'); // Configura a recorrência para mensal, se for assinatura
            }
            
            params.append('line_items[0][quantity]', '1');
            params.append('success_url', successUrl);
            params.append('cancel_url', cancelUrl);
            
            // 4. Anexa metadados importantes que serão usados no webhook para rastrear o pedido
            params.append('metadata[groupId]', group.id);
            params.append('metadata[sellerId]', sellerId);
            params.append('metadata[platformFee]', feeData.platformFee.toString());

            // 5. Configura o split de taxa (taxa da plataforma)
            const feeInCents = Math.round(feeData.platformFee * 100);
            if (feeInCents > 0) {
                // Esta é a mágica: instrui a Stripe a reter este valor para a plataforma.
                params.append('payment_intent_data[application_fee_amount]', feeInCents.toString());
            }

            // 6. Envia a requisição para criar a sessão de checkout
            const response = await axios.post(`${STRIPE_API_BASE}/checkout/sessions`, params, {
                auth: { username: PLATFORM_STRIPE_SECRET, password: '' }, // Autentica a chamada com a chave da plataforma
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            return {
                id: response.data.id,  // ID da sessão
                url: response.data.url // URL para redirecionar o cliente
            };
        } catch (error) {
            console.error('Stripe Session Error:', error.response?.data || error.message);
            throw new Error('Erro ao criar checkout na Stripe.');
        }
    },

    /**
     * @name handleWebhook
     * @description
     * Ponto de entrada para todos os webhooks recebidos da Stripe.
     * Ele identifica o tipo de evento e delega para a função apropriada.
     * @param {object} event - O objeto do evento vindo da Stripe.
     */
    handleWebhook: async (event) => {
        const type = event.type;
        const data = event.data.object;

        // Por enquanto, só nos importamos com o evento de sucesso do checkout.
        if (type === 'checkout.session.completed') {
            await stripeService.fulfillOrder(data);
        }
        // Outros eventos como 'invoice.payment_failed' poderiam ser tratados aqui no futuro.
    },

    /**
     * @name fulfillOrder
     * @description
     * Executa a lógica de "pós-venda" após um pagamento ser confirmado pela Stripe.
     * Isso inclui registrar a transação no nosso banco de dados.
     * @param {object} session - O objeto da sessão de checkout vindo do webhook.
     */
    fulfillOrder: async (session) => {
        // Extrai os metadados que anexamos na criação da sessão
        const { groupId, sellerId } = session.metadata;
        const amount = session.amount_total / 100; // Converte de centavos para a unidade principal
        const platformProfit = parseFloat(session.metadata.platformFee || 0);

        try {
            // Registra a transação no banco de dados para o vendedor
            await dbManager.financial.recordTransaction({
                userId: sellerId,
                type: 'sale', // É uma venda para o vendedor
                amount: amount - platformProfit, // O valor líquido do vendedor
                status: 'paid',
                providerTxId: session.id, // ID da transação na Stripe
                currency: session.currency.toUpperCase(),
                data: { 
                    platformProfit, // Lucro da plataforma
                    groupId, 
                    method: 'Stripe Checkout',
                    fullGross: amount // Valor bruto total
                }
            });
        } catch (e) {
            console.error(`❌ [Fulfill Error]: Não foi possível registrar a transação para a sessão ${session.id}.`, e.message);
        }
    }
};
