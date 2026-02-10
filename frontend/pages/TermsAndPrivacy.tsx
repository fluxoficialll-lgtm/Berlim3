// Este arquivo define a página de Termos de Uso e Política de Privacidade.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { termsAndPrivacyContent } from '../constants/legal'; // Importação corrigida.

/**
 * Componente: TermsAndPrivacy
 * Propósito: Exibe os termos de uso e a política de privacidade da plataforma.
 */
export const TermsAndPrivacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
      <header className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">{termsAndPrivacyContent.title}</h1>
        <div className="w-6"></div> {/* Espaçador para centralizar o título */}
      </header>
      
      <main className="bg-white/5 rounded-lg p-6">
        {/* O conteúdo HTML é renderizado de forma segura usando `dangerouslySetInnerHTML`. */}
        {/* Isso é aceitável aqui, pois o conteúdo é estático e controlado internamente. */}
        <div dangerouslySetInnerHTML={{ __html: termsAndPrivacyContent.content }} />
      </main>
    </div>
  );
};