import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RecommendedProducts from './RecommendedProducts';
import { FavoritesProvider } from '../../../context/FavoritesProvider';

const renderAtProduct = (productId: string) =>
  render(
    <MemoryRouter initialEntries={[`/products/${productId}`]}>
      <FavoritesProvider>
        <Routes>
          <Route path="/products/:id" element={<RecommendedProducts />} />
        </Routes>
      </FavoritesProvider>
    </MemoryRouter>
  );

const hrefsOf = () =>
  screen
    .getAllByRole('link')
    .map(link => link.getAttribute('href'))
    .filter((href): href is string => Boolean(href));

describe('RecommendedProducts', () => {
  it('points every card at a product detail route', () => {
    renderAtProduct('1');
    const hrefs = hrefsOf();
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/^\/products\/\d+$/);
    }
  });

  it('never recommends the product currently being viewed', () => {
    renderAtProduct('1');
    expect(hrefsOf()).not.toContain('/products/1');
  });

  it('excludes the current product on any route', () => {
    renderAtProduct('2');
    expect(hrefsOf()).not.toContain('/products/2');
  });

  it('still shows a full set of recommendations after filtering', () => {
    renderAtProduct('1');
    const unique = new Set(hrefsOf());
    expect(unique.size).toBe(4);
  });
});
