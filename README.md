<!-- Visão Geral -->
<div align="center">
  <h1>Aplicação Web Full-Stack</h1>
  <p>Projeto completo dividido em <b>frontend (cliente)</b> e <b>backend (servidor)</b>, ambos construídos com JavaScript e TypeScript.</p>
</div>

---

### 📁 `/frontend` (Cliente)
Interface do usuário construída com **React** e **Vite**. É a parte da aplicação que roda no navegador do usuário, responsável pela apresentação visual, interatividade e consumo da API do backend.

### 📁 `/backend` (Servidor)
API RESTful construída com **Node.js** e **Express**. É o cérebro da aplicação, responsável por processar dados, gerenciar a lógica de negócios, conectar-se ao banco de dados e fornecer os dados para o cliente.

---

### ⚙️ Pré-requisitos
- **Node.js**: Versão `v20` ou superior.
- **npm**: Instalado (geralmente vem com o Node.js).
- **Variáveis de Ambiente**: Arquivo `.env` configurado na raiz (para desenvolvimento local).

---

### 🚀 Instalação e Execução

1. **Instalar Dependências (Ambos)**:
   ```bash
   # Instala pacotes do backend
   npm install --prefix backend
   
   # Instala pacotes do frontend
   npm install --prefix frontend
   ```

2. **Executar em Modo de Desenvolvimento**:
   No diretório raiz do projeto, execute o comando abaixo para iniciar ambos os servidores (backend e frontend) simultaneamente com `concurrently`.
   ```bash
   npm run dev
   ```
   - O backend estará rodando em `http://localhost:3000` (ou na porta definida em `.env`).
   - O frontend estará acessível em `http://localhost:5173` (padrão do Vite).

---

## 📦 Dependências do Projeto

Esta seção detalha as bibliotecas e ferramentas utilizadas em cada parte do projeto.

### 🎨 Frontend (`/frontend`)

#### Framework e UI
- **React**: Biblioteca principal para construir a interface.
- **React DOM**: Renderiza os componentes React no navegador.
- **React Router DOM**: Para navegação e roteamento entre páginas.

#### Build e Ferramentas
- **Vite**: Ferramenta de build moderna e rápida para desenvolvimento.
- **TypeScript**: Adiciona tipagem estática ao JavaScript para maior segurança.
- **Vite TSConfig Paths**: Permite o uso de caminhos de importação absolutos.

#### Estilização
- **Tailwind CSS**: Framework de CSS utility-first para estilização rápida.
- **PostCSS / Autoprefixer**: Processadores de CSS para compatibilidade entre navegadores.

#### Comunicação e API
- **Axios**: Cliente HTTP para fazer requisições à API do backend.
- **Socket.IO Client**: Para comunicação em tempo real via WebSockets.

#### Utilitários
- **QRCode.react**: Componente para gerar QR codes.
- **React Virtuoso**: Para renderizar listas grandes e performáticas.

#### Mobile (Capacitor)
- **Capacitor Core/App**: Base para transformar o app web em um app nativo.
- **Capacitor Push Notifications**: Para receber notificações push em dispositivos móveis.
- **Privacy Screen**: Plugin para proteger a tela contra capturas.

---

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

---

### 📚 Documentação Adicional
Para detalhes mais aprofundados sobre cada parte do projeto, consulte os arquivos `README.md` específicos dentro das pastas `/frontend` e `/backend` (se existirem).