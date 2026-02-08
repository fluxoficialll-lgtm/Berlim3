
import { Router } from 'express';
import { groupController } from '../controllers/groupController.js';

const router = Router();

router.get('/', groupController.getAll);

export { router as groupRoutes };
