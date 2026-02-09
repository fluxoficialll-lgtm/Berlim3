/**
 * @utility BaseFeeFormatter
 * @description Centraliza a lógica de formatação visual comum para todos os loggers de taxas.
 * Este objeto utilitário fornece métodos para tarefas repetitivas como obter timestamps, formatar valores
 * de taxas e mapear códigos de país para bandeiras, garantindo consistência e reutilização de código.
 */
export const BaseFeeFormatter = {
    /**
     * @property {object} flags
     * @description Um mapa estático que associa códigos de país (ISO 3166-1 alpha-2) a seus emojis de bandeira correspondentes.
     * Usado para adicionar um indicador visual rápido nos logs.
     * 'ALL' é usado como um fallback para taxas globais ou não específicas de um país.
     */
    flags: {
        BR: '🇧🇷', US: '🇺🇸', FR: '🇫🇷', DE: '🇩🇪', JP: '🇯🇵', 
        ES: '🇪🇸', IT: '🇮🇹', GB: '🇬🇧', IN: '🇮🇳', ALL: '🌍'
    },

    /**
     * @method formatValues
     * @description Formata os valores de taxas fixas e/ou percentuais em uma string legível, localizada para `pt-BR`.
     * Ele lida com vários cenários:
     * - Apenas taxa fixa (ex: "1,00")
     * - Apenas taxa percentual (ex: "1,33%")
     * - Taxa fixa + percentual (ex: "1,00 + 1,33%")
     * - Nenhuma taxa (ex: "0,00")
     * 
     * @param {number|string} fixed - O valor da taxa fixa.
     * @param {number|string} percent - O valor da taxa percentual.
     * @returns {string} Uma string representando os valores de taxa formatados.
     */
    formatValues(fixed, percent) {
        const f = parseFloat(fixed || 0);
        const p = parseFloat(percent || 0);
        
        const fStr = f.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const pStr = p.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%';

        if (f > 0 && p > 0) return `${fStr} + ${pStr}`;
        if (f > 0) return fStr;
        if (p > 0) return pStr;
        return '0,00';
    },

    /**
     * @method getTimestamp
     * @description Retorna o horário atual formatado para a localidade `pt-BR` (HH:MM:SS).
     * @returns {string} O timestamp formatado.
     */
    getTimestamp() {
        return new Date().toLocaleTimeString('pt-BR');
    }
};