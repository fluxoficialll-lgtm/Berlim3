import { FeeAuditOrchestrator } from './fees/index.js';

/**
 * @logger FinancialAuditLogger
 * @description Atua como a fachada (Facade) principal para o subsistema de auditoria de taxas financeiras.
 * Sua função é receber eventos de alteração de taxas e delegar a responsabilidade de formatar e registrar
 * esses eventos para o orquestrador apropriado, que pode lidar com diferentes provedores (Stripe, PayPal, etc.).
 * Isso desacopla a lógica de negócios da formatação específica do log.
 */
export const FinancialAuditLogger = {
    /**
     * @method logChange
     * @description Ponto de entrada para registrar uma alteração em uma regra de taxa.
     * Ele tenta usar o `FeeAuditOrchestrator` para uma formatação rica e específica do provedor.
     * Se a formatação especializada falhar, ele ativa um mecanismo de fallback para garantir
     * que o evento seja registrado de forma simples, evitando a perda de dados de auditoria críticos.
     *
     * @param {object} data - O objeto contendo os detalhes da regra de taxa que foi alterada.
     * @property {string} data.provider - O provedor da taxa (ex: 'stripe', 'paypal').
     * @property {number} data.fixed_fee - A nova taxa fixa.
     * @property {number} data.percent_fee - A nova taxa percentual.
     */
    logChange(data) {
        try {
            // Delega a formatação para o orquestrador, que escolherá o driver correto (Stripe, PayPal, etc.)
            FeeAuditOrchestrator.log(data);
        } catch (e) {
            // --- Fallback de Segurança ---
            // Se o FeeAuditOrchestrator falhar (ex: um novo provedor ainda não tem um logger especializado),
            // o sistema não quebra e não perde o registro. Ele apenas loga uma versão simplificada no console.
            console.warn(`⚠️ [Audit] Falha ao formatar log de taxa via orquestrador: ${e.message}`);
            console.log(`🕒 ${new Date().toLocaleTimeString()} | 🏦 ${data.provider} | 📊 ${data.fixed_fee} + ${data.percent_fee}%`);
        }
    }
};