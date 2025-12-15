import { useState, useCallback } from 'react';
import apiClient from '../utils/axiosConfig';
import { useCartStore } from './useCartStore';

export function useProductsStore() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { removeFromCart, updateItemInCart } = useCartStore();

  const fetchAllProducts = useCallback(async () => {
    setProducts([])
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

  const createProduct = useCallback(async (productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/products', productData);
      const newProduct = response.data;
      fetchAllProducts();
      return newProduct;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Error al crear el producto.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (id, productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/products/${id}`, productData);
      const updatedProduct = response.data;
      fetchAllProducts();
      updateItemInCart(updatedProduct);
      if (product && product.id === id) {
          setProduct(updatedProduct);
      }
      
      return updatedProduct;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Error al actualizar el producto.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [product, updateItemInCart]);

  const deleteProductById = useCallback(
    async (id) => {
      setIsLoading(true);
      setError(null);
      try {
        await apiClient.delete(`/products/${id}`);
        fetchAllProducts();
        removeFromCart(id); 
        if (product && product.id === id) {
          setProduct(null);
        }

      } catch (err) {
        const errorMessage =
          err.response?.data?.detail || err.message || `No se pudo eliminar el producto con ID ${id}.`;
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [removeFromCart, product]
  );

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
    deleteProductById,
    createProduct,
    updateProduct
  };
}