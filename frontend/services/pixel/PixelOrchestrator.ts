
import { PixelEventData, PixelUserData, PixelConfig } from '../../types/pixel.types';
import { metaBrowserService } from './MetaBrowserService';
import { metaCapiService } from './MetaCapiService';
import { generateDeterministicEventId } from './logic/DeterministicId';
import { eventGuard } from './logic/EventGuard';
import { pixelPayloadBuilder } from './logic/PixelPayloadBuilder';
import { pixelPolicy } from './logic/PixelPolicy';

/**
 * 🏛️ PixelOrchestrator (Orquestrador de Pixels)
 * 
 * Esta classe é a torre de controle para todos os eventos de rastreamento de marketing (pixels).
 * Sua responsabilidade é centralizar, enriquecer e rotear eventos para os destinos corretos
 * (ex: Pixel do Meta via Browser, API de Conversões do Meta - CAPI), garantindo que os dados
 * sejam precisos, consistentes e sem duplicidade.
 */
class PixelOrchestrator {
  // Configurações dos pixels (IDs, tokens) a serem usadas.
  private config: PixelConfig = {};
  // Trava de memória para evitar o processamento do mesmo evento várias vezes em rápida sucessão.
  private processingEvents = new Set<string>();

  /**
   * Inicializa o orquestrador com as configurações de pixel do ambiente.
   * @param config - Objeto contendo IDs e tokens (ex: metaId, pixelToken).
   */
  init(config: PixelConfig) {
    this.config = config;
    // Se um ID do Meta for fornecido, inicializa o serviço de rastreamento via navegador.
    if (config.metaId) {
      metaBrowserService.init(config.metaId);
    }
  }

  /**
   * Rastreia um evento de marketing.
   * Este é o método principal, chamado por toda a aplicação para registrar ações do usuário.
   * 
   * @param eventName - O nome padrão do evento (ex: 'ViewContent', 'Purchase').
   * @param data - Dados específicos do evento (ex: ID do produto, valor, moeda).
   * @param userData - Dados do usuário para enriquecimento e "match quality".
   */
  async track(eventName: string, data: PixelEventData = {}, userData: PixelUserData = {}) {
    const activePixelId = this.config.metaId;
    // Se não houver pixel configurado, interrompe a execução.
    if (!activePixelId) return;

    const contentId = data.content_ids?.[0] || 'global';
    const lockKey = `${activePixelId}_${eventName}_${contentId}`;

    // --- ETAPA 1: PREVENÇÃO DE DUPLICIDADE (Mecanismo de Trava Dupla) ---
    // Trava 1 (Memória): Evita que a mesma chamada seja processada duas vezes em um intervalo muito curto.
    if (this.processingEvents.has(lockKey)) return;
    // Trava 2 (LocalStorage via EventGuard): Verifica se este evento já foi registrado para este usuário nesta sessão/dispositivo.
    // Isso é crucial para eventos que não devem se repetir, como a conclusão de um tutorial.
    if (!eventGuard.canTrack(eventName, activePixelId, contentId)) return;
    
    // Se a política do evento for "singleton" (disparar apenas uma vez), ativa as travas.
    if (pixelPolicy.isSingleton(eventName)) {
        this.processingEvents.add(lockKey);
        eventGuard.markAsTracked(eventName, activePixelId, contentId);
    }

    try {
        // --- ETAPA 2: ENRIQUECIMENTO DE DADOS ---
        // O `pixelPayloadBuilder` reúne o máximo de informações do usuário (e-mail, IP, cookies fbp/fbc)
        // para aumentar a "Qualidade da Correspondência" (Match Quality) nas plataformas de anúncio.
        const enrichedUser = await pixelPayloadBuilder.buildUserData(userData);
        const enrichedEventData = pixelPayloadBuilder.buildEventData(eventName, data);

        // --- ETAPA 3: GERAÇÃO DE ID DETERMINÍSTICO ---
        // Cria um ID de evento único e previsível. Isso é VITAL para a deduplicação.
        // Se o mesmo evento for enviado pelo navegador e pelo servidor (CAPI), o Meta usará este ID
        // para entender que é um evento só, e não dois. Evita contar conversões em dobro.
        const eventId = await generateDeterministicEventId(
          eventName, 
          enrichedUser.email || enrichedUser.fbp || 'anon', 
          contentId
        );

        const finalData = { ...enrichedEventData, event_id: eventId };

        // --- ETAPA 4: ROTEAMENTO INTELIGENTE (BROWSER vs. CAPI) ---
        // A `pixelPolicy` decide para onde enviar o evento com base em sua natureza.
        if (pixelPolicy.shouldRouteToBrowser(eventName)) {
          // Rota Padrão: Envia o evento pelo navegador do usuário. Rápido, mas sujeito a bloqueadores de anúncio.
          await metaBrowserService.track(eventName, finalData, enrichedUser);
        } 
        else if (pixelPolicy.shouldRouteToCapi(eventName) && this.config.pixelToken) {
          // Rota Confiável (Servidor): Envia o evento diretamente para a API de Conversões (CAPI).
          // Ideal para eventos críticos como 'AddPaymentInfo' e 'Purchase', pois não é afetado por ad-blockers.
          await metaCapiService.track(activePixelId, this.config.pixelToken, eventName, eventId, finalData, enrichedUser);
          console.debug(`🚀 [Pixel:CAPI] Evento '${eventName}' enviado via servidor com sucesso.`);
        }
    } catch (err) {
        console.error(`❌ [PixelOrchestrator] Falha ao rastrear o evento '${eventName}':`, err);
    } finally {
        // --- ETAPA 5: LIMPEZA ---
        // Libera a trava de memória após um curto período, permitindo que o evento possa ser disparado novamente no futuro se necessário.
        // A trava do LocalStorage permanece, garantindo a política de "singleton" para a sessão.
        setTimeout(() => this.processingEvents.delete(lockKey), 2000);
    }
  }
}

// Exporta uma instância única (Singleton) do orquestrador para toda a aplicação.
export const pixelOrchestrator = new PixelOrchestrator();
