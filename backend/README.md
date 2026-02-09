### 🖥️ Backend (`/backend`)

#### Framework e Servidor
- **Express**: Framework web minimalista para criar a API.
- **CORS**: Habilita o Cross-Origin Resource Sharing para o frontend.
- **Dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.

#### Banco de Dados
- **Mongoose**: ODM (Object Data Modeling) para interagir com o MongoDB.
- **PG (node-postgres)**: Driver para conectar e consultar bancos de dados PostgreSQL.
- **ioredis**: Cliente Redis para caching e gerenciamento de sessões.

#### Segurança e Autenticação
- **BCrypt.js**: Para hashing de senhas.
- **JSON Web Token (JWT)**: Para criar tokens de autenticação seguros.
- **Helmet / HPP / XSS**: Middlewares para proteger a aplicação contra vulnerabilidades web comuns.
- **Express Rate Limit**: Limita a taxa de requisições para prevenir ataques de força bruta.
- **Google Auth Library**: Para autenticação com contas Google.

#### APIs e Serviços Externos
- **AWS SDK (S3)**: Para upload e gerenciamento de arquivos em S3-compatibles (como Cloudflare R2).
- **Google GenAI / Vision**: Para integração com serviços de IA do Google.
- **Firebase Admin/Functions**: Para gerenciar serviços do Firebase.
- **Nodemailer**: Para envio de e-mails (ex: recuperação de senha, notificações).

#### Utilitários e Ferramentas
- **Multer**: Middleware para lidar com upload de arquivos (`multipart/form-data`).
- **Zod**: Para validação de esquemas e dados.
- **Winston**: Para um sistema de logging robusto.
- **Compression**: Middleware para comprimir as respostas HTTP (melhora a performance).
- **Concurrently**: Para rodar múltiplos comandos (como o frontend e backend) ao mesmo tempo.