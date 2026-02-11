
import { relationshipService as RealRelationshipService } from './real/relationshipService';
import { relationshipService as MockRelationshipService } from './mocks/relationshipService';

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

export const relationshipService = USE_MOCKS ? MockRelationshipService : RealRelationshipService;
