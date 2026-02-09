### 🗺️ Rotas da API (Routes)

Este diretório é o **ponto de entrada** e o mapa completo de toda a nossa API REST. Ele define cada endpoint (URL), especifica os verbos HTTP associados (GET, POST, PATCH, etc.) e direciona cada requisição para o `controller` apropriado que executará a lógica de negócios.

---

#### Arquitetura e Padrão de Agregação

A estrutura de rotas segue um padrão de **agregação centralizada** para máxima organização:

1.  **Rotas por Recurso**: Cada recurso principal da aplicação (ex: `users`, `posts`, `groups`) tem seu próprio arquivo de rota (ex: `userRoutes.js`, `postRoutes.js`). Isso mantém o código limpo e desacoplado.

2.  **Agregador Central (`index.js`)**: O arquivo `index.js` atua como o cérebro deste diretório. Ele importa todos os arquivos de rota individuais e os monta em um roteador principal do Express. Este roteador é então exportado para ser usado no `server.js`, que expõe a API para o mundo.

Este padrão permite que a API seja facilmente expandida: para adicionar um novo conjunto de endpoints, basta criar um novo arquivo de rota e registrá-lo no `index.js`.

---

#### Principais Recursos da API

- **`authRoutes.js`**: Endpoints para registro, login, e gerenciamento de sessões.
- **`userRoutes.js`**: Operações relacionadas a perfis de usuário, configurações e dados.
- **`postRoutes.js`**: CRUD para postagens, incluindo comentários e interações.
- **`groupRoutes.js`**: Gerenciamento completo de grupos (criação, membros, permissões).
- **`marketplaceRoutes.js`**: Lógica para listagem, compra e venda de produtos.
- **`financialRoutes.js`**: Endpoints para processamento de pagamentos e dados financeiros.
- **`adminRoutes.js`**: Rotas protegidas para tarefas administrativas e de moderação.
- **`...e muitos outros`**: A API é extensa; consulte os nomes dos arquivos para encontrar recursos específicos.

---

#### Exemplo de Definição de Rota

```javascript
// Exemplo dentro de `userRoutes.js`

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Rota para buscar o perfil do usuário autenticado
// GET /api/users/profile
router.get('/profile', isAuthenticated, userController.getUserProfile);

// A requisição primeiro passa pelo middleware `isAuthenticated`.
// Se o token for válido, a execução continua para `userController.getUserProfile`.

module.exports = router;

```
