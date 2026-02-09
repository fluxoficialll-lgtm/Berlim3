
// 🛡️ Este é o serviço de autenticação, o coração da lógica de segurança e acesso de usuários.
// Ele lida com a verificação de credenciais externas (Google), a criação e atualização de usuários,
// e a geração de sessões.

import { userRepository } from '../repositories/userRepository.js';
import { googleAuthConfig } from '../config/authConfig.js';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';
import { logAuditEvent, logDebugTrace, logError } from './audit/audit-log.js';
import userValidatorPkg from '../../shared/validators/userValidator.js';
const { userValidator } = userValidatorPkg;

// Cliente do Google, inicializado uma única vez para reutilização.
const client = new OAuth2Client(googleAuthConfig.clientId);

/**
 * @name AuthService
 * @description
 * Contém a lógica de negócio para autenticação. Ele é o "cérebro" por trás do AuthController.
 */
class AuthService {
    /**
     * Orquestra a autenticação de um usuário via Google.
     * @param {string} googleToken - O token de ID recebido do cliente.
     * @param {string} referredBy - ID do usuário que indicou (opcional).
     * @param {string} ip - IP do usuário para auditoria.
     * @param {string} userAgent - User-Agent do usuário para auditoria.
     * @returns {Promise<object>} Um objeto contendo o usuário, um token de sessão e um booleano `isNew`.
     */
    async handleGoogleAuth(googleToken, referredBy, ip, userAgent) {
        // --- 1. Verificação do Token ---
        // Delega a validação do token para uma função interna que também lida com mocks.
        const { googleId, email, name } = await this._verifyGoogleToken(googleToken, ip);

        // --- 2. Busca ou Criação do Usuário ---
        let user = await userRepository.findByGoogleId(googleId);
        let isNew = false;

        if (!user) {
            // Cenário: Usuário não encontrado pelo Google ID. Pode ser um usuário antigo ou um novo.
            const existingByEmail = await userRepository.findByEmail(email);
            
            if (existingByEmail) {
                // Cenário: O usuário já existia (ex: cadastrou com email/senha) e está agora usando o Google.
                // Vinculamos o Google ID à conta existente para unificar o login.
                user = existingByEmail;
                user.googleId = googleId;
                await userRepository.update(user);
                logDebugTrace('AUTH_SERVICE', 'Google ID vinculado a um usuário existente por email.', { userId: user.id });
            } else {
                // Cenário: Usuário completamente novo.
                isNew = true;
                const newUser = this._buildNewUserPayload(googleId, email, name, referredBy);
                const id = await userRepository.create(newUser);
                user = { ...newUser, id };
                logAuditEvent('USER_REGISTRATION_SUCCESS', { userId: user.id, method: 'google', ip });
            }
        } else {
            // Cenário: Login padrão, usuário já conhecido.
            logDebugTrace('AUTH_SERVICE', 'Usuário encontrado pelo Google ID.', { userId: user.id });
        }

        // --- 3. Auditoria e Geração de Sessão ---
        await userRepository.recordIp(user.id, ip, userAgent); // Registra o IP do login para segurança.
        logAuditEvent('USER_LOGIN_SUCCESS', { userId: user.id, method: 'google', isNew, ip });

        // Gera um token de sessão simples. NOTA: Não é um JWT, é um token de sessão opaco.
        const sessionToken = 'g_session_' + crypto.randomUUID();
        
        return { user, token: sessionToken, isNew };
    }

    /**
     * Verifica um token de ID do Google ou cria um usuário mock para desenvolvimento.
     * @private
     */
    async _verifyGoogleToken(googleToken, ip) {
        // --- LÓGICA DE MOCK PARA DESENVOLVIMENTO ---
        // Se o Client ID do Google não estiver configurado, um usuário falso é criado.
        // Isso é uma FEATURE excelente para permitir que devs rodem o app localmente sem precisar de chaves de API.
        if (googleAuthConfig.clientId === "GOOGLE_CLIENT_ID_NAO_CONFIGURADO" || !googleToken) {
            logDebugTrace('AUTH_SERVICE', 'Usando usuário mock para desenvolvimento. O token do Google não foi fornecido ou o Client ID não está configurado.');
            const mockGoogleId = `mock_${crypto.randomUUID().substring(0, 8)}`;
            return {
                googleId: mockGoogleId,
                email: `guest_${mockGoogleId}@gmail.com`,
                name: 'Mock User'
            };
        }

        // --- VERIFICAÇÃO REAL (PRODUÇÃO) ---
        try {
            const ticket = await client.verifyIdToken({ 
                idToken: googleToken, 
                audience: googleAuthConfig.clientId 
            });
            const payload = ticket.getPayload();
            return { googleId: payload.sub, email: payload.email, name: payload.name };
        } catch (err) {
            logError('AUTH_SERVICE', 'Falha na verificação do token do Google.', err, { ip });
            // Lança um erro específico para ser pego pelo controller, que retornará um status 401.
            throw new Error("Token do Google inválido.");
        }
    }

    /**
     * Constrói e valida o payload para um novo usuário.
     * @private
     */
    _buildNewUserPayload(googleId, email, name, referredBy) {
        const newUserPayload = {
            email: email.toLowerCase().trim(),
            googleId,
            isVerified: true, // Usuários do Google já têm email verificado.
            isProfileCompleted: false, // O perfil precisa ser completado depois.
            referredById: referredBy || null,
            profile: {
                name: `user_${googleId.slice(-4)}`, // Um nome de usuário inicial, simples e único.
                nickname: name || 'Usuário Flux',
                isPrivate: false,
                photoUrl: ''
            }
        };

        // --- CAMADA DE VALIDAÇÃO ---
        // Garante que o objeto do novo usuário segue as regras definidas no validator compartilhado.
        const validationResult = userValidator.validate(newUserPayload);
        if (!validationResult.isValid) {
            logError('AUTH_SERVICE', 'Falha de validação ao criar novo usuário.', { error: validationResult.error, payload: newUserPayload });
            throw new Error(`Falha na validação: ${validationResult.error}`);
        }

        return newUserPayload;
    }
}

export const authService = new AuthService();
