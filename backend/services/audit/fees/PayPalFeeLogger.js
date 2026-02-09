import { BaseFeeFormatter } from './BaseFeeFormatter.js';

/**
 * @logger PayPalFeeLogger
 * @description Logger especializado (Estratégia) para formatar e exibir eventos de auditoria de taxas do PayPal.
 * Este logger é configurado para um contexto mais global, típico das transações do PayPal.
 *
 * @example Exemplo de saída no console:
 * // 🕒 14:35:10 | 🏦 paypal   | 🌍 ALL | 💱 USD | 💳 wallet     | 📊 0.35 + 3.49%
 */
export const PayPalFeeLogger = {
    /**
     * @method log
     * @description Formata e imprime no console o log de auditoria para uma taxa do PayPal.
     * Ele define padrões globais (USD, wallet) e usa a cor amarela para distinguir seus logs.
     *
     * @param {object} data - O objeto contendo os detalhes da taxa do PayPal.
     * @property {string} [data.country_code='ALL'] - O código do país, com padrão para global.
     * @property {string} [data.method='wallet'] - O método de pagamento, com padrão para 'wallet'.
     * @property {string} [data.currency='USD'] - A moeda da transação, com padrão para 'USD'.
     * @property {number} data.fixed_fee - A taxa fixa.
     * @property {number} data.percent_fee - A taxa percentual.
     */
    log(data) {
        // Reutiliza a lógica de formatação base
        const time = BaseFeeFormatter.getTimestamp();
        const values = BaseFeeFormatter.formatValues(data.fixed_fee, data.percent_fee);

        // Lógica de formatação específica para PayPal
        const flag = BaseFeeFormatter.flags[data.country_code?.toUpperCase()] || '🌍';
        
        // Prepara strings com padding para alinhamento da tabela no console
        const prov = 'paypal'.padEnd(8);
        const meth = (data.method || 'wallet').padEnd(10);
        const curr = (data.currency || 'USD').toUpperCase();
        const country = (data.country_code || 'ALL').toUpperCase().padEnd(3);
        
        // Imprime o log formatado em amarelo para fácil identificação
        // ANSI Yellow start: \x1b[33m, ANSI reset: \x1b[0m
        console.log(`\x1b[33m🕒 ${time} | 🏦 ${prov} | ${flag} ${country} | 💱 ${curr} | 💳 ${meth} | 📊 ${values}\x1b[0m`);
    }
};