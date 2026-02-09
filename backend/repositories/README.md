# Repositórios (Repositories)

Este diretório implementa o padrão de repositório, que é uma camada de abstração entre a lógica de negócios e as fontes de dados.

## Responsabilidade

Os repositórios são responsáveis por encapsular a lógica de consulta e persistência de dados. Eles fornecem uma interface clara para a camada de serviço acessar e manipular os dados, sem se preocupar com os detalhes de implementação do banco de dados (por exemplo, se estamos usando Mongoose, um cliente SQL, etc.).

Isso torna a aplicação mais modular, mais fácil de testar (pois os repositórios podem ser mockados) e mais fácil de manter.

## Exemplos

- **`userRepository.js`**: Contém métodos para consultar e manipular dados de usuários, como `findById`, `findByEmail`, `createUser`, `updateUser`, etc.
- **`postRepository.js`**: Contém métodos para gerenciar postagens, como `createPost`, `findPostsByUser`, `getFeed`, etc.
