
// frontend/hooks/useNotifications.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo que a interface de uma notificação seja esta
interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  isRead: boolean;
  fromUser: {
    id: string;
    name: string;
    avatar: string;
  };
  post?: {
    id: string;
    thumbnail: string;
  };
  createdAt: string;
}

// Tipo para o retorno do hook useNotifications
interface UseNotificationsReturn {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

/**
 * 🎣 useNotifications (Hook para Notificações)
 *
 * Gerencia a busca e o estado de notificações do usuário.
 *
 * @returns Um objeto com o estado das notificações e funções para interagir com elas.
 */
export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data, error, isLoading, execute } = useApi<Notification[] | Notification>();

  const fetchNotifications = useCallback(async () => {
    await execute('/api/notifications');
    if (data && Array.isArray(data)) {
      setNotifications(data);
    }
  }, [execute, data]);

  const markAsRead = useCallback(async (notificationId: string) => {
    await execute(`/api/notifications/${notificationId}/read`, {
      method: 'POST',
    });
    // Atualiza a notificação específica na lista
    if (data && !Array.isArray(data)) {
        const updatedNotification = data as Notification;
        setNotifications(prev =>
            prev.map(n => (n.id === notificationId ? updatedNotification : n))
        );
    }
  }, [execute, data]);

  const markAllAsRead = useCallback(async () => {
    await execute('/api/notifications/read-all', {
      method: 'POST',
    });
    // Atualiza todas as notificações para 'lida'
    if (data && Array.isArray(data)) {
        setNotifications(data);
    }
  }, [execute, data]);


  // Efeito para carregar as notificações ao inicializar
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
};
