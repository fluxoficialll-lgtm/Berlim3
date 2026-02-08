
import { Router } from 'express';
import { postController } from '../controllers/postController.js';

const router = Router();

router.post('/', postController.createPost);

export { router as postRoutes };
