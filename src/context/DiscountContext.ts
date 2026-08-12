import { createContext } from 'react';

export type DiscountStatus = 'idle' | 'success' | 'error';

export type ApplyDiscountResult = (message: string, type: 'success' | 'error') => void;

export interface DiscountContextType {
  code: string;
  value: number;
  status: DiscountStatus;
  message: string;
  isLoading: boolean;
  applyDiscount: (code: string, onResult?: ApplyDiscountResult) => void;
  clearDiscount: () => void;
}

export const DiscountContext = createContext<DiscountContextType | undefined>(undefined);
