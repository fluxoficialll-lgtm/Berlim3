
import { apiClient } from '../../apiClient';

// Tipos específicos para comentários de Feed, se necessário
// export interface FeedComment { ... }

/**
 * Serviço especializado para gerenciar comentários em posts do Feed.
 */
export const FeedCommentService = {
    /**
     * Busca os comentários de um post específico do feed.
     * @param postId - O ID do post.
     * @returns Uma lista de comentários.
     */
    async getComments(postId: string): Promise<any[]> {
        try {
            const response = await apiClient.get(`/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            console.error(`[FeedCommentService] Erro ao buscar comentários para o post ${postId}:`, error);
            throw error;
        }
    },

    /**
     * Adiciona um novo comentário a um post do feed.
     * @param postId - O ID do post.
     * @param content - O conteúdo do comentário.
     * @returns O comentário criado.
     */
    async addComment(postId: string, content: string): Promise<any> {
        try {
            const response = await apiClient.post(`/posts/${postId}/comments`, { content });
            return response.data;
        } catch (error) {
            console.error(`[FeedCommentService] Erro ao adicionar comentário ao post ${postId}:`, error);
            throw error;
        }
    },

    /**
     * Deleta um comentário de um post do feed.
     * @param commentId - O ID do comentário a ser deletado.
     */
    async deleteComment(commentId: string): Promise<void> {
        try {
            await apiClient.delete(`/comments/${commentId}`);
        } catch (error) {
            console.error(`[FeedCommentService] Erro ao deletar o comentário ${commentId}:`, error);
            throw error;
        }
    }
};
