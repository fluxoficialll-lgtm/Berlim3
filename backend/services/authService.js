
import { userRepository } from '../repositories/userRepository.js';
import { googleAuthConfig } from '../authConfig.js';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { logAuditEvent, logDebugTrace, logError } from './audit/audit-log.js';
import { userValidator } from '../../shared/validators/userValidator.js';

const client = new OAuth2Client(googleAuthConfig.clientId);

/**
 * AuthService
 * Contém a lógica de negócio para autenticação.
 */
class AuthService {
    async handleGoogleAuth(googleToken, referredBy, ip, userAgent) {
        logDebugTrace('AUTH_GOOGLE_SERVICE', 'Initiating Google authentication.', { ip, userAgent });

        const { googleId, email, name } = await this._verifyGoogleToken(googleToken, ip);

        let user = await userRepository.findByGoogleId(googleId);
        let isNew = false;

        if (!user) {
            logDebugTrace('AUTH_GOOGLE_SERVICE', 'User not found by Google ID, checking by email.', { email });
            const existingByEmail = await userRepository.findByEmail(email);
            
            if (existingByEmail) {
                user = existingByEmail;
                user.googleId = googleId;
                await userRepository.update(user);
                logDebugTrace('AUTH_GOOGLE_SERVICE', 'Linked Google ID to existing user.', { userId: user.id });
            } else {
                isNew = true;
                const newUser = this._buildNewUserPayload(googleId, email, name, referredBy);
                const id = await userRepository.create(newUser);
                user = { ...newUser, id };
                logAuditEvent('USER_REGISTRATION_SUCCESS', { userId: user.id, email: user.email, method: 'google', referredBy, ip });
            }
        } else {
            logDebugTrace('AUTH_GOOGLE_SERVICE', 'User found by Google ID.', { userId: user.id });
        }

        await userRepository.recordIp(user.id, ip, userAgent);
        logAuditEvent('USER_LOGIN_SUCCESS', { userId: user.id, email: user.email, method: 'google', isNew, ip });

        const sessionToken = 'g_session_' + crypto.randomUUID();
        return { user, token: sessionToken, isNew };
    }

    async _verifyGoogleToken(googleToken, ip) {
        if (googleAuthConfig.clientId !== "GOOGLE_CLIENT_ID_NAO_CONFIGURADO" && googleToken && googleToken.length > 50) {
            try {
                const ticket = await client.verifyIdToken({ idToken: googleToken, audience: googleAuthConfig.clientId });
                const payload = ticket.getPayload();
                logDebugTrace('AUTH_GOOGLE_SERVICE', 'Google Token verified.', { googleId: payload.sub });
                return { googleId: payload.sub, email: payload.email, name: payload.name };
            } catch (err) {
                logError('AUTH_GOOGLE_SERVICE', 'Google Token verification failed.', err, { ip });
                throw new Error("Token do Google inválido."); // Lança erro para ser pego no controller
            }
        }
        // Lógica de mock para desenvolvimento
        logDebugTrace('AUTH_GOOGLE_SERVICE', 'Using mock user for development.');
        const mockGoogleId = `mock_${crypto.randomUUID().substring(0, 8)}`;
        return {
            googleId: mockGoogleId,
            email: `guest_${mockGoogleId}@gmail.com`,
            name: 'Mock User'
        };
    }

    _buildNewUserPayload(googleId, email, name, referredBy) {
        const newUserPayload = {
            email: email.toLowerCase().trim(),
            googleId,
            isVerified: true,
            isProfileCompleted: false,
            referredById: referredBy || null,
            profile: {
                name: `user_${googleId.slice(-4)}`,
                nickname: name || 'Usuário Flux',
                isPrivate: false,
                photoUrl: ''
            }
        };

        const validationResult = userValidator.validate(newUserPayload);
        if (!validationResult.isValid) {
            throw new Error(`Validation failed: ${validationResult.error}`);
        }

        return newUserPayload;
    }
}

export const authService = new AuthService();
