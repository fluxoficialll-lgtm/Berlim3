
import { API_BASE } from '@/apiConfig';
import { authService } from '../authService';

const SESSION_VIEW_CACHE_KEY = 'flux_viewed_posts_session';
const API_URL = `${API_BASE}/api/posts`;

/**
 * PostMetricsService (Frontend Client)
 * Manages client-side logic for post interactions and triggers API calls to the backend.
 */
export const PostMetricsService = {
    /**
     * Tracks a post view, preventing duplicates within the same browser session.
     * It optimistically updates the session cache and sends a fire-and-forget request to the backend.
     */
    trackView: (postId: string) => {
        let viewedPosts: string[] = [];
        try {
            viewedPosts = JSON.parse(sessionStorage.getItem(SESSION_VIEW_CACHE_KEY) || '[]');
        } catch (e) {
            console.error("Could not parse session view cache.", e);
            viewedPosts = [];
        }

        if (viewedPosts.includes(postId)) {
            // Already viewed in this session, do nothing.
            return;
        }

        // Optimistically update session cache
        viewedPosts.push(postId);
        sessionStorage.setItem(SESSION_VIEW_CACHE_KEY, JSON.stringify(viewedPosts));

        // Send a fire-and-forget request to the backend to increment the view count.
        fetch(`${API_URL}/${postId}/interact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'view' }),
            keepalive: true // Ensure the request is sent even if the page is being unloaded
        }).catch(err => console.error("Failed to sync view track:", err));
    },

    /**
     * Sends a request to the backend to toggle the like status for a given user.
     * The UI should handle optimistic updates, this service just fires the API call.
     * @returns The updated post data from the server.
     */
    toggleLike: async (postId: string) => {
        const userId = authService.getCurrentUserId();
        if (!userId) {
            // Handle cases where user is not logged in
            // Maybe prompt to log in
            console.warn("User must be logged in to like posts.");
            return; // Or throw an error
        }

        const response = await fetch(`${API_URL}/${postId}/interact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, type: 'like' })
        });

        if (!response.ok) {
            throw new Error("Failed to toggle like on the server.");
        }

        return await response.json();
    },

    /**
     * Notifies the backend that a comment has been added or removed.
     * This is a fire-and-forget call.
     */
    notifyCommentChange: (postId: string, delta: 1 | -1) => {
        fetch(`${API_URL}/${postId}/interact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'comment', delta }),
            keepalive: true
        }).catch(err => console.error("Failed to sync comment change:", err));
    }
};
