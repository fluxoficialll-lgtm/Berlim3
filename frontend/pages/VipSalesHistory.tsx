
// Este arquivo define a página de Histórico de Vendas VIP.

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../services/authService';
import { groupService } from '../services/groupService';
import { syncPayService } from '../services/syncPayService';

/**
 * @component VipSalesHistory
 * @description Página para exibir o histórico detalhado de vendas de um grupo VIP específico.
 * Este componente é destinado principalmente aos criadores de conteúdo para que possam rastrear o desempenho financeiro de seus grupos VIP.
 *
 * @functionality
 * - **Busca de Dados**: Ao montar o componente, ele busca o usuário atual, os detalhes do grupo usando o ID do parâmetro da URL e todo o histórico de transações associado ao usuário a partir do `syncPayService`.
 * - **Filtragem de Transações**: Filtra as transações buscadas para isolar apenas aquelas que são relevantes para o grupo VIP específico (`groupId`) e que possuem um status de pagamento bem-sucedido (ex: 'paid', 'completed'). Isso garante a precisão dos dados.
 * - **Cálculo da Receita Total**: Calcula a soma de todas as transações válidas para exibir um valor total de receita para o grupo.
 * - **Ordenação das Vendas**: As vendas são ordenadas cronologicamente, com as transações mais recentes aparecendo primeiro.
 * - **Renderização dos Dados**: Exibe o nome do grupo, a receita total e uma lista de vendas individuais. Cada item de venda mostra o nome do comprador, a data da transação, o valor e o status do pagamento.
 * - **Gerenciamento de Estados**: Fornece feedback visual para estados de carregamento (enquanto busca os dados) e um estado vazio (se nenhuma venda foi registrada).
 *
 * @dependencies
 * - **react-router-dom**: Utiliza `useNavigate` para navegação e `useParams` para obter o ID do grupo da URL.
 * - **authService**: Para obter as informações do usuário autenticado atual.
 * - **groupService**: Para recuperar detalhes sobre o grupo VIP, como seu nome.
 * - **syncPayService**: Para buscar os dados brutos das transações.
 *
 * @data_flow
 * 1. O componente obtém o `id` do grupo a partir da URL.
 * 2. Ele chama `authService.getCurrentUser()` para identificar o usuário.
 * 3. Em seguida, chama `syncPayService.getTransactions()` para obter todos os registros de pagamento para esse usuário.
 * 4. Os registros são filtrados por `groupId === id` e por status de pagamento bem-sucedido.
 * 5. A lista filtrada é usada para calcular a `totalRevenue` e é ordenada por data para exibição.
 * 6. As variáveis de estado (`sales`, `totalRevenue`, `loading`) são atualizadas, acionando uma nova renderização para mostrar os dados.
 *
 * @ui
 * - **Cabeçalho (Header)**: Contém um botão de voltar e o título da página.
 * - **Cartão de Resumo (Summary Card)**: Um cartão de destaque que exibe a receita total calculada para o grupo.
 * - **Lista de Vendas (Sales List)**: Uma lista ordenada cronologicamente de cartões `sale-item`, cada um representando uma única transação.
 */
export const VipSalesHistory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [sales, setSales] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
      const loadData = async () => {
          const user = authService.getCurrentUser();
          if (!user || !id) {
              setLoading(false);
              return;
          }

          const group = groupService.getGroupById(id);
          if (group) setGroupName(group.name);

          try {
              // 1. Buscar transações reais
              const transactions = await syncPayService.getTransactions(user.email);
              
              // 2. FILTRAGEM CONSISTENTE (Correção Incoerência 6):
              // Removemos a busca por texto no nome do grupo (instável).
              // Agora filtramos estritamente pelo identificador único groupId.
              const filtered = transactions.filter(t => {
                  const isPaid = ['paid', 'completed', 'approved', 'settled'].includes((t.status || '').toLowerCase());
                  // O vínculo deve ser estritamente técnico via ID
                  return t.groupId === id && isPaid;
              });

              // 3. Ordenar por data (mais recente primeiro)
              filtered.sort((a, b) => {
                  const dateA = new Date(a.created_at || a.createdAt || a.date_created || 0).getTime();
                  const dateB = new Date(b.created_at || b.createdAt || b.date_created || 0).getTime();
                  return dateB - dateA;
              });

              setSales(filtered);

              // 4. Calcular Total Faturado
              const total = filtered.reduce((acc, curr) => {
                  return acc + (parseFloat(curr.amount) || 0);
              }, 0);

              setTotalRevenue(total);

          } catch (e) {
              console.error("Erro ao carregar histórico técnico:", e);
          } finally {
              setLoading(false);
          }
      };

      loadData();
  }, [id]);

  const formatDate = (dateStr?: string) => {
      if (!dateStr) return '-';
      try {
          return new Date(dateStr).toLocaleString('pt-BR', {
              day: '2-digit', month: '2-digit', year: '2-digit',
              hour: '2-digit', minute: '2-digit'
          });
      } catch {
          return dateStr;
      }
  };

  const getStatusLabel = (status?: string) => {
      const s = (status || '').toLowerCase();
      if (['paid', 'completed', 'approved', 'settled'].includes(s)) return 'Aprovado';
      if (['pending', 'processing', 'created'].includes(s)) return 'Pendente';
      if (['expired', 'cancelled', 'failed'].includes(s)) return 'Expirado';
      return s || 'Desconhecido';
  };

  const getStatusClass = (status?: string) => {
      const s = (status || '').toLowerCase();
      if (['paid', 'completed', 'approved', 'settled'].includes(s)) return 'approved';
      if (['pending', 'processing', 'created'].includes(s)) return 'pending';
      return 'failed';
  };

  const getPayerName = (sale: any) => {
      if (sale.payer && sale.payer.name) return sale.payer.name;
      if (sale.payer_email) return sale.payer_email.split('@')[0];
      return 'Cliente Desconhecido';
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-x-hidden">
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; }
        
        header {
            display:flex; align-items:center; justify-content:space-between; padding:16px;
            background: #0c0f14; position:fixed; width:100%; z-index:10;
            border-bottom:1px solid rgba(255,255,255,0.1); top: 0; height: 65px;
        }
        header button {
            background:none; border:none; color:#fff; font-size:24px; cursor:pointer;
            transition:0.3s; padding-right: 15px;
        }
        header h1 { font-size:20px; font-weight:600; }
        
        main {
            padding-top: 90px; padding-bottom: 40px;
            width: 100%; max-width: 600px; margin: 0 auto; padding-left: 20px; padding-right: 20px;
        }

        .sales-summary {
            background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3);
            border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: center;
        }
        .total-label { font-size: 14px; color: #FFD700; text-transform: uppercase; letter-spacing: 1px; }
        .total-amount { font-size: 32px; font-weight: 800; color: #fff; margin-top: 5px; }

        .sale-item {
            background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px;
            margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;
            border: 1px solid rgba(255,255,255,0.05);
        }
        .sale-info h3 { font-size: 15px; font-weight: 600; margin-bottom: 4px; color: #fff; }
        .sale-info p { font-size: 11px; color: #aaa; }
        
        .sale-value { text-align: right; display: flex; flex-direction: column; align-items: flex-end; }
        .amount { font-size: 16px; font-weight: 700; color: #00ff82; }
        
        .status { font-size: 11px; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.1); display: inline-block; margin-top: 4px; font-weight: 600; text-transform: uppercase; }
        .status.pending { color: #ffaa00; background: rgba(255,170,0,0.15); }
        .status.approved { color: #00ff82; background: rgba(0,255,130,0.15); }
        .status.failed { color: #ff4d4d; background: rgba(255,77,77,0.15); }

        .loading-container { text-align: center; color: #777; margin-top: 50px; }
        .empty-state { text-align: center; color: #777; padding: 30px; font-size: 14px; }
      `}</style>

      <header>
        <button onClick={() => navigate(-1)} aria-label="Voltar">
            <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>Histórico de Vendas</h1>
      </header>

      <main>
        <div className="sales-summary">
            <div className="total-label">Total Faturado</div>
            <div className="total-amount">
                {loading ? '...' : `R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            </div>
            <p style={{fontSize: '12px', color: '#aaa', marginTop: '5px'}}>
                Grupo: {groupName || 'Carregando...'}
            </p>
        </div>

        <h3 style={{marginBottom: '15px', color: '#aaa', fontSize: '13px', textTransform: 'uppercase', fontWeight: '700'}}>Últimas Transações</h3>

        {loading ? (
            <div className="loading-container">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i>
                <p>Buscando dados...</p>
            </div>
        ) : sales.length > 0 ? (
            sales.map((sale, idx) => (
                <div key={sale.id || idx} className="sale-item">
                    <div className="sale-info">
                        <h3>{getPayerName(sale)}</h3>
                        <p>{formatDate(sale.created_at || sale.createdAt || sale.date_created)}</p>
                    </div>
                    <div className="sale-value">
                        <div className="amount">
                            R$ {parseFloat(sale.amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className={`status ${getStatusClass(sale.status)}`}>
                            {getStatusLabel(sale.status)}
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <div className="empty-state">
                <i className="fa-solid fa-receipt text-4xl mb-3 opacity-30"></i>
                <p>Nenhuma venda registrada para este grupo ainda.</p>
            </div>
        )}
      </main>
    </div>
  );
};
