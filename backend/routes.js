
// CORREÇÃO: Convertido para CommonJS
const express = require('express');
const authRoutes = require('./routes/auth.js');
const usersRoutes = require('./routes/users.js');
const groupsRoutes = require('./routes/groups.js');
const messagesRoutes = require('./routes/messages.js');
const adminRoutes = require('./routes/admin.js');
const paymentRoutes = require('./routes/payments.js');
const socialRoutes = require('./routes/social.js');
const eventRoutes = require('./routes/events.js');
const marketplaceRoutes = require('./routes/marketplace.js');
const postsRoutes = require('./routes/posts.js');
const adsRoutes = require('./routes/ads.js');
const screensRoutes = require('./routes/screens.js');
const moderationRoutes = require('./routes/moderation.js');
const trackingRoutes = require('./routes/tracking.js');
const errorRoutes = require('./routes/errors.js');

// Gateway specific routes
const syncpayRoutes = require('./routes/gateways/syncpay.js');
const stripeRoutes = require('./routes/gateways/stripe.js');
const paypalRoutes = require('./routes/gateways/paypal.js');

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

// CORREÇÃO: Convertido para CommonJS
module.exports = router;
