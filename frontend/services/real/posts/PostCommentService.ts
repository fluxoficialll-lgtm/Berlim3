
import { Comment } from '@/types';
import { API_BASE } from '@/apiConfig';
import { authService } from '../../authService';

const API_URL = `${API_BASE}/api/posts`;

/**
 * PostCommentService (Frontend Client)
 * Handles API calls for comment-related actions.
 */
export const PostCommentService = {

    /**
     * Adds a top-level comment to a post.
     */
    async addComment(postId: string, text: string): Promise<Comment | undefined> {
        const userId = authService.getCurrentUserId();
        if (!userId) throw new Error("User not authenticated");

        try {
            const response = await fetch(`${API_URL}/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, text })
            });
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            return await response.json() as Comment;
        } catch (e) {
            console.error("Failed to add comment:", e);
            return undefined;
        }
    },

    /**
     * Adds a reply to an existing comment.
     */
    async addReply(postId: string, commentId: string, text: string): Promise<Comment | undefined> {
        const userId = authService.getCurrentUserId();
        if (!userId) throw new Error("User not authenticated");

        try {
            const response = await fetch(`${API_URL}/${postId}/comments/${commentId}/replies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, text })
            });
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            return await response.json() as Comment;
        } catch (e) {
            console.error("Failed to add reply:", e);
            return undefined;
        }
    },

    /**
     * Deletes a comment or a reply.
     */
    async deleteComment(postId: string, commentId: string): Promise<boolean> {
        const userId = authService.getCurrentUserId();
        if (!userId) throw new Error("User not authenticated");

        try {
            const response = await fetch(`${API_URL}/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            return response.ok;
        } catch (e) {
            console.error("Failed to delete comment:", e);
            return false;
        }
    },

    /**
     * Toggles a like on a comment.
     */
    async toggleCommentLike(postId: string, commentId: string): Promise<boolean> {
        const userId = authService.getCurrentUserId();
        if (!userId) throw new Error("User not authenticated");
        
        try {
            const response = await fetch(`${API_URL}/${postId}/comments/${commentId}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            });
            return response.ok;
        } catch (e) {
            console.error("Failed to toggle comment like:", e);
            return false;
        }
    }
};
