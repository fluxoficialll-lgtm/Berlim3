
import { dbManager } from '../databaseManager.js';

/**
 * UserRepository
 * Camada de acesso direto aos dados da tabela de usuários.
 */
class UserRepository {
    async findByGoogleId(googleId) {
        // O dbManager já parece retornar a lógica que precisamos.
        // No futuro, a query SQL viria aqui.
        return dbManager.users.findByGoogleId(googleId);
    }

    async findByEmail(email) {
        return dbManager.users.findByEmail(email);
    }

    async create(userData) {
        return dbManager.users.create(userData);
    }

    async update(user) {
        return dbManager.users.update(user);
    }

    async recordIp(userId, ip, userAgent) {
        return dbManager.admin.recordIp(userId, ip, userAgent);
    }
}

export const userRepository = new UserRepository();
