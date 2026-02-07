
import express from 'express';
import { dbManager } from '../databaseManager.js';

const router = express.Router();

router.get('/sync', async (req, res) => {
    try {
        const users = await dbManager.users.getAll();
        res.json({ users });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json([]);
        const users = await dbManager.users.getAll();
        const filtered = users.filter(u => 
            u.profile?.name?.toLowerCase().includes(q.toLowerCase()) || 
            u.profile?.nickname?.toLowerCase().includes(q.toLowerCase())
        );
        res.json(filtered);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Rota para atualizar um usuário pelo email
router.put('/update', async (req, res) => {
    try {
        const { email, updates } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        const user = await dbManager.users.findByEmail(email);
        if (user) {
            const updated = { ...user, ...updates };
            await dbManager.users.update(updated);
            res.json({ user: updated });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (e) { res.status(500).json({ error: e.message }); }
});

const uuidRegex = '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}';

// Rota para buscar um usuário pelo ID (UUID)
router.get(`/:userId(${uuidRegex})`, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await dbManager.users.findById(userId);
        if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Rota para atualizar um usuário pelo ID (UUID)
router.put(`/:userId(${uuidRegex})/update`, async (req, res) => {
    try {
        const { userId } = req.params;
        const { updates } = req.body;

        // Idealmente, você verificaria aqui se o usuário autenticado (req.user.id)
        // tem permissão para atualizar este usuário.

        const user = await dbManager.users.findById(userId);
        if (user) {
            const updated = { ...user, ...updates };
            await dbManager.users.update(updated);
            res.json({ user: updated });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (e) { res.status(500).json({ error: e.message }); }
});

export default router;
