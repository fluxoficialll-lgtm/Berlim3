
import { getConfig } from './configService';

export const envService = {
    /**
     * Verifica se o ambiente atual é de desenvolvimento.
     * 
     * @returns {boolean} True se estiver em modo de desenvolvimento.
     */
    isDevelopmentMode: (): boolean => {
        const config = getConfig();
        return config.NODE_ENV === 'development';
    },

    /**
     * Verifica se o ambiente atual é de produção.
     * 
     * @returns {boolean} True se estiver em modo de produção.
     */
    isProductionMode: (): boolean => {
        const config = getConfig();
        return config.NODE_ENV === 'production';
    }
};
