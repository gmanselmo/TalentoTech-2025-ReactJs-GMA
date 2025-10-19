import { useState, useCallback } from 'react';
import apiClient from '../utils/axiosConfig';

export function useProductsStore() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Algo salió mal';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    setProduct(null);
    try {
      const response = await apiClient.get(`/products/${id}`);
      setProduct(response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || `No se pudo encontrar el producto con ID ${id}.`;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearProduct = useCallback(() => {
    setProduct(null);
    setError(null);
  }, []);

  return {
    products,
    product,
    isLoading,
    error,
    fetchAllProducts,
    fetchProductById,
    clearProduct,
  };
}
