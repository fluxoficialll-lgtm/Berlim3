
import { notificationService } from '../../notificationService';
import { authService } from '../../authService';
import { API_BASE } from '../../../apiConfig';
import { hydrationManager } from '../HydrationManager';

/**
 * Worker para sincronizar dados essenciais do sistema, como estado de autenticação e notificações.
 */
export const SystemSyncWorker = {
    name: 'SystemWorker',

    /**
     * Sincroniza dados de alta prioridade, como o estado de integridade da conta do usuário.
     */
    async syncHighPriority() {
        const email = authService.getCurrentUserEmail();
        if (!email) {
            hydrationManager.markReady('AUTH');
            return;
        }

        try {
            // Executa a sincronização de integridade e notificações em paralelo.
            await Promise.all([
                this.syncIntegrityStatus(email),
                this.syncNotifications()
            ]);
        } catch (e) {
            console.warn("⚠️ [Sync] Falha no check de sistema:", e);
        } finally {
            // Marca o estado de autenticação como pronto, independentemente do resultado.
            hydrationManager.markReady('AUTH');
        }
    },

    /**
     * Dispara a sincronização de notificações.
     */
    async syncNotifications() {
        console.log("🔔 [Sync] Sincronizando notificações...");
        await notificationService.syncNotifications();
    },

    /**
     * Verifica a integridade da conta do usuário (ex: se foi banido) e atualiza o cache local.
     * @param email O e-mail do usuário a ser verificado.
     */
    async syncIntegrityStatus(email: string) {
        try {
            // Busca os dados mais recentes do usuário a partir da API.
            const res = await fetch(`${API_BASE}/api/users/update?email=${encodeURIComponent(email)}`);
            if (res.ok) {
                const data = await res.json();
                const user = data.user;
                
                if (user) {
                    // Se o usuário foi banido, faz logout e recarrega a página.
                    if (user.isBanned) {
                        authService.logout();
                        window.location.reload();
                        return;
                    }
                    
                    // CRÍTICO: Sincroniza o cache local (localStorage) com os dados do servidor.
                    console.log("♻️ [Sync] Hidratando o perfil do usuário no cliente com dados frescos.");
                    localStorage.setItem('cached_user_profile', JSON.stringify(user));
                    localStorage.setItem('user_id', user.id);
                    
                    // A linha abaixo foi removida. O frontend não deve NUNCA escrever diretamente
                    // no banco de dados. A atualização do cache local acima é a ação correta.
                    // db.users.set(user);
                }
            }
        } catch (e) {
            console.warn("⚠️ [Sync] Falha ao verificar integridade, mantendo estado local.");
        }
    }
};
