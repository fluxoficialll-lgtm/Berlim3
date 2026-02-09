import { StripeFeeLogger } from './StripeFeeLogger.js';
import { SyncPayFeeLogger } from './SyncPayFeeLogger.js';
import { PayPalFeeLogger } from './PayPalFeeLogger.js';

/**
 * @orchestrator FeeAuditOrchestrator
 * @description Atua como um roteador ou despachante para eventos de auditoria de taxas.
 * Ele implementa o "Strategy Pattern", selecionando o logger (estratégia) apropriado em tempo de execução
 * com base no provedor de pagamento especificado nos dados do evento.
 *
 * @purpose Centralizar a lógica de delegação, permitindo que o `FinancialAuditLogger` permaneça agnóstico
 * em relação aos loggers específicos de cada provedor. Isso torna o sistema extensível: para suportar um
 * novo provedor, basta adicionar um novo logger e uma nova condição neste arquivo.
 */
export const FeeAuditOrchestrator = {
    /**
     * @method log
     * @description Recebe um evento de auditoria de taxa e o direciona para o logger especializado correto.
     * Ele analisa o campo `provider` e invoca o método `log` do logger correspondente.
     *
     * @param {object} data - O objeto contendo os detalhes da taxa.
     * @property {string} data.provider - O provedor do gateway de pagamento (ex: 'stripe', 'syncpay', 'paypal').
     * @property {*} ...outrosDados - Os demais dados a serem logados, que serão processados pelo logger específico.
     */
    log(data) {
        // Normaliza o nome do provedor para evitar erros de case (ex: 'Stripe' vs 'stripe')
        const provider = (data.provider || '').toLowerCase();
        
        // Roteia para o logger (estratégia) apropriado
        if (provider === 'stripe') {
            StripeFeeLogger.log(data);
        } else if (provider === 'syncpay') {
            SyncPayFeeLogger.log(data);
        } else if (provider === 'paypal') {
            PayPalFeeLogger.log(data);
        } else {
            // Fallback para provedores desconhecidos, garantindo que o log não seja perdido.
            console.log(`[FEE-AUDIT] ${provider.toUpperCase()}: ${data.fixed_fee} / ${data.percent_fee}%`);
        }
    }
};