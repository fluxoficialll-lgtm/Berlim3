
import { query } from '../database/pool.js';

const mapRowToChat = (row) => {
    if (!row) return null;
    const metadata = typeof row.data === 'string' ? JSON.parse(row.data) : (row.data || {});
    return {
        ...metadata,
        id: row.id,
        updatedAt: row.updated_at
    };
};

class ChatModel {
    async findById(id) {
        const { rows } = await query('SELECT * FROM chats WHERE id = $1', [id]);
        return mapRowToChat(rows[0]);
    }

    async upsert(chat) { // Upsert = Update or Insert
        const { id, ...data } = chat;
        const { rows } = await query(
            `INSERT INTO chats (id, data, updated_at) 
             VALUES ($1, $2, NOW()) 
             ON CONFLICT (id) 
             DO UPDATE SET data = EXCLUDED.data, updated_at = NOW() RETURNING *`,
            [id, data]
        );
        return mapRowToChat(rows[0]);
    }
}

export const chatModel = new ChatModel();
