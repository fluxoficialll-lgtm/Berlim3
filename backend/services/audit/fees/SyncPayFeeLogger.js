import { BaseFeeFormatter } from './BaseFeeFormatter.js';

/**
 * @logger SyncPayFeeLogger
 * @description Logger especializado (Estratégia) para formatar e exibir eventos de auditoria de taxas da SyncPay.
 * Este logger é otimizado para o contexto de pagamentos brasileiros, especificamente transações via Pix.
 *
 * @example Exemplo de saída no console:
 * // 🕒 14:35:10 | 🏦 syncpay  | 🇧🇷 BRA | 💱 BRL | 💳 pix        | 📊 0.00 + 0.99%
 */
export const SyncPayFeeLogger = {
    /**
     * @method log
     * @description Formata e imprime no console o log de auditoria para uma taxa da SyncPay.
     * Ele define padrões relevantes para o Brasil (BRL, Pix) e usa a cor verde para distinguir seus logs.
     *
     * @param {object} data - O objeto contendo os detalhes da taxa da SyncPay.
     * @property {string} [data.country_code='BR'] - O código do país (sempre Brasil neste contexto).
     * @property {string} [data.method='pix'] - O método de pagamento, com padrão para 'pix'.
     * @property {string} [data.currency='BRL'] - A moeda da transação, com padrão para 'BRL'.
     * @property {number} data.fixed_fee - A taxa fixa.
     * @property {number} data.percent_fee - A taxa percentual.
     */
    log(data) {
        // Reutiliza a lógica de formatação base
        const time = BaseFeeFormatter.getTimestamp();
        const values = BaseFeeFormatter.formatValues(data.fixed_fee, data.percent_fee);

        // Lógica de formatação específica para SyncPay (contexto Brasil/Pix)
        const flag = BaseFeeFormatter.flags[data.country_code?.toUpperCase()] || '🇧🇷';
        
        // Prepara strings com padding para alinhamento da tabela no console
        const prov = 'syncpay'.padEnd(8);
        const meth = (data.method || 'pix').padEnd(10);
        const curr = (data.currency || 'BRL').toUpperCase();
        const country = (data.country_code || 'BR').toUpperCase().padEnd(3);
        
        // Imprime o log formatado em verde para fácil identificação
        // ANSI Green start: \x1b[32m, ANSI reset: \x1b[0m
        console.log(`\x1b[32m🕒 ${time} | 🏦 ${prov} | ${flag} ${country} | 💱 ${curr} | 💳 ${meth} | 📊 ${values}\x1b[0m`);
    }
};