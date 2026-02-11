
import { PostModel } from '../models/PostModel.js';
import { UserModel } from '../models/UserModel.js'; // Assumindo que um UserModel exista
import { v4 as uuidv4 } from 'uuid';
import { Post, Comment } from '@/types';

// ===================================================================================
// ✅ ARQUITETURA NOVA: Service -> Model
// O Serviço contém a lógica de negócio e orquestra as operações. Para qualquer
// interação com o banco de dados, ele delega a responsabilidade para a camada de Model.
// O Serviço não deve conter nenhuma query de banco de dados.
// ===================================================================================

export const PostService = {

    /**
     * @description Lista os posts do feed.
     */
    async listPosts(limit: number = 50, cursor: string | null = null): Promise<Post[]> {
        // A lógica de paginação é delegada ao Model.
        return await PostModel.list(limit, cursor);
    },

    /**
     * @description Cria um novo post.
     */
    async addPost(content: Partial<Post>, userId: string): Promise<Post> {
        const user = await UserModel.findById(userId);
        if (!user) throw new Error("Usuário não encontrado");

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

        await PostModel.create(newPost);
        return newPost;
    },

    /**
     * @description Deleta um post.
     */
    async deletePost(postId: string, userId: string): Promise<void> {
        const post = await PostModel.findById(postId);
        if (!post) throw new Error("Post não encontrado");
        if (post.authorId !== userId) throw new Error("Usuário não autorizado");

        await PostModel.delete(postId);
    },

    /**
     * @description Adiciona ou remove uma curtida de um post.
     */
    async toggleLike(postId: string, userId: string): Promise<Post> {
        const post = await PostModel.findById(postId);
        if (!post) throw new Error("Post não encontrado");

        const likedByIds = new Set(post.likedByIds || []);
        if (likedByIds.has(userId)) {
            likedByIds.delete(userId);
        } else {
            likedByIds.add(userId);
        }

        const updatedData = { 
            likedByIds: Array.from(likedByIds), 
            likes: likedByIds.size 
        };
        
        return await PostModel.update(postId, updatedData);
    },
    
    // ... (outros métodos como trackView, addComment, etc. seguiriam o mesmo padrão)
    // Eles seriam refatorados para chamar métodos correspondentes no PostModel,
    // como PostModel.addComment(postId, newComment), etc.

};
