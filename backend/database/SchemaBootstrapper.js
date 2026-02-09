
import { query } from './pool.js';
import settingsSchemaPkg from '../../shared/schemas/schemas/settings.js';
import usersSchemaPkg from '../../shared/schemas/schemas/users.js';
import groupsSchemaPkg from '../../shared/schemas/schemas/groups.js';
import postsSchemaPkg from '../../shared/schemas/schemas/posts.js';
import chatsSchemaPkg from '../../shared/schemas/schemas/chats.js';
import marketplaceSchemaPkg from '../../shared/schemas/schemas/marketplace.js';
import relationshipsSchemaPkg from '../../shared/schemas/schemas/relationships.js';
import reportsSchemaPkg from '../../shared/schemas/schemas/reports.js';
import interactionsSchemaPkg from '../../shared/schemas/schemas/interactions.js';
import vipSchemaPkg from '../../shared/schemas/schemas/vip.js';
import financialSchemaPkg from '../../shared/schemas/schemas/financial.js';
import adsSchemaPkg from '../../shared/schemas/schemas/ads.js';
import feesSchemaPkg from '../../shared/schemas/schemas/fees.js';
import auditSchemaPkg from '../../shared/schemas/schemas/audit.js';

// Correção: Desestruturar a partir do pacote importado
const { settingsSchema } = settingsSchemaPkg;
const { usersSchema } = usersSchemaPkg;
const { groupsSchema } = groupsSchemaPkg;
const { postsSchema } = postsSchemaPkg;
const { chatsSchema } = chatsSchemaPkg;
const { marketplaceSchema } = marketplaceSchemaPkg;
const { relationshipsSchema } = relationshipsSchemaPkg;
const { reportsSchema } = reportsSchemaPkg;
const { interactionsSchema } = interactionsSchemaPkg;
const { vipSchema } = vipSchemaPkg;
const { financialSchema } = financialSchemaPkg;
const { adsSchema } = adsSchemaPkg;
const { feesSchema } = feesSchemaPkg;
const { auditSchema } = auditSchemaPkg;

export const SchemaBootstrapper = {
    async run() {
        console.log("🔄 DB: Iniciando Verificação de Estrutura (Idempotente)...");
        
        try {
            await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
            
            const schemas = [
                settingsSchema,
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
