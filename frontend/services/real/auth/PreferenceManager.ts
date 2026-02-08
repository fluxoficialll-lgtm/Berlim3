
import { NotificationSettings, PaymentProviderConfig, SecuritySettings } from '../../../types';
import { API_BASE } from '../../../apiConfig';

const API_USERS = `${API_BASE}/api/users`;

export const PreferenceManager = {
  async updateNotificationSettings(email: string, settings: NotificationSettings) {
      const response = await fetch(`${API_USERS}/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, updates: { notificationSettings: settings } })
      });
      // Omitido: lógica de atualização de cache para brevidade
  },

  async updateSecuritySettings(email: string, settings: SecuritySettings) {
      const response = await fetch(`${API_USERS}/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, updates: { securitySettings: settings } })
      });
      // Omitido: lógica de atualização de cache para brevidade
  },

  async updatePaymentConfig(email: string, config: { providerId: string; isConnected: boolean; }) {
      if (!email) throw new Error("E-mail do usuário não identificado.");

      const response = await fetch(`${API_USERS}/update-payment-config`, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ 
              email: email.toLowerCase().trim(), 
              provider: config.providerId,
              isConnected: config.isConnected
          }) 
      });

      if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Falha ao sincronizar configuração de pagamento.");
      }

      const result = await response.json();

      // Atualiza o cache do usuário e notifica a aplicação
      if (result.user) {
          // Simula a atualização do cache (lógica real pode ser mais complexa)
          localStorage.setItem('cached_user_profile', JSON.stringify(result.user));
          window.dispatchEvent(new Event('storage'));
      }
  }
};
