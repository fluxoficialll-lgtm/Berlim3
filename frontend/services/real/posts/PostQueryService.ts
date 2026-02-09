
import { Post, PaginatedResponse } from '@/types';
import { API_BASE } from '@/apiConfig';
import { PostUtils } from './PostUtils';

const API_URL = `${API_BASE}/api/posts`;

export const PostQueryService = {
    /**
     * Fetches the main feed with cursor-based pagination.
     */
    async getFeedPaginated(options: { limit: number; cursor?: string }): Promise<PaginatedResponse<Post>> {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout
            
            const url = new URL(API_URL);
            url.searchParams.append('limit', String(options.limit));
            if (options.cursor) {
                url.searchParams.append('cursor', options.cursor);
            }

            const response = await fetch(url.toString(), {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              console.error("Failed to fetch feed with status:", response.status);
              return { data: [], nextCursor: undefined };
            }

            const data = await response.json();
            const sanitized = (data.data || []).map(PostUtils.sanitizePost);

            return { data: sanitized, nextCursor: data.nextCursor };
        } catch (e) {
            if (e.name === 'AbortError') {
                console.error("Feed fetch timed out:", e);
            } else {
                console.error("Failed to fetch feed:", e);
            }
            return { data: [], nextCursor: undefined };
        }
    },

    /**
     * Performs a global search for posts by text or user.
     */
    async searchPosts(query: string): Promise<Post[]> {
        if (!query.trim()) return [];
        try {
            const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
            if (response.ok) {
                const data = await response.json();
                return (data.data || []).map(PostUtils.sanitizePost);
            }
            return [];
        } catch (e) {
            console.error("Failed to search posts:", e);
            return [];
        }
    },

    /**
     * Fetches a single post by its ID.
     */
    async getPostById(id: string): Promise<Post | undefined> {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) {
                // Handles 404 (Not Found) gracefully
                return undefined;
            }
            const post = await response.json();
            return post ? PostUtils.sanitizePost(post) : undefined;
        } catch (e) {
            console.error(`Failed to fetch post ${id}:`, e);
            return undefined;
        }
    },

    /**
     * Fetches all posts by a specific author.
     */
    async getUserPosts(authorId: string): Promise<Post[]> {
        try {
            const response = await fetch(`${API_URL}/user/${authorId}`);
            if (!response.ok) {
                return [];
            }
            const data = await response.json();
            return (data.data || []).map(PostUtils.sanitizePost);
        } catch (e) {
            console.error(`Failed to fetch posts for user ${authorId}:`, e);
            return [];
        }
    }
};
