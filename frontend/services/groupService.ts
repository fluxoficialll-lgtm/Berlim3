
import { groupService as RealGroupService } from './real/groupService';
import { groupService as MockGroupService } from './mocks/groupService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const groupService = USE_MOCKS ? MockGroupService : RealGroupService;
