
import { query } from '../database/pool.js';

class UserModel {
    async findByGoogleId(googleId) {
        const { rows } = await query('SELECT * FROM users WHERE google_id = $1', [googleId]);
        return rows[0];
    }

    async findByEmail(email) {
        const { rows } = await query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        return rows[0];
    }

    async create(userData) {
        const { email, password, handle, google_id, referred_by_id, data } = userData;
        const { rows } = await query(
            'INSERT INTO users (email, password, handle, google_id, referred_by_id, data) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [email, password, handle, google_id, referred_by_id, data || null]
        );
        return rows[0];
    }

    async update(user) {
        const { id, email, handle, is_profile_completed, data } = user;
        const { rows } = await query(
            'UPDATE users SET email = $1, handle = $2, is_profile_completed = $3, data = $4 WHERE id = $5 RETURNING *',
            [email, handle, is_profile_completed, data, id]
        );
        return rows[0];
    }
}

export const userModel = new UserModel();
