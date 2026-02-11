
import { authService as RealAuthService } from './real/authService';
import { authService as MockAuthService } from './mocks/authService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const authService = USE_MOCKS ? MockAuthService : RealAuthService;
