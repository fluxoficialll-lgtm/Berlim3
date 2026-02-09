import { BaseFeeFormatter } from './BaseFeeFormatter.js';

/**
 * @logger StripeFeeLogger
 * @description Logger especializado (Estratégia) para formatar e exibir eventos de auditoria de taxas da Stripe.
 * Este logger é responsável por criar uma saída de log rica e colorida, específica para os dados que a Stripe fornece.
 *
 * @example Exemplo de saída no console:
 * // 🕒 14:35:10 | 🏦 stripe   | 🇺🇸 USA | 💱 USD | 💳 card       | 📊 0.30 + 2.90%
 */
export const StripeFeeLogger = {
    /**
     * @method log
     * @description Formata e imprime no console o log de auditoria para uma taxa da Stripe.
     * Ele utiliza um formatador base para tarefas comuns e adiciona formatação específica da Stripe,
     * como bandeiras de países e cores no console.
     *
     * @param {object} data - O objeto contendo os detalhes da taxa da Stripe.
     * @property {string} [data.country_code='ALL'] - O código do país (ISO 3166-1 alpha-2) para a taxa.
     * @property {string} [data.method='card'] - O método de pagamento (ex: 'card', 'ideal').
     * @property {string} [data.currency='USD'] - A moeda da transação.
     * @property {number} data.fixed_fee - A taxa fixa.
     * @property {number} data.percent_fee - A taxa percentual.
     */
    log(data) {
        // Reutiliza a lógica de formatação base
        const time = BaseFeeFormatter.getTimestamp();
        const values = BaseFeeFormatter.formatValues(data.fixed_fee, data.percent_fee);

        // Lógica de formatação específica para Stripe
        const flag = BaseFeeFormatter.flags[data.country_code?.toUpperCase()] || '🏳️';
        
        // Prepara strings com padding para alinhamento da tabela no console
        const prov = 'stripe'.padEnd(8);
        const meth = (data.method || 'card').padEnd(10);
        const curr = (data.currency || 'USD').toUpperCase();
        const country = (data.country_code || 'ALL').toUpperCase().padEnd(3);
        
        // Imprime o log formatado em azul para fácil identificação
        // ANSI Blue start: \x1b[34m, ANSI reset: \x1b[0m
        console.log(`\x1b[34m🕒 ${time} | 🏦 ${prov} | ${flag} ${country} | 💱 ${curr} | 💳 ${meth} | 📊 ${values}\x1b[0m`);
    }
};