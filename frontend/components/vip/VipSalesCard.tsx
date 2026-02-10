// frontend/components/vip/VipSalesCard.tsx

import React from 'react';
import { Sale } from '../../types'; // Supondo que exista um tipo Sale

interface VipSalesCardProps {
  sale: Sale;
}

/**
 * Componente: VipSalesCard
 * Propósito: Exibe as informações de uma única venda dentro da página de um grupo VIP.
 */
export const VipSalesCard: React.FC<VipSalesCardProps> = ({ sale }) => {
  return (
    <div className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
      <div>
        <p className="font-semibold">{sale.buyerName}</p>
        <p className="text-sm text-gray-400">{new Date(sale.date).toLocaleDateString()}</p>
      </div>
      <p className="text-lg font-bold text-green-400">+ R$ {sale.amount.toFixed(2)}</p>
    </div>
  );
};