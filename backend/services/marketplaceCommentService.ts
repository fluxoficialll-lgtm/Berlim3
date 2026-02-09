
import { db } from '../../database';
import { Comment } from '../../types';
import { authService } from '../authService'; // Assuming a backend auth service
import { v4 as uuidv4 } from 'uuid';

/**
 * MarketplaceCommentService (Backend)
 * Handles all database operations related to marketplace comments.
 * This service runs exclusively on the server-side.
 */
export const MarketplaceCommentService = {
    /**
     * Fetches all comments for a specific marketplace item.
     */
    async getComments(itemId: string): Promise<Comment[]> {
        if (!itemId) return [];
        console.log(`[Backend] Fetching comments for item ${itemId}...`);
        const allComments: Comment[] = await db.table('comments').toArray();
        return allComments.filter(c => c.itemId === itemId);
    },

    /**
     * Adds a new comment to a marketplace item.
     * Requires an authenticated user.
     */
    async addComment(itemId: string, text: string, userId: string): Promise<Comment> {
        const user = await db.table('users').get(userId);
        if (!user) throw new Error("User not authenticated");

        console.log(`[Backend] Adding comment to item ${itemId}...`);

        const newComment: Comment = {
            id: uuidv4(),
            itemId,
            text,
            username: user.username || "Anonymous User",
            avatar: user.avatar,
            timestamp: Date.now(),
            likes: 0,
            replies: [],
            userId: userId,
        };

        await db.table('comments').add(newComment);
        return newComment;
    },

    /**
     * Deletes a comment from a marketplace item.
     * TODO: Add permission check to ensure only the author or an admin can delete.
     */
    async deleteComment(commentId: string, userId: string): Promise<void> {
        console.log(`[Backend] Deleting comment ${commentId}...`);
        
        const comment = await db.table('comments').get(commentId);
        if (comment) {
            // Basic permission check
            if (comment.userId !== userId) {
                // You might also want to check if the user is an admin
                throw new Error("User does not have permission to delete this comment");
            }
            await db.table('comments').delete(commentId);
        } else {
            throw new Error("Comment not found");
        }
    }
};