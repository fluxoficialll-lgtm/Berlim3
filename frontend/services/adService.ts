
import { adService as RealAdService } from './real/adService';
import { adService as MockAdService } from './mocks/adService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const adService = USE_MOCKS ? MockAdService : RealAdService;
