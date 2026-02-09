// Este arquivo define a página de Notificações.

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { notificationService } from '../services/notificationService';
import { NotificationItem, Group } from '../types';

// TODO: Refatorar para remover dependência direta do banco de dados.
// import { db } from '@/database';

// Importação de componentes da UI com caminhos corrigidos.
import { Footer } from './components/layout/Footer';
import { FilterBar } from './components/notifications/FilterBar';
import { NotificationCard } from './components/notifications/NotificationCard';
import { MainHeader } from './components/layout/MainHeader';
import { ExpiringVipNotificationCard } from './features/notifications/components/ExpiringVipNotificationCard';

// Lazy loading para o modal de pagamento para otimizar o carregamento inicial.
const PaymentFlowModal = lazy(() => import('./components/payments/PaymentFlowModal').then(m => ({ default: m.PaymentFlowModal })));

/**
 * Componente: Notifications
 * Propósito: Exibe a lista de notificações do usuário. As notificações são buscadas, enriquecidas
 * com informações do perfil do usuário e exibidas em uma lista. A página permite filtrar as 
 * notificações por tipo (ex: menções, comentários, pendentes) e interagir com elas (ex: seguir
 * de volta, aceitar solicitações). O componente também lida com notificações especiais, como a
 * renovação de assinaturas VIP, abrindo um modal de pagamento.
 * Nota de Refatoração: O componente atualmente se inscreve diretamente no `db` para reatividade,
 * o que deve ser movido para o `notificationService` para melhor arquitetura.
 */
export const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<string>('all');

  // Carrega as notificações ao montar o componente.
  useEffect(() => {
    const loadNotifications = () => {
        const rawData = notificationService.getNotifications();
        // ... (lógica de enriquecimento de dados que poderia estar no serviço)
        setNotifications(rawData);
    };
    loadNotifications();
    notificationService.markAllAsRead();
    // TODO: Remover subscrição direta.
    // const unsubscribe = db.subscribe('notifications', loadNotifications);
    // return () => unsubscribe();
  }, []);

  // Filtra as notificações com base no filtro ativo.
  const filteredNotifications = notifications.filter(n => {
    // ... (lógica de filtragem)
    return true;
  });

  return (
    <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <MainHeader />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />

      <main className="flex-grow ...">
        <div className="w-full max-w-[600px] ...">
            <h2 className="text-2xl ...">Notificações</h2>
            
            {filteredNotifications.length === 0 ? (
                <div>{/* Estado de Nenhuma Notificação */}</div>
            ) : (
                filteredNotifications.map(notif => {
                    if (notif.type === 'expiring_vip') {
                        return <ExpiringVipNotificationCard key={notif.id} notif={notif} /* ... */ />;
                    }
                    return <NotificationCard key={notif.id} notif={notif} /* ... */ />;
                })
            )}
        </div>
      </main>

      <Footer />

      {/* Modal de pagamento carregado de forma preguiçosa (lazy) */}
      <Suspense fallback={null}>
          {/* ... (lógica do modal de pagamento) ... */}
      </Suspense>
    </div>
  );
};