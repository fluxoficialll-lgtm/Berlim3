import { randomUUID } from 'crypto';

/**
 * 🆔 ID Manager (Gerenciador de Identificadores)
 *
 * Módulo centralizado para a geração de Identificadores Únicos Universais (UUIDs) prefixados.
 * O uso de prefixos (ex: `usr_`, `post_`) é uma prática de design de sistemas robusta que oferece grandes benefícios:
 * 
 * - **Legibilidade e Depuração**: Fica imediatamente claro a que entidade um ID pertence, facilitando a análise de logs e bancos de dados.
 * - **Prevenção de Erros**: Evita que um ID de um tipo (ex: `groupId`) seja acidentalmente usado em uma busca por outro tipo (ex: `userId`).
 * - **Segurança**: Dificulta a varredura sequencial de recursos, já que os IDs não são numéricos e sequenciais.
 *
 * Este módulo utiliza `crypto.randomUUID()`, que gera UUIDs versão 4, garantindo um altíssimo grau de aleatoriedade e unicidade.
 */

// Enum de prefixos para garantir consistência e evitar erros de digitação em todo o código.
const Prefixes = {
    USER: 'usr',        // Para Contas de Usuário
    POST: 'post',       // Para Postagens no feed
    COMMENT: 'cmt',     // Para Comentários em postagens
    GROUP: 'grp',       // Para Grupos ou Comunidades
    PAYMENT: 'pay',     // Para uma intenção de pagamento completa (ex: uma sessão de checkout)
    TRANSACTION: 'txn', // Para uma transação financeira específica (cobrança, estorno, etc.)
    FILE: 'file',       // Para arquivos armazenados (ex: no Cloudflare R2)
    SESSION: 'ses',     // Para sessões de login de usuário
    REPORT: 'rpt',      // Para denúncias de conteúdo ou usuários
};

/**
 * Função base que gera um UUID v4 puro.
 * @private
 * @returns {string} Um UUID padrão no formato 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.
 */
const generate = () => randomUUID();

/**
 * Adiciona um prefixo a um UUID recém-gerado.
 * @private
 * @param {string} prefix - O prefixo da entidade (ex: 'usr').
 * @returns {string} Um ID completo e prefixado (ex: 'usr_b17a2a78-...').
 */
const generatePrefixedId = (prefix) => `${prefix}_${generate()}`;

/**
 * `idManager`
 * Objeto exportado que fornece métodos específicos para gerar IDs para cada tipo de entidade no sistema.
 * Esta abordagem cria uma API clara e auto-documentada para a criação de IDs.
 */
export const idManager = {
    /** Gera um novo ID para uma entidade de **Usuário**. */
    user: () => generatePrefixedId(Prefixes.USER),

    /** Gera um novo ID para uma entidade de **Post**. */
    post: () => generatePrefixedId(Prefixes.POST),

    /** Gera um novo ID para uma entidade de **Comentário**. */
    comment: () => generatePrefixedId(Prefixes.COMMENT),

    /** Gera um novo ID para uma entidade de **Grupo**. */
    group: () => generatePrefixedId(Prefixes.GROUP),

    /** Gera um novo ID para uma **Intenção de Pagamento**. */
    payment: () => generatePrefixedId(Prefixes.PAYMENT),

    /** Gera um novo ID para uma **Transação Financeira** específica. */
    transaction: () => generatePrefixedId(Prefixes.TRANSACTION),

    /** Gera um novo ID para um **Arquivo** armazenado. */
    file: () => generatePrefixedId(Prefixes.FILE),

    /** Gera um novo ID para uma **Sessão de Usuário**. */
    session: () => generatePrefixedId(Prefixes.SESSION),

    /** Gera um novo ID para uma **Denúncia (Report)**. */
    report: () => generatePrefixedId(Prefixes.REPORT),

    /** 
     * Gera um UUID puro, sem prefixo. 
     * Deve ser usado apenas em casos especiais onde a interoperabilidade com sistemas externos
     * ou a conformidade com um padrão específico é necessária.
     */
    generic: () => generate(),
};