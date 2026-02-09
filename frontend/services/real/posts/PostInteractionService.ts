
import { PostMetricsService } from '../PostMetricsService';
import { Post } from '../../../types'; // This will be fixed in the next step

/**
 * PostInteractionService (Frontend Client)
 * A facade that delegates post interaction logic to the PostMetricsService,
 * which handles the actual API calls.
 * This maintains the existing service structure while pointing to the new architecture.
 */
export const PostInteractionService = {
    /**
     * Toggles the like status of a post by calling the metrics service.
     */
    async toggleLike(postId: string): Promise<Post | undefined> {
        try {
            // We no longer know the current state, so we pass that logic to the backend.
            // The backend is now the source of truth.
            const updatedPost = await PostMetricsService.toggleLike(postId);
            return updatedPost as Post;
        } catch (error) {
            console.error("Error toggling like:", error);
            // In a real app, you might want to revert an optimistic UI update here.
            return undefined;
        }
    },

    /**
     * Tracks a view for a post via the metrics service.
     */
    incrementView(postId: string): void {
        PostMetricsService.trackView(postId);
    },

    /**
     * Tracks a share for a post. In the current implementation, this is treated as a view.
     */
    incrementShare(postId: string): void {
        // The backend handles the logic of what a "share" means (e.g., just another view).
        // The frontend just needs to report the action.
        fetch(`/api/posts/${postId}/interact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'share' }),
            keepalive: true
        }).catch(err => console.error("Failed to sync share action:", err));
    }
};
