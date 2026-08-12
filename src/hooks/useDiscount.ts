import { useContext, useMemo } from 'react';
import { DiscountContext, type DiscountStatus } from '../context/DiscountContext';

export type { DiscountStatus };

export interface DiscountState {
  value: number;
  status: DiscountStatus;
  message: string;
}

export function useDiscount() {
  const ctx = useContext(DiscountContext);
  if (!ctx) {
    throw new Error('useDiscount must be used within a DiscountProvider');
  }
  const { value, status, message, isLoading, applyDiscount, clearDiscount } = ctx;
  const discount = useMemo<DiscountState>(
    () => ({ value, status, message }),
    [value, status, message]
  );
  return { discount, isLoading, applyDiscount, clearDiscount };
}
