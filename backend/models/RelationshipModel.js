
import { query } from '../database/pool.js';

const mapRowToRelationship = (row) => {
    if (!row) return null;
    const metadata = typeof row.data === 'string' ? JSON.parse(row.data) : (row.data || {});
    return {
        ...metadata,
        id: row.id,
        followerId: row.follower_id,
        followingId: row.following_id,
        status: row.status,
        createdAt: row.created_at
    };
};

class RelationshipModel {
    async findById(id) {
        const { rows } = await query('SELECT * FROM relationships WHERE id = $1', [id]);
        return mapRowToRelationship(rows[0]);
    }

    async create(relationshipData) {
        const { id, follower_id, following_id, status, ...data } = relationshipData;
        const { rows } = await query(
            'INSERT INTO relationships (id, follower_id, following_id, status, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, follower_id, following_id, status, data]
        );
        return mapRowToRelationship(rows[0]);
    }

    async delete(id) {
        await query('DELETE FROM relationships WHERE id = $1', [id]);
    }
}

export const relationshipModel = new RelationshipModel();
