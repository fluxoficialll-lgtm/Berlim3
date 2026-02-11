━━━━━━━━━━━━━━━━━━━━━
📜 Diretrizes obrigatórias.
→ Manter este arquivo para documentar o histórico da arquitetura.

━━━━━━━━━━━━━━━━━━━━━━
🛠️ Responsabilidades.

> ⚠️ **PASTA OBSOLETA (DEPRECATED):** Esta pasta e a camada de `Services` no frontend foram descontinuadas.

📁 **Papel da pasta `services` (Histórico)**
→ No padrão de arquitetura anterior, esta pasta era responsável por isolar toda a comunicação com a API do backend.

📄 **Situação Atual**
→ A responsabilidade de realizar chamadas de API (`fetch`) foi **movida diretamente para os Hooks** (localizados em `frontend/hooks`).
→ O novo padrão de arquitetura é: `Página (Componente) ➡️ Hook ➡️ Rota (Backend)`.
→ Os arquivos nesta pasta são mantidos temporariamente, mas serão **removidos** em breve. Não utilize nem adicione código a esta pasta.

━━━━━━━━━━━━━━━━━━━━━━
📋 Arquivos Comentados.

→ **Nenhum.** O código aqui não deve ser usado como referência para novos desenvolvimentos.
