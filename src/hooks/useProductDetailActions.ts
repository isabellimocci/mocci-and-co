import { useCallback } from 'react';
import type { Product } from '../models/product.model';
import { useNotification } from '../hooks/useNotification';

const MESSAGES = {
  addError: 'Error adding product to cart.',
  favoriteError: 'Error updating favorite.',
};

export function useProductDetailActions(
  product: Product | undefined,
  quantity: number,
  addToCart: (product: Product, quantity: number) => boolean,
  toggleFavorite: (id: string) => void
) {
  const { notify } = useNotification();

  const handleAddToCart = useCallback((): boolean => {
    if (!product) return false;
    try {
      return addToCart(product, quantity);
    } catch {
      notify(MESSAGES.addError, 'error');
      return false;
    }
  }, [product, quantity, addToCart, notify]);

  const handleToggleFavorite = useCallback(() => {
    if (!product) return;
    try {
      toggleFavorite(product.id);
    } catch {
      notify(MESSAGES.favoriteError, 'error');
    }
  }, [product, toggleFavorite, notify]);

  return { handleAddToCart, handleToggleFavorite };
}
