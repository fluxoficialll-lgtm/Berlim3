### 🧠 Serviços do Frontend (Services)

Este diretório é o **cérebro** da aplicação frontend. Ele contém os módulos responsáveis pela lógica de negócios, comunicação com o backend e APIs externas, gerenciamento de estado complexo e funcionalidades centrais. O código aqui é projetado para ser totalmente desacoplado e independente da camada de UI (React).

---

#### 🏛️ Arquitetura Principal: Injeção de Dependência (Real vs. Mock)

A principal estratégia arquitetônica deste diretório é a **injeção de dependência**, que nos permite alternar entre implementações reais e mockadas dos serviços. Isso é crucial para o desenvolvimento e os testes.

-   **`services/real/`**: Contém as implementações **reais** dos serviços. Módulos aqui (ex: `real/authService.ts`) fazem chamadas de API de verdade para o nosso backend, interagem com serviços como Stripe e PayPal, e executam a lógica de negócios de produção.

-   **`services/mocks/`**: Contém implementações **falsas (mockadas)** dos serviços. Módulos aqui (ex: `mocks/authService.ts`) simulam o comportamento da API, retornando dados estáticos e respostas previsíveis. Isso nos permite desenvolver e testar a UI sem depender de um backend funcional.

Um arquivo de nível superior (ex: `services/authService.ts`) é geralmente responsável por exportar a implementação apropriada com base em uma variável de ambiente, permitindo a troca fácil entre os modos.

---

#### Subsistemas Críticos

Dentro de `services/`, existem vários subsistemas que encapsulam as funcionalidades mais complexas da aplicação:

-   **`services/ai/`**: Orquestra a interação com provedores de Inteligência Artificial (como o Gemini), gerenciando prompts, respostas e o uso de tokens.
-   **`services/ads/`**: Contém o motor completo do nosso sistema de anúncios, incluindo leilões (`AdAuctionEngine`), pacing e lógica de targeting.
-   **`services/pixel/`**: Gerencia o rastreamento de eventos de marketing (Meta Pixel, etc.). O `PixelOrchestrator` é a peça central, decidindo se um evento deve ser enviado pelo navegador (client-side) ou pelo nosso servidor (server-side/CAPI).
-   **`services/sync/`**: Lida com a sincronização de estado e a hidratação inicial da aplicação. O `HydrationManager` garante que dados críticos sejam carregados antes de a UI ser renderizada.

---

#### Padrão de Uso

-   **Consumo via Hooks**: A camada de UI (componentes React) **NÃO** deve importar serviços diretamente. Em vez disso, ela deve usar `hooks` (do diretório `frontend/hooks/`) que consomem os serviços e expõem os dados e as funções de uma maneira reativa.
-   **Instâncias Singleton**: A maioria dos serviços é exportada como uma instância única (singleton) para garantir um estado consistente em toda a aplicação.

---

#### ✅ Arquivos-Chave Comentados

Esta é uma lista de serviços que foram revisados e extensivamente comentados. **Comece por aqui** para entender os fluxos mais importantes:

-   `pixel/PixelOrchestrator.ts`: 🏛️ Torre de controle para todos os eventos de rastreamento. Gerencia deduplicação e roteamento inteligente (Browser vs. CAPI).
-   `ads/engine/AdAuctionEngine.ts`: 🤖 Motor do sistema de publicidade. Executa um leilão para decidir qual anúncio exibir.
-   `sync/HydrationManager.ts`: 💧 Garante que a aplicação só seja exibida ao usuário após o carregamento completo dos dados críticos.
