
import { db } from '../database';
import { Group } from '../types';

/**
 * GroupRankingService (Backend)
 * This service contains the business logic for sorting and filtering group rankings.
 * It is intended to be used exclusively on the server-side.
 */
export const GroupRankingService = {
    /**
     * Calculates the score of a group for ranking purposes.
     * The score is based on member count with a bonus for recent activity.
     */
    calculateScore: (group: Group): number => {
        const memberCount = group.memberIds?.length || 0;
        const now = Date.now();
        
        // The 'time' field in the group object can be a string like 'Agora' or a timestamp.
        // We need a reliable numeric timestamp for calculation. We assume a 'timestamp' field exists.
        const lastActivity = group.timestamp || 0;
        
        // "Trending" Bonus: Groups with activity in the last 24 hours get a score boost.
        const isTrending = (now - lastActivity) < 86400000; // 24 hours in milliseconds
        const trendingBonus = isTrending ? 500 : 0;

        // The final score is a combination of member count and the trending bonus.
        return (memberCount * 100) + trendingBonus;
    },

    /**
     * Retrieves a list of groups for a specific category, filtered and sorted by score.
     * This function directly accesses the database and should only run on the backend.
     */
    getRankedList: (category: 'public' | 'private' | 'vip'): Group[] => {
        // Direct database access - this is why this logic is in the backend.
        const allGroups: Group[] = db.groups.getAll();
        
        // Filter groups based on the requested category.
        const filtered = allGroups.filter(g => {
            if (category === 'vip') return g.isVip;
            if (category === 'private') return g.isPrivate && !g.isVip;
            return !g.isPrivate && !g.isVip; // public
        });

        // Sort the filtered groups by their calculated score in descending order.
        return filtered.sort((a, b) => {
            return GroupRankingService.calculateScore(b) - GroupRankingService.calculateScore(a);
        });
    }
};
