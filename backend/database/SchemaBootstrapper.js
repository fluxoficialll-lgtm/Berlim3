
import { query } from './pool.js';
import { settingsSchema } from '../../shared/schemas/settings.js';
import { usersSchema } from '../../shared/schemas/users.js';
import { groupsSchema } from '../../shared/schemas/groups.js';
import { postsSchema } from '../../shared/schemas/posts.js';
import { chatsSchema } from '../../shared/schemas/chats.js';
import { marketplaceSchema } from '../../shared/schemas/marketplace.js';
import { relationshipsSchema } from '../../shared/schemas/relationships.js';
import { reportsSchema } from '../../shared/schemas/reports.js';
import { interactionsSchema } from '../../shared/schemas/interactions.js';
import { vipSchema } from '../../shared/schemas/vip.js';
import { financialSchema } from '../../shared/schemas/financial.js';
import { adsSchema } from '../../shared/schemas/ads.js';
import { feesSchema } from '../../shared/schemas/fees.js';
import { auditSchema } from '../../shared/schemas/audit.js';

export const SchemaBootstrapper = {
    async run() {
        console.log("🔄 DB: Iniciando Verificação de Estrutura (Idempotente)...");
        
        try {
            // 1. Requisito Base
            await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
            
            // 2. ORDEM DE PRIORIDADE: settingsSchema primeiro para evitar erros em rotas de config
            const schemas = [
                settingsSchema, // Essencial para o sistema respirar
                usersSchema, 
                groupsSchema, 
                postsSchema,
                chatsSchema, 
                marketplaceSchema, 
                relationshipsSchema,
                reportsSchema, 
                interactionsSchema, 
                vipSchema,    
                financialSchema, 
                adsSchema, 
                feesSchema, 
                auditSchema
            ];

            for (const sql of schemas) { 
                await query(sql); 
            }

            console.log("✅ DB: Estrutura 100% Sincronizada.");
            return true;
        } catch (e) {
            console.error("❌ DB: Falha Crítica no Bootstrapper:", e.message);
            return false;
        }
    }
};
