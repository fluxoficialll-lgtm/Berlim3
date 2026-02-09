# Flows

Este diretório contém componentes que orquestram fluxos de usuário de várias etapas. Um "fluxo" é uma sequência de interações do usuário que o guia através de uma tarefa específica, como o processo de onboarding ou a finalização de uma compra.

## Propósito

Os componentes de fluxo gerenciam o estado e a lógica de navegação entre as diferentes etapas de um processo. Eles são particularmente úteis para tarefas complexas que não podem ser concluídas em uma única tela.

## Exemplos

- **`OnboardingFlow.tsx`**: Guia um novo usuário através das etapas iniciais de configuração do seu perfil.
- **`CheckoutFlow.tsx`**: Gerencia o processo de finalização de compra de um item no marketplace, desde a seleção do produto até a confirmação do pagamento.
- **`CreationFlow.tsx`**: Orquestra a criação de conteúdo, como uma postagem ou um reel, que pode envolver várias etapas (por exemplo, upload de mídia, adição de uma legenda, marcação de amigos, etc.).
