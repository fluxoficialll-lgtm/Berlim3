### 🕹️ Controladores (Controllers)

Este diretório contém os controladores da aplicação, que são responsáveis por:

- **Receber** requisições da web.
- **Interagir** com os serviços e modelos de dados.
- **Enviar** uma resposta final ao cliente.

---

#### ✅ Arquivos Comentados

Esta é uma lista de arquivos nesta pasta que foram revisados e extensivamente comentados para facilitar o entendimento e a depuração.

- `authController.js`

---

#### Padrão de Arquitetura

- **Organização:** Cada arquivo corresponde a um conjunto de rotas relacionadas (ex: `authController.js` para autenticação).
- **Delegação:** A lógica de negócios complexa é delegada aos **serviços** (no diretório `services`), mantendo os controladores mais limpos.

---

#### 📜 Regras e Diretrizes

- **NÃO** colocar lógica de negócios nos controladores.
- **DELEGAR** toda a manipulação de dados para os `services`.
- **MANTER** os controladores focados em receber requisições e enviar respostas.
- **TRATAR** erros de forma consistente, usando um middleware de erro.