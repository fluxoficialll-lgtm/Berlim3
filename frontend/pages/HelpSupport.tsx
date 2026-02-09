// Este arquivo define a página de Ajuda e Suporte.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importação de componentes modulares da feature de ajuda.
import { FaqItem } from '../features/help/components/FaqItem';
import { SupportContactCard } from '../features/help/components/SupportContactCard';
import { SupportModal } from '../features/help/components/SupportModal';
// Importação do conteúdo das FAQs de um diretório compartilhado.
import { faqs } from '#shared/constants/helpAndSupport';

/**
 * Componente: HelpSupport
 * Propósito: Renderiza a página de Ajuda e Suporte. A página exibe uma lista de Perguntas Frequentes (FAQ)
 * que podem ser expandidas para revelar as respostas. No final da lista, um card de contato
 * oferece a opção de abrir um modal para enviar uma mensagem direta ao suporte. A estrutura é
 * modular, utilizando `FaqItem`, `SupportContactCard` e `SupportModal` da feature `help`.
 */
export const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado para controlar qual item do FAQ está aberto.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Estado para controlar a visibilidade do modal de suporte.
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleBack = () => {
    navigate(-1); // Navega para a página anterior no histórico.
  };

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] ...">
      <header>{/* ... Cabeçalho com botão de voltar ... */}</header>

      <main className="no-scrollbar">
        <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Pesquisar dúvidas..." />
        </div>

        <div className="section-title">Perguntas Frequentes</div>
        
        {/* Mapeia a lista de FAQs para renderizar os itens. */}
        {faqs.map((faq, index) => (
            <FaqItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
        ))}

        {/* Card para iniciar o contato com o suporte. */}
        <SupportContactCard onOpenSupport={() => setIsSupportModalOpen(true)} />
      </main>

      {/* Modal de suporte, exibido condicionalmente. */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
};
