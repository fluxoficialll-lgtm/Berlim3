### 💾 Repositórios (Repositories)

Este diretório implementa o **Padrão de Repositório**, que serve como uma camada de abstração crucial entre a lógica de negócios (`services`) e a camada de acesso ao banco de dados (`database`). O objetivo é encapsular toda a lógica de acesso a dados, como consultas SQL, em um só lugar.

---

#### Arquitetura e Fluxo de Dados

-   **Responsabilidade Principal**: Fornecer métodos claros e bem definidos para operações de dados (CRUD - Criar, Ler, Atualizar, Deletar). Por exemplo, `userRepository.findById(id)` ou `groupRepository.addMember(groupId, userId)`.

-   **Abstração de Complexidade**: A camada de `services` consome esses métodos sem precisar saber nada sobre a estrutura do banco de dados ou a sintaxe SQL. O `service` pede *o quê* precisa, e o repositório sabe *como* buscar.

-   **Conexão com a Camada Inferior**: Os repositórios **não** se conectam diretamente ao banco. Em vez disso, eles utilizam os componentes da pasta `database/`:
    1.  **Obtêm uma Conexão**: Usam o `databaseManager.getClient()` para pegar um cliente de conexão do pool.
    2.  **Executam Consultas**: Realizam as operações SQL necessárias.
    3.  **Operam em Transações**: Os métodos dos repositórios são projetados para serem executados dentro de transações controladas pelo `TransactionOrchestrator`. O `service` inicia a transação, e os repositórios executam suas operações dentro desse contexto seguro.

-   **Ponto de Acesso**: Os `services` não instanciam repositórios diretamente. Em vez disso, eles os acessam através do `RepositoryHub`, que garante que uma única instância de cada repositório seja usada em toda a aplicação.

---

#### 📜 Regras de Ouro

1.  **TODA** a comunicação com o banco de dados deve passar por um repositório.
2.  **SERVIÇOS** devem depender de repositórios, e não acessar o `databaseManager` ou escrever SQL diretamente.
3.  **REPOSITÓRIOS** focam em operações de dados. Eles **NÃO** devem conter lógica de negócios (validações complexas, orquestração de múltiplas etapas, etc.). Essa lógica pertence aos `services`.
4.  **REPOSITÓRIOS NÃO GERENCIAM TRANSAÇÕES**. Eles simplesmente executam consultas. A responsabilidade de iniciar, comitar ou reverter uma transação é da camada de `service`, usando o `TransactionOrchestrator`.

---

#### Exemplos de Repositórios

-   **`userRepository.js`**: 👤 Contém métodos para CRUD de usuários (`findById`, `findByEmail`, `createUser`).
-   **`groupRepository.js`**: 👥 Métodos para gerenciar grupos (`createGroup`, `findGroupById`, `addMember`).
-   **`financial/`**: Subdiretório com repositórios para dados financeiros (ex: `stripeRepository.js`).
-   **`ranking/`**: Subdiretório com lógica de repositório para os diversos rankings da plataforma.
