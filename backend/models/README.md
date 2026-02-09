# Modelos (Models)

Este diretório contém os modelos de dados da aplicação, que são definidos usando o Mongoose, uma biblioteca de Modelagem de Dados de Objeto (ODM) para o MongoDB.

## O que são Modelos?

Os modelos são responsáveis por criar e ler documentos do banco de dados MongoDB. Cada arquivo de modelo corresponde a uma coleção no banco de dados e define o esquema para os documentos dentro dessa coleção.

O esquema define a estrutura dos documentos, os tipos de dados, os validadores, os valores padrão, etc.

## Exemplos

- **`UserModel.js`**: Define o esquema para os documentos de usuário, incluindo campos como nome de usuário, email, senha (hash), etc.
- **`PostModel.js`**: Define o esquema para as postagens, com campos como título, conteúdo, autor, data de criação, etc.
