
import { query } from '../database/pool.js';
// import bcrypt from 'bcrypt';

class UserRepository {
    async findByGoogleId(googleId) {
        const res = await query('SELECT * FROM users WHERE google_id = $1', [googleId]);
        return res.rows[0];
    }

    async findByEmail(email) {
        const res = await query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        return res.rows[0];
    }

    async create(userData) {
        const { email, password, handle, google_id, referred_by_id } = userData;
        // const hashedPassword = await bcrypt.hash(password, 10);
        const res = await query(
            'INSERT INTO users (email, password, handle, google_id, referred_by_id, data) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [email, password, handle, google_id, referred_by_id, userData]
        );
        return res.rows[0];
    }

    async update(user) {
        const { id, email, password, handle, google_id, wallet_balance, is_banned, is_profile_completed, trust_score, strikes, data, referred_by_id } = user;
        // const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const res = await query(
            'UPDATE users SET email = $1, password = $2, handle = $3, google_id = $4, wallet_balance = $5, is_banned = $6, is_profile_completed = $7, trust_score = $8, strikes = $9, data = $10, referred_by_id = $11 WHERE id = $12 RETURNING *',
            [email, password, handle, google_id, wallet_balance, is_banned, is_profile_completed, trust_score, strikes, data, referred_by_id, id]
        );
        return res.rows[0];
    }

    async recordIp(userId, ip, userAgent) {
        // This method should be implemented in the AuditRepository, not here.
        // I will leave it empty for now.
        return Promise.resolve();
    }
}

export const userRepository = new UserRepository();
