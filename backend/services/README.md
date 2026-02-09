### 🛠️ Serviços (Services)

Este diretório contém a lógica de negócios da aplicação, orquestrando operações, manipulando dados e executando a lógica principal.

---

#### Padrão de Arquitetura

- **Controladores (`controllers`)**: Recebem requisições e chamam os serviços.
- **Serviços (`services`)**: Contêm a lógica de negócios e interagem com os repositórios.
- **Repositórios (`repositories`)**: Encapsulam o acesso ao banco de dados.

Essa separação torna o código mais **organizado**, **reutilizável** e **fácil de testar**.

---

#### ✅ Arquivos Documentados

Esta é uma lista de arquivos nesta pasta que foram revisados e extensivamente comentados para facilitar o entendimento e a depuração.

- `adaptiveSystem.js`
- `admin/MasterHealthService.js`
- `adService.js`
- `auditService.js`
- `authService.js`
- `chatService.js`
- `db/postgres-client.js`
- `eventProcessor.js`
- `facebookCapi.js`
- `financial/FeeCalculator.js`
- `financial/FeeEngine.js`
- `financialService.js`
- `groupRankingService.ts`
- `groupService.js`
- `id-manager.js`
- `interactionService.js`
- `marketplaceCommentService.ts`
- `marketplaceService.js`
- `paypalService.js`
- `postService.ts`
- `reportService.js`
- `socket/NotificationEmitter.js`
- `storage/r2-client.js`
- `storageService.js`
- `stripeService.js`
- `syncpayService.js`

---

#### 📚 Documentação Específica por Módulo

Para manter a organização, diretórios de módulos mais complexos dentro de `services` podem conter seus próprios arquivos `README.md` com documentação detalhada sobre sua arquitetura e arquivos.

- **`audit/`**: Contém um `README.md` detalhando o subsistema de auditoria financeira.
- **`storage/`**: Contém um `README.md` que detalha a arquitetura de armazenamento de objetos e o cliente do Cloudflare R2.

Consulte os `README.md` específicos de cada módulo para obter um entendimento mais aprofundado de suas responsabilidades e funcionamento.

---

#### Exemplos

- **`authService.js`**: 🔑 Lógica de autenticação (verificar senhas, gerar tokens JWT).
- **`postService.ts`**: 📝 Lógica para CRUD de postagens (validação, processamento).

---

#### 📜 Regras e Diretrizes

- **TODA** a lógica de negócios deve residir aqui.
- **SERVIÇOS** podem chamar outros serviços, mas devem evitar dependências circulares.
- **INTERAGIR** com o banco de dados apenas através dos `repositories` ou `models`.
- **MANTER** os métodos focados em uma única responsabilidade.