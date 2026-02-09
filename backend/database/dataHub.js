
// 🗂️ Este arquivo funciona como o "Índice Remissivo" da nossa camada de dados.
// Ele importa todos os repositórios de dados individuais e os organiza em um único objeto `dataHub` para exportação centralizada.
// Isso simplifica o acesso e a manutenção, evitando a necessidade de importar cada repositório separadamente em outras partes do sistema.

// --- Importação dos Repositórios Individuais ---
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
import { query } from './pool.js'; // Função de baixo nível para queries diretas.

/**
 * @name dataHub
 * @description
 * Um objeto que consolida todos os repositórios de dados do sistema, fornecendo um "namespace" limpo para o acesso a dados.
 * O `RepositoryHub` então consome este `dataHub` para expô-lo ao resto da aplicação.
 */
export const dataHub = {
    // Mapeamento de nome de repositório para o objeto importado.
    // Usamos nomes mais curtos e intuitivos como chaves (ex: `users` em vez de `userRepository`).

    // --- Repositórios Principais ---
    users: userRepository,          // Gerencia dados de usuários
    groups: groupRepository,        // Gerencia dados de grupos
    financial: financialRepository, // Gerencia transações financeiras
    chats: chatRepository,          // Gerencia mensagens e chats
    
    // --- Repositórios de Suporte ---
    marketplace: marketplaceRepository, // Gerencia itens à venda no marketplace
    relationships: relationshipRepository, // Gerencia conexões entre usuários (amizades, seguidores)
    interactions: interactionRepository,   // Gerencia curtidas, comentários, etc.
    reports: reportRepository,      // Gerencia denúncias de usuários ou conteúdo
    audit: AuditRepository,         // Gerencia logs de auditoria

    // --- Repositórios Financeiros Detalhados ---
    fees: FeeRepository,            // Gerencia a configuração e aplicação de taxas
    
    // --- Repositórios de Publicidade (Ads) ---
    ads: AdRepository,              // Gerencia os anúncios da plataforma
    adAnalytics: AdAnalyticsRepository, // Gerencia as métricas de performance dos anúncios

    // --- Repositórios de Analytics e Agregação ---
    aggregator: AggregatorRepository, // Funções para agregar dados de várias fontes
    analytics: AnalyticsRepository,   // Métricas gerais da plataforma
    financialAnalytics: FinancialAnalyticsRepository, // Métricas específicas da área financeira
    userAnalytics: UserAnalyticsRepository,     // Métricas de comportamento de usuário

    // --- Repositórios de Ranking ---
    groupRanking: GroupRankingRepository, // Gerencia a lógica e os dados de ranking de grupos

    // --- Acesso Direto ---
    query: query // Exporta a função de query para uso direto quando necessário
};
