
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketplaceItem, Group } from '../../types';
import { metaPixelService } from '../../services/metaPixelService';
import { geoService } from '../../services/geoService';
import { currencyService } from '../../services/currencyService';
import { authService } from '../../services/authService';

/**
 * ⚓ useCheckoutFlow (Hook de Fluxo de Checkout)
 * 
 * Este hook orquestra a lógica de negócios para o processo de checkout do marketplace.
 * Ele NÃO renderiza UI, mas gerencia os passos, desde a preparação dos dados
 * até a finalização do acesso após o pagamento. Funciona como uma máquina de estados
 * para o checkout.
 */
export const useCheckoutFlow = () => {
    const navigate = useNavigate();
    
    // Estado para controlar se uma operação de checkout está em andamento.
    // Ajuda a desabilitar botões e mostrar loaders na UI.
    const [isProcessing, setIsProcessing] = useState(false);

    /**
     * Inicia o processo de checkout.
     * Esta função é o ponto de entrada quando o usuário clica em "Comprar".
     * Ela prepara todos os dados necessários antes de exibir as opções de pagamento.
     * 
     * @param target - O item do marketplace ou grupo que está sendo comprado.
     * @returns Um objeto com os dados necessários para a próxima etapa da UI.
     */
    const startCheckout = async (target: MarketplaceItem | Group) => {
        setIsProcessing(true);
        try {
            // 1. Captura de E-mail para Convidados (Guest Checkout)
            // Verifica se o e-mail de um usuário não logado já foi capturado em um passo anterior.
            const guestEmail = localStorage.getItem('guest_email_capture');
            const isVip = 'isVip' in target && target.isVip;

            // 2. Inteligência Geográfica e de Moeda
            // Detecta o país do usuário para adaptar a experiência.
            const geo = await geoService.detectCountry();
            
            // Define a moeda base do produto ou assume BRL como padrão.
            const baseCurrency = ('currency' in target ? target.currency : 'BRL') || 'BRL';
            const priceValue = parseFloat(String(target.price || 0));
            
            // Converte o preço do produto para a moeda local do usuário.
            // Ex: Se o produto custa 10 USD e o usuário está no Brasil, converte para BRL.
            const conversion = await currencyService.convert(
                priceValue, 
                baseCurrency, 
                geo.currency || 'BRL'
            );

            // 3. Rastreamento de Marketing (Attribution)
            // Se o produto tiver um Pixel ID do Meta (Facebook/Instagram), dispara um evento.
            const targetPixelId = 'pixelId' in target ? target.pixelId : undefined;
            if (targetPixelId) {
                // Evento "InitiateCheckout": informa ao Meta que o usuário iniciou o checkout.
                // Essencial para campanhas de retargeting e análise de funil de vendas.
                metaPixelService.trackInitiateCheckout(targetPixelId, {
                    content_ids: [target.id],
                    content_type: isVip ? 'product_group' : 'product',
                    content_name: ('name' in target ? target.name : (target as MarketplaceItem).title) || 'Produto',
                    value: conversion.amount,
                    currency: conversion.currency
                }, guestEmail ? { email: guestEmail } : undefined);
            }

            // 4. Seleção do Provedor de Pagamento
            // Decide qual gateway de pagamento usar com base na localização do usuário.
            // SyncPay é otimizado para o Brasil (PIX, Boleto), Stripe para o resto do mundo.
            const provider = geo.countryCode === 'BR' ? 'syncpay' : 'stripe';

            // 5. Retorno para a UI
            // Devolve os dados preparados para que a UI possa renderizar o modal de pagamento correto.
            return { provider, geo, conversion, mustCaptureEmail: !guestEmail };

        } catch (error) {
            console.error("[CheckoutFlow] Erro ao iniciar o checkout:", error);
            // Propaga o erro para que a UI possa exibi-lo ao usuário.
            throw error;
        } finally {
            setIsProcessing(false);
        }
    };

    /**
     * Finaliza o acesso ao conteúdo após um pagamento bem-sucedido.
     * Esta função é chamada na página de "Obrigado" ou após o webhook de confirmação.
     * Sua responsabilidade é garantir que o usuário seja redirecionado para o conteúdo que acabou de comprar.
     * 
     * @param targetId - O ID do grupo ou produto comprado.
     * @param isGroup - Flag para diferenciar entre um grupo e um item do marketplace.
     */
    const finalizeAccess = (targetId: string, isGroup: boolean = true) => {
        // Tenta obter o e-mail do usuário logado ou do guest checkout.
        const email = authService.getCurrentUserEmail() || localStorage.getItem('guest_email_capture');
        
        // Cenário Crítico: Usuário pagou como convidado e não tem cadastro.
        if (!email) {
            // Para não perder a venda, salvamos o destino na sessão e forçamos o usuário
            // a se registrar. Após o registro, ele será automaticamente redirecionado
            // para o conteúdo que comprou.
            sessionStorage.setItem('redirect_after_login', isGroup ? `/group-chat/${targetId}` : `/marketplace/product/${targetId}`);
            navigate('/register', { replace: true });
            return;
        }

        // Cenário Padrão: Usuário logado ou convidado com e-mail capturado.
        // Leva o usuário diretamente para a "sala do grupo" ou "página do produto".
        const path = isGroup ? `/group-chat/${targetId}` : `/marketplace/product/${targetId}`;
        navigate(path, { replace: true });
    };

    // Expõe as funções e o estado do hook para serem usados pelos componentes da UI.
    return { startCheckout, finalizeAccess, isProcessing };
};
