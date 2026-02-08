
import { query } from '../database/pool.js';

class MarketplaceModel {
    async findById(id) {
        const { rows } = await query('SELECT * FROM marketplace WHERE id = $1', [id]);
        return rows[0];
    }

    async create(listingData) {
        const { id, seller_id, data } = listingData;
        const { rows } = await query(
            'INSERT INTO marketplace (id, seller_id, data) VALUES ($1, $2, $3) RETURNING *',
            [id, seller_id, data]
        );
        return rows[0];
    }

    async update(listing) {
        const { id, data } = listing;
        const { rows } = await query(
            'UPDATE marketplace SET data = $1 WHERE id = $2 RETURNING *',
            [data, id]
        );
        return rows[0];
    }

    async delete(id) {
        await query('DELETE FROM marketplace WHERE id = $1', [id]);
    }
}

export const marketplaceModel = new MarketplaceModel();
