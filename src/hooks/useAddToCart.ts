import { useCallback } from 'react';
import { useCart } from '../hooks/useCart';
import type { Product } from '../models/product.model';
import { useNotification } from './useNotification';

const MESSAGES = {
  notFound: 'Product not found.',
  invalidQuantity: 'Quantity must be greater than zero.',
  stockExceeded: (requested: number, stock: number) =>
    `Cannot add ${requested} items. Only ${stock} in stock.`,
  addError: 'Error adding product to cart.',
};

export const useAddToCart = () => {
  const { cartItems, addToCart } = useCart();
  const { notify } = useNotification();
  const handleAddToCart = useCallback(
    (product: Product, quantity: number): boolean => {
      if (!product) {
        notify(MESSAGES.notFound, 'error');
        return false;
      }
      if (quantity <= 0) {
        notify(MESSAGES.invalidQuantity, 'warning');
        return false;
      }

      const alreadyInCart =
        cartItems.find(i => i.id === product.id)?.quantity ?? 0;
      if (alreadyInCart + quantity > product.stock) {
        notify(
          MESSAGES.stockExceeded(alreadyInCart + quantity, product.stock),
          'warning',
        );
        return false;
      }

      try {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '',
          quantity,
          stock: product.stock,
        });

        return true;
      } catch {
        notify(MESSAGES.addError, 'error');

        return false;
      }
    },
    [cartItems, addToCart, notify],
  );

  return handleAddToCart;
};
