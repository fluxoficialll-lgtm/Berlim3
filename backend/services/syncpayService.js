
// 🇧🇷 Este serviço é o cliente para a API da SyncPayments, uma plataforma de pagamentos brasileira.
// Ele encapsula a lógica para autenticação, criação de cobranças (provavelmente Pix), consulta de status e saldo.

import axios from 'axios';

const SYNC_PAY_API = 'https://api.syncpayments.com.br/api/partner/v1';

export const syncPayService = {
    /**
     * @name getAccessToken
     * @description Obtém um token de acesso OAuth2 da SyncPayments para autorizar outras chamadas.
     * @param {string} clientId - O Client ID fornecido pela SyncPayments.
     * @param {string} clientSecret - O Client Secret fornecido pela SyncPayments.
     * @returns {Promise<string>} O token de acesso Bearer.
     */
    async getAccessToken(clientId, clientSecret) {
        try {
            // Constrói o corpo da requisição no formato x-www-form-urlencoded.
            const payload = new URLSearchParams();
            payload.append('client_id', clientId);
            payload.append('client_secret', clientSecret);
            payload.append('grant_type', 'client_credentials');

            const response = await axios({
                method: 'post',
                url: `${SYNC_PAY_API}/auth-token`,
                data: payload.toString(),
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'User-Agent': 'FluxPlatform/4.0' // Alguns APIs exigem um User-Agent.
                },
                timeout: 10000 // Define um timeout de 10 segundos para a requisição.
            });
            
            // A API da SyncPay pode retornar o token em diferentes campos dependendo da versão.
            const token = response.data.access_token || response.data.token;
            
            if (!token) {
                throw new Error("Resposta de autenticação inválida da SyncPay: Token não recebido.");
            }

            return token;
        } catch (error) {
            const errorData = error.response?.data;
            console.error('🔴 [SyncPay Auth Error]:', errorData || error.message);
            
            let message = 'Erro de autenticação na SyncPay: ';
            if (errorData?.error === 'invalid_client') {
                message += 'Credenciais inválidas. Verifique o Client ID e Secret.';
            } else {
                message += errorData?.error_description || errorData?.message || error.message;
            }
                
            throw new Error(message);
        }
    },

    /**
     * @name createPayment
     * @description Cria uma nova solicitação de pagamento (cash-in), como uma cobrança Pix.
     * @param {string} token - O token de acesso Bearer.
     * @param {object} payload - O corpo da requisição com os detalhes do pagamento (valor, dados do pagador, etc.).
     * @returns {Promise<object>} Os dados da cobrança criada, incluindo QR Code e informações para pagamento.
     */
    async createPayment(token, payload) {
        try {
            const response = await axios.post(`${SYNC_PAY_API}/cash-in`, payload, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('🔴 [SyncPay Cash-in Error]:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Erro ao gerar solicitação de Pix na SyncPay.');
        }
    },

    /**
     * @name getTransactionStatus
     * @description Consulta o status de uma transação específica na SyncPayments.
     * @param {string} token - O token de acesso Bearer.
     * @param {string} identifier - O ID da transação a ser consultada.
     * @returns {Promise<object>} Os detalhes atualizados da transação (ex: status, valor pago).
     */
    async getTransactionStatus(token, identifier) {
        try {
            const response = await axios.get(`${SYNC_PAY_API}/transaction/${identifier}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data.data; // A API retorna os dados dentro de um campo `data`.
        } catch (error) {
            console.error('🔴 [SyncPay Status Error]:', error.response?.data || error.message);
            throw new Error('Falha ao consultar status da transação na SyncPay.');
        }
    },

    /**
     * @name getBalance
     * @description Consulta o saldo disponível na conta do parceiro na SyncPayments.
     * @param {string} token - O token de acesso Bearer.
     * @returns {Promise<object>} O saldo disponível.
     */
    async getBalance(token) {
        try {
            const response = await axios.get(`${SYNC_PAY_API}/balance`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            console.error('🔴 [SyncPay Balance Error]:', error.response?.data || error.message);
            // Retorna um valor padrão em caso de erro para não quebrar a interface.
            return { balance: "0.00" };
        }
    }
};
