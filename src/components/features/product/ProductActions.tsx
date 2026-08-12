import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';
import FavoriteButton from '../../common/buttons/FavoriteButton';
import ActionButton from '../../common/buttons/ActionButton';
import { useNotification } from '../../../hooks/useNotification';

export interface ProductActionsProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  stock: number;
  isFavorite: boolean;
  onAddToCart: () => boolean;
  onToggleFavorite: () => void;
  buyLabel?: string;
  addToCartLabel?: string;
  outOfStockLabel?: string;
}

const DEFAULT_LABELS = {
  buy: 'Buy it now',
  addToCart: 'Add to cart',
  outOfStock: 'Out of Stock',
  addFavorite: 'Add to Favorites',
  removeFavorite: 'Remove from Favorites',
  addToCartSuccess: 'Product added to cart!',
  addToCartError: 'Error adding product to cart.',
  addFavoriteSuccess: 'Added to favorites!',
  removeFavoriteSuccess: 'Removed from favorites.',
};

const ProductActions: React.FC<ProductActionsProps> = ({
  quantity,
  setQuantity,
  stock,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
  buyLabel = DEFAULT_LABELS.buy,
  addToCartLabel = DEFAULT_LABELS.addToCart,
  outOfStockLabel = DEFAULT_LABELS.outOfStock,
}) => {
  const { notify } = useNotification();
  const navigate = useNavigate();

  const handleAddToCart = React.useCallback(() => {
    try {
      if (onAddToCart()) {
        notify(DEFAULT_LABELS.addToCartSuccess, 'success');
      }
    } catch {
      notify(DEFAULT_LABELS.addToCartError, 'error');
    }
  }, [onAddToCart, notify]);

  const handleBuyItNow = React.useCallback(() => {
    try {
      if (onAddToCart()) {
        navigate('/checkout');
      }
    } catch {
      notify(DEFAULT_LABELS.addToCartError, 'error');
    }
  }, [onAddToCart, navigate, notify]);

  const handleToggleFavorite = React.useCallback(() => {
    onToggleFavorite();
    notify(
      isFavorite ? DEFAULT_LABELS.removeFavoriteSuccess : DEFAULT_LABELS.addFavoriteSuccess,
      'info'
    );
  }, [onToggleFavorite, isFavorite, notify]);

  return (
    <>
      <div className="flex items-end gap-2 mb-6 md:mb-8 justify-start">
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={stock} />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={handleAddToCart}
          className="flex-1 px-6 py-3 border border-brown-800 text-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-brown-50 hover:-translate-y-0.5 hover:scale-102 duration-200"
          disabled={stock === 0}
          type="button"
        >
          {stock > 0 ? addToCartLabel : outOfStockLabel}
        </button>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={handleToggleFavorite}
          label={isFavorite ? DEFAULT_LABELS.removeFavorite : DEFAULT_LABELS.addFavorite}
          variant="detail"
        />
      </div>
      <ActionButton 
        fullWidth 
        className="mb-4" 
        onClick={handleBuyItNow}
        disabled={stock === 0}
      >
        {buyLabel}
      </ActionButton>
    </>
  );
};

export default ProductActions;
