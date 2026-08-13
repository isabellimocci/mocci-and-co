import { useNavigate } from 'react-router-dom';
import { products } from '../data/products.data';
import { useFavorites } from './useFavorites';
import type { Product } from '../models/product.model';

export interface WishlistState {
  favoriteProducts: Product[];
  handleFavoriteClick: (id: string) => void;
  checkIsFavorite: (product: Product) => boolean;
  navigateToProducts: () => void;
}

export const useWishlist = (): WishlistState => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  const favoriteProducts = products.filter(product => 
    favorites.includes(String(product.id))
  );

  const handleFavoriteClick = (id: string) => {
    toggleFavorite(id);
  };

  const checkIsFavorite = (product: Product) => 
    isFavorite(String(product.id));

  const navigateToProducts = () => 
    navigate('/products');

  return {
    favoriteProducts,
    handleFavoriteClick,
    checkIsFavorite,
    navigateToProducts
  };
};
