# Rotas (Routes)

Este diretório contém a configuração de roteamento da aplicação, utilizando o `react-router-dom` para definir como as diferentes URLs correspondem aos componentes de página (`pages`).

## Arquivo Principal

- **`AppRoutes.tsx`**: Este é o arquivo central que define todas as rotas da aplicação. Ele mapeia cada caminho de URL para o componente de página correspondente.

## Sub-rotas

Dentro da pasta `modules`, as rotas podem ser divididas em arquivos menores e mais gerenciáveis, agrupados por funcionalidade (por exemplo, `AuthRoutes.tsx`, `FeedRoutes.tsx`, `GroupRoutes.tsx`). Isso ajuda a manter o arquivo `AppRoutes.tsx` principal mais limpo e organizado.

## Rotas Protegidas

O sistema de roteamento também é responsável por implementar rotas protegidas, que só podem ser acessadas por usuários autenticados. Isso geralmente é feito criando um componente `ProtectedRoute` que verifica o estado de autenticação antes de renderizar a página solicitada.
