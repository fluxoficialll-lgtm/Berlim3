### 🌊 Fluxos (Flows)

Este diretório contém os orquestradores de lógica de alto nível para jornadas de usuário que envolvem múltiplos passos. Pense em um "Fluxo" como uma máquina de estados que guia o usuário através de um processo complexo, como um checkout, um onboarding ou a criação de conteúdo.

---

#### Padrão de Arquitetura

- **Responsabilidade**: Orquestrar chamadas de serviços, gerenciar estados temporários e navegar o usuário entre diferentes telas ou componentes.
- **Abstração**: Eles encapsulam a complexidade de um processo de negócios, permitindo que as páginas (views) permaneçam simples e focadas em exibir a UI.
- **Benefícios**: Isola a lógica de negócios crítica em um único lugar, tornando-a mais fácil de entender, testar e manter. Um fluxo não renderiza UI diretamente.

---

#### ✅ Arquivos Comentados

Esta é a lista de fluxos que foram revisados e extensivamente comentados para facilitar o entendimento.

- `marketplace/CheckoutFlow.tsx`: 🛍️ Orquestra o processo completo de compra, desde a detecção da moeda e disparo de pixels de marketing até a finalização do acesso ao produto/grupo.

---

#### Outros Fluxos Notáveis

- **`auth/OnboardingFlow.tsx`**: Guia o novo usuário através do processo de criação de conta e configuração inicial do perfil.
- **`groups/AccessValidationFlow.tsx`**: Valida se um usuário tem permissão para acessar um grupo, considerando status de membro, banimento, etc.
- **`content/CreationFlow.tsx`**: Gerencia a lógica para criar diferentes tipos de conteúdo (posts, enquetes, reels).
