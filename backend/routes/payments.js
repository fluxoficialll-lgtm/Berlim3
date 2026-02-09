
// 💳 Este arquivo é o coração do processamento PÓS-VENDA.
// Ele não inicia pagamentos, mas age como um "webhook" interno para quando uma venda é confirmada com sucesso por um gateway (Stripe, PayPal, etc.).

import express from 'express';
import { dbManager } from '../database/databaseManager.js';      // 🗄️ Gerenciador de acesso ao banco de dados
import { FeeEngine } from '../services/financial/FeeEngine.js'; // 💸 Nosso motor de cálculo de taxas
import { NotificationEmitter } from '../services/socket/NotificationEmitter.js'; // 🔔 Disparador de notificações em tempo real
import { facebookCapi } from '../services/facebookCapi.js'; // 📊 Serviço para a API de Conversões do Facebook (Marketing)

const router = express.Router();

/**
 * @route   POST /api/process-sale-success
 * @desc    Processa e registra uma venda após a confirmação do pagamento.
 * @access  Private (deve ser chamado apenas por sistemas internos ou gateways confiáveis)
 */
router.post('/process-sale-success', async (req, res) => {
    try {
        // --- 1. EXTRAÇÃO DOS DADOS DA VENDA ---
        // Recebemos os detalhes da transação no corpo da requisição.
        const { transactionId, grossAmount, provider, method, sellerId, groupId, country, currency, buyerEmail, userData } = req.body;

        // --- 2. CÁLCULO DAS TAXAS (FEE ENGINE) ---
        // Usamos nosso motor de taxas para calcular o lucro da plataforma e o valor líquido do vendedor.
        console.log(`[FeeEngine] Calculando taxas para venda de ${grossAmount}...`);
        const breakdown = await FeeEngine.calculateTransaction(grossAmount, sellerId, {
            provider, // ex: 'stripe', 'paypal'
            method,   // ex: 'credit_card', 'pix'
            country   // ex: 'BR', 'US'
        });

        // --- 3. REGISTRO OFICIAL NO BANCO DE DADOS ---
        // A parte mais importante: salvamos a transação no nosso banco de dados financeiro.
        console.log(`[DB] Registrando transação no valor líquido de ${breakdown.netAmount} para o vendedor ${sellerId}.`);
        await dbManager.financial.recordTransaction({
            userId: sellerId,                // ID do vendedor que recebeu o dinheiro
            type: 'sale',                    // Tipo da transação
            amount: breakdown.netAmount,     // Valor LÍQUIDO (após taxas)
            status: 'paid',                  // Status final da transação
            providerTxId: transactionId,     // ID da transação no gateway de pagamento
            currency: currency || 'BRL',     // Moeda da transação
            data: {                          // Metadados para auditoria e detalhes
                originalGross: grossAmount,
                platformProfit: breakdown.platformFee,
                groupId,
                provider,
                method
            }
        });

        // --- 4. EVENTO DE MARKETING (FACEBOOK CONVERSIONS API) ---
        // Enviamos um evento de "Purchase" para o Facebook do vendedor, se configurado.
        // Isso é crucial para rastrear o retorno sobre o investimento em anúncios.
        const seller = await dbManager.users.findById(sellerId);
        const group = await dbManager.groups.findById(groupId);

        if (seller && seller.marketingConfig?.pixelId && seller.marketingConfig?.pixelToken) {
            console.log(`[Facebook CAPI] Enviando evento de Purchase para o Pixel ID: ${seller.marketingConfig.pixelId}`);
            try {
                await facebookCapi.sendEvent({
                    pixelId: seller.marketingConfig.pixelId,
                    accessToken: seller.marketingConfig.pixelToken,
                    eventName: 'Purchase',
                    origin: 'server', // Identifica que o evento veio do nosso servidor (mais confiável)
                    eventId: `pur_${transactionId}`, // ID único para evitar duplicação de eventos
                    url: `${process.env.APP_URL}/vip-group-sales/${groupId}`, // URL da página onde a compra ocorreu
                    eventData: {
                        value: grossAmount,
                        currency: currency || 'BRL',
                        content_ids: [groupId],
                        content_type: 'product_group',
                        content_name: group?.name || 'Venda VIP'
                    },
                    userData: { // Dados do comprador para melhorar a correspondência no Facebook
                        email: buyerEmail,
                        ip: req.ip,
                        userAgent: req.headers['user-agent'],
                        ...userData 
                    }
                });
            } catch (capiErr) {
                // Se o CAPI falhar, apenas avisamos no console sem quebrar a transação inteira.
                console.warn(`⚠️ [CAPI] Falha ao enviar evento de Purchase: ${capiErr.message}`);
            }
        }

        // --- 5. NOTIFICAÇÃO EM TEMPO REAL (SOCKET.IO) ---
        // Avisamos o frontend (o comprador) em tempo real que o pagamento foi um sucesso.
        if (req.io && buyerEmail && groupId) {
            console.log(`[Socket.IO] Emitindo notificação de sucesso para o email: ${buyerEmail}`);
            NotificationEmitter.emitPaymentSuccess(req.io, buyerEmail, groupId, group?.name || 'VIP');
        }

        // --- 6. RESPOSTA FINAL ---
        // Retornamos sucesso e o detalhamento das taxas calculadas.
        res.json({ success: true, breakdown });

    } catch (e) {
        // Em caso de qualquer erro no fluxo, capturamos aqui, logamos e retornamos um erro 500.
        console.error(`💥 [FATAL] Erro ao processar venda: ${e.message}`, { stack: e.stack });
        res.status(500).json({ error: 'Ocorreu um erro inesperado ao processar a venda.', details: e.message });
    }
});

export default router;
