
import { screenService as RealScreenService } from './real/screenService';
import { MockScreenService } from './mocks/screenService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const screenService = USE_MOCKS ? MockScreenService : RealScreenService;
export type { BusinessDashboardData, AdminDashboardData } from './real/screenService';
