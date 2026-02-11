
import { AdCampaign, User } from '../../../types';
import { targetingMatcher } from './TargetingMatcher';
import { budgetManager } from './BudgetManager';
import { adPacingService } from './AdPacingService';
import { IntentPredictor } from '../intelligence/IntentPredictor';
import { PacingController } from '../intelligence/PacingController';
import { ConversionHub } from '../attribution/ConversionHub';
import { CausalityGuard } from '../intelligence/CausalityGuard';
import { FeedbackOptimizer } from '../intelligence/FeedbackOptimizer';

/**
 * 🤖 AdAuctionEngine (Motor de Leilão de Anúncios)
 * 
 * Este objeto é o cérebro do sistema de publicidade. Ele executa um "leilão"
 * para cada oportunidade de exibir um anúncio, decidindo qual campanha (se houver)
 * é a mais adequada para um usuário específico em um determinado momento.
 * O processo é multifatorial, combinando regras de negócio, IA e otimizações em tempo real.
 */
export const adAuctionEngine = {
    /**
     * Executa o leilão para encontrar a campanha vencedora.
     * @param campaigns - Uma lista de todas as campanhas ativas candidatas.
     * @param user - O usuário para quem o anúncio será exibido.
     * @returns A campanha vencedora ou `null` se nenhuma for elegível.
     */
    async runAuction(campaigns: AdCampaign[], user: User): Promise<AdCampaign | null> {
        // --- ETAPA 1: FILTRAGEM DE ELEGIBILIDADE ---
        // Apenas campanhas que atendem a todos os critérios básicos podem competir no leilão.
        const eligibleCampaigns = campaigns.filter(camp => 
            camp.status === 'active' &&                 // A campanha deve estar ativa.
            targetingMatcher.match(camp, user) &&      // O usuário deve corresponder ao público-alvo da campanha.
            budgetManager.hasAvailableBudget(camp) && // A campanha deve ter orçamento restante.
            adPacingService.shouldShow(camp)          // O ritmo de gastos da campanha deve permitir a exibição agora.
        );

        if (eligibleCampaigns.length === 0) return null;

        const throttleChance = Math.random(); // Variável aleatória para usar nas travas de controle.

        // --- ETAPA 2: PONTUAÇÃO DAS CAMPANHAS ELEGÍVEIS ---
        // Cada campanha elegível recebe uma pontuação. A maior pontuação vence.
        const scoredCampaigns = await Promise.all(eligibleCampaigns.map(async camp => {
            // Fator 1: Ritmo e Aceleração (Pacing & Throttling)
            // Controla a velocidade de entrega do anúncio para não gastar o orçamento rápido demais.
            const pacingFactor = PacingController.getThrottleFactor(camp);
            if (throttleChance > pacingFactor) return { campaign: camp, finalScore: -1 };

            // Fator 2: Trava de Segurança de ROAS (Causality Guard)
            // Se uma campanha está gastando muito e trazendo pouco retorno (ROAS baixo),
            // ela é penalizada para proteger o anunciante de prejuízos.
            const causalityFactor = CausalityGuard.getScaleElasticity(camp);
            if (causalityFactor < 0.6 && throttleChance > 0.3) return { campaign: camp, finalScore: -1 };

            // Fator 3: Pontuação Base (Lance + Popularidade)
            // A base da pontuação combina o lance do anunciante com a taxa de cliques (CTR) histórica do anúncio.
            const baseScore = this.calculateBaseScore(camp, user);
            
            // Fator 4: Inteligência de Intenção (IA - Gemini)
            // Usa um modelo de IA para prever a probabilidade de ESTE usuário específico
            // interagir com ESTE anúncio. É a camada de hiper-personalização.
            const intentScore = await IntentPredictor.predictImpulseProbability(user, camp);
            
            // Fator 5: Otimização por Feedback (Machine Learning)
            // Analisa o desempenho histórico de criativos (textos de anúncios) e ajusta a pontuação.
            // Anúncios com textos que performam bem recebem um bônus.
            const feedbackMultiplier = FeedbackOptimizer.getHeuristicMultiplier(camp.creative.text);

            // Fator 6: Bônus de Retargeting
            // Verifica se o usuário já interagiu com esta campanha antes (atribuição).
            // Se sim, aplica um bônus significativo, pois a chance de conversão é maior.
            const isRetargeting = ConversionHub.getAttributedCampaigns().includes(camp.id);
            const retargetingBonus = isRetargeting ? 2.5 : 1.0;

            // --- CÁLCULO FINAL DA PONTUAÇÃO ---
            // A pontuação final é uma multiplicação de todos os fatores.
            return {
                campaign: camp,
                finalScore: baseScore * intentScore * feedbackMultiplier * causalityFactor * retargetingBonus
            };
        }));

        // --- ETAPA 3: DECLARAÇÃO DO VENCEDOR ---
        // A campanha com a maior pontuação final é declarada a vencedora do leilão.
        const winner = scoredCampaigns
            .filter(s => s.finalScore > 0) // Filtra campanhas desqualificadas
            .sort((a, b) => b.finalScore - a.finalScore)[0]; // Ordena da maior para a menor pontuação
        
        return winner ? winner.campaign : null;
    },

    /**
     * Calcula a pontuação base de uma campanha.
     * Esta é a fundação da pontuação do leilão.
     */
    calculateBaseScore(campaign: AdCampaign, user: User): number {
        // O lance (bid) é o valor que o anunciante está disposto a pagar.
        const bid = campaign.budget || 1;
        const stats = campaign.stats || { views: 1, clicks: 0 };
        // A Taxa de Cliques (CTR) mede a "popularidade" e relevância do anúncio.
        const ctr = (stats.clicks + 1) / (stats.views + 100); // Adiciona suavização para evitar divisão por zero.
        // Bônus para modelos de negócio preferenciais (ex: comissão).
        const modelBonus = campaign.pricingModel === 'commission' ? 3.0 : 1.0;

        return bid * ctr * modelBonus;
    }
};
