
import { postService } from '../services/postService.js';

// ==========================================================================
// ✅ ARQUITETURA NOVA: Controller -> Service
// O Controller é uma camada fina que extrai os dados da requisição (req)
// e chama a camada de Serviço (Service), que contém a lógica de negócio.
// Ele não deve conter nenhuma lógica de negócio ou acesso a banco de dados.
// ==========================================================================

class PostController {

  async listPosts(req, res) {
    try {
      const { limit, cursor } = req.query;
      const posts = await postService.listPosts(Number(limit), cursor);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createPost(req, res) {
    try {
      // const userId = req.user.id; // Deveria vir do middleware de autenticação
      const { text, media, userId } = req.body;
      const newPost = await postService.addPost({ text, media }, userId);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      // const userId = req.user.id;
      const { id } = req.params;
      const { userId } = req.body; // Temporário
      await postService.deletePost(id, userId);
      res.status(204).send();
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  async toggleLike(req, res) {
    try {
      // const userId = req.user.id;
      const { id } = req.params;
      const { userId } = req.body; // Temporário
      const updatedPost = await postService.toggleLike(id, userId);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async trackView(req, res) {
    try {
      const { id } = req.params;
      await postService.trackView(id);
      res.status(200).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async addComment(req, res) {
    try {
      // const userId = req.user.id;
      const { id } = req.params;
      const { text, userId } = req.body; // Temporário
      const newComment = await postService.addComment(id, text, userId);
      res.status(201).json(newComment);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      // const userId = req.user.id;
      const { postId, commentId } = req.params;
      const { userId } = req.body; // Temporário
      await postService.deleteComment(postId, commentId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  async toggleCommentLike(req, res) {
    try {
      // const userId = req.user.id;
      const { postId, commentId } = req.params;
      const { userId } = req.body; // Temporário
      await postService.toggleCommentLike(postId, commentId, userId);
      res.status(200).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async addReply(req, res) {
    try {
      // const userId = req.user.id;
      const { postId, commentId } = req.params;
      const { text, userId } = req.body; // Temporário
      const newReply = await postService.addReply(postId, commentId, text, userId);
      res.status(201).json(newReply);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export const postController = new PostController();
