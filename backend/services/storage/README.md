### 💾 Módulo de Armazenamento (Storage)

Este diretório contém os clientes e gerenciadores responsáveis por abstrair a interação com as soluções de armazenamento de objetos (Object Storage), como o Cloudflare R2.

O objetivo é encapsular a complexidade dos SDKs dos provedores de nuvem, expondo uma interface clara e segura para o resto da aplicação, além de integrar com nossos sistemas de auditoria e geração de IDs.

---

#### ✅ Arquivos Documentados

- `r2-client.js`: Cliente robusto para interagir com o Cloudflare R2. Implementa o padrão de upload direto com URLs pré-assinadas e inclui funcionalidades para exclusão de arquivos e logging de auditoria detalhado.

---

#### Arquitetura e Padrões

- **Cliente Centralizado**: O `r2-client.js` segue o padrão Singleton, garantindo que uma única instância do cliente gerencie todas as conexões e operações com o R2. Isso é crucial para a performance e o gerenciamento de recursos.

- **Upload Direto (Presigned URLs)**: A principal estratégia para uploads é a geração de URLs pré-assinadas. Isso permite que o cliente (frontend) envie arquivos grandes diretamente para o provedor de nuvem, evitando que os dados passem pelo nosso servidor. Esta abordagem melhora drasticamente a escalabilidade e reduz a carga no nosso backend.

- **Integração com Auditoria**: Todas as operações significativas (geração de URLs, exclusões, erros) são registradas através do módulo `storageEvents`, fornecendo uma trilha de auditoria completa e facilitando o monitoramento.
