const onlyDigits = (value: string): string => value.replace(/\D/g, '');

function luhnValid(digits: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

export function isValidCardNumber(cardNumber: string): boolean {
  const digits = onlyDigits(cardNumber);
  if (digits.length < 13 || digits.length > 19) return false;
  if (/^0+$/.test(digits)) return false;
  return luhnValid(digits);
}

export function isValidCardName(cardName: string): boolean {
  return /^[A-Za-zÀ-ÿ ]{3,}$/.test(cardName.trim());
}

export function isValidCVV(cvv: string): boolean {
  return /^\d{3}$/.test(cvv.trim());
}

export function isValidExpiryDate(expiry: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(expiry.trim());
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  return year > currentYear || (year === currentYear && month >= currentMonth);
}

export function formatCardNumber(value: string): string {
  return onlyDigits(value)
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export function formatExpiryDate(value: string): string {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length < 3) return digits;
  return digits.slice(0, 2) + '/' + digits.slice(2);
}

export function validatePaymentForm(data: {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}): { valid: boolean; errors: Partial<Record<string, string>> } {
  const errors: Partial<Record<string, string>> = {};
  if (!isValidCardName(data.cardName)) {
    errors.cardName = 'Cardholder name must be at least 3 letters.';
  }
  if (!isValidCardNumber(data.cardNumber)) {
    errors.cardNumber = 'Enter a valid card number.';
  }
  if (!isValidCVV(data.cvv)) {
    errors.cvv = 'CVV must be 3 digits.';
  }
  if (!isValidExpiryDate(data.expiryDate)) {
    errors.expiryDate = 'Card expiry is invalid or in the past.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
