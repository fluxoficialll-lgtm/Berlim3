import { useEffect } from 'react';
// Supondo que 'db' é sua instância do banco de dados (ex: Firestore) com um método de inscrição.
// import { db } from '@/database'; 

// Define o tipo da função de callback que o hook receberá.
type SubscriptionCallback = (data: any) => void;

/**
 * 📡 useDatabaseSubscription (Hook de Inscrição em Banco de Dados)
 *
 * Este hook cria uma conexão em tempo real (real-time) entre um componente React
 * e uma tabela (ou coleção) no banco de dados.
 *
 * Ele gerencia o ciclo de vida da inscrição de forma segura:
 * 1. Inscreve-se na tabela quando o componente é montado.
 * 2. Executa a função de callback sempre que há uma atualização nos dados.
 * 3. Cancela a inscrição automaticamente quando o componente é desmontado.
 *
 * Este padrão é CRÍTICO para evitar vazamentos de memória (memory leaks) e chamadas
 * desnecessárias ao banco de dados em aplicações reativas.
 *
 * @param table O nome da tabela/coleção na qual se inscrever.
 * @param callback A função a ser executada quando os dados mudarem.
 */
export const useDatabaseSubscription = (table: string, callback: SubscriptionCallback) => {
  useEffect(() => {
    // --- Etapa 1: Inscrição ---
    // Ao montar o componente, o hook se inscreve na tabela especificada.
    // O método `db.subscribe` (hipotético) deve retornar uma função para cancelar a inscrição.
    const unsubscribe = db.subscribe(table, callback);

    // --- Etapa 2: Limpeza (Cleanup) ---
    // A função retornada pelo useEffect é o seu mecanismo de limpeza.
    // Ela será executada automaticamente quando o componente for desmontado (sair da tela).
    // Isso garante que a conexão em tempo real seja fechada, prevenindo memory leaks.
    return () => {
      unsubscribe();
    };

  // --- Etapa 3: Dependências ---
  // O array de dependências garante que o useEffect será re-executado se a `tabela` ou o `callback` mudarem.
  // Se, por exemplo, o componente precisar ouvir outra tabela, o hook irá automaticamente
  // cancelar a inscrição antiga e criar uma nova para a nova tabela.
  }, [table, callback, db]);
};
