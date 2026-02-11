
import { postService as RealPostService } from './real/postService';
import { postService as MockPostService } from './mocks/postService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const postService = USE_MOCKS ? MockPostService : RealPostService;
