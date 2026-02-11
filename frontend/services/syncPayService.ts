
import { syncPayService as RealSyncPayService } from './real/syncPayService';
import { syncPayService as MockSyncPayService } from './mocks/syncPayService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const syncPayService = USE_MOCKS ? MockSyncPayService : RealSyncPayService;
