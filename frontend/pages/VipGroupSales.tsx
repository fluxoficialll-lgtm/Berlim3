// frontend/pages/VipGroupSales.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useVipSales } from '../hooks/useVipSales';
import { Spinner } from '../components/ui/Spinner';
import { VipSalesHeader } from '../components/vip/VipSalesHeader';
import { VipSalesCard } from '../components/vip/VipSalesCard';

/**
 * Componente: VipGroupSales
 * Propósito: Exibe a página de vendas de um grupo VIP específico.
 * 
 * Refatorado para usar o hook `useVipSales` e componentes de UI dedicados,
 * alinhando-se à nova arquitetura do projeto.
 */
export const VipGroupSales: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { loading, group, sales } = useVipSales(groupId || '');

  if (loading || !group) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <VipSalesHeader groupName={group.name} salesCount={sales.length} />

      <main className="space-y-4">
        {sales.map(sale => (
          <VipSalesCard key={sale.id} sale={sale} />
        ))}
      </main>
    </div>
  );
};