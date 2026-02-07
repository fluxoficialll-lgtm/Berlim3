
import { authService } from '../services/authService.js';
import { logError } from '../service/audit/audit-log.js';

/**
 * AuthController
 * Gerencia o fluxo de requisição e resposta para rotas de autenticação.
 */
class AuthController {
    async googleAuth(req, res) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];

        try {
            const { googleToken, referredBy } = req.body;
            const result = await authService.handleGoogleAuth(googleToken, referredBy, ip, userAgent);
            res.status(200).json(result);
        } catch (error) {
            // Erros lançados pelo serviço (ex: token inválido) ou erros inesperados.
            logError('AUTH_CONTROLLER', 'Google auth failed in controller.', error, { ip });
            
            if (error.message === "Token do Google inválido.") {
                return res.status(401).json({ error: error.message });
            }

            // Para outros erros, retorna uma resposta genérica de servidor
            res.status(500).json({ error: "Erro interno no servidor durante a autenticação." });
        }
    }
}

export const authController = new AuthController();
