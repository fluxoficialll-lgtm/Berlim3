
import { marketplaceService as RealMarketplaceService } from './real/marketplaceService';
import { marketplaceService as MockMarketplaceService } from './mocks/marketplaceService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const marketplaceService = USE_MOCKS ? MockMarketplaceService : RealMarketplaceService;
