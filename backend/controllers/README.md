# Controladores (Controllers)

Este diretório contém os controladores da aplicação. Os controladores são responsáveis por receber as requisições da web, interagir com os serviços e modelos de dados e, finalmente, enviar uma resposta ao cliente.

## Padrão de Arquitetura

Cada arquivo neste diretório geralmente corresponde a uma rota ou a um conjunto de rotas relacionadas. Por exemplo, `authController.js` lida com a lógica de autenticação, como login, registro e logout.

Os controladores devem manter a lógica de negócios mínima e delegar tarefas complexas para os **serviços** (localizados no diretório `services`).
