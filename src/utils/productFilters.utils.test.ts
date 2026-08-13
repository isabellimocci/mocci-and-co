import { describe, it, expect } from 'vitest';
import { filterProducts, sortProducts, getUniqueValues } from './productFilters.utils';
import type { Product } from '../models/product.model';
import type { PriceRange } from '../types/productFilters.types';

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: '1',
  name: 'Bear Lady Velvet',
  price: 199,
  currency: 'BRL',
  images: ['/products/bear.png'],
  description: ['A bear.'],
  details: [],
  category: 'VICTORIAN TOYS',
  stock: 10,
  reviewsCount: 0,
  rating: 5,
  color: 'Brown',
  ...overrides,
});

const PRICE_RANGES: PriceRange[] = [
  { label: 'All', min: 0, max: 300 },
  { label: 'R$ 150 - R$ 170', min: 150, max: 170 },
  { label: 'R$ 191 - R$ 220', min: 191, max: 220 },
];

const catalog: Product[] = [
  makeProduct({ id: '1', name: 'Bear Lady Velvet', price: 199, category: 'VICTORIAN TOYS', color: 'Brown' }),
  makeProduct({ id: '2', name: 'Bunny Dahlia', price: 160, category: 'COTTAGECORE TOYS', color: 'White' }),
  makeProduct({ id: '3', name: 'Cow Daisy', price: 210, category: 'FARMCORE TOYS', color: 'Grey' }),
];

const ALL = 'All';
const filterWith = (
  search = '',
  category = ALL,
  priceLabel = ALL,
  color = ALL,
  products = catalog
) => filterProducts(products, search, category, priceLabel, color, PRICE_RANGES);

describe('filterProducts', () => {
  it('returns everything when no filter is applied', () => {
    expect(filterWith()).toHaveLength(3);
  });

  it('matches the search term case-insensitively', () => {
    expect(filterWith('bear')).toHaveLength(1);
    expect(filterWith('BEAR')).toHaveLength(1);
  });

  it('matches a partial name', () => {
    expect(filterWith('dahl')[0].name).toBe('Bunny Dahlia');
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterWith('dragon')).toEqual([]);
  });

  it('filters by category', () => {
    const result = filterWith('', 'FARMCORE TOYS');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Cow Daisy');
  });

  it('filters by color', () => {
    expect(filterWith('', ALL, ALL, 'White')).toHaveLength(1);
  });

  it('filters by price range (inclusive bounds)', () => {
    const result = filterWith('', ALL, 'R$ 191 - R$ 220');
    expect(result.map(p => p.name).sort()).toEqual(['Bear Lady Velvet', 'Cow Daisy']);
  });

  it('falls back to the default range for an unknown price label', () => {
    expect(filterWith('', ALL, 'not-a-range')).toHaveLength(3);
  });

  it('combines filters with AND', () => {
    const result = filterWith('', 'VICTORIAN TOYS', 'R$ 191 - R$ 220');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('returns empty when filters contradict each other', () => {
    expect(filterWith('', 'FARMCORE TOYS', 'R$ 150 - R$ 170')).toEqual([]);
  });
});

describe('sortProducts', () => {
  it('sorts by price ascending', () => {
    expect(sortProducts(catalog, 'price-asc').map(p => p.price)).toEqual([160, 199, 210]);
  });

  it('sorts by price descending', () => {
    expect(sortProducts(catalog, 'price-desc').map(p => p.price)).toEqual([210, 199, 160]);
  });

  it('sorts by name A-Z and Z-A', () => {
    expect(sortProducts(catalog, 'name-asc')[0].name).toBe('Bear Lady Velvet');
    expect(sortProducts(catalog, 'name-desc')[0].name).toBe('Cow Daisy');
  });

  it('keeps the original order for the default sort', () => {
    expect(sortProducts(catalog, 'default').map(p => p.id)).toEqual(['1', '2', '3']);
  });

  it('does not mutate the array it receives', () => {
    const original = [...catalog];
    sortProducts(catalog, 'price-desc');
    expect(catalog).toEqual(original);
  });
});

describe('getUniqueValues', () => {
  it('lists unique values prefixed with "All"', () => {
    expect(getUniqueValues(catalog, 'category')).toEqual([
      'All',
      'VICTORIAN TOYS',
      'COTTAGECORE TOYS',
      'FARMCORE TOYS',
    ]);
  });

  it('deduplicates repeated values', () => {
    const dupes = [makeProduct({ color: 'Brown' }), makeProduct({ id: '2', color: 'Brown' })];
    expect(getUniqueValues(dupes, 'color')).toEqual(['All', 'Brown']);
  });
});
