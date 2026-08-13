import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { CartProvider } from './CartProvider';
import { useCart } from '../hooks/useCart';

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const bear = { id: '1', name: 'Bear Lady Velvet', price: 199, image: '/bear.png', stock: 7 };
const bunny = { id: '2', name: 'Bunny Dahlia', price: 160, image: '/bunny.png', stock: 3 };

const renderCart = () => renderHook(() => useCart(), { wrapper });

beforeEach(() => {
  localStorage.clear();
});

describe('CartProvider', () => {
  it('starts empty', () => {
    const { result } = renderCart();
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.getCartTotal()).toBe(0);
  });

  it('adds an item with the requested quantity', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear, quantity: 2 }));
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('defaults to quantity 1', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear }));
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it('merges a repeated product into a single line', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear, quantity: 2 }));
    act(() => result.current.addToCart({ ...bear, quantity: 3 }));
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(5);
  });

  it('clamps the merged quantity to the available stock', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear, quantity: 6 }));
    act(() => result.current.addToCart({ ...bear, quantity: 6 }));
    expect(result.current.cartItems[0].quantity).toBe(bear.stock);
  });

  it('clamps a single add that already exceeds stock', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bunny, quantity: 99 }));
    expect(result.current.cartItems[0].quantity).toBe(bunny.stock);
  });

  it('clamps updates to the stock ceiling', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear, quantity: 1 }));
    act(() => result.current.updateCartItemQuantity('1', 99));
    expect(result.current.cartItems[0].quantity).toBe(bear.stock);
  });

  it('never lets the quantity drop below 1', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear, quantity: 3 }));
    act(() => result.current.updateCartItemQuantity('1', 0));
    expect(result.current.cartItems[0].quantity).toBe(1);
    act(() => result.current.updateCartItemQuantity('1', -5));
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it('keeps separate products on separate lines', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear }));
    act(() => result.current.addToCart({ ...bunny }));
    expect(result.current.cartItems).toHaveLength(2);
  });

  it('computes the subtotal from price x quantity', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear, quantity: 2 }));
    act(() => result.current.addToCart({ ...bunny, quantity: 1 }));
    expect(result.current.getCartTotal()).toBe(558);
  });

  it('counts total units, not lines', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear, quantity: 2 }));
    act(() => result.current.addToCart({ ...bunny, quantity: 3 }));
    expect(result.current.getCartItemCount()).toBe(5);
  });

  it('removes a single item', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear }));
    act(() => result.current.addToCart({ ...bunny }));
    act(() => result.current.removeFromCart('1'));
    expect(result.current.cartItems.map(i => i.id)).toEqual(['2']);
  });

  it('clears the whole cart', () => {
    const { result } = renderCart();
    act(() => result.current.addToCart({ ...bear }));
    act(() => result.current.clearCart());
    expect(result.current.cartItems).toEqual([]);
  });

  it('persists the cart so it survives a reload', () => {
    const first = renderCart();
    act(() => first.result.current.addToCart({ ...bear, quantity: 2 }));
    first.unmount();

    const second = renderCart();
    expect(second.result.current.cartItems).toHaveLength(1);
    expect(second.result.current.cartItems[0].quantity).toBe(2);
  });

  it('starts empty when stored data is corrupted', () => {
    localStorage.setItem('cart', 'not json');
    const { result } = renderCart();
    expect(result.current.cartItems).toEqual([]);
  });
});
