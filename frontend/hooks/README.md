━━━━━━━━━━━━━━━━━━━━━
📜 Diretrizes obrigatórias.
→ Atualizar arquivos README.md com regras.
→ Regras de:
→ Sempre conter categorias.
→ Categoria de 📜 Diretrizes obrigatórias.
→ Categoria de 🛠️ Responsabilidades.
→ Categoria de 📋 Arquivos Comentados.

→ Nunca pagar categorias.
→ Nunca fugir dessa padronização de lista.
→ Ao Adicionar informações não apague outras.
→ Sempre Escrever arquivos com comentários.
→ Comentários sempre em português 🇧🇷.
→ Comentários sempre com emojis.
→ Comentários sempre intuitivos.
→ Não apagar comentários.

━━━━━━━━━━━━━━━━━━━━━━
🛠️ Responsabilidades.

> ⚠️ **Nova Arquitetura (Refatorada):** A camada de `Services` foi descontinuada. Os Hooks agora se comunicam diretamente com as rotas do backend.

📁 **Papel da pasta `hooks`**
→ Conter os *Custom Hooks* do React, que conectam a UI (Páginas) diretamente à API do backend.

📄 **Papel dos arquivos `Hook`**
→ **Orquestrar Chamadas de API:** Executar `fetch` para buscar dados e enviar mutações para o backend.
→ **Gerenciar a lógica** e o estado completo da página (`useState`, `useEffect`).
→ **Abstrair lógica complexa** como scroll infinito, filtros e paginação.
→ **Fornecer uma API simples** para o componente, expondo apenas o que ele precisa (ex: `posts`, `isLoading`, `handleDelete`).
→ Seguir o padrão de arquitetura: `Página (Componente) ➡️ Hook ➡️ Rota (Backend)`.

━━━━━━━━━━━━━━━━━━━━━━
📋 Arquivos Comentados.
Para entender a arquitetura em prática, comece por estes arquivos:

→ **`useFeed.refactored.ts`**: O hook principal da aplicação, agora refatorado. Ele exemplifica a nova arquitetura, gerenciando o estado do feed e realizando as chamadas `fetch` diretamente para a API de posts.
→ **`useModal.ts`**: Provê uma interface simples para que qualquer componente possa disparar um modal de confirmação, demonstrando um hook focado exclusivamente no estado da UI.
