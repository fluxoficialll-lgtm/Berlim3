# Middlewares

Este diretório contém os middlewares do Express utilizados na aplicação.

## O que são Middlewares?

Middlewares são funções que têm acesso ao objeto de requisição (`req`), ao objeto de resposta (`res`) e à próxima função de middleware no ciclo de requisição-resposta da aplicação. Eles podem executar tarefas como:

- Executar qualquer código.
- Fazer alterações nos objetos de requisição and resposta.
- Encerrar o ciclo de requisição-resposta.
- Chamar o próximo middleware na pilha.

## Arquivos Principais

- **`errorMiddleware.js`**: Um middleware de tratamento de erros para capturar e processar erros que ocorrem nos controladores e serviços.
- **`index.js`**: Ponto de entrada para exportar todos os middlewares, facilitando a importação em outras partes da aplicação.
