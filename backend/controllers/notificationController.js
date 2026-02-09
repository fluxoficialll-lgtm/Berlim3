
import { query } from '../database/pool.js';

const getNotifications = async (req, res) => {
    const { email } = req.query;
    try {
        const result = await query('SELECT * FROM notifications WHERE user_email = $1 ORDER BY timestamp DESC', [email]);
        res.status(200).json({ notifications: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addNotification = async (req, res) => {
    const { user_email, type, subtype, message, username, avatar, link, isFollowing, timestamp } = req.body;
    try {
        const result = await query(
            'INSERT INTO notifications (user_email, type, subtype, message, username, avatar, link, isFollowing, timestamp, read) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, false) RETURNING *',
            [user_email, type, subtype, message, username, avatar, link, isFollowing, timestamp]
        );
        res.status(201).json({ notification: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeNotification = async (req, res) => {
    const { id } = req.params;
    try {
        await query('DELETE FROM notifications WHERE id = $1', [id]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const markAllAsRead = async (req, res) => {
    const { email } = req.body;
    try {
        await query('UPDATE notifications SET read = true WHERE user_email = $1', [email]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    getNotifications,
    addNotification,
    removeNotification,
    markAllAsRead,
};
