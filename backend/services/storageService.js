
// ☁️ Este serviço é a camada de abstração para o armazenamento de objetos.
// Ele gerencia o upload e a exclusão de arquivos no Cloudflare R2, utilizando a API compatível com S3.

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';
import path from 'path';

/**
 * Cliente S3 configurado para apontar para o endpoint do Cloudflare R2.
 * Todas as credenciais e configurações são carregadas a partir de variáveis de ambiente.
 */
const r2Client = new S3Client({
    region: "auto", // R2 usa "auto" como região.
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});

export const storageService = {
    /**
     * @name uploadFile
     * @description Realiza o upload de um arquivo para uma "pasta" específica no Cloudflare R2.
     * @param {Object} file - O objeto do arquivo, geralmente vindo de um middleware como o Multer (contém `buffer`, `originalname`, `mimetype`).
     * @param {string} [folder='misc'] - A pasta de destino (prefixo do S3) onde o arquivo será armazenado.
     * @returns {Promise<string|null>} A URL pública do arquivo upado ou null se o arquivo for inválido.
     */
    async uploadFile(file, folder = 'misc') {
        if (!file || !file.buffer) return null;

        const fileExtension = path.extname(file.originalname);
        // Gera um nome de arquivo único usando UUID para evitar colisões e ofuscar nomes originais.
        const fileName = `${crypto.randomUUID()}${fileExtension}`;
        
        // Cria a "chave" completa do objeto, que funciona como o caminho do arquivo no bucket.
        const cleanFolder = folder.replace(/\/$/, ''); // Remove a barra final da pasta, se houver.
        const key = `${cleanFolder}/${fileName}`;
        
        const bucketName = process.env.R2_BUCKET_NAME;
        // Permite o uso de um domínio público personalizado (ex: cdn.meusite.com) para servir os arquivos.
        const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, '');

        const params = {
            Bucket: bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        try {
            // Envia o comando de upload para o R2.
            await r2Client.send(new PutObjectCommand(params));
            
            // Constrói a URL final de acesso ao arquivo.
            if (publicUrl) {
                return `${publicUrl}/${key}`;
            }
            
            // Se não houver URL pública customizada, usa o formato padrão do R2.
            return `https://${bucketName}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
        } catch (error) {
            console.error("❌ [R2 Upload Error]:", error);
            throw new Error("Falha ao fazer upload do arquivo para a nuvem.");
        }
    },

    /**
     * @name deleteFile
     * @description Remove um arquivo do bucket do R2 a partir de sua URL pública completa.
     * @param {string} fileUrl - A URL completa do arquivo a ser deletado.
     */
    async deleteFile(fileUrl) {
        if (!fileUrl || typeof fileUrl !== 'string') return;
        
        try {
            const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, '');
            const bucketName = process.env.R2_BUCKET_NAME;
            let key = '';

            // Engenharia reversa: Extrai a chave do objeto (caminho/arquivo.ext) a partir da URL pública.
            // Isso torna a função mais fácil de usar, pois o chamador não precisa conhecer a estrutura interna do bucket.
            if (publicUrl && fileUrl.includes(publicUrl)) {
                key = fileUrl.split(`${publicUrl}/`)[1];
            } else {
                // Fallback para extrair a chave da URL padrão do R2.
                const parts = fileUrl.split('.com/');
                if (parts.length > 1) key = parts[1];
            }

            if (!key) return; // Se não conseguiu extrair a chave, não faz nada.

            console.log(`🗑️ Removendo do storage: ${key}`);

            await r2Client.send(new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key
            }));
        } catch (error) {
            console.error("❌ [R2 Delete Error]:", error.message);
            // ‼️ Decisão de Arquitetura: A falha na exclusão de um arquivo é registrada, mas o erro não é propagado.
            // Isso evita que o fluxo principal da aplicação (ex: deletar um post) seja interrompido se o R2 estiver indisponível.
            // A consequência é a possibilidade de existirem "arquivos órfãos" no bucket.
        }
    }
};
