
import { Group } from '@/types';

/**
 * RankingService (Frontend)
 * This service is a placeholder. The original logic was moved to the backend.
 * Its purpose is to act as a client for fetching group ranking data from the API.
 * 
 * TODO: Implement API calls to the backend GroupRankingService.
 */
export const RankingService = {
    /**
     * Calculates the score of a group.
     * This is a placeholder and does not reflect the real backend logic.
     */
    calculateScore: (group: Group): number => {
        // The actual scoring is done on the backend.
        return group.memberIds?.length || 0;
    },

    /**
     * Fetches the ranked list for a specific category.
     * This should be replaced with an API call.
     */
    getRankedList: (category: 'public' | 'private' | 'vip'): Group[] => {
        console.warn(`[Deprecation] RankingService.getRankedList is deprecated and returns mock data. An API call is needed.`);
        // Returns an empty array to prevent breaking components that use it.
        // The actual data will come from an API call.
        return [];
    }
};
