### 🧱 Modelos (Models)

Este diretório contém os modelos de dados da aplicação, definidos com o Mongoose (ODM para MongoDB).

---

#### O que são Modelos?

Modelos são responsáveis por criar e ler documentos do MongoDB. Cada modelo:

- **Corresponde** a uma coleção no banco de dados.
- **Define** o esquema dos documentos, incluindo estrutura, tipos de dados, validadores e valores padrão.

---

#### Exemplos

- **`UserModel.js`**: 👤 Define o esquema para usuários (nome, email, senha, etc.).
- **`PostModel.js`**: 📝 Define o esquema para postagens (título, conteúdo, autor, etc.).

---

#### 📜 Regras e Diretrizes

- **DEFINIR** todos os campos do schema com tipos de dados explícitos.
- **UTILIZAR** os validadores do Mongoose sempre que possível.
- **ADICIONAR** `timestamps: true` para rastrear `createdAt` and `updatedAt`.
- **NÃO** colocar lógica de negócios complexa nos métodos do modelo.