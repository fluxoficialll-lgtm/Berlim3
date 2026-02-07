
import express from 'express';
import { dbManager } from '../databaseManager.js';
import { googleAuthConfig } from '../authConfig.js';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { logAuditEvent, logDebugTrace, logError } from '../service/audit/audit-log.js'; // Importando a nova função logError

const router = express.Router();
const client = new OAuth2Client(googleAuthConfig.clientId);

// ... (outras rotas como /config, /register, /login permanecem, mas também podem ser atualizadas para usar logError)

// Rota de autenticação com Google - ATUALIZADA com logError
router.post('/google', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const ua = req.headers['user-agent'];
    logDebugTrace('AUTH_GOOGLE', 'Initiating Google authentication process.', { ip, userAgent: ua });

    try {
        const { googleToken, referredBy } = req.body;
        let googleId, email, name;

        logDebugTrace('AUTH_GOOGLE', 'Step 1: Verifying Google Token.');
        if (googleAuthConfig.clientId !== "GOOGLE_CLIENT_ID_NAO_CONFIGURADO" && googleToken && googleToken.length > 50) {
            try {
                const ticket = await client.verifyIdToken({ idToken: googleToken, audience: googleAuthConfig.clientId });
                const payload = ticket.getPayload();
                googleId = payload['sub']; 
                email = payload['email']; 
                name = payload['name'];
                logDebugTrace('AUTH_GOOGLE', 'Google Token verified successfully.', { googleId, email });
            } catch (err) {
                // Usando logError para um erro de validação de token
                logError('AUTH_GOOGLE', 'Google Token verification failed.', err, { ip });
                return res.status(401).json({ error: "Token do Google inválido." });
            }
        } else {
            logDebugTrace('AUTH_GOOGLE', 'No valid Google Token provided, using mock user for development.');
            googleId = `mock_${crypto.randomUUID().substring(0, 8)}`;
            email = `guest_${googleId}@gmail.com`;
        }

        logDebugTrace('AUTH_GOOGLE', 'Step 2: Database Operations.', { email });
        try {
            let user = await dbManager.users.findByGoogleId(googleId);
            let isNew = false;

            if (!user) {
                logDebugTrace('AUTH_GOOGLE', 'No user found by Google ID, checking by email.', { email });
                const existingByEmail = await dbManager.users.findByEmail(email);
                if (existingByEmail) {
                    user = existingByEmail; 
                    user.googleId = googleId; 
                    await dbManager.users.update(user);
                    logDebugTrace('AUTH_GOOGLE', 'Existing user found by email, linked Google ID.', { userId: user.id });
                } else {
                    isNew = true;
                    const newUser = { 
                        email: email.toLowerCase().trim(), 
                        googleId, 
                        isVerified: true, 
                        isProfileCompleted: false, 
                        referredById: referredBy || null, 
                        profile: { name: `user_${googleId.slice(-4)}`, nickname: name || 'Usuário Flux', isPrivate: false, photoUrl: '' } 
                    };
                    const id = await dbManager.users.create(newUser);
                    user = { ...newUser, id };
                    logAuditEvent('USER_REGISTRATION_SUCCESS', { userId: user.id, email: user.email, method: 'google', referredBy, ip });
                }
            } else {
                 logDebugTrace('AUTH_GOOGLE', 'User found by Google ID.', { userId: user.id });
            }

            await dbManager.admin.recordIp(user.id, ip, ua);
            logAuditEvent('USER_LOGIN_SUCCESS', { userId: user.id, email: user.email, method: 'google', isNew, ip });
            logDebugTrace('AUTH_GOOGLE', 'Authentication successful.', { userId: user.id, isNew });
            
            res.json({ user, token: 'g_session_' + crypto.randomUUID(), isNew });
            
        } catch (dbError) {
            // Usando logError para um erro de banco de dados
            logError('AUTH_GOOGLE_DB', 'Database operation failed during Google auth.', dbError, { email });
            return res.status(503).json({ error: "Serviço temporariamente indisponível (Erro de Banco)." });
        }

    } catch (e) { 
        // Usando logError para qualquer outra exceção geral
        logError('AUTH_GOOGLE_GENERAL', 'An unexpected error occurred in the Google auth route.', e, { ip });
        res.status(500).json({ error: "Erro interno na autenticação." }); 
    }
});

// ... (o resto do arquivo)

export default router;
