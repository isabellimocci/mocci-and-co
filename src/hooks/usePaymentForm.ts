import { useCallback, useState } from 'react';
import { MAX_INSTALLMENTS } from '../data/paymentForm.data';

import type { PaymentDetails } from './useCheckoutState';

interface UsePaymentFormProps {
  onChange: React.Dispatch<React.SetStateAction<PaymentDetails>>;
  onBack: () => void;
  onFinalize: () => void;
}

export function usePaymentForm({ onChange, onBack, onFinalize }: UsePaymentFormProps) {
  const [showMock, setShowMock] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [installments, setInstallments] = useState(1);
  const installmentOptions = Array.from({ length: MAX_INSTALLMENTS }, (_, i) => i + 1);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange((prev: PaymentDetails) => ({ ...prev, [name]: value }));
    },
    [onChange]
  );

  const handleInstallmentChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setInstallments(Number(e.target.value));
    },
    []
  );

  const handleMethodSelect = useCallback(
    (method: string) => {
      setSelectedMethod(method);
      setShowMock(false);
    },
    []
  );

  const handleBackClick = useCallback(() => {
    onBack();
  }, [onBack]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onFinalize();
      if (selectedMethod === 'boleto' || selectedMethod === 'pix') {
        setShowMock(true);
      }
    },
    [onFinalize, selectedMethod]
  );

  const handleMockBack = useCallback(() => {
    setShowMock(false);
  }, []);

  return {
    showMock,
    selectedMethod,
    installments,
    installmentOptions,
    handleInputChange,
    handleInstallmentChange,
    handleMethodSelect,
    handleBackClick,
    handleSubmit,
    handleMockBack,
    setShowMock,
    setSelectedMethod,
    setInstallments,
  };
}
