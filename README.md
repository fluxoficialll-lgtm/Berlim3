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

### 📚 Documentação Adicional
Para detalhes mais aprofundados sobre cada parte do projeto, consulte os arquivos `README.md` específicos dentro das pastas `/frontend` e `/backend`.