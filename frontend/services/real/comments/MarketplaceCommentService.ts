
import { Comment } from '@/types';

/**
 * MarketplaceCommentService (Frontend)
 * This service acts as a client to the backend API for marketplace comments.
 * The original database logic has been moved to the backend.
 * 
 * TODO: Implement the actual API calls to the corresponding backend service.
 */

const mockApiCall = <T>(data: T, delay = 300): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const MarketplaceCommentService = {
    /**
     * Fetches comments for a given item.
     * This is a mock implementation.
     */
    getComments: async (itemId: string): Promise<Comment[]> => {
        console.warn(`[Mock] Fetching comments for item ${itemId}. API call not implemented.`);
        return mockApiCall([]);
    },

    /**
     * Adds a new comment.
     * This is a mock implementation.
     */
    addComment: async (itemId: string, text: string): Promise<void> => {
        console.warn(`[Mock] Adding comment. API call not implemented.`);
        return mockApiCall(undefined);
    },

    /**
     * Deletes a comment.
     * This is a mock implementation.
     */
    deleteComment: async (commentId: string): Promise<void> => {
        console.warn(`[Mock] Deleting comment ${commentId}. API call not implemented.`);
        return mockApiCall(undefined);
    },
};
