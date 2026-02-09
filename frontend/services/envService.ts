
export const envService = {
    /**
     * Verifica se o ambiente atual é de desenvolvimento.
     * 
     * @returns {boolean} True se estiver em modo de desenvolvimento.
     */
    isDevelopmentMode: (): boolean => {
        return import.meta.env.DEV;
    },

    /**
     * Verifica se o ambiente atual é de produção.
     * 
     * @returns {boolean} True se estiver em modo de produção.
     */
    isProductionMode: (): boolean => {
        return import.meta.env.PROD;
    }
};
