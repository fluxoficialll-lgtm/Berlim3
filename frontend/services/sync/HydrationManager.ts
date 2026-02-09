import { SyncState } from './SyncState';

/**
 * 💧 HydrationManager (Gerenciador de Hidratação)
 *
 * Esta classe gerencia o estado de "prontidão" dos módulos vitais da aplicação.
 * Sua principal função é impedir que o usuário interaja com a aplicação ou veja
 * estados de dados inconsistentes (como um saldo zerado ou a ausência de grupos)
 * durante o carregamento inicial dos dados do servidor.
 *
 * Ele funciona como uma barreira de sincronização: a UI principal só é "liberada"
 * quando todos os módulos críticos confirmam que foram "hidratados" (carregados).
 */
class HydrationManager {
    // Um conjunto que armazena os nomes dos módulos que já estão prontos.
    private readyModules = new Set<string>();
    
    // Uma lista de "ouvintes" (listeners) - geralmente componentes da UI,
    // que serão notificados quando o estado de hidratação mudar.
    private listeners = new Set<(isReady: boolean) => void>();

    // --- MÓDULOS CRÍTICOS ---
    // A lista de módulos que DEVEM estar prontos antes da aplicação ser considerada
    // totalmente funcional para o usuário.
    private readonly CRITICAL_MODULES = ['AUTH', 'GROUPS', 'WALLET'];

    /**
     * Marca um módulo como pronto (hidratado).
     * Chamado por cada serviço principal (ex: AuthService) após carregar seus dados iniciais.
     * @param module - O nome do módulo que acabou de ser carregado (ex: 'AUTH').
     */
    public markReady(module: string) {
        this.readyModules.add(module);
        // Após marcar um módulo, verifica se todos os módulos críticos estão prontos.
        if (this.isFullyHydrated()) {
            // Se sim, notifica todos os listeners que a aplicação está pronta.
            this.notify(true);
        }
    }

    /**
     * Verifica se todos os módulos críticos foram hidratados.
     * @returns `true` se a aplicação estiver pronta, `false` caso contrário.
     */
    public isFullyHydrated(): boolean {
        return this.CRITICAL_MODULES.every(m => this.readyModules.has(m));
    }

    /**
     * Permite que outras partes da aplicação (geralmente a UI) se inscrevam
     * para serem notificadas sobre o status da hidratação.
     * 
     * @param cb - A função de callback a ser chamada (ex: um `setIsAppReady(true)` no React).
     * @returns Uma função para cancelar a inscrição (unsubscribe).
     */
    public subscribe(cb: (isReady: boolean) => void) {
        this.listeners.add(cb);
        // Retorna uma função de limpeza para que o componente possa se "desinscrever"
        // quando for desmontado, evitando memory leaks.
        return () => this.listeners.delete(cb);
    }

    /**
     * Notifica todos os listeners sobre a mudança de estado.
     * @param isReady - O novo estado de prontidão da aplicação.
     */
    private notify(isReady: boolean) {
        this.listeners.forEach(cb => cb(isReady));
    }

    /**
     * Reseta o estado de hidratação.
     * Isso é útil durante o logout, forçando a aplicação a re-hidratar
     * os dados para o próximo usuário que fizer login.
     */
    public reset() {
        this.readyModules.clear();
        this.notify(false);
    }
}

// Exporta uma instância única (Singleton) do gerenciador para toda a aplicação.
export const hydrationManager = new HydrationManager();