
import { FeeRepository } from '../../database/repositories/financial/FeeRepository.js';

/**
 * @service FeeCalculator
 * @description Este serviço é o cérebro por trás da monetização da plataforma. Ele centraliza
 * a lógica de quanto a Flux deve ganhar em cada transação, baseando-se em um conjunto
 * de regras dinâmicas armazenadas no banco de dados.
 */
export const FeeCalculator = {
    /**
     * @method calculateNet
     * @description Calcula a comissão da plataforma (taxa) e o valor líquido que o vendedor/recebedor final irá receber.
     * A lógica procura por uma regra de taxa específica que corresponda aos parâmetros da transação.
     * Se nenhuma regra for encontrada, aplica uma taxa de segurança padrão (fallback).
     *
     * @param {number} grossAmount - O valor bruto total pago pelo cliente final.
     * @param {string} provider - O gateway de pagamento utilizado (ex: 'stripe', 'paypal', 'syncpay').
     * @param {string} method - O método de pagamento (ex: 'credit_card', 'pix', 'boleto').
     * @param {string} [country='ALL'] - O código do país (ISO 3166-1 alpha-2) da transação, para regras geográficas.
     * @returns {Promise<object>} Um objeto detalhando a divisão do valor.
     * @property {number} gross - O valor bruto original.
     * @property {number} platformFee - A comissão calculada para a plataforma.
     * @property {number} netAmount - O valor líquido a ser recebido pelo vendedor.
     * @property {string} appliedRule - Uma descrição da regra que foi aplicada no cálculo.
     * @property {number|undefined} appliedRuleId - O ID da regra do banco de dados que foi usada.
     */
    async calculateNet(grossAmount, provider, method, country = 'ALL') {
        // Busca no banco de dados pela regra mais específica que corresponda à transação.
        const rule = await FeeRepository.findRule(provider, method, country);

        // --- Lógica de Fallback ---
        // Se nenhuma regra for encontrada, em vez de falhar, o sistema aplica uma taxa
        // de segurança padrão de 10%. Isso garante que a plataforma não perca receita
        // em casos de configurações ausentes.
        if (!rule) {
            const fallbackFee = grossAmount * 0.10;
            return {
                gross: grossAmount,
                platformFee: parseFloat(fallbackFee.toFixed(2)),
                netAmount: parseFloat((grossAmount - fallbackFee).toFixed(2)),
                appliedRule: 'SAFETY_FALLBACK_10'
            };
        }

        // --- Cálculo Padrão da Taxa ---
        // A fórmula é uma combinação de uma porcentagem sobre o valor total e uma taxa fixa.
        // Fórmula: (Valor * %) + Fixo
        const percentageValue = grossAmount * (Number(rule.percent_fee) / 100);
        const fixedValue = Number(rule.fixed_fee);
        
        const platformFee = percentageValue + fixedValue;
        // Garante que o valor líquido nunca seja negativo.
        const netAmount = Math.max(0, grossAmount - platformFee);

        return {
            gross: grossAmount,
            platformFee: parseFloat(platformFee.toFixed(2)), // Garante 2 casas decimais.
            netAmount: parseFloat(netAmount.toFixed(2)),
            appliedRuleId: rule.id,
            appliedRule: `${rule.percent_fee}% + R$ ${rule.fixed_fee}`
        };
    }
};
