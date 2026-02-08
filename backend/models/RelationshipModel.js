
import { query } from '../database/pool.js';

class RelationshipModel {
    async create(relationshipData) {
        const { id, follower_id, following_id, status, data } = relationshipData;
        const { rows } = await query(
            'INSERT INTO relationships (id, follower_id, following_id, status, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, follower_id, following_id, status, data]
        );
        return rows[0];
    }

    async delete(id) {
        await query('DELETE FROM relationships WHERE id = $1', [id]);
    }

    async findFollowers(userId) {
        const { rows } = await query('SELECT * FROM relationships WHERE following_id = $1', [userId]);
        return rows;
    }

    async findFollowing(userId) {
        const { rows } = await query('SELECT * FROM relationships WHERE follower_id = $1', [userId]);
        return rows;
    }
}

export const relationshipModel = new RelationshipModel();
