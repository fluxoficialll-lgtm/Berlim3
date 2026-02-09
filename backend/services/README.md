# Serviços (Services)

Este diretório contém a lógica de negócios da aplicação. Os serviços são responsáveis por orquestrar as operações, manipular os dados e executar a lógica principal da aplicação.

## Padrão de Arquitetura

- Os **Controladores** (`controllers`) recebem as requisições e chamam os métodos de serviço apropriados.
- Os **Serviços** (`services`) contêm a lógica de negócios. Eles interagem com os **Repositórios** (`repositories`) para acessar e persistir dados.
- Os **Repositórios** (`repositories`) encapsulam a lógica de acesso ao banco de dados.

Essa separação de responsabilidades torna o código mais organizado, reutilizável e fácil de testar.

## Exemplos

- **`authService.js`**: Contém a lógica de negócios para autenticação, como verificar senhas, gerar tokens JWT e lidar com o registro de novos usuários.
- **`postService.js`**: Contém a lógica para criar, editar, excluir e recuperar postagens. Pode incluir funcionalidades como validação de conteúdo, processamento de imagens, etc.
