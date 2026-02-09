### 💾 Camada de Acesso ao Banco de Dados

Este diretório contém a espinha dorsal de toda a persistência de dados da aplicação. Ele é responsável por gerenciar conexões, executar consultas e garantir a integridade dos dados através de transações. Nenhum outro lugar na aplicação (exceto os `repositories`) deve interagir diretamente com o banco de dados.

---

#### Arquitetura e Componentes Principais

A interação com o banco de dados PostgreSQL é orquestrada por um conjunto de componentes especializados que trabalham em conjunto:

1.  **`pool.js`**: No nível mais baixo, este arquivo cria e gerencia um *pool* de conexões com o PostgreSQL. Manter um pool é crucial para a performance, pois reutiliza conexões abertas, evitando o custo de estabelecer uma nova conexão a cada consulta.

2.  **`databaseManager.js`**: Atua como um guardião do pool. Ele fornece uma interface simples e segura para outras partes do sistema obterem uma conexão (`getClient()`) e a liberarem de volta para o pool. Ele também está integrado ao nosso sistema de log de auditoria, registrando eventos importantes do banco de dados.

3.  **`TransactionOrchestrator.js`**: Este é um dos componentes mais críticos. Ele fornece métodos para executar operações complexas dentro de uma transação de banco de dados (`BEGIN`, `COMMIT`, `ROLLBACK`). **Qualquer operação que precise modificar múltiplas tabelas de forma atômica DEVE usar o orquestrador** para garantir que, se uma parte da operação falhar, todas as outras sejam desfeitas, evitando inconsistências nos dados.

4.  **`RepositoryHub.js`**: Serve como uma fachada ou um ponto de acesso centralizado para todos os `repositories`. Quando um serviço precisa acessar dados, ele interage com o `RepositoryHub`, que por sua vez utiliza os repositórios corretos. Os repositórios, então, usam o `databaseManager` para executar suas consultas.

---

#### Fluxo de uma Operação de Banco de Dados

1.  Um **`Service`** (ex: `groupService`) precisa criar um grupo e seu primeiro membro.
2.  Ele chama uma função no **`TransactionOrchestrator`** para iniciar uma transação.
3.  Dentro da transação, ele utiliza o **`RepositoryHub`** para acessar o `groupRepository` e o `memberRepository`.
4.  Cada **`Repository`** usa o **`databaseManager`** para obter um cliente de conexão do pool.
5.  As consultas SQL são executadas. Se tudo ocorrer bem, a transação sofre `COMMIT`. Se um erro ocorrer, um `ROLLBACK` é acionado automaticamente.

---

#### 📜 Regras e Diretrizes

-   **SEMPRE** use o `TransactionOrchestrator` para operações que envolvam mais de uma escrita (INSERT, UPDATE, DELETE) para garantir atomicidade.
-   **NUNCA** chame o `pool.js` diretamente de fora desta pasta. Sempre passe pelo `databaseManager`.
-   A camada de `services` deve, preferencialmente, interagir com os `repositories` através do `RepositoryHub`, e não instanciar repositórios diretamente.
