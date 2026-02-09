# Hooks

Este diretório contém os custom hooks reutilizáveis do React. Os hooks são uma forma de extrair e reutilizar a lógica de um componente, tornando o código mais limpo, organizado e fácil de manter.

## Propósito

Os custom hooks encapsulam a lógica de estado e efeitos colaterais, permitindo que múltiplos componentes compartilhem a mesma funcionalidade sem duplicar código. Eles geralmente são nomeados com o prefixo `use` (por exemplo, `useAuth`, `useFeed`).

## Exemplos

- **`useAuth.ts`**: Hook para gerenciar o estado de autenticação do usuário, expondo informações como o usuário atual, status de login e funções para fazer login/logout.
- **`useFeed.ts`**: Hook para buscar e gerenciar os dados do feed de postagens.
- **`useChat.ts`**: Hook para lidar com a lógica de comunicação em tempo real do chat.
