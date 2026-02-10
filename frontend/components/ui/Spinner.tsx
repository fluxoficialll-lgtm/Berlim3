// frontend/components/ui/Spinner.tsx

import React from 'react';

/**
 * Componente: Spinner
 * Propósito: Exibe uma animação de carregamento simples.
 * É usado para indicar ao usuário que uma operação está em andamento.
 */
export const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>
  );
};