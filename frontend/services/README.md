# Serviços (Services)

Este diretório contém a lógica de comunicação com APIs externas e outros serviços de backend. Ele abstrai os detalhes de como os dados são buscados e enviados, fornecendo uma API limpa para o resto da aplicação (principalmente para os `hooks` e `pages`).

## Responsabilidades

- **Comunicação com a API**: Encapsular a lógica para fazer requisições HTTP para o backend (por exemplo, usando `axios` ou `fetch`).
- **Gerenciamento de Dados**: Lidar com a formatação e o processamento dos dados recebidos da API antes de serem entregues à aplicação.
- **Abstração de Serviços Externos**: Fornecer uma interface consistente para interagir com serviços de terceiros (por exemplo, Stripe para pagamentos, Firebase para notificações).

## Estrutura

A pasta `services` pode ser dividida em subdiretórios com base na funcionalidade, como `auth`, `posts`, `notifications`, etc. Ela também pode conter uma pasta `mocks` para simular os serviços durante os testes ou desenvolvimento offline.
