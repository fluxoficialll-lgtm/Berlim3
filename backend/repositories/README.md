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
📁 Papel da pasta repositories.
→ Centralizar e abstrair toda a comunicação com o banco de dados.

📋 Papel dos arquivos Repositories.
→ Ser a única camada que fala diretamente com o banco de dados.
→ Ser chamado pelos `Services` para buscar ou persistir dados.
→ Conter todas as queries (SQL, ORM calls, etc.).
→ Retornar os dados brutos do banco, sem lógica de negócio.
→ Garantir que a lógica de negócio nos `Services` não precise saber como os dados são armazenados ou buscados.

━━━━━━━━━━━━━━━━━━━━━━
💾 Banco de Dados Definidos.

→  Usar banco de dados PostgreSQL para metadados.
→  Usar PostgreSQL para metadados.

→  Usar banco de dados Cloudflare R2 para arquivos pesados.
→  Usar Cloudflare R2 para arquivos pesados.
→ Arquivos pesados de.
→ Fotos.
→ Vídeos.
→ .ZIP
━━━━━━━━━━━━━━━━━━━━━━

📋 Arquivos Comentados.
→
→
→
→


━━━━━━━━━━━━━━━━━━━━━━