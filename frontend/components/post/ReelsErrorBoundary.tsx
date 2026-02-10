// frontend/components/post/ReelsErrorBoundary.tsx

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Componente: ReelsErrorBoundary
 * Propósito: Captura erros de JavaScript em qualquer lugar de sua árvore de componentes filhos,
 * registra esses erros e exibe uma UI de fallback em vez da árvore de componentes que quebrou.
 */
class ReelsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Você também pode registrar o erro em um serviço de relatórios de erro
    console.error("Uncaught error in Reels page:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback personalizada
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
          <h1 className="text-2xl font-bold">Algo deu errado.</h1>
          <p>Tente recarregar a página.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ReelsErrorBoundary;