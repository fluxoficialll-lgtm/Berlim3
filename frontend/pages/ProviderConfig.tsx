// Este arquivo define a página de Configuração de Provedores de Pagamento.

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

// Importação de componentes da UI com caminhos corrigidos.
import { SyncPayForm } from './components/payments/providers/SyncPayForm';
import { StripeForm } from './components/payments/providers/StripeForm';
import { PayPalForm } from './components/payments/providers/PayPalForm';

interface ProviderData {
    id: string;
    name: string;
    icon: string;
    status: 'active' | 'coming_soon';
    methods: { type: string; label: string }[];
}

/**
 * Componente: ProviderConfig
 * Propósito: Renderiza a página onde os usuários podem configurar e gerenciar as integrações com
 * diferentes provedores de pagamento (ex: SyncPay, Stripe, PayPal). A página lista os provedores
 * disponíveis, mostra quais já estão conectados e permite que o usuário expanda cada um para
 * preencher um formulário específico (ex: `SyncPayForm`, `StripeForm`) com suas credenciais
 * de API, ativando ou desativando a integração para recebimento de pagamentos.
 */
export const ProviderConfig: React.FC = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [connectedProviders, setConnectedProviders] = useState<Set<string>>(new Set());

  // Lista estática de provedores suportados.
  const providers: ProviderData[] = useMemo(() => [
      // ... (definições dos provedores: SyncPay, Stripe, etc.)
  ], []);

  // Carrega a configuração de pagamento do usuário.
  useEffect(() => {
      const user = authService.getCurrentUser();
      if (user?.paymentConfigs) {
          const connected = new Set(Object.values(user.paymentConfigs)
              .filter(c => c.isConnected)
              .map(c => c.providerId));
          setConnectedProviders(connected);
      }
  }, []);

  // Manipulador para atualizar o status de conexão de um provedor.
  const handleStatusChange = (providerId: string, connected: boolean) => {
      setConnectedProviders(prev => {
          const next = new Set(prev);
          if (connected) next.add(providerId);
          else next.delete(providerId);
          return next;
      });
  };

  // Renderiza um único card de provedor com seu formulário aninhado.
  const renderProvider = (provider: ProviderData) => {
    const isExpanded = expanded === provider.id;
    const isConnected = connectedProviders.has(provider.id);

    return (
        <div key={provider.id} className="provider-card ...">
            <div className="provider-header" onClick={() => setExpanded(prev => prev === provider.id ? null : provider.id)}>
                {/* ... Informações do provedor (ícone, nome, status) ... */}
            </div>
            
            {isExpanded && (
                <div className="provider-body">
                    {provider.id === 'syncpay' && <SyncPayForm isConnected={isConnected} onStatusChange={handleStatusChange} />}
                    {provider.id === 'stripe' && <StripeForm isConnected={isConnected} onStatusChange={handleStatusChange} />}
                    {provider.id === 'paypal' && <PayPalForm isConnected={isConnected} onStatusChange={handleStatusChange} />}
                </div>
            )}
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <header>{/* ... Cabeçalho da página ... */}</header>
      <main className="no-scrollbar">
        {/* Listas de provedores conectados e disponíveis */}
        {providers.filter(p => connectedProviders.has(p.id)).map(renderProvider)}
        {providers.filter(p => !connectedProviders.has(p.id)).map(renderProvider)}
      </main>
    </div>
  );
};