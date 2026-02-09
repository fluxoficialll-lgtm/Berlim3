
// 🤖 Este serviço TypeScript gerencia as operações de CRUD (Criar, Ler, Apagar) para comentários em itens do marketplace.
// Ele é executado exclusivamente no lado do servidor (backend).

import { db } from '../../database';
import { Comment } from '../../types';
// O authService não está sendo usado, mas foi provavelmente planejado para validações mais robustas.
import { authService } from '../authService'; 
import { v4 as uuidv4 } from 'uuid';

/**
 * ‼️ **Análise da Camada de Dados**:
 * A sintaxe `db.table(...)` se assemelha a APIs de bancos de dados do lado do cliente como Dexie.js (IndexedDB).
 * Isso é uma escolha de arquitetura incomum para o backend. Se a implementação subjacente não usar índices
 * de forma eficiente, operações como a de `getComments` podem ter sérios problemas de performance.
 */

export const MarketplaceCommentService = {
    /**
     * @name getComments
     * @description Busca todos os comentários para um item específico do marketplace.
     * @param {string} itemId O ID do item do marketplace.
     * @returns {Promise<Comment[]>} Uma lista de comentários.
     */
    async getComments(itemId: string): Promise<Comment[]> {
        if (!itemId) return [];
        console.log(`[Backend] Buscando comentários para o item ${itemId}...`);

        // ‼️ ATENÇÃO: RISCO DE PERFORMANCE GRAVE ‼️
        // A linha abaixo busca TODOS os comentários do banco de dados para a memória e SÓ DEPOIS filtra na aplicação.
        // Isso não escala. Com um grande número de comentários, isso vai sobrecarregar o servidor.
        // A consulta DEVE ser feita no banco de dados usando um índice na coluna `itemId`.
        // Exemplo de como deveria ser (em um ORM padrão): `db.comments.findMany({ where: { itemId: itemId } })`
        const allComments: Comment[] = await db.table('comments').toArray();
        return allComments.filter(c => c.itemId === itemId);
    },

    /**
     * @name addComment
     * @description Adiciona um novo comentário a um item do marketplace. Requer um usuário autenticado.
     * @param {string} itemId O ID do item do marketplace.
     * @param {string} text O conteúdo do comentário.
     * @param {string} userId O ID do usuário que está comentando.
     * @returns {Promise<Comment>} O novo comentário criado.
     */
    async addComment(itemId: string, text: string, userId: string): Promise<Comment> {
        // Validação: Garante que o usuário existe antes de permitir o comentário.
        const user = await db.table('users').get(userId);
        if (!user) throw new Error("Usuário não autenticado ou não encontrado.");

        console.log(`[Backend] Adicionando comentário ao item ${itemId}...`);

        const newComment: Comment = {
            id: uuidv4(), // Gera um ID único para o comentário.
            itemId,
            text,
            username: user.username || "Usuário Anônimo", // Usa o nome do usuário ou um fallback.
            avatar: user.avatar, // Puxa o avatar do perfil do usuário.
            timestamp: Date.now(),
            likes: 0,
            replies: [],
            userId: userId, // Armazena o ID do autor para futuras verificações de permissão.
        };

        await db.table('comments').add(newComment);
        return newComment;
    },

    /**
     * @name deleteComment
     * @description Apaga um comentário de um item do marketplace.
     * @param {string} commentId O ID do comentário a ser apagado.
     * @param {string} userId O ID do usuário que está tentando apagar.
     */
    async deleteComment(commentId: string, userId: string): Promise<void> {
        console.log(`[Backend] Apagando comentário ${commentId}...`);
        
        const comment = await db.table('comments').get(commentId);
        if (comment) {
            // Verificação de Permissão: Garante que apenas o autor do comentário pode apagá-lo.
            // TODO: A lógica deve ser estendida para permitir que administradores também possam apagar.
            if (comment.userId !== userId) {
                throw new Error("Usuário não tem permissão para apagar este comentário.");
            }
            await db.table('comments').delete(commentId);
        } else {
            throw new Error("Comentário não encontrado.");
        }
    }
};
