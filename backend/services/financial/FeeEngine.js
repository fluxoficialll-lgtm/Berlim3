
// 💰 Este arquivo é o coração financeiro da plataforma: o Motor de Taxas (Fee Engine).
// Ele é responsável por uma das lógicas mais críticas do negócio: calcular quanto a plataforma
// lucra em cada transação, levando em conta regras complexas, isenções e câmbio.

import { FeeRepository } from '../../repositories/financial/FeeRepository.js';

/**
 * @name FeeEngine
 * @description
 * Contém a lógica para calcular as taxas da plataforma em transações de venda.
 * Ele opera com regras de isenção, busca de políticas de preço e conversão de moeda.
 */
export const FeeEngine = {
    /**
     * Busca a taxa de câmbio entre duas moedas usando uma API externa.
     * @param {string} from - A moeda de origem (ex: 'BRL').
     * @param {string} to - A moeda de destino (ex: 'USD').
     * @returns {Promise<number>} A taxa de conversão.
     */
    async getExchangeRate(from, to) {
        if (from === to) return 1; // Se as moedas são iguais, a taxa é 1.
        try {
            // Em um ambiente de produção, teríamos cache e chaves de API aqui.
            const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
            const data = await res.json();
            return data.rates[to] || 1;
        } catch (e) {
            // Fallback: Se a API de câmbio falhar, assume uma taxa de 1:1 para não quebrar a transação.
            console.warn(`[FeeEngine] Erro ao buscar câmbio de ${from} para ${to}. Usando paridade 1:1 como fallback.`);
            return 1;
        }
    },

    /**
     * Calcula o faturamento detalhado de uma venda, aplicando taxas e conversão de câmbio.
     * @param {number} grossAmount - O valor bruto da venda na moeda do pagamento.
     * @param {string} sellerId - O ID do vendedor.
     * @param {object} context - Contexto da transação (provedor, método, país, moeda).
     * @returns {Promise<object>} Um objeto com o detalhamento completo da transação.
     */
    async calculateTransaction(grossAmount, sellerId, context) {
        const { provider, method, country = 'ALL', currency: paymentCurrency = 'BRL' } = context;

        // --- ETAPA 1: REGRA DE ISENÇÃO (INCENTIVO DE NEGÓCIO) ---
        // Verifica se o vendedor é um anunciante ativo na plataforma.
        const isAdvertiser = await FeeRepository.hasActiveCampaigns(sellerId);
        if (isAdvertiser) {
            console.log(`[FeeEngine] Vendedor ${sellerId} isento de taxas (Anunciante Ativo).`);
            return { // Retorna um objeto zerado, aplicando a isenção.
                gross: grossAmount,
                platformFee: 0,
                netAmount: grossAmount,
                currency: paymentCurrency,
                policyApplied: 'EXEMPTION_ACTIVE_ADVERTISER',
                details: 'Taxa zero por ser um anunciante ativo'
            };
        }

        // --- ETAPA 2: BUSCA PELA MELHOR REGRA DE TAXA ---
        // Procura a regra mais específica no banco de dados que corresponda ao contexto da transação.
        const rule = await FeeRepository.resolveBestRule(provider, method, country);

        // --- ETAPA 3: REGRA DE FALLBACK (SEGURANÇA) ---
        // Se nenhuma regra específica for encontrada, aplica uma taxa de segurança padrão de 15%.
        if (!rule) {
            console.warn(`[FeeEngine] Nenhuma regra encontrada para ${provider}/${method}/${country}. Aplicando fallback de 15%.`);
            const safetyFee = parseFloat((grossAmount * 0.15).toFixed(2));
            return {
                gross: grossAmount,
                platformFee: safetyFee,
                netAmount: grossAmount - safetyFee,
                currency: paymentCurrency,
                policyApplied: 'SAFETY_FALLBACK_15',
                details: '15.00% (Regra de Segurança Padrão)'
            };
        }

        // --- ETAPA 4: INTELIGÊNCIA DE CÂMBIO ---
        // A moeda de liquidação (na qual a taxa é calculada) é definida pela regra (ex: USD).
        const settlementCurrency = rule.currency || 'USD';
        const rate = await this.getExchangeRate(paymentCurrency, settlementCurrency);
        
        // Converte o valor bruto da venda para a moeda de liquidação.
        // Ex: (R$ 50,00 * 0.20 BRL/USD) = $10.00 USD
        const grossInSettlementCurrency = grossAmount * rate;

        // --- ETAPA 5: CÁLCULO FINAL DA TAXA ---
        // Calcula a taxa com base nos valores da regra (percentual + fixo) sobre o valor convertido.
        const percentageValue = grossInSettlementCurrency * (Number(rule.percent_fee) / 100);
        const fixedValue = Number(rule.fixed_fee);
        const totalFeeInSettlement = parseFloat((percentageValue + fixedValue).toFixed(2));
        const netInSettlement = Math.max(0, grossInSettlementCurrency - totalFeeInSettlement);

        // Retorna o objeto de detalhamento financeiro completo.
        return {
            originalGross: grossAmount, // Valor bruto original
            originalCurrency: paymentCurrency, // Moeda original
            gross: parseFloat(grossInsettlementCurrency.toFixed(2)), // Valor bruto na moeda de liquidação
            platformFee: totalFeeInSettlement, // Taxa da plataforma na moeda de liquidação
            netAmount: parseFloat(netInSettlement.toFixed(2)), // Valor líquido do vendedor na moeda de liquidação
            currency: settlementCurrency, // Moeda de liquidação
            appliedRuleId: rule.id, // ID da regra aplicada para auditoria
            policyApplied: `RULE_${rule.provider.toUpperCase()}_${rule.method.toUpperCase()}`,
            details: `${rule.percent_fee}% + ${settlementCurrency} ${rule.fixed_fee}`
        };
    }
};
