
import { reelsService as RealReelsService } from './real/reelsService';
import { reelsService as MockReelsService } from './mocks/reelsService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const reelsService = USE_MOCKS ? MockReelsService : RealReelsService;
