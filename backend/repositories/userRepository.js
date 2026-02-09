
// 🗄️ Este é o repositório de usuários, a única camada que deve interagir diretamente com a tabela `users` no banco de dados.
// Ele abstrai as consultas SQL em métodos reutilizáveis que os serviços podem consumir.
// IMPORTANTE: Este repositório utiliza queries SQL brutas via `node-postgres` (pg).

import { query } from '../database/pool.js';
// import bcrypt from 'bcrypt'; // 🚨 ALERTA: A criptografia de senha está desabilitada.

/**
 * @name UserRepository
 * @description
 * Encapsula todo o acesso a dados para a entidade `User`.
 */
class UserRepository {
    /**
     * Encontra um usuário pelo seu Google ID.
     * @param {string} googleId - O ID único fornecido pelo Google.
     * @returns {Promise<object|undefined>} O objeto do usuário ou `undefined` se não for encontrado.
     */
    async findByGoogleId(googleId) {
        const res = await query('SELECT * FROM users WHERE google_id = $1', [googleId]);
        return res.rows[0];
    }

    /**
     * Encontra um usuário pelo seu endereço de e-mail (case-insensitive).
     * @param {string} email - O e-mail do usuário.
     * @returns {Promise<object|undefined>} O objeto do usuário ou `undefined` se não for encontrado.
     */
    async findByEmail(email) {
        const res = await query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        return res.rows[0];
    }

    /**
     * Cria um novo usuário no banco de dados.
     * @param {object} userData - O objeto contendo os dados do novo usuário.
     * @returns {Promise<object>} O objeto do usuário recém-criado.
     */
    async create(userData) {
        // 🚨 ALERTA DE SEGURANÇA: A senha NÃO está sendo criptografada!
        // O código bcrypt abaixo está comentado. Isso significa que a senha é salva em texto puro.
        // const hashedPassword = await bcrypt.hash(password, 10);

        const { email, password, handle, google_id, referred_by_id } = userData;
        
        // Nota: O objeto `userData` inteiro é salvo na coluna `data` como um JSON.
        // Isso oferece flexibilidade, mas a estrutura não é garantida pelo schema do banco.
        const res = await query(
            'INSERT INTO users (email, password, handle, google_id, referred_by_id, data) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [email, password /* hashedPassword */, handle, google_id, referred_by_id, userData]
        );
        return res.rows[0];
    }

    /**
     * Atualiza os dados de um usuário existente.
     * @param {object} user - O objeto completo do usuário, incluindo seu `id`.
     * @returns {Promise<object>} O objeto do usuário atualizado.
     */
    async update(user) {
        // 🚨 ALERTA DE SEGURANÇA: Semelhante à criação, a atualização da senha também não a criptografa.
        // const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const { id, email, password, handle, google_id, wallet_balance, is_banned, is_profile_completed, trust_score, strikes, data, referred_by_id } = user;
        
        const res = await query(
            'UPDATE users SET email = $1, password = $2, handle = $3, google_id = $4, wallet_balance = $5, is_banned = $6, is_profile_completed = $7, trust_score = $8, strikes = $9, data = $10, referred_by_id = $11 WHERE id = $12 RETURNING *',
            [email, password /* hashedPassword */, handle, google_id, wallet_balance, is_banned, is_profile_completed, trust_score, strikes, data, referred_by_id, id]
        );
        return res.rows[0];
    }

    /**
     * Registra o endereço de IP de um usuário. (Método Stub)
     * @param {string} userId - O ID do usuário.
     * @param {string} ip - O endereço de IP a ser registrado.
     * @param {string} userAgent - O User-Agent do cliente.
     */
    async recordIp(userId, ip, userAgent) {
        // O autor original corretamente notou que esta lógica não pertence aqui.
        // A responsabilidade de auditoria deve ser do AuditRepository para manter a separação de conceitos.
        // Deixando vazio como pretendido.
        return Promise.resolve();
    }
}

export const userRepository = new UserRepository();
