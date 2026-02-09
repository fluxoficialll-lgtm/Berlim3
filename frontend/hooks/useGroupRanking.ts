
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Group } from '@/types';
import { RankingService } from '@/services/real/groups/RankingService';

/**
 * useGroupRanking
 * Manages the logic for fetching and displaying group rankings based on the URL category.
 */
export const useGroupRanking = () => {
    const { category } = useParams<{ category: string }>();
    const activeTab = (category === 'private' || category === 'vip' || category === 'public') 
        ? category 
        : 'public';

    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshRanking = useCallback((isSilent = false) => {
        if (!isSilent) setLoading(true);
        
        // NOTE: The underlying RankingService has been refactored.
        // It no longer fetches from the DB directly. This now returns a mock/empty array.
        // TODO: This needs to be replaced with an API call to the backend.
        const ranked = RankingService.getRankedList(activeTab);
        setGroups(ranked);
        
        setLoading(false);
    }, [activeTab]);

    useEffect(() => {
        refreshRanking();

        // The real-time database subscription has been removed.
        // This was a major architectural flaw and source of errors.
        // TODO: Implement a WebSocket listener to receive real-time updates from the backend.
        // const unsubscribe = db.subscribe('groups', () => {
        //     refreshRanking(true);
        // });

        // return () => unsubscribe();
    }, [refreshRanking]);

    return {
        groups,
        loading,
        activeTab
    };
};
