import { useState } from 'react';
import type { PaymentDetails } from './useCheckoutState';
import { validatePaymentForm } from '../utils/payment.utils';

interface UseFormSubmissionProps {
  data: PaymentDetails;
  selectedMethod: string;
  onFinalize: () => void;
  setShowMock: (show: boolean) => void;
}

export const useFormSubmission = ({
  data,
  selectedMethod,
  onFinalize,
  setShowMock,
}: UseFormSubmissionProps) => {
  const [formErrors, setFormErrors] = useState<Partial<Record<string, string>>>(
    {},
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === 'boleto' || selectedMethod === 'pix') {
      setShowMock(true);
      return;
    }

    if (selectedMethod === 'credit') {
      const { valid, errors } = validatePaymentForm(data);
      setFormErrors(errors);
      if (!valid) return;
    }

    onFinalize();
  };

  return {
    formErrors,
    handleSubmit,
  };
};
