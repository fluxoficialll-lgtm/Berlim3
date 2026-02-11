
import React from 'react';
import { useNotifications } from '../../hooks/useNotifications'; // ✅ ARQUITETURA NOVA

// Componentes de UI
import { Footer } from '../components/layout/Footer';
import { FilterBar } from '../components/notifications/FilterBar';
import { NotificationCard } from '../components/notifications/NotificationCard';
import { MainHeader } from '../components/layout/MainHeader';
import { Spinner } from '../components/ui/Spinner';

/**
 * ✅ ARQUITETURA NOVA: Página de Notificações refatorada.
 * A lógica foi movida para o hook `useNotifications`.
 */
export const Notifications: React.FC = () => {
  const {
    notifications,
    isLoading,
    error,
    filter,
    setFilter,
    handleNotificationClick,
  } = useNotifications();

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-10"><Spinner /></div>;
    }
    if (error) {
      return <div className="text-center text-red-500 py-10">{error}</div>;
    }
    if (notifications.length === 0) {
      return <div className="text-center py-10">Nenhuma notificação</div>;
    }
    return notifications.map(notif => (
      <NotificationCard 
        key={notif.id} 
        notif={notif} 
        onClick={() => handleNotificationClick(notif)}
      />
    ));
  };

  return (
    <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white flex flex-col">
      <MainHeader />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />

      <main className="flex-grow overflow-y-auto p-4">
        <div className="w-full max-w-[600px] mx-auto">
          <h2 className="text-2xl font-bold p-4">Notificações</h2>
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};
