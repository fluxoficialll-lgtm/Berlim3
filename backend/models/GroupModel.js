
import { query } from '../database/pool.js';

const mapRowToGroup = (row) => {
    if (!row) return null;
    const metadata = typeof row.data === 'string' ? JSON.parse(row.data) : (row.data || {});
    return {
        ...metadata,
        id: row.id,
        creatorId: row.creator_id,
        isVip: row.is_vip,
        memberCount: row.member_count,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
};

class GroupModel {
    async findById(id) {
        const { rows } = await query('SELECT * FROM groups WHERE id = $1', [id]);
        return mapRowToGroup(rows[0]);
    }

    async create(groupData) {
        const { id, creator_id, is_vip, ...data } = groupData;
        const { rows } = await query(
            'INSERT INTO groups (id, creator_id, is_vip, data) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, creator_id, is_vip, data]
        );
        return mapRowToGroup(rows[0]);
    }

    async update(group) {
        const { id, member_count, status, ...data } = group;
        const { rows } = await query(
            'UPDATE groups SET member_count = $1, status = $2, data = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
            [member_count, status, data, id]
        );
        return mapRowToGroup(rows[0]);
    }

    async delete(id) {
        await query('DELETE FROM groups WHERE id = $1', [id]);
    }
}

export const groupModel = new GroupModel();
