
import express from 'express';
import { authController } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Autentica um usuário usando um Google ID Token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               googleToken: 
 *                 type: string
 *                 description: O ID Token fornecido pelo Google Sign-In.
 *               referredBy:
 *                 type: string
 *                 description: (Opcional) ID do usuário que fez a referência.
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Token do Google inválido.
 *       500:
 *         description: Erro interno no servidor.
 */
router.post('/google', authController.googleAuth);

export default router;
