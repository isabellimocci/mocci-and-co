import { describe, it, expect } from 'vitest';
import { formatCurrency, calculateInstallmentAmount } from './currency.utils';

const normalize = (value: string) => value.replace(/\s/g, ' ');

describe('formatCurrency', () => {
  it('formats as Brazilian real by default', () => {
    expect(normalize(formatCurrency(199))).toBe('R$ 199,00');
  });

  it('always shows two decimal places', () => {
    expect(normalize(formatCurrency(5))).toBe('R$ 5,00');
    expect(normalize(formatCurrency(33.1))).toBe('R$ 33,10');
  });

  it('uses a thousands separator', () => {
    expect(normalize(formatCurrency(1234.5))).toBe('R$ 1.234,50');
  });

  it('formats zero instead of rendering nothing', () => {
    expect(normalize(formatCurrency(0))).toBe('R$ 0,00');
  });

  it('falls back to zero for NaN/Infinity instead of printing garbage', () => {
    expect(normalize(formatCurrency(NaN))).toBe('R$ 0,00');
    expect(normalize(formatCurrency(Infinity))).toBe('R$ 0,00');
  });
});

describe('calculateInstallmentAmount', () => {
  it('divides the total evenly', () => {
    expect(calculateInstallmentAmount(200, 2)).toBe(100);
  });

  it('rounds to cents so the value is a real currency amount', () => {
    expect(calculateInstallmentAmount(199, 6)).toBe(33.17);
  });

  it('returns the full total for a single installment', () => {
    expect(calculateInstallmentAmount(199, 1)).toBe(199);
  });

  it('handles a zero total', () => {
    expect(calculateInstallmentAmount(0, 6)).toBe(0);
  });

  it('rejects zero or negative installments', () => {
    expect(() => calculateInstallmentAmount(100, 0)).toThrow();
    expect(() => calculateInstallmentAmount(100, -1)).toThrow();
  });

  it('rejects a negative total', () => {
    expect(() => calculateInstallmentAmount(-1, 3)).toThrow();
  });
});
