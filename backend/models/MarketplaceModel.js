
import { query } from '../database/pool.js';

const mapRowToListing = (row) => {
    if (!row) return null;
    const metadata = typeof row.data === 'string' ? JSON.parse(row.data) : (row.data || {});
    return {
        ...metadata,
        id: row.id,
        sellerId: row.seller_id,
        createdAt: row.created_at
    };
};

class MarketplaceModel {
    async findById(id) {
        const { rows } = await query('SELECT * FROM marketplace WHERE id = $1', [id]);
        return mapRowToListing(rows[0]);
    }

    async create(listingData) {
        const { id, seller_id, ...data } = listingData;
        const { rows } = await query(
            'INSERT INTO marketplace (id, seller_id, data) VALUES ($1, $2, $3) RETURNING *',
            [id, seller_id, data]
        );
        return mapRowToListing(rows[0]);
    }

    async update(listing) {
        const { id, ...data } = listing;
        const { rows } = await query(
            'UPDATE marketplace SET data = $1 WHERE id = $2 RETURNING *',
            [data, id]
        );
        return mapRowToListing(rows[0]);
    }

    async delete(id) {
        await query('DELETE FROM marketplace WHERE id = $1', [id]);
    }
}

export const marketplaceModel = new MarketplaceModel();
