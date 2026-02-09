### 🎣 Hooks Customizados do React

Este diretório contém todos os hooks customizados do React (`use...`), que são a principal ferramenta no nosso frontend para encapsular e reutilizar lógica de estado e efeitos colaterais. Eles servem como a **ponte essencial** entre a camada de UI (componentes) e a camada de lógica de negócios (`services`).

---

#### 🏛️ Papel na Arquitetura

Na nossa arquitetura, os hooks são a camada de tradução que conecta o mundo reativo do React com o mundo da lógica de negócios pura. O fluxo é sempre o seguinte:

**Componente (em `features/` ou `pages/`) -> Hook (em `hooks/`) -> Serviço (em `services/`)**

-   **Componentes**: São responsáveis pela apresentação (UI). Eles chamam hooks para obter dados e funções.
-   **Hooks**: Consomem os `services`, gerenciam o estado da requisição (loading, error, data), e expõem essa informação de forma reativa para a UI.
-   **Serviços**: Executam a lógica de negócios pesada, como chamadas de API, sem se preocupar com o ciclo de vida do React.

Esta separação garante que nossa lógica de negócios seja independente da UI, e que nossos componentes permaneçam limpos e focados na renderização.

---

#### Categorias de Hooks

-   **Busca de Dados**: Hooks que encapsulam chamadas de API. Ex: `useUserProfile(userId)`.
-   **Gerenciamento de Estado Local**: Hooks para lógicas de estado complexas que são reutilizadas em vários componentes. Ex: `useToggle(initialState)`.
-   **Assinaturas em Tempo Real**: Hooks que abrem e fecham conexões de websocket ou outras conexões em tempo real. Ex: `useDatabaseSubscription`.
-   **Interação com Browser APIs**: Hooks que abstraem o uso de APIs do navegador. Ex: `useLocalStorage(key)`.

---

#### ✅ Hooks-Chave Comentados

Esta é a lista de hooks que foram revisados e extensivamente comentados. **Comece por aqui** para entender os fluxos mais importantes:

- `useAuth.ts`: 🎣 Gerencia todo o fluxo de autenticação do cliente, incluindo estados de loading, erros e a lógica complexa de redirecionamento pós-login.
- `useDatabaseSubscription.ts`: 📡 Cria uma conexão em tempo real segura entre um componente e o banco de dados, gerenciando automaticamente o ciclo de vida da inscrição para evitar memory leaks.
