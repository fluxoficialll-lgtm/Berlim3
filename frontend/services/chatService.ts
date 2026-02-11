
import { chatService as RealChatService } from './real/chatService';
import { chatService as MockChatService } from './mocks/chatService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const chatService = USE_MOCKS ? MockChatService : RealChatService;
