
import { Router } from 'express';
import { postController } from '../controllers/postController.js';
// TODO: Adicionar um middleware de autenticação para proteger as rotas.
// import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// ========================================================
// ✅ ARQUITETURA NOVA: Rota -> Controller
// Cada rota é simples e apenas passa a requisição para a camada de Controller.
// ========================================================

// === Rotas Principais do Post ===
router.get('/', postController.listPosts);       // Listar todos os posts (feed)
router.post('/', /* authMiddleware, */ postController.createPost);     // Criar um novo post
router.delete('/:id', /* authMiddleware, */ postController.deletePost); // Deletar um post

// === Rotas de Interação ===
router.post('/:id/like', /* authMiddleware, */ postController.toggleLike); // Curtir/descurtir um post
router.post('/:id/view', postController.trackView);     // Registrar uma visualização

// === Rotas de Comentários ===
router.post('/:id/comments', /* authMiddleware, */ postController.addComment); // Adicionar um comentário
router.delete('/:postId/comments/:commentId', /* authMiddleware, */ postController.deleteComment); // Deletar um comentário
router.post('/:postId/comments/:commentId/like', /* authMiddleware, */ postController.toggleCommentLike); // Curtir um comentário

// === Rota de Respostas a Comentários ===
router.post('/:postId/comments/:commentId/reply', /* authMiddleware, */ postController.addReply); // Responder a um comentário

export { router as postRoutes };
