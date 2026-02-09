# Banco de Dados (Database)

Este diretório é responsável por toda a interação com o banco de dados. Ele abstrai a lógica de acesso aos dados do resto da aplicação.

## Componentes

- **`RepositoryHub.js`**: Um hub que centraliza o acesso a todos os repositórios, facilitando a injeção de dependências e os testes.
- **`SchemaBootstrapper.js`**: Responsável por inicializar e registrar os esquemas do Mongoose.
- **`TransactionOrchestrator.js`**: Orquestra transações de banco de dados, garantindo a atomicidade das operações.
- **`dataHub.js`**: Um hub de dados para gerenciar o acesso a diferentes fontes de dados.
- **`databaseManager.js`**: Gerencia as conexões e configurações do banco de dados.
- **`pool.js`**: Gerencia um pool de conexões com o banco de dados (relevante para bancos de dados SQL).
- **`schema.ts`**: Define os esquemas do banco de dados (usando TypeScript).
