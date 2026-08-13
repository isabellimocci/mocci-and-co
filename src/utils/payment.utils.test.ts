import { describe, it, expect } from 'vitest';
import {
  isValidCardNumber,
  isValidCardName,
  isValidCVV,
  isValidExpiryDate,
  formatCardNumber,
  formatExpiryDate,
  validatePaymentForm,
} from './payment.utils';

const VISA = '4242424242424242';
const AMEX = '378282246310005';

const expiryFromNow = (monthsAhead: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsAhead);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear() % 100).padStart(2, '0');
  return `${mm}/${yy}`;
};

describe('isValidCardNumber', () => {
  it('accepts a Luhn-valid number', () => {
    expect(isValidCardNumber(VISA)).toBe(true);
  });

  it('accepts a number with spaces (as the input mask writes it)', () => {
    expect(isValidCardNumber('4242 4242 4242 4242')).toBe(true);
  });

  it('accepts a 15-digit Amex', () => {
    expect(isValidCardNumber(AMEX)).toBe(true);
  });

  it('rejects a number that fails the checksum', () => {
    expect(isValidCardNumber('4242424242424243')).toBe(false);
  });

  it('rejects all zeros', () => {
    expect(isValidCardNumber('0000000000000000')).toBe(false);
  });

  it('rejects too short and too long', () => {
    expect(isValidCardNumber('4242')).toBe(false);
    expect(isValidCardNumber('4'.repeat(20))).toBe(false);
  });

  it('rejects letters', () => {
    expect(isValidCardNumber('abcd efgh ijkl mnop')).toBe(false);
  });
});

describe('isValidCVV', () => {
  it('accepts exactly 3 digits', () => {
    expect(isValidCVV('123')).toBe(true);
  });

  it('rejects other lengths and non-digits', () => {
    expect(isValidCVV('12')).toBe(false);
    expect(isValidCVV('1234')).toBe(false);
    expect(isValidCVV('12a')).toBe(false);
  });
});

describe('isValidCardName', () => {
  it('accepts a plain name', () => {
    expect(isValidCardName('Isabelli Mocci')).toBe(true);
  });

  it('accepts accented characters', () => {
    expect(isValidCardName('José Antônio')).toBe(true);
  });

  it('rejects names shorter than 3 letters and names with digits', () => {
    expect(isValidCardName('AB')).toBe(false);
    expect(isValidCardName('Isabelli 123')).toBe(false);
  });
});

describe('isValidExpiryDate', () => {
  it('accepts a future date', () => {
    expect(isValidExpiryDate(expiryFromNow(12))).toBe(true);
  });

  it('accepts the current month', () => {
    expect(isValidExpiryDate(expiryFromNow(0))).toBe(true);
  });

  it('rejects a past date', () => {
    expect(isValidExpiryDate(expiryFromNow(-12))).toBe(false);
  });

  it('rejects an impossible month', () => {
    expect(isValidExpiryDate('99/99')).toBe(false);
    expect(isValidExpiryDate('00/30')).toBe(false);
    expect(isValidExpiryDate('13/30')).toBe(false);
  });

  it('rejects a malformed value', () => {
    expect(isValidExpiryDate('1/30')).toBe(false);
    expect(isValidExpiryDate('')).toBe(false);
  });
});

describe('formatCardNumber', () => {
  it('groups digits in blocks of four', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242');
  });

  it('strips non-digits and does not leave a trailing space', () => {
    expect(formatCardNumber('4242-4242')).toBe('4242 4242');
  });

  it('caps the length at 19 digits', () => {
    expect(formatCardNumber('4'.repeat(25)).replace(/\s/g, '')).toHaveLength(19);
  });
});

describe('formatExpiryDate', () => {
  it('inserts the slash once there are 3+ digits', () => {
    expect(formatExpiryDate('1230')).toBe('12/30');
    expect(formatExpiryDate('123')).toBe('12/3');
  });

  it('leaves 1-2 digits untouched so backspacing works', () => {
    expect(formatExpiryDate('1')).toBe('1');
    expect(formatExpiryDate('12')).toBe('12');
  });
});

describe('validatePaymentForm', () => {
  const validForm = {
    cardName: 'Isabelli Mocci',
    cardNumber: VISA,
    expiryDate: expiryFromNow(12),
    cvv: '123',
  };

  it('passes with a fully valid card', () => {
    const { valid, errors } = validatePaymentForm(validForm);
    expect(valid).toBe(true);
    expect(errors).toEqual({});
  });

  it('reports the specific invalid field', () => {
    const { valid, errors } = validatePaymentForm({ ...validForm, cvv: '12' });
    expect(valid).toBe(false);
    expect(errors.cvv).toBeDefined();
    expect(errors.cardNumber).toBeUndefined();
  });

  it('rejects an expired card', () => {
    const { valid, errors } = validatePaymentForm({
      ...validForm,
      expiryDate: expiryFromNow(-1),
    });
    expect(valid).toBe(false);
    expect(errors.expiryDate).toBeDefined();
  });

  it('collects every error at once', () => {
    const { valid, errors } = validatePaymentForm({
      cardName: 'A',
      cardNumber: '123',
      expiryDate: '99/99',
      cvv: 'x',
    });
    expect(valid).toBe(false);
    expect(Object.keys(errors)).toHaveLength(4);
  });
});
