
import { stripeService as RealStripeService } from './real/stripeService';
import { stripeService as MockStripeService } from './mocks/stripeService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const stripeService = USE_MOCKS ? MockStripeService : RealStripeService;
