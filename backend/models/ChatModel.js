
import { query } from '../database/pool.js';

class ChatModel {
    async findById(id) {
        const { rows } = await query('SELECT * FROM chats WHERE id = $1', [id]);
        return rows[0];
    }

    async upsert(chat) { // Upsert = Update or Insert
        const { id, data } = chat;
        const { rows } = await query(
            `INSERT INTO chats (id, data, updated_at) 
             VALUES ($1, $2, NOW()) 
             ON CONFLICT (id) 
             DO UPDATE SET data = EXCLUDED.data, updated_at = NOW() RETURNING *`,
            [id, data]
        );
        return rows[0];
    }
}

export const chatModel = new ChatModel();
