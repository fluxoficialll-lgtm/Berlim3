
import { syncPayService } from '../../syncPayService';
import { adService } from '../../adService';
import { marketplaceService } from '../../marketplaceService';
import { authService } from '../../authService';
import { hydrationManager } from '../HydrationManager';

/**
 * Worker para sincronizar dados de negócios (carteira, anúncios, produtos).
 */
export const BusinessSyncWorker = {
    name: 'BusinessWorker',

    /**
     * Sincroniza dados de alta prioridade que precisam estar disponíveis rapidamente.
     */
    async syncHighPriority() {
        const email = authService.getCurrentUserEmail();
        
        if (!email) {
            hydrationManager.markReady('WALLET');
            return;
        }

        try {
            // O saldo da carteira é alta prioridade para ser exibido ao usuário.
            await this.syncWallet(email);
        } catch (e) {
            console.warn("💰 [Sync] Falha na sincronização da carteira. A aplicação pode operar com dados locais/cacheados.");
        } finally {
            hydrationManager.markReady('WALLET');
        }
    },

    /**
     * Sincroniza dados de baixa prioridade em segundo plano.
     */
    async syncLowPriority() {
        const email = authService.getCurrentUserEmail();
        if (!email) return;

        try {
            await Promise.all([
                this.syncMyAds(email),       // Sincroniza os anúncios do usuário
                this.syncMyProducts(email)  // Sincroniza os produtos do usuário
            ]);
        } catch (e) {
            console.warn("💰 [Sync] Falha na sincronização de dados de negócios em segundo plano.");
        }
    },

    /**
     * Busca o saldo da carteira e o atualiza no objeto do usuário em memória.
     * @param email O e-mail do usuário para buscar o saldo.
     */
    async syncWallet(email: string) {
        const balance = await syncPayService.getBalance(email);
        const user = authService.getCurrentUser();
        if (user) {
            // Atualiza o objeto do usuário em memória com o novo saldo.
            // Nota: Esta alteração não persiste no localStorage por padrão.
            // Se a persistência for necessária, o authService deve ser estendido
            // para fornecer uma função que atualize o cache do usuário.
            // @ts-ignore - Permite adicionar uma propriedade dinâmica ao objeto do usuário.
            user.walletBalance = balance;
            
            // A linha abaixo foi removida por violar a arquitetura cliente-servidor.
            // O frontend NUNCA deve tentar escrever diretamente no banco de dados.
            // db.users.set(user);
        }
    },

    /**
     * Sincroniza as campanhas de anúncios do usuário.
     * @param email E-mail do usuário.
     */
    async syncMyAds(email: string) {
        await adService.getMyCampaigns();
    },

    /**
     * Sincroniza os produtos do marketplace do usuário. (A ser implementado)
     * @param email E-mail do usuário.
     */
    async syncMyProducts(email: string) {
        // A implementação futura para sincronizar produtos ficará aqui.
    }
};
