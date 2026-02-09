
// 🚦 Este é o coração do nosso sistema de roteamento!
// Ele funciona como um grande cruzamento que direciona todas as requisições da API para o lugar certo.

import express from 'express';

// --- IMPORTAÇÃO DOS MÓDULOS DE ROTA ---
// Cada arquivo aqui é como uma "avenida" especializada em um assunto.

import authRoutes from './auth.js';              // 🔑 Rotas de autenticação (login, registro)
import usersRoutes from './users.js';             // 👤 Rotas de usuários (perfis, etc.)
import groupsRoutes from './groups.js';            // 👨‍👩‍👧‍👦 Rotas de grupos
import messagesRoutes from './messages.js';          // 💬 Rotas de mensagens
import adminRoutes from './admin.js';             // 👑 Rotas do painel de administração
import paymentRoutes from './payments.js';          // 💳 Rotas relacionadas a pagamentos
import socialRoutes from './social.js';            // ❤️ Rotas de interações sociais (curtidas, etc.)
import eventRoutes from './events.js';             // 🎉 Rotas para eventos
import marketplaceRoutes from './marketplace.js';      // 🛒 Rotas do marketplace
import postsRoutes from './posts.js';              // 📝 Rotas de postagens
import adsRoutes from './ads.js';                // 📢 Rotas de anúncios
import screensRoutes from './screens.js';            // 📱 Rotas para agregação de telas (BFF)
import moderationRoutes from './moderation.js';      // 🛡️ Rotas de moderação de conteúdo
import trackingRoutes from './tracking.js';          // 📈 Rotas de rastreamento de eventos
import errorRoutes from './errors.js';             // 💥 Rotas para log de erros do frontend
import notificationRoutes from './notifications.js'; // 🔔 Rotas de notificações

// --- GATEWAYS DE PAGAMENTO ---
// Rotas específicas para cada provedor de pagamento.

import syncpayRoutes from './gateways/syncpay.js';
import stripeRoutes from './gateways/stripe.js';
import paypalRoutes from './gateways/paypal.js';

// 🚀 Inicializando o roteador principal do Express
const router = express.Router();

// --- ROTAS DE SERVIÇO ---

// 🩺 Rota "Handshake" (Batimento)
// Usada para verificar se a API está online e respondendo. É como perguntar "Você está aí?".
// Acessível em: GET /api/ping
router.get('/ping', (req, res) => res.send('pong'));

// --- AGREGAÇÃO DE TELAS (Backend for Frontend) ---
// Agrupa dados de várias fontes para telas específicas do app, otimizando a comunicação.
router.use('/screens', screensRoutes);

// --- REGISTRO DAS "AVENIDAS" (Módulos de Rota) ---
// Aqui, conectamos cada módulo de rota a um prefixo na URL.
// Ex: Todas as rotas de 'authRoutes' começarão com /api/auth

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/groups', groupsRoutes);
router.use('/messages', messagesRoutes);
router.use('/admin', adminRoutes); 
router.use('/events', eventRoutes);
router.use('/marketplace', marketplaceRoutes);
router.use('/posts', postsRoutes);
router.use('/ads', adsRoutes);
router.use('/moderation', moderationRoutes);
router.use('/tracking', trackingRoutes);
router.use('/errors', errorRoutes);
router.use('/notifications', notificationRoutes);

// --- MONTANDO OS GATEWAYS DE PAGAMENTO ---
// Conecta as rotas dos provedores de pagamento a seus respectivos prefixos.
router.use('/syncpay', syncpayRoutes);
router.use('/stripe', stripeRoutes);
router.use('/paypal', paypalRoutes);

// --- ROTAS DE COMPATIBILIDADE ---
// Monta algumas rotas na raiz ('/') para manter a compatibilidade com serviços do frontend
// que podem não usar os prefixos mais específicos.
router.use('/', socialRoutes);
router.use('/', paymentRoutes);

// 🗺️ Exportando o roteador configurado para ser usado no server.js
export default router;
