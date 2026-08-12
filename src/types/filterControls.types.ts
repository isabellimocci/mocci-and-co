import type { PriceRange, SortOption } from './productFilters.types';

export interface FilterControlsProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  priceRanges: PriceRange[];
  selectedPriceRange: string;
  setSelectedPriceRange: (value: string) => void;
  colors: string[];
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOptions: SortOption[];
  onClose?: () => void;
  productCount: number;
}

export type FilterFieldProps = {
  label: string;
  id: string;
  children: React.ReactNode;
};
