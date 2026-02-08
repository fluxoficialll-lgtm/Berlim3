
import { query } from '../database/pool.js';

class GroupModel {
    async findById(id) {
        const { rows } = await query('SELECT * FROM groups WHERE id = $1', [id]);
        return rows[0];
    }

    async create(groupData) {
        const { id, creator_id, is_vip, data } = groupData;
        const { rows } = await query(
            'INSERT INTO groups (id, creator_id, is_vip, data) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, creator_id, is_vip, data]
        );
        return rows[0];
    }

    async update(group) {
        const { id, member_count, status, data } = group;
        const { rows } = await query(
            'UPDATE groups SET member_count = $1, status = $2, data = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
            [member_count, status, data, id]
        );
        return rows[0];
    }

    async delete(id) {
        await query('DELETE FROM groups WHERE id = $1', [id]);
    }
}

export const groupModel = new GroupModel();
