
import express from 'express';
import authRoutes from './auth.js';
import usersRoutes from './users.js';
import groupsRoutes from './groups.js';
import messagesRoutes from './messages.js';
import adminRoutes from './admin.js';
import paymentRoutes from './payments.js';
import socialRoutes from './social.js';
import eventRoutes from './events.js';
import marketplaceRoutes from './marketplace.js';
import postsRoutes from './posts.js';
import adsRoutes from './ads.js';
import screensRoutes from './screens.js';
import moderationRoutes from './moderation.js';
import trackingRoutes from './tracking.js';
import errorRoutes from './errors.js';

// Gateway specific routes
import syncpayRoutes from './gateways/syncpay.js';
import stripeRoutes from './gateways/stripe.js';
import paypalRoutes from './gateways/paypal.js';

const router = express.Router();

// Handshake Route (Batimento)
// Como este router é montado em /api no server.js, esta rota será /api/ping
router.get('/ping', (req, res) => res.send('pong'));

// BFF / Screens Aggregator
router.use('/screens', screensRoutes);

// Register modular routers
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/groups', groupsRoutes);
router.use('/messages', messagesRoutes);
router.use('/admin', adminRoutes); // Única rota para ações administrativas internas
router.use('/events', eventRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/posts', postsRoutes);
router.use('/ads', adsRoutes);
router.use('/moderation', moderationRoutes);
router.use('/tracking', trackingRoutes);
router.use('/errors', errorRoutes);

// Mounting Gateways
router.use('/syncpay', syncpayRoutes);
router.use('/stripe', stripeRoutes);
router.use('/paypal', paypalRoutes);

// Mounting specific prefixes to maintain compatibility with frontend services
router.use('/', socialRoutes);
router.use('/', paymentRoutes);

export default router;
