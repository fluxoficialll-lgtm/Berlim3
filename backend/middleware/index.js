
// 🛡️ Este arquivo centraliza a exportação dos nossos middlewares.
// Middlewares são funções que rodam ENTRE o recebimento de uma requisição e a resposta final.
// Eles são perfeitos para validação, autenticação, logs, etc.

/**
 * Middleware para validar se o usuário é um administrador.
 * ❗️ ATENÇÃO: A validação real está desativada por enquanto!
 * 
 * Como funciona um middleware:
 * @param {object} req - O objeto da requisição (request).
 * @param {object} res - O objeto da resposta (response).
 * @param {function} next - A função que passa a requisição para o próximo middleware ou rota.
 */
export const validateAdmin = (req, res, next) => {
    // TODO: Implementar a lógica de validação de administrador aqui.
    // Ex: Verificar se req.user.role === 'admin'
    
    // ⚠️ Atualmente, estamos pulando a validação e permitindo que todas as requisições passem.
    console.warn('Atenção: A validação de administrador está desativada (bypass)!');
    next(); // 👉 Chama o próximo passo na "fila" da requisição.
};
