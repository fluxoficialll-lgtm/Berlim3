
/**
 * Env Service (Refatorado)
 * 
 * Delefa a lógica de deteção de ambiente para o gestor central `env.ts`.
 * Oferece uma interface simples para verificar o modo atual e forçar o modo de mock.
 */
export const envService = {
    /**
     * Verifica se o ambiente atual é de demonstração (mock).
     * 
     * @returns {boolean} True se estiver em modo de demonstração.
     */
    isDemoMode: (): boolean => {
        // A lógica foi movida para o `env.ts` para centralização.
        // O `env.MODE` pode ser 'development', 'production', ou 'demo'.
        return import.meta.env.MODE === 'demo';
    },
    
    /**
     * Força o aplicativo a usar o modo de mock (demonstração).
     * 
     * Armazena uma flag no localStorage e recarrega a página para aplicar a mudança.
     * Isso é útil para debugging ou para criar previews interativos.
     * 
     * @param {boolean} enabled - Define se o modo mock deve ser ativado ou desativado.
     */
    setForceMock: (enabled: boolean): void => {
        localStorage.setItem('force_mock_mode', enabled ? 'true' : 'false');
        window.location.reload();
    }
};
