import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DiscountContext, type DiscountStatus, type ApplyDiscountResult } from './DiscountContext';
import { useCart } from '../hooks/useCart';
import { validateDiscount } from '../utils/discountStrategies.utils';

const SIMULATED_DELAY_MS = 1000;

export const DiscountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getCartTotal } = useCart();
  const subtotal = getCartTotal();

  const [code, setCode] = useState('');
  const [status, setStatus] = useState<DiscountStatus>('idle');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subtotalRef = useRef(subtotal);
  subtotalRef.current = subtotal;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const applyDiscount = useCallback((nextCode: string, onResult?: ApplyDiscountResult) => {
    const trimmed = nextCode.trim();
    if (!trimmed) {
      setCode('');
      setStatus('error');
      setMessage('Enter a code.');
      onResult?.('Enter a code.', 'error');
      return;
    }
    setIsLoading(true);
    setStatus('idle');
    setMessage('');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const result = validateDiscount(trimmed, subtotalRef.current);
      setCode(result.valid ? trimmed : '');
      setStatus(result.valid ? 'success' : 'error');
      setMessage(result.message);
      onResult?.(result.message, result.valid ? 'success' : 'error');
      setIsLoading(false);
      timerRef.current = null;
    }, SIMULATED_DELAY_MS);
  }, []);

  const clearDiscount = useCallback(() => {
    setCode('');
    setStatus('idle');
    setMessage('');
  }, []);

  const value = useMemo(() => {
    if (!code) return 0;
    const result = validateDiscount(code, subtotal);
    return result.valid ? result.value : 0;
  }, [code, subtotal]);

  const contextValue = useMemo(
    () => ({ code, value, status, message, isLoading, applyDiscount, clearDiscount }),
    [code, value, status, message, isLoading, applyDiscount, clearDiscount]
  );

  return <DiscountContext.Provider value={contextValue}>{children}</DiscountContext.Provider>;
};
