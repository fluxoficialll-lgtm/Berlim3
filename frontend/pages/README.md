# Páginas (Pages)

Este diretório contém os componentes de nível superior que representam as diferentes páginas da aplicação. Cada arquivo neste diretório corresponde a uma rota específica na aplicação.

## Estrutura

As páginas são responsáveis por compor a interface do usuário de uma rota específica, utilizando componentes menores e mais reutilizáveis (localizados em `components`, `features`, etc.) para construir a UI.

As páginas também são o local onde os dados são geralmente buscados (muitas vezes usando os `hooks` da pasta `hooks`) e passados para os componentes filhos.

## Exemplos

- **`Feed.tsx`**: A página principal do feed de notícias, que exibe uma lista de postagens.
- **`Profile.tsx`**: A página de perfil do usuário.
- **`Login.tsx`**: A página de login da aplicação.
- **`Settings.tsx`**: A página de configurações do usuário.
