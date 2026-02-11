
import { notificationService as RealNotificationService } from './real/notificationService';
import { notificationService as MockNotificationService } from './mocks/notificationService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const notificationService = USE_MOCKS ? MockNotificationService : RealNotificationService;
