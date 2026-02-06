
import { apiClient } from '../../apiClient';

// Tipos específicos para comentários de Marketplace, se necessário
// export interface ProductComment { ... }

/**
 * Serviço especializado para gerenciar comentários em produtos do Marketplace.
 */
export const MarketplaceCommentService = {
    /**
     * Busca os comentários de um produto específico.
     * @param productId - O ID do produto.
     * @returns Uma lista de comentários.
     */
    async getComments(productId: string): Promise<any[]> {
        try {
            const response = await apiClient.get(`/marketplace/products/${productId}/comments`);
            return response.data;
        } catch (error) {
            console.error(`[MarketplaceCommentService] Erro ao buscar comentários para o produto ${productId}:`, error);
            throw error;
        }
    },

    /**
     * Adiciona um novo comentário a um produto.
     * @param productId - O ID do produto.
     * @param content - O conteúdo do comentário.
     * @returns O comentário criado.
     */
    async addComment(productId: string, content: string): Promise<any> {
        try {
            const response = await apiClient.post(`/marketplace/products/${productId}/comments`, { content });
            return response.data;
        } catch (error) {
            console.error(`[MarketplaceCommentService] Erro ao adicionar comentário ao produto ${productId}:`, error);
            throw error;
        }
    },

    /**
     * Deleta um comentário de um produto.
     * @param commentId - O ID do comentário a ser deletado.
     */
    async deleteComment(commentId: string): Promise<void> {
        try {
            await apiClient.delete(`/comments/${commentId}`);
        } catch (error) {
            console.error(`[MarketplaceCommentService] Erro ao deletar o comentário ${commentId}:`, error);
            throw error;
        }
    }
};
