export const formatCurrency = (value: number, locale = 'pt-BR', currency = 'BRL'): string => {
  const safeValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(safeValue);
};

export const calculateInstallmentAmount = (total: number, installments: number): number => {
  if (installments <= 0) throw new Error('Number of installments must be greater than zero');
  if (total < 0) throw new Error('Total amount must be greater than or equal to zero');

  return Math.round((total / installments) * 100) / 100;
};
