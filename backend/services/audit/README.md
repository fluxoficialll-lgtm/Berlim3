### 監査 (Audit)

Este diretório contém todos os serviços e subsistemas relacionados à auditoria e ao registro de eventos críticos da aplicação. O objetivo é criar um rastro claro e detalhado de atividades importantes, como transações financeiras, para garantir a conformidade, a segurança e a depuração.

---

#### ✅ Arquivos Comentados

Esta é uma lista de arquivos nesta pasta que foram revisados e extensivamente comentados.

- `FinancialAuditLogger.js`
- `fees/index.js`
- `fees/BaseFeeFormatter.js`
- `fees/StripeFeeLogger.js`
- `fees/SyncPayFeeLogger.js`
- `fees/PayPalFeeLogger.js`

---

#### Arquitetura do Subsistema de Taxas (fees)

O subsistema de auditoria de taxas foi projetado com um padrão claro:

1.  **`FinancialAuditLogger.js` (Fachada)**: O ponto de entrada unificado. Ele delega a responsabilidade para o orquestrador de taxas.

2.  **`fees/index.js` (Orquestrador)**: Atua como um roteador que implementa o **Padrão de Estratégia (Strategy Pattern)**. Ele seleciona o logger apropriado com base no provedor de pagamento.

3.  **`fees/BaseFeeFormatter.js` (Utilitário)**: Fornece funções de formatação comuns (timestamps, valores) para todos os loggers, evitando a duplicação de código.

4.  **`fees/*Logger.js` (Estratégias)**: São os loggers especializados, cada um responsável por formatar a saída de um provedor específico (Stripe, SyncPay, PayPal), usando cores diferentes para fácil identificação no console.
