import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CartContext } from './CartContext';

const CART_STORAGE_KEY = 'cart';

const readStoredCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  clearCart: () => void;
}

const clampToStock = (quantity: number, stock: number): number =>
  Math.max(1, Math.min(quantity, stock));

const getUpdatedCartItems = (items: CartItem[], item: Omit<CartItem, 'quantity'> & { quantity?: number }): CartItem[] => {
  const existingItem = items.find(i => i.id === item.id);
  if (existingItem) {
    return items.map(i =>
      i.id === item.id
        ? { ...i, quantity: clampToStock(i.quantity + (item.quantity || 1), item.stock) }
        : i
    );
  }
  return [...items, { ...item, quantity: clampToStock(item.quantity || 1, item.stock) }];
};

const getCartTotal = (items: CartItem[]): number =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);

const getCartItemCount = (items: CartItem[]): number =>
  items.reduce((count, item) => count + item.quantity, 0);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore write errors (e.g. storage full or unavailable)
    }
  }, [cartItems]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems(prevItems => getUpdatedCartItems(prevItems, item));
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const updateCartItemQuantity = useCallback((itemId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: clampToStock(quantity, item.stock) } : item
      )
    );
  }, []);

  const value = useMemo<CartContextType>(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCartTotal: () => getCartTotal(cartItems),
    getCartItemCount: () => getCartItemCount(cartItems),
    clearCart,
  }), [cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
