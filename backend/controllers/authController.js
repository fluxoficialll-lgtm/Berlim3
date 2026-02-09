
// 🚪🔑 Este arquivo é o "Porteiro" da nossa aplicação.
// Como um Controller, sua principal responsabilidade é gerenciar o fluxo de requisição (request) e resposta (response) 
// para as rotas de autenticação, agindo como uma camada fina entre o cliente e a lógica de negócios.

import { authService } from '../services/authService.js'; // O serviço que contém a lógica de autenticação real.
import { logError } from '../services/audit/audit-log.js'; // Função para registrar erros de forma centralizada.

/**
 * @name AuthController
 * @description
 * Gerencia o fluxo de requisição e resposta para rotas de autenticação.
 * Ele extrai dados da requisição, delega o trabalho pesado para o `authService` e formata a resposta HTTP.
 */
class AuthController {
    /**
     * Lida com a tentativa de login ou registro via Google.
     * @param {object} req - O objeto de requisição do Express.
     * @param {object} res - O objeto de resposta do Express.
     */
    async googleAuth(req, res) {
        // --- 1. Coleta de Metadados de Segurança ---
        // Capturamos o IP e o User-Agent para fins de auditoria e segurança.
        // 'x-forwarded-for' é usado quando a aplicação está atrás de um proxy (como Nginx ou Heroku).
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];

        try {
            // --- 2. Extração dos Dados de Entrada ---
            const { googleToken, referredBy } = req.body;

            // --- 3. Delegação para a Camada de Serviço ---
            // O trabalho pesado (validar o token, encontrar ou criar o usuário) é feito pelo authService.
            // O controller não sabe (e não precisa saber) como essa lógica funciona.
            console.log(`[AUTH] Iniciando autenticação Google para o IP: ${ip}`);
            const result = await authService.handleGoogleAuth(googleToken, referredBy, ip, userAgent);

            // --- 4. Resposta de Sucesso ---
            // Se o serviço executou com sucesso, retornamos o resultado (token JWT, dados do usuário) para o cliente.
            res.status(200).json(result);

        } catch (error) {
            // --- 5. Gerenciamento Centralizado de Erros ---
            // Se o authService lançar um erro (ex: token inválido), ele será capturado aqui.
            logError('AUTH_CONTROLLER', 'Falha na autenticação Google via controller.', error, { ip });
            
            // Tratamento específico para erros de autenticação conhecidos.
            if (error.message === "Token do Google inválido.") {
                // Retorna um erro 401 (Não Autorizado), informando ao cliente que a credencial é inválida.
                return res.status(401).json({ error: error.message });
            }

            // Para todos os outros erros (inesperados, falhas de banco de dados, etc.),
            // retornamos um erro 500 (Erro Interno do Servidor) para não expor detalhes da implementação.
            res.status(500).json({ error: "Erro interno no servidor durante a autenticação." });
        }
    }
}

// Exporta uma instância única (Singleton) do controller.
export const authController = new AuthController();
