
// frontend/hooks/useProductDetails.ts
import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useApi';

// Supondo uma interface para o Produto detalhado
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  seller: {
    id: string;
    name: string;
    avatar: string;
  };
  images: string[];
  stock: number;
  reviews: {
      rating: number;
      count: number;
  };
}

// Tipo para o retorno do hook
interface UseProductDetailsReturn {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  fetchProduct: (productId: string) => Promise<void>;
}

/**
 * 🎣 useProductDetails (Hook para Detalhes do Produto)
 *
 * Gerencia a busca e a exibição de um produto específico.
 *
 * @param productId O ID do produto a ser buscado.
 * @returns Estado do produto e a função para buscá-lo.
 */
export const useProductDetails = (productId: string): UseProductDetailsReturn => {
  const { data, error, isLoading, execute } = useApi<Product>();

  const fetchProduct = useCallback(async (currentProductId: string) => {
    await execute(`/api/products/${currentProductId}`);
  }, [execute]);

  // Efeito para buscar o produto quando o ID muda
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  return { product: data, isLoading, error, fetchProduct };
};
