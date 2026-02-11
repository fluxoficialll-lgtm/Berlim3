
import { paypalService as RealPaypalService } from './real/paypalService';
import { paypalService as MockPaypalService } from './mocks/paypalService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const paypalService = USE_MOCKS ? MockPaypalService : RealPaypalService;
