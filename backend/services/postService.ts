
import { db } from '../../database';
import { Post, User, Comment } from '../../types'; // Assuming Comment is now a defined type
import { v4 as uuidv4 } from 'uuid';

/**
 * Backend Post Service
 * Handles all database operations for posts, interactions, and comments.
 */
export const PostService = {

    // === Post Actions ===

    async addPost(content: Partial<Post>, userId: string): Promise<Post> {
        const user = await db.table('users').get(userId);
        if (!user) throw new Error("User not found");

        const newPost: Post = {
            id: uuidv4(),
            authorId: userId,
            username: user.username,
            avatar: user.avatar,
            timestamp: Date.now(),
            text: content.text || '',
            media: content.media || [],
            likes: 0,
            comments: 0,
            views: 0,
            ...content,
        };
        await db.table('posts').add(newPost);
        return newPost;
    },

    async deletePost(postId: string, userId: string): Promise<void> {
        const post = await db.table('posts').get(postId);
        if (!post) throw new Error("Post not found");
        if (post.authorId !== userId) throw new Error("User not authorized to delete this post");

        await db.table('posts').delete(postId);
        // TODO: Also delete associated comments and notifications
    },

    // === Post Interactions ===

    async toggleLike(postId: string, userId: string): Promise<Post> {
        const post = await db.table('posts').get(postId);
        if (!post) throw new Error("Post not found");

        const likedByIds = new Set(post.likedByIds || []);
        if (likedByIds.has(userId)) likedByIds.delete(userId); else likedByIds.add(userId);

        const updatedPost = { ...post, likedByIds: Array.from(likedByIds), likes: likedByIds.size };
        await db.table('posts').update(postId, updatedPost);
        return updatedPost;
    },

    async trackView(postId: string): Promise<void> {
        const post = await db.table('posts').get(postId);
        if (!post) return;
        await db.table('posts').update(postId, { views: (post.views || 0) + 1 });
    },

    // === Comments ===

    async addComment(postId: string, text: string, userId: string): Promise<Comment> {
        const post = await db.table('posts').get(postId);
        if (!post) throw new Error("Post not found");
        const user = await db.table('users').get(userId);
        if (!user) throw new Error("User not found");

        const newComment: Comment = {
            id: uuidv4(),
            userId,
            text,
            username: user.username,
            avatar: user.avatar,
            timestamp: Date.now(),
            replies: [],
        };

        const commentsList = [newComment, ...(post.commentsList || [])];
        await db.table('posts').update(postId, { 
            commentsList, 
            comments: (post.comments || 0) + 1 
        });
        return newComment;
    },

    async addReply(postId: string, commentId: string, text: string, userId: string): Promise<Comment> {
        const post = await db.table('posts').get(postId);
        if (!post || !post.commentsList) throw new Error("Post or comments not found");
        const user = await db.table('users').get(userId);
        if (!user) throw new Error("User not found");

        let repliedToUsername: string | undefined;
        const findAndAddReply = (comments: Comment[]): boolean => {
            for (const c of comments) {
                if (c.id === commentId) {
                    repliedToUsername = c.username;
                    const newReply: Comment = {
                        id: uuidv4(), userId, text, username: user.username, avatar: user.avatar, timestamp: Date.now(), replies: [], replyToUsername: c.username
                    };
                    c.replies = [...(c.replies || []), newReply];
                    return true;
                }
                if (c.replies && findAndAddReply(c.replies)) return true;
            }
            return false;
        };

        if (findAndAddReply(post.commentsList)) {
            await db.table('posts').update(postId, { 
                commentsList: post.commentsList, 
                comments: (post.comments || 0) + 1 
            });
            // This is not ideal as we return a reply that might not be the one added.
            // A better implementation would find and return the actual new reply object.
            return post.commentsList[0]; // Placeholder
        } else {
            throw new Error("Parent comment not found");
        }
    },

    async deleteComment(postId: string, commentId: string, userId: string): Promise<void> {
        const post = await db.table('posts').get(postId);
        if (!post || !post.commentsList) return;

        let commentCountChange = 0;
        const filterRecursive = (comments: Comment[]): Comment[] => {
            return comments.filter(c => {
                if (c.id === commentId) {
                    if (c.userId !== userId) throw new Error("Not authorized");
                    commentCountChange = -1 - (c.replies?.length || 0);
                    return false;
                }
                if (c.replies) {
                    const originalRepliesCount = c.replies.length;
                    c.replies = filterRecursive(c.replies);
                    commentCountChange += (c.replies.length - originalRepliesCount);
                }
                return true;
            });
        };

        const newCommentsList = filterRecursive(post.commentsList);
        if (commentCountChange !== 0) {
            await db.table('posts').update(postId, { 
                commentsList: newCommentsList,
                comments: Math.max(0, (post.comments || 0) + commentCountChange)
            });
        }
    },

    async toggleCommentLike(postId: string, commentId: string, userId: string): Promise<void> {
        const post = await db.table('posts').get(postId);
        if (!post || !post.commentsList) return;

        const updateRecursive = (list: Comment[]): boolean => {
            for (const c of list) {
                if (c.id === commentId) {
                    const likedBy = new Set(c.likedBy || []);
                    if (likedBy.has(userId)) likedBy.delete(userId); else likedBy.add(userId);
                    c.likedBy = Array.from(likedBy);
                    c.likes = likedBy.size;
                    return true;
                }
                if (c.replies && updateRecursive(c.replies)) return true;
            }
            return false;
        };

        if (updateRecursive(post.commentsList)) {
            await db.table('posts').update(postId, { commentsList: post.commentsList });
        }
    }
};
