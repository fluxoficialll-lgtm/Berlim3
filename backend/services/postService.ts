
// 📝 Este é o serviço de Posts, o cérebro por trás de toda a criação e interação com o conteúdo.
// Ele gerencia posts, comentários, curtidas e visualizações.
//
// 🏛️ ARQUITETURA CHAVE: Dados Aninhados (Nested Data)
// A maioria das funções aqui opera sob a premissa de que os comentários (`commentsList`) são um array
// armazenado DENTRO do próprio objeto do post. Isso significa que carregar um post também carrega todos os seus comentários.
// As interações (adicionar/remover comentários/respostas) exigem a leitura do post inteiro, a modificação do array em memória
// e, em seguida, o salvamento do objeto do post inteiro de volta no banco de dados.

import { db } from '../../database';
import { Post, User, Comment } from '../../types'; // Presumindo que 'Comment' é um tipo definido
import { v4 as uuidv4 } from 'uuid';

export const PostService = {

    // ===========================
    // === Ações do Post ===
    // ===========================

    /**
     * @name addPost
     * @description Cria um novo post no banco de dados.
     * @param {Partial<Post>} content - O conteúdo parcial do post (ex: { text, media }).
     * @param {string} userId - O ID do autor do post.
     * @returns {Promise<Post>} O objeto do post recém-criado.
     */
    async addPost(content: Partial<Post>, userId: string): Promise<Post> {
        const user = await db.table('users').get(userId);
        if (!user) throw new Error("Usuário não encontrado");

        // Desnormalização: Os dados do usuário (username, avatar) são copiados para o post.
        // Isso evita a necessidade de 'joins' ou buscas adicionais ao exibir o feed, melhorando a performance de leitura.
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

    /**
     * @name deletePost
     * @description Deleta um post, verificando a autoria.
     * @param {string} postId - O ID do post a ser deletado.
     * @param {string} userId - O ID do usuário tentando deletar.
     */
    async deletePost(postId: string, userId: string): Promise<void> {
        const post = await db.table('posts').get(postId);
        if (!post) throw new Error("Post não encontrado");
        if (post.authorId !== userId) throw new Error("Usuário não autorizado a deletar este post");

        await db.table('posts').delete(postId);
        // ⚠️ TODO: A lógica para deletar comentários e notificações associados ainda precisa ser implementada.
    },

    // =================================
    // === Interações com o Post ===
    // =================================

    /**
     * @name toggleLike
     * @description Adiciona ou remove a curtida de um usuário em um post.
     * @param {string} postId - O ID do post.
     * @param {string} userId - O ID do usuário que está curtindo.
     * @returns {Promise<Post>} O post atualizado com a nova contagem de curtidas.
     */
    async toggleLike(postId: string, userId: string): Promise<Post> {
        const post = await db.table('posts').get(postId);
        if (!post) throw new Error("Post não encontrado");

        // Usar um Set é uma forma eficiente de garantir que cada usuário curta apenas uma vez.
        const likedByIds = new Set(post.likedByIds || []);
        if (likedByIds.has(userId)) {
            likedByIds.delete(userId); // Usuário já curtiu, então descurtimos.
        } else {
            likedByIds.add(userId); // Usuário ainda não curtiu, então curtimos.
        }

        const updatedPost = { ...post, likedByIds: Array.from(likedByIds), likes: likedByIds.size };
        await db.table('posts').update(postId, updatedPost);
        return updatedPost;
    },

    /**
     * @name trackView
     * @description Incrementa o contador de visualizações de um post.
     * @param {string} postId - O ID do post a ser atualizado.
     */
    async trackView(postId: string): Promise<void> {
        const post = await db.table('posts').get(postId);
        if (!post) return; // Se o post não existe, simplesmente ignora.
        await db.table('posts').update(postId, { views: (post.views || 0) + 1 });
    },

    // =====================
    // === Comentários ===
    // =====================

    /**
     * @name addComment
     * @description Adiciona um comentário de nível raiz a um post.
     * @param {string} postId - O ID do post sendo comentado.
     * @param {string} text - O conteúdo do comentário.
     * @param {string} userId - O ID do autor do comentário.
     * @returns {Promise<Comment>} O novo objeto de comentário.
     */
    async addComment(postId: string, text: string, userId: string): Promise<Comment> {
        const post = await db.table('posts').get(postId);
        if (!post) throw new Error("Post não encontrado");
        const user = await db.table('users').get(userId);
        if (!user) throw new Error("Usuário não encontrado");

        const newComment: Comment = {
            id: uuidv4(),
            userId,
            text,
            username: user.username, // Desnormalização para performance
            avatar: user.avatar,     // Desnormalização para performance
            timestamp: Date.now(),
            replies: [],
        };

        // Otimização: O novo comentário é adicionado no INÍCIO da lista.
        // Isso permite que o frontend mostre os comentários em ordem cronológica inversa (mais recentes primeiro) sem precisar ordenar.
        const commentsList = [newComment, ...(post.commentsList || [])];
        
        // Atualiza tanto a lista de comentários quanto a contagem total no post.
        await db.table('posts').update(postId, { 
            commentsList, 
            comments: (post.comments || 0) + 1 
        });
        return newComment;
    },

    /**
     * @name addReply
     * @description Adiciona uma resposta a um comentário ou a outra resposta (aninhado).
     * @param {string} postId - ID do post pai.
     * @param {string} commentId - ID do comentário/resposta pai ao qual esta resposta se destina.
     * @param {string} text - O conteúdo da resposta.
     * @param {string} userId - O ID do autor da resposta.
     * @returns {Promise<Comment>} O comentário principal (com a nova resposta aninhada).
     */
    async addReply(postId: string, commentId: string, text: string, userId: string): Promise<Comment> {
        const post = await db.table('posts').get(postId);
        if (!post || !post.commentsList) throw new Error("Post ou comentários não encontrados");
        const user = await db.table('users').get(userId);
        if (!user) throw new Error("Usuário não encontrado");

        // Esta função recursiva navega pela árvore de comentários/respostas para encontrar o pai correto.
        const findAndAddReply = (comments: Comment[]): boolean => {
            for (const c of comments) {
                if (c.id === commentId) {
                    const newReply: Comment = {
                        id: uuidv4(), userId, text, username: user.username, avatar: user.avatar, timestamp: Date.now(), replies: [], replyToUsername: c.username
                    };
                    c.replies = [...(c.replies || []), newReply]; // Adiciona a nova resposta ao array de `replies` do pai.
                    return true; // Encontrou e adicionou com sucesso.
                }
                // Se não encontrou no nível atual, mergulha para o próximo nível de respostas.
                if (c.replies && findAndAddReply(c.replies)) return true;
            }
            return false; // Não encontrou o pai nesta ramificação da árvore.
        };

        if (findAndAddReply(post.commentsList)) {
            await db.table('posts').update(postId, { 
                commentsList: post.commentsList, 
                comments: (post.comments || 0) + 1 // Incrementa a contagem total de comentários.
            });
            // 🐛 BUG/ATALHO: O autor original notou que esta implementação não retorna a *nova resposta* criada.
            // Em vez disso, retorna o primeiro comentário da lista como um placeholder.
            // Uma implementação ideal encontraria e retornaria o objeto `newReply` que foi adicionado.
            return post.commentsList[0];
        } else {
            throw new Error("Comentário pai não encontrado");
        }
    },

    /**
     * @name deleteComment
     * @description Deleta um comentário ou uma resposta e todos os seus filhos.
     * @param {string} postId - ID do post pai.
     * @param {string} commentId - ID do comentário a ser deletado.
     * @param {string} userId - ID do usuário, para verificação de permissão.
     */
    async deleteComment(postId: string, commentId: string, userId: string): Promise<void> {
        const post = await db.table('posts').get(postId);
        if (!post || !post.commentsList) return;

        let commentCountChange = 0; // Para saber quantos comentários (incluindo filhos) foram removidos.
        
        // Função recursiva para filtrar e remover o comentário alvo e seus descendentes.
        const filterRecursive = (comments: Comment[]): Comment[] => {
            return comments.filter(c => {
                if (c.id === commentId) {
                    if (c.userId !== userId) throw new Error("Não autorizado");
                    // O total a ser removido é 1 (o próprio comentário) + o número de seus filhos.
                    commentCountChange = -1 - (c.replies?.length || 0);
                    return false; // Remove o comentário da lista.
                }
                if (c.replies) {
                    const originalRepliesCount = c.replies.length;
                    c.replies = filterRecursive(c.replies); // Chama recursivamente para os filhos.
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

    /**
     * @name toggleCommentLike
     * @description Curte ou descurte um comentário ou resposta.
     * @param {string} postId - ID do post pai.
     * @param {string} commentId - ID do comentário a ser curtido.
     * @param {string} userId - ID do usuário que está curtindo.
     */
    async toggleCommentLike(postId: string, commentId: string, userId: string): Promise<void> {
        const post = await db.table('posts').get(postId);
        if (!post || !post.commentsList) return;

        // Função recursiva para encontrar o comentário na árvore e atualizar sua curtida.
        const updateRecursive = (list: Comment[]): boolean => {
            for (const c of list) {
                if (c.id === commentId) {
                    const likedBy = new Set(c.likedBy || []);
                    if (likedBy.has(userId)) likedBy.delete(userId); else likedBy.add(userId);
                    c.likedBy = Array.from(likedBy);
                    c.likes = likedBy.size;
                    return true; // Encontrou e atualizou.
                }
                if (c.replies && updateRecursive(c.replies)) return true; // Procura nos filhos.
            }
            return false;
        };

        if (updateRecursive(post.commentsList)) {
            await db.table('posts').update(postId, { commentsList: post.commentsList });
        }
    }
};
