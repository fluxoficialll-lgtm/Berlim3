# Rotas (Routes)

Este diretório contém os arquivos de definição de rotas para a aplicação Express. As rotas determinam como a aplicação responde a uma requisição de cliente para um endpoint específico (um URI e um método de requisição HTTP específico).

## Estrutura

Cada arquivo neste diretório geralmente corresponde a um recurso ou a uma área funcional da aplicação. Por exemplo:

- **`authRoutes.js`**: Define as rotas para autenticação, como `POST /api/auth/login`, `POST /api/auth/register`.
- **`postRoutes.js`**: Define as rotas para as postagens, como `GET /api/posts`, `POST /api/posts`, `GET /api/posts/:id`.

As rotas são responsáveis por:

1.  Definir o caminho (endpoint) e o método HTTP (GET, POST, PUT, DELETE, etc.).
2.  Associar um ou mais middlewares para executar tarefas antes do controlador final (por exemplo, validação de entrada, autenticação).
3.  Vincular a rota a uma função de controlador (do diretório `controllers`) que conterá a lógica para lidar com a requisição.
