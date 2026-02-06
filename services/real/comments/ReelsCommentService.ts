
import { apiClient } from '../../apiClient';

// Tipos específicos para comentários de Reels, se necessário
// export interface ReelComment { ... }

/**
 * Serviço especializado para gerenciar comentários em Reels.
 */
export const ReelsCommentService = {
    /**
     * Busca os comentários de um Reel específico.
     * @param reelId - O ID do Reel.
     * @returns Uma lista de comentários.
     */
    async getComments(reelId: string): Promise<any[]> {
        try {
            const response = await apiClient.get(`/reels/${reelId}/comments`);
            return response.data;
        } catch (error) {
            console.error(`[ReelsCommentService] Erro ao buscar comentários para o Reel ${reelId}:`, error);
            throw error;
        }
    },

    /**
     * Adiciona um novo comentário a um Reel.
     * @param reelId - O ID do Reel.
     * @param content - O conteúdo do comentário.
     * @returns O comentário criado.
     */
    async addComment(reelId: string, content: string): Promise<any> {
        try {
            const response = await apiClient.post(`/reels/${reelId}/comments`, { content });
            return response.data;
        } catch (error) {
            console.error(`[ReelsCommentService] Erro ao adicionar comentário ao Reel ${reelId}:`, error);
            throw error;
        }
    },

    /**
     * Deleta um comentário de um Reel.
     * @param commentId - O ID do comentário a ser deletado.
     */
    async deleteComment(commentId: string): Promise<void> {
        try {
            await apiClient.delete(`/comments/${commentId}`);
        } catch (error) {
            console.error(`[ReelsCommentService] Erro ao deletar o comentário ${commentId}:`, error);
            throw error;
        }
    }
};
