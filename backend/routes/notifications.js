
import express from 'express';
import notificationController from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', notificationController.getNotifications);
router.post('/', notificationController.addNotification);
router.delete('/:id', notificationController.removeNotification);
router.post('/mark-all-read', notificationController.markAllAsRead);

export default router;
