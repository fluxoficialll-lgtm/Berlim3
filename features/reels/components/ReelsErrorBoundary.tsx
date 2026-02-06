import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ReelsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro não capturado na página de Reels:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Algo deu errado na página de Reels.</h1>
          <p>Tente recarregar a página ou contate o suporte.</p>
          {this.state.error && <p>Detalhes: {this.state.error.toString()}</p>}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ReelsErrorBoundary;
