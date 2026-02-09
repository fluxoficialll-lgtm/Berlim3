// Este arquivo define a página de Detalhes de um Produto (versão 2).

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { marketplaceService } from '@/services/marketplaceService';
import { authService } from '@/services/authService';
import { chatService } from '@/services/chatService';
import { MarketplaceItem } from '@/types';
import { useModal } from '@/components/ModalSystem';
import { useMarketplaceComments } from '@/hooks/useMarketplaceComments';

// Importação de componentes modulares da feature de marketplace.
import '@/features/marketplace/components/details/ProductDetails.css';
import { ProductHeader } from '@/features/marketplace/components/details/ProductHeader';
import { ProductInfo } from '@/features/marketplace/components/details/ProductInfo';
import { ProductSellerCard } from '@/features/marketplace/components/details/ProductSellerCard';
import { ProductDescription } from '@/features/marketplace/components/details/ProductDescription';
import { ProductBottomBar } from '@/features/marketplace/components/details/ProductBottomBar';
import { ProductLightbox } from '@/features/marketplace/components/details/ProductLightbox';
import { CommentSheet } from '@/components/ui/comments/CommentSheet';

/**
 * Componente: ProductDetailsV2
 * Propósito: Renderiza a página de detalhes para um item do marketplace. É uma versão mais
 * recente e modular ("V2"). A página exibe todas as informações do produto, como imagens/vídeos,
 * preço, descrição e informações do vendedor. A UI é dividida em vários subcomponentes
 * para melhor organização. A página permite que compradores iniciem um chat com o vendedor e
 * que o próprio vendedor edite ou exclua o anúncio. Inclui também uma seção de perguntas
 * e respostas, gerenciada pelo hook `useMarketplaceComments` e exibida em um modal `CommentSheet`.
 * Nota: Este componente utiliza alias de caminho (`@/`) para importações, uma prática de
 * organização de código que difere dos caminhos relativos usados em outras partes do projeto.
 */
export const ProductDetailsV2: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showConfirm, showAlert } = useModal();

  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [isSeller, setIsSeller] = useState(false);
  const currentUser = authService.getCurrentUser();

  // Hook para gerenciar os comentários do produto.
  const { comments, loading: loadingComments, addComment, deleteComment } = useMarketplaceComments(id || '');

  // Busca os detalhes do item ao carregar.
  useEffect(() => {
    if (id) {
      const foundItem = marketplaceService.getItemById(id);
      if (foundItem) {
        setItem(foundItem);
        setIsSeller(currentUser?.id === foundItem.sellerId);
      } else {
        navigate('/marketplace');
      }
    }
  }, [id, currentUser, navigate]);

  // Inicia uma conversa com o vendedor.
  const handleChat = async () => {
    if (!currentUser || !item || isSeller) return;
    const chatId = await chatService.startChatWithProductContext(item.sellerId, item.id);
    navigate(`/chat/${chatId}`);
  };

  if (!item) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#0c0f14] ... pb-[90px]">
      <ProductHeader /* ... */ />
      <div className="product-container ...">
        <div className="details-wrapper">
          <ProductInfo /* ... */ />
          <ProductSellerCard /* ... */ />
          <ProductDescription /* ... */ />
          {/* Botão para abrir o modal de perguntas */}
          <button className="qa-trigger-btn" onClick={() => { /* abre modal */ }}>
            Perguntas ({comments.length})
          </button>
        </div>
      </div>
      <ProductBottomBar isSeller={isSeller} onChat={handleChat} /* ... */ />
      {/* Modal de comentários (perguntas e respostas) */}
      <CommentSheet /* ... */ />
    </div>
  );
};