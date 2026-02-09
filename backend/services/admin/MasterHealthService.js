/**
 * @service MasterHealthService
 * @description Este serviço é um painel de "saúde" focado exclusivamente na verificação
 * das configurações das contas mestras da plataforma. As "contas mestras" são as contas
 * da própria empresa (Flux) que recebem as taxas e comissões de transações.
 * 
 * O objetivo principal é garantir que as chaves de API e segredos para os gateways
 * de pagamento estejam corretamente configurados no ambiente, prevenindo falhas no recebimento de receita.
 */
export const MasterHealthService = {
    /**
     * @method checkAll
     * @description Executa todas as verificações de saúde em paralelo e retorna um objeto com o status de cada serviço.
     * @returns {Promise<object>} Um objeto contendo o status de saúde de cada gateway de pagamento (syncpay, stripe, paypal).
     */
    async checkAll() {
        return {
            syncpay: await this.checkSyncPay(),
            stripe: await this.checkStripe(),
            paypal: await this.checkPayPal()
        };
    },

    /**
     * @method checkSyncPay
     * @description Verifica a configuração da conta mestre do gateway SyncPay.
     * Atualmente, a verificação se concentra em garantir que as credenciais (Client ID e Secret) estão presentes no ambiente.
     * @returns {Promise<string>} Retorna 'ok' se as chaves existem, ou 'missing_key' se alguma delas estiver ausente.
     */
    async checkSyncPay() {
        const clientId = process.env.SYNCPAY_MASTER_CLIENT_ID;
        const secret = process.env.SYNCPAY_MASTER_CLIENT_SECRET;

        if (!clientId || !secret) return 'missing_key';
        
        try {
            // TODO: Descomentar para implementar um handshake real com a API do SyncPay.
            // Atualmente, apenas a presença das chaves é verificada.
            // const token = await syncPayService.getAccessToken(clientId, secret);
            return 'ok';
        } catch (e) {
            // Se um handshake real fosse implementado, um erro aqui indicaria um problema com as credenciais.
            return 'invalid_token';
        }
    },

    /**
     * @method checkStripe
     * @description Verifica a configuração da conta mestre do Stripe.
     * Realiza uma verificação de sanidade para garantir que a chave secreta (`sk_...`) não foi trocada pela chave pública (`pk_...`).
     * @returns {Promise<string>} 
     * - 'ok': A chave secreta parece estar no formato correto.
     * - 'missing_key': A chave secreta não foi encontrada no ambiente.
     * - 'pending': A chave configurada é uma chave pública (`pk_...`), o que é um erro comum de configuração.
     */
    async checkStripe() {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) return 'missing_key';
        // Erro comum: desenvolvedores colocam a chave publicável (publishable key) no lugar da secreta.
        if (secretKey.includes('pk_')) return 'pending'; 
        
        return 'ok';
    },

    /**
     * @method checkPayPal
     * @description Verifica a configuração da conta mestre do PayPal.
     * Garante que o Client ID do PayPal está presente no ambiente.
     * @returns {Promise<string>} Retorna 'ok' se a chave existe, ou 'missing_key' se estiver ausente.
     */
    async checkPayPal() {
        const clientId = process.env.PAYPAL_MASTER_CLIENT_ID;
        if (!clientId) return 'missing_key';
        
        // Exemplo de como um status de falha poderia ser retornado após uma tentativa de conexão.
        // return 'failed'; 
        return 'ok';
    }
};