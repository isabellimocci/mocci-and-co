import { useState, useMemo, useEffect } from 'react';
import type { Product } from '../models/product.model';
import { filterProducts, sortProducts } from '../utils/productFilters.utils';
import type { PriceRange } from '../types/productFilters.types';
import { useDebouncedValue } from './useDebouncedValue';

export function useProductFilters(
  allProducts: Product[],
  availablePriceRanges: PriceRange[],
  initialCategory: string = 'All',
  initialSearch: string = ''
) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState<string>('default');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const filteredProducts = useMemo(
    () =>
      filterProducts(
        allProducts,
        debouncedSearchTerm,
        selectedCategory,
        selectedPriceRange,
        selectedColor,
        availablePriceRanges
      ),
    [
      allProducts,
      debouncedSearchTerm,
      selectedCategory,
      selectedPriceRange,
      selectedColor,
      availablePriceRanges,
    ]
  );

  const filteredAndSortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortBy),
    [filteredProducts, sortBy]
  );

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedColor,
    setSelectedColor,
    sortBy,
    setSortBy,
    filteredProducts: filteredAndSortedProducts,
  };
}
