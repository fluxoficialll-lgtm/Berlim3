━━━━━━━━━━━━━━━━━━━━━━
💻 Backend — Servidor

Este é o servidor da aplicação Flux.
→ É a API REST
→ Processa todas as regras de negócio
→ Conecta-se ao banco de dados (PostgreSQL)
→ Garante a segurança e a integridade dos dados

━━━━━━━━━━━━━━━━━━━━━━
🛠️ Tecnologias Principais

→ Node.js (Runtime JavaScript)
→ Express (Framework para a API)
→ Prisma (ORM para interagir com o banco de dados)
→ TypeScript (Linguagem com tipagem estática)

━━━━━━━━━━━━━━━━━━━━━━
📁 Estrutura de Pastas

→ /prisma
→ Contém o schema do banco de dados e migrações.

→ /src
→ Contém todo o código-fonte da aplicação.

→ /src/controllers
→ Recebe as requisições HTTP e envia as respostas.

→ /src/routes
→ Define as rotas da API e as associa aos controllers.

→ /src/services
→ Contém a lógica de negócio principal da aplicação.

→ /src/repositories
→ Camada de acesso aos dados, interage com o Prisma.

━━━━━━━━━━━━━━━━━━━━━━
⚠️ Pré-requisitos

→ Node.js ≥ 20
→ npm instalado
→ Docker e Docker Compose (para o banco de dados)
→ Arquivo .env configurado na pasta `backend`.

━━━━━━━━━━━━━━━━━━━━━━
▶️ Instalação e Execução

📥 Instalar dependências:
→ npm install --prefix backend

🏦 Iniciar o banco de dados (com Docker):
→ cd backend
→ npm run db:up

▶️ Executar em modo de desenvolvimento:
→ cd backend
→ npm run dev

→ O servidor estará disponível em:
→ http://localhost:3000

━━━━━━━━━━━━━━━━━━━━━━