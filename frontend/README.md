### 🎨 Frontend (`/frontend`)

Este diretório contém toda a estrutura do frontend da aplicação, construído com React e Vite. Abaixo estão as principais tecnologias e diretrizes.

#### Framework e UI
- **React**: Biblioteca principal para construir a interface.
- **React Router DOM**: Para navegação e roteamento entre páginas.

#### Build e Ferramentas
- **Vite**: Ferramenta de build moderna e rápida para desenvolvimento.
- **TypeScript**: Adiciona tipagem estática ao JavaScript para maior segurança.

#### Estilização
- **Tailwind CSS**: Framework de CSS utility-first para estilização rápida.

---

### ✅ Requisitos para o Build

Para garantir que o processo de build (`npm run build:frontend`) seja executado sem erros, siga estas diretrizes:

1.  **Verifique os imports**: Certifique-se de que todos os caminhos de importação estejam corretos e que os arquivos importados existam.
2.  **Tipagem correta**: Garanta que as props passadas aos componentes correspondam aos tipos definidos, evitando erros de compilação do TypeScript.
3.  **Isolar a Lógica de Negócios com Hooks**: Componentes de UI (`.tsx` em `pages` e `components`) **não devem** importar `services` diretamente. Toda a lógica de busca de dados, manipulação de estado e comunicação com APIs deve ser encapsulada em `hooks` customizados (localizados em `frontend/hooks`). Os componentes devem então usar esses hooks para acessar os dados e as funções de que precisam.
4.  **Não apague comentários**: Em hipótese alguma apague comentários nos arquivos ou no código. Eles são essenciais para o entendimento do projeto. Ao criar novos arquivos, adicione comentários claros e intuitivos em todas as partes relevantes.

---

### 🧭 Documentação Adicional

Para mais detalhes sobre partes específicas do código, consulte os arquivos `README.md` nos seguintes diretórios:

- **`/hooks`**: Hooks customizados para lógica reutilizável.
- **`/services`**: Conexões com APIs e serviços externos.
- **`/pages`**: Estrutura das páginas da aplicação.
- **`/features`**: Componentes e lógica de funcionalidades específicas.
- **`/flows`**: Orquestração de fluxos de usuário.
- **`/routes`**: Definição das rotas da aplicação.
- **`/utils`**: Funções utilitárias e helpers.