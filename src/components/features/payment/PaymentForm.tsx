import type { FC, ReactNode } from 'react';
import BankSlip from './BankSlip';
import { FormButton } from '../../common/form/FormButton';
import PixMock from './PixMock';
import { BOLETO_MOCK_VALUE, PIX_MOCK_VALUE } from '../../../data/paymentForm.data';
import { usePaymentForm } from '../../../hooks/usePaymentForm';
import ShippingDetailsInfo from '../checkout/ShippingDetailsInfo.tsx';
import PaymentMethodsSelector from './PaymentMethodsSelector';
import PaymentInfo from './PaymentInfo.tsx';
import FormActions from '../../common/form/FormActions.tsx';
import { paymentIcons } from '../../../constants/paymentIcons.tsx';
import type { PaymentFormProps } from '../../../types/paymentForm.types.ts';
import { useFormSubmission } from '../../../hooks/useFormSubmission.ts';
import { useInputHandler } from '../../../hooks/useInputHandler.ts';

const PaymentForm: FC<PaymentFormProps & { giftOptionsSlot?: ReactNode }> = ({
  data,
  onChange,
  onBack,
  onFinalize,
  loading,
  error,
  totalAmount,
  shippingDetails,
  giftOptionsSlot,
}) => {
  const {
    showMock,
    selectedMethod,
    installments,
    installmentOptions,
    handleInstallmentChange,
    handleMethodSelect,
    handleBackClick,
    handleMockBack,
    setShowMock,
  } = usePaymentForm({ onChange, onBack, onFinalize });

  const { formErrors, handleSubmit } = useFormSubmission({
    data,
    selectedMethod,
    onFinalize,
    setShowMock
  });

  const { handleInputChange } = useInputHandler({ onChange });

  const handleConfirmMockPayment = () => {
    onFinalize();
  };

  const renderPaymentMock = () => {
    if (!showMock) return null;

    return (
      <div className='mb-8'>
        {selectedMethod === 'boleto' ? (
          <BankSlip value={BOLETO_MOCK_VALUE} amount={totalAmount} />
        ) : (
          <PixMock value={PIX_MOCK_VALUE} amount={totalAmount} />
        )}
        <div className='mt-6 flex flex-col-reverse gap-4 md:flex-row md:justify-start'>
          <FormButton type='button' variant='secondary' onClick={handleMockBack} loading={loading}>
            Back
          </FormButton>
          <FormButton type='button' variant='primary' onClick={handleConfirmMockPayment} loading={loading}>
            I've paid
          </FormButton>
        </div>
      </div>
    );
  };

  const renderPaymentForm = () => {
    if (showMock) return null;

    return (
      <form onSubmit={handleSubmit} className='space-y-8 w-full max-w-xl'>
        <PaymentInfo
          selectedMethod={selectedMethod}
          data={data}
          handleInputChange={handleInputChange}
          installments={installments}
          installmentOptions={installmentOptions}
          handleInstallmentChange={handleInstallmentChange}
          loading={loading}
          totalAmount={totalAmount}
          formErrors={formErrors}
        />
        <FormActions loading={loading} onBack={handleBackClick} />
      </form>
    );
  };

  return (
    <div className='p-6'>
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4' role='alert'>
          <span className='block sm:inline'>{error}</span>
        </div>
      )}
      <ShippingDetailsInfo shippingDetails={shippingDetails} />
      {giftOptionsSlot}
      <PaymentMethodsSelector
        selectedMethod={selectedMethod}
        onSelect={handleMethodSelect}
        loading={loading}
        icons={paymentIcons}
      />
      {renderPaymentMock()}
      {renderPaymentForm()}
    </div>
  );
};

export default PaymentForm;
