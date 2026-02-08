
import { userRepository } from '../repositories/userRepository.js';
import { financialRepository } from '../repositories/FinancialRepository.js';
import { FeeRepository } from '../repositories/financial/FeeRepository.js';
import { groupRepository } from '../repositories/GroupRepository.js';
import { chatRepository } from '../repositories/ChatRepository.js';
import { marketplaceRepository } from '../repositories/MarketplaceRepository.js';
import { relationshipRepository } from '../repositories/RelationshipRepository.js';
import { interactionRepository } from '../repositories/InteractionRepository.js';
import { reportRepository } from '../repositories/ReportRepository.js';
import { AuditRepository } from '../repositories/AuditRepository.js';
import { AdRepository } from '../repositories/AdRepository.js';
import { AdAnalyticsRepository } from '../repositories/AdAnalyticsRepository.js';
import { AggregatorRepository } from '../repositories/AggregatorRepository.js';
import { AnalyticsRepository } from '../repositories/AnalyticsRepository.js';
import { FinancialAnalyticsRepository } from '../repositories/FinancialAnalyticsRepository.js';
import { UserAnalyticsRepository } from '../repositories/UserAnalyticsRepository.js';
import { GroupRankingRepository } from '../repositories/ranking/GroupRankingRepository.js';
import { query } from './pool.js';

export const dataHub = {
    users: userRepository,
    groups: groupRepository,
    chats: chatRepository,
    marketplace: marketplaceRepository,
    relationships: relationshipRepository,
    interactions: interactionRepository,
    reports: reportRepository,
    financial: financialRepository,
    fees: FeeRepository,
    audit: AuditRepository,
    ads: AdRepository,
    adAnalytics: AdAnalyticsRepository,
    aggregator: AggregatorRepository,
    analytics: AnalyticsRepository,
    financialAnalytics: FinancialAnalyticsRepository,
    userAnalytics: UserAnalyticsRepository,
    groupRanking: GroupRankingRepository,
    query: query
};
