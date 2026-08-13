import { describe, it, expect } from 'vitest';
import {
  calculateOrderTotal,
  getShippingCost,
  EXPRESS_SHIPPING_COST,
  GIFT_WRAP_COST,
} from './order.utils';

describe('getShippingCost', () => {
  it('is free for standard shipping', () => {
    expect(getShippingCost('standard')).toBe(0);
  });

  it('charges the express fee for express shipping', () => {
    expect(getShippingCost('express')).toBe(EXPRESS_SHIPPING_COST);
  });
});

describe('calculateOrderTotal', () => {
  it('returns the subtotal when there is nothing else', () => {
    expect(calculateOrderTotal({ subtotal: 199 })).toBe(199);
  });

  it('subtracts the discount and adds shipping', () => {
    expect(calculateOrderTotal({ subtotal: 200, discount: 20, shipping: 10 })).toBe(190);
  });

  it('adds extras (gift wrap) on top', () => {
    expect(
      calculateOrderTotal({ subtotal: 200, shipping: 10, extras: GIFT_WRAP_COST })
    ).toBe(225);
  });

  it('still charges shipping when the discount zeroes the subtotal', () => {
    expect(calculateOrderTotal({ subtotal: 100, discount: 100, shipping: 10 })).toBe(10);
  });

  it('never returns a negative total when the discount exceeds the subtotal', () => {
    expect(calculateOrderTotal({ subtotal: 50, discount: 999 })).toBe(0);
  });

  it('clamps to zero rather than letting a big discount eat shipping', () => {
    expect(calculateOrderTotal({ subtotal: 50, discount: 999, shipping: 10 })).toBe(0);
  });

  it('combines every component in the right order', () => {
    expect(
      calculateOrderTotal({ subtotal: 199, discount: 19.9, shipping: 10, extras: 15 })
    ).toBeCloseTo(204.1, 2);
  });
});
