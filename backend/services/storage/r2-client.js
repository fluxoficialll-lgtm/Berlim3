import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { storageEvents } from '../../services/audit/storage-events.js';
import { idManager } from '../id-manager.js';

/**
 * ☁️ R2Client (Cliente Cloudflare R2)
 *
 * Cliente centralizado para todas as interações com o serviço de armazenamento de objetos Cloudflare R2.
 * Esta classe abstrai a complexidade do SDK da AWS (compatível com R2), implementa o padrão Singleton e se integra
 * profundamente com os sistemas de auditoria e geração de IDs da aplicação.
 *
 * Principais Responsabilidades:
 * - Gerar URLs pré-assinadas seguras para uploads diretos do cliente (Direct Client-to-Cloud Upload).
 * - Processar a exclusão de arquivos do R2.
 * - Registrar eventos detalhados de auditoria para todas as operações de armazenamento.
 */
class R2Client {
    constructor() {
        /**
         * @property {S3Client} s3 - A instância do cliente S3, configurada para o endpoint do R2.
         */
        this.s3 = new S3Client({
            region: 'auto',
            endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
            },
        });

        /**
         * @property {string} bucketName - O nome do bucket R2, carregado das variáveis de ambiente.
         */
        this.bucketName = process.env.R2_BUCKET_NAME;
    }

    /**
     * Gera uma URL pré-assinada para permitir que o cliente (frontend) faça o upload de um arquivo diretamente para o R2.
     * Este método é o coração do nosso sistema de upload, garantindo segurança e performance.
     *
     * @param {string} userId - O ID do usuário que está solicitando o upload (para organização e auditoria).
     * @param {string} fileType - O tipo MIME do arquivo (ex: 'image/jpeg', 'video/mp4').
     * @param {number} fileSize - O tamanho do arquivo em bytes. Usado para a validação `ContentLength`.
     * @returns {Promise<string>} A URL pré-assinada para a qual o cliente deve enviar um request PUT com o corpo do arquivo.
     * @throws {Error} Lança um erro se a geração da URL falhar.
     */
    async createPresignedUploadUrl(userId, fileType, fileSize) {
        storageEvents.uploadUrlRequested(userId, fileType, fileSize);
        const fileId = idManager.file(); // Gera um ID único e prefixado para o arquivo (ex: 'file_...').
        const key = `${userId}/${fileId}`; // Cria uma chave única e organizada por usuário.

        try {
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                ContentType: fileType, // Essencial para o navegador renderizar o arquivo corretamente.
                ContentLength: fileSize, // Garante que o tamanho do arquivo enviado seja o esperado.
            });

            const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 }); // A URL é válida por 1 hora.
            storageEvents.uploadUrlGenerated(userId, key, url); // Log de auditoria: sucesso.
            return url;
        } catch (error) {
            storageEvents.uploadUrlGenerationFailed(userId, this.bucketName, error); // Log de auditoria: falha.
            throw error; // Re-lança o erro para o serviço que chamou.
        }
    }

    /**
     * Deleta um objeto (arquivo) do bucket R2.
     * 
     * @param {string} key - A chave completa do objeto a ser deletado (ex: 'usr_.../file_...').
     * @throws {Error} Lança um erro se a operação de exclusão falhar.
     */
    async deleteFile(key) {
        storageEvents.fileDeletionRequested(null, key, this.bucketName, 'DELETE_REQUEST');
        try {
            const command = new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            });
            await this.s3.send(command);
            storageEvents.fileDeletionSuccess(key, this.bucketName); // Log de auditoria: sucesso.
        } catch (error) {
            storageEvents.fileDeletionFailed(key, this.bucketName, error); // Log de auditoria: falha.
            throw error; // Re-lança o erro.
        }
    }
}

// Exporta uma única instância (Singleton) do cliente para ser usada em toda a aplicação.
export const r2Client = new R2Client();