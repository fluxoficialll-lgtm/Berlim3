
import { Router } from 'express';
import { groupRoutes } from './groupRoutes.js';
import { postRoutes } from './postRoutes.js';
import { chatRoutes } from './chatRoutes.js';
import { marketplaceRoutes } from './marketplaceRoutes.js';
import { relationshipRoutes } from './relationshipRoutes.js';
import { interactionRoutes } from './interactionRoutes.js';
import { reportRoutes } from './reportRoutes.js';
import { financialRoutes } from './financialRoutes.js';
import { auditRoutes } from './auditRoutes.js';
import { adRoutes } from './adRoutes.js';

const router = Router();

// Agregando todas as rotas
router.use('/groups', groupRoutes);
router.use('/posts', postRoutes);
router.use('/chats', chatRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/relationships', relationshipRoutes);
router.use('/interactions', interactionRoutes);
router.use('/reports', reportRoutes);
router.use('/financial', financialRoutes);
router.use('/audit', auditRoutes);
router.use('/ads', adRoutes);

export { router };
