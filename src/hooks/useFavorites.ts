import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import type { FavoritesContextType } from '../context/FavoritesContext';

export function useFavorites(): FavoritesContextType {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return ctx;
}
