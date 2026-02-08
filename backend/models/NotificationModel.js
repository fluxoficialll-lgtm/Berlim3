
import { query } from '../database/pool.js';

class NotificationModel {
    async create(notificationData) {
        const { recipient_id, data } = notificationData;
        const { rows } = await query(
            'INSERT INTO notifications (recipient_id, data) VALUES ($1, $2) RETURNING *',
            [recipient_id, data]
        );
        return rows[0];
    }

    async findByRecipient(recipientId) {
        const { rows } = await query('SELECT * FROM notifications WHERE recipient_id = $1 ORDER BY created_at DESC', [recipientId]);
        return rows;
    }
}

export const notificationModel = new NotificationModel();
