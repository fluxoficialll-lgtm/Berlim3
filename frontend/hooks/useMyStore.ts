
// frontend/hooks/useMyStore.ts
import { useState, useCallback, useEffect } from 'react';
import { useApi } from './useApi';

// Supondo que a interface de um produto seja esta
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

// Tipo para o retorno do hook useMyStore
interface UseMyStoreReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (newProduct: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (productId: string, updatedProduct: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

/**
 * 🎣 useMyStore (Hook para Minha Loja)
 *
 * Gerencia os produtos da loja de um usuário, incluindo busca, adição,
 * atualização e exclusão de produtos.
 *
 * @returns Um objeto com o estado da loja e as funções para interagir com ela.
 */
export const useMyStore = (): UseMyStoreReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const { data, error, isLoading, execute } = useApi<Product[] | Product>();

  const fetchProducts = useCallback(async () => {
    await execute('/api/my-store/products');
    if (data && Array.isArray(data)) {
      setProducts(data);
    }
  }, [execute, data]);

  const addProduct = useCallback(async (newProduct: Omit<Product, 'id'>) => {
    await execute('/api/my-store/products', {
      method: 'POST',
      body: newProduct,
    });
    if (data && !Array.isArray(data)) {
      setProducts(prev => [...prev, data as Product]);
    }
  }, [execute, data]);

  const updateProduct = useCallback(async (productId: string, updatedProduct: Partial<Product>) => {
    await execute(`/api/my-store/products/${productId}`, {
      method: 'PUT',
      body: updatedProduct,
    });
    if (data && !Array.isArray(data)) {
      setProducts(prev => prev.map(p => (p.id === productId ? (data as Product) : p)));
    }
  }, [execute, data]);

  const deleteProduct = useCallback(async (productId: string) => {
    await execute(`/api/my-store/products/${productId}`, {
      method: 'DELETE',
    });
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, [execute]);

  // Efeito para carregar os produtos ao inicializar o hook
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
