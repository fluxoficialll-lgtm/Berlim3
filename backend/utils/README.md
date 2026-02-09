### 🧩 Utilitários (Utils)

Este diretório contém funções e módulos utilitários que são reutilizáveis em toda a aplicação.

---

#### Propósito

O objetivo dos utilitários é:

- **Abstrair** lógicas comuns e repetitivas.
- **Manter** o código mais limpo e organizado.
- **Facilitar** a manutenção e o reuso de código.

---

#### Exemplos

- **`apiFeatures.js`**: 🔧 Funções para filtrar, ordenar e paginar resultados de API.
- **`catchAsync.js`**:  trycatch para rotas async.
- **`email.js`**: 📧 Funções para envio de e-mails.
- **`errorHandler.js`**: 🚨 Manipulador de erros global.

---

#### 📜 Regras e Diretrizes

- **CRIAR** apenas funções puras e sem estado, sempre que possível.
- **NÃO** incluir lógica de negócios nos utilitários.
- **MANTER** as funções pequenas e focadas em uma única tarefa.
- **DOCUMENTAR** cada função com JSDoc, explicando o que ela faz, seus parâmetros e o que retorna.