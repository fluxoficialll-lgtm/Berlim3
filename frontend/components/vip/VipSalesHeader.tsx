// frontend/components/vip/VipSalesHeader.tsx

import React from 'react';

interface VipSalesHeaderProps {
  groupName: string;
  salesCount: number;
}

/**
 * Componente: VipSalesHeader
 * Propósito: Exibe o cabeçalho da página de vendas de um grupo VIP,
 * mostrando o nome do grupo e o número total de vendas.
 */
export const VipSalesHeader: React.FC<VipSalesHeaderProps> = ({ groupName, salesCount }) => {
  return (
    <header className="bg-gray-800 p-4 rounded-lg mb-6">
      <h1 className="text-2xl font-bold text-white">{groupName}</h1>
      <p className="text-gray-400">{salesCount} vendas</p>
    </header>
  );
};