### ⚙️ Configuração

Este diretório contém os arquivos de configuração para o backend da aplicação.

---

#### Arquivos Principais

- **`authConfig.js`**: 🔑 Autenticação, segredos de token e estratégias.
- **`db.js`**: 💾 Conexão com o banco de dados (strings, pools).
- **`env.js`**: 🌳 Gerenciamento de variáveis de ambiente.
- **`firebaseAdmin.js`**: 🔥 Configuração do SDK do Firebase Admin.
- **`logger.js`**: 📝 Sistema de logs (níveis, destinos).
- **`middleware.js`**: 🔗 Middlewares do Express.
- **`socket.js`**: 🔌 Configuração do Socket.IO.
- **`storage.js`**: 📦 Armazenamento de arquivos (S3, GCS).

---

#### 📜 Regras e Diretrizes

- **NÃO** commitar dados sensíveis (senhas, chaves de API).
- **USAR** variáveis de ambiente (`.env`) para todas as chaves e segredos.
- **MANTER** as configurações modulares e bem documentadas.
- **COMENTAR** cada variável de configuração para explicar seu propósito.