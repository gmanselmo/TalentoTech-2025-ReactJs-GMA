import { useState, useEffect } from 'react';

const CART_EVENT = 'cartUpdated';

export function useCartStore() {
  const readCart = () => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error parsing cart from localStorage', e);
      localStorage.removeItem('cart');
      return [];
    }
  };

  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    const handler = () => {
      setCart(readCart());
    };
    window.addEventListener(CART_EVENT, handler);
    return () => window.removeEventListener(CART_EVENT, handler);
  }, []);

  const updateCart = (updater) => {
    setCart((prevCart) => {
      const newCart = typeof updater === 'function' ? updater(prevCart) : updater;
      localStorage.setItem('cart', JSON.stringify(newCart));
      window.dispatchEvent(new Event(CART_EVENT));
      return newCart;
    });
  };

  const addToCart = (item) => {
    updateCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const decrementItem = (id) => {
    updateCart((prevCart) =>
      prevCart
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    updateCart((prevCart) => prevCart.filter((p) => p.id !== id));
  };

  const clearCart = () => updateCart([]);

  const totalItems = cart.reduce((sum, p) => sum + (p.quantity || 0), 0);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    addToCart,
    decrementItem,
    removeFromCart,
    clearCart,
    totalItems,
    cartTotal,
  };
}
