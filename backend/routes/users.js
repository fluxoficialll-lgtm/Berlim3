
import express from 'express';
import { dbManager } from '../database/databaseManager.js';
import envConfig from '../config/env.js';

const router = express.Router();

// Simplified user routes for clarity

router.put('/update', async (req, res) => {
    try {
        const { email, updates } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        // Critically, we prevent paymentConfig from being updated here.
        if (updates.paymentConfig) {
            return res.status(403).json({ error: 'Payment configuration cannot be updated via this route.' });
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

router.post('/update-payment-config', async (req, res) => {
    try {
        const { email, provider, isConnected } = req.body;
        if (!email || !provider) {
            return res.status(400).json({ error: 'Email and provider are required.' });
        }

        // As credenciais agora são lidas do gestor central de configuração
        const clientId = envConfig.SYNC_PAY_CLIENT_ID;
        const clientSecret = envConfig.SYNC_PAY_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return res.status(500).json({ error: 'Payment provider credentials not configured on the server.' });
        }

        // Logic to update the user's payment configuration in the database
        // This is a simplified representation.
        const user = await dbManager.users.findByEmail(email);
        if (user) {
            const updatedConfig = {
                providerId: provider,
                isConnected: isConnected,
                // DO NOT store clientSecret in the database. This is for demonstration.
                // In a real app, you would store a token or a reference, not the secret itself.
                clientId: isConnected ? clientId : undefined 
            };

            user.paymentConfig = updatedConfig;
            await dbManager.users.update(user);
            res.json({ user });

        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }

    } catch (e) { res.status(500).json({ error: e.message }); }
});


export default router;
