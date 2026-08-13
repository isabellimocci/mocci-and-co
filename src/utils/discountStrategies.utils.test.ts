import { describe, it, expect } from 'vitest';
import { validateDiscount } from './discountStrategies.utils';

describe('validateDiscount', () => {
  it('applies 10% for the valid code', () => {
    const result = validateDiscount('discount10', 200);
    expect(result.valid).toBe(true);
    expect(result.value).toBe(20);
  });

  it('is case-insensitive', () => {
    expect(validateDiscount('DISCOUNT10', 200).valid).toBe(true);
    expect(validateDiscount('Discount10', 200).valid).toBe(true);
  });

  it('ignores surrounding whitespace', () => {
    expect(validateDiscount('  discount10  ', 200).valid).toBe(true);
  });

  it('rejects an unknown code with no discount', () => {
    const result = validateDiscount('nope', 200);
    expect(result.valid).toBe(false);
    expect(result.value).toBe(0);
  });

  it('rejects an empty code with a dedicated message', () => {
    const result = validateDiscount('', 200);
    expect(result.valid).toBe(false);
    expect(result.value).toBe(0);
    expect(result.message).toMatch(/required/i);
  });

  it('scales the discount with the subtotal', () => {
    expect(validateDiscount('discount10', 0).value).toBe(0);
    expect(validateDiscount('discount10', 1000).value).toBe(100);
  });

  it('never returns a discount larger than the subtotal', () => {
    const subtotal = 199;
    expect(validateDiscount('discount10', subtotal).value).toBeLessThanOrEqual(subtotal);
  });
});
