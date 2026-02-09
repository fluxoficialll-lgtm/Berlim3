### 🔗 Código Compartilhado (Shared)

Este diretório é um dos mais críticos e sensíveis em todo o projeto. Ele contém código que é **compartilhado e utilizado tanto pelo `backend` (Node.js) quanto pelo `frontend` (React/Browser)**. Uma mudança em qualquer arquivo aqui pode impactar a aplicação inteira.

---

#### 📜 A Regra de Ouro: Agnosticismo de Ambiente

O código neste diretório **DEVE** ser universal e agnóstico de ambiente. Isso significa que ele **NÃO PODE**, em hipótese alguma, depender de APIs que são exclusivas de um ambiente específico:

-   **NÃO PODE usar APIs do Node.js:** como `fs`, `path`, `http`, `crypto` (a versão do Node).
-   **NÃO PODE usar APIs do Navegador (Browser):** como `window`, `document`, `localStorage`, `fetch`.

O código aqui deve ser JavaScript puro ou TypeScript, focando em lógica, tipos e constantes que não têm dependências externas de ambiente.

---

#### O que pertence a este diretório?

Exemplos de código ideal para o diretório `shared/` incluem:

-   **Funções de Validação**: Lógica para validar formatos de dados, como `isValidEmail(email)` ou `isStrongPassword(password)`. Isso garante que as mesmas regras de validação sejam aplicadas tanto no cliente (antes de enviar um formulário) quanto no servidor (antes de salvar no banco de dados).

-   **Tipos e Interfaces (TypeScript)**: Se o projeto usa TypeScript, este é o lugar para definir os tipos de dados que são trocados entre o cliente e o servidor (ex: `User`, `Post`, `Group`). Isso garante consistência e segurança de tipos em toda a comunicação da API.

-   **Constantes Compartilhadas**: Valores estáticos que precisam ser conhecidos por ambos os ambientes. Por exemplo:
    -   `ROLES = { ADMIN: 'admin', MEMBER: 'member' }`
    -   `POST_CATEGORIES = ['Technology', 'Health', 'Finance']`

-   **Funções de Utilidade Puras**: Funções que manipulam dados ou strings de uma forma que é útil para ambos os lados, como `formatCurrency(value)` ou `slugify(text)`.

---

#### Instalação e Build

Este diretório tem seu próprio `package.json` para declarar suas dependências (se houver). O script `render-build.sh` na raiz do projeto garante que `npm install` seja executado dentro de `shared/` antes que os builds do `backend` e do `frontend` comecem. Isso assegura que o código compartilhado esteja disponível e pronto para ser importado por ambos.
