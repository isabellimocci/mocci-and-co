import React from 'react';
import { useCheckoutState } from '../hooks/useCheckoutState';
import CheckoutSummary from '../components/features/checkout/CheckoutSummary.tsx';
import type { ShippingFormData } from '../types/shipping.types';
import DiscountForm from '../components/common/form/DiscountForm.tsx';
import { useDiscount } from '../hooks/useDiscount';
import CheckoutForm from '../components/features/checkout/CheckoutForm.tsx';
import PaymentForm from '../components/features/payment/PaymentForm.tsx';
import CheckoutConfirmationModal from '../components/features/checkout/CheckoutConfirmationModal.tsx';
import { useCart } from '../hooks/useCart';
import { calculateOrderTotal, getShippingCost, GIFT_WRAP_COST } from '../utils/order.utils';
import GiftOptions from '../components/features/checkout/GiftOptions';
import Seo from '../components/common/Seo';

const getShippingMethod = (method: string) => (method === 'express' ? 'express' : 'standard');

const getTotalUnits = (items: Array<{ quantity: number }>) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();
  const {
    step,
    shippingDetails,
    setShippingDetails,
    paymentDetails,
    setPaymentDetails,
    subtotal,
    isLoading,
    error,
    isConfirmationModalOpen,
    goToNextStep,
    goToPreviousStep,
    finalizePurchase,
    closeConfirmationModal,
    giftOptions,
    setGiftOptions,
  } = useCheckoutState();
  const { discount, isLoading: isDiscountLoading, applyDiscount } = useDiscount();

  const shippingMethod = getShippingMethod(shippingDetails.shippingMethod);
  const shippingCost = getShippingCost(shippingMethod);
  const giftWrapCost = giftOptions.giftWrap ? GIFT_WRAP_COST : 0;
  const finalTotal = calculateOrderTotal({
    subtotal,
    discount: discount.value,
    shipping: shippingCost,
    extras: giftWrapCost,
  });

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center lg:mt-16">
      <Seo title="Checkout" description="Secure checkout at Mocci & Co." path="/checkout" noIndex />
      <div className="flex flex-col lg:flex-row-reverse gap-0 lg:gap-16 flex-1 justify-center w-full max-w-[1920px] px-0 md:px-4 lg:px-8">
        <div className="w-full lg:w-[550px] p-4 lg:p-4 mb-0">
          <CheckoutSummary
            items={cartItems}
            subtotal={subtotal}
            shippingMethod={shippingMethod}
            totalUnits={getTotalUnits(cartItems)}
            discount={discount.value}
            giftWrapCost={giftWrapCost}
            discountForm={step === 'shipping' ? (
              <DiscountForm
                onApply={applyDiscount}
                loading={isDiscountLoading}
                status={discount.status}
                message={discount.message}
              />
            ) : null}
          />
        </div>

        <div className="w-full lg:max-w-[1000px] overflow-x-hidden">
          {step === 'shipping' && (
            <CheckoutForm
              data={{ ...shippingDetails, phone: shippingDetails.phone ?? '' }}
              onChange={setShippingDetails as React.Dispatch<React.SetStateAction<ShippingFormData>>}
              onNext={goToNextStep}
              loading={isLoading}
            />
          )}
          {step === 'payment' && (
            <PaymentForm
              data={paymentDetails}
              onChange={setPaymentDetails}
              onBack={goToPreviousStep}
              onFinalize={finalizePurchase}
              loading={isLoading}
              error={error}
              totalAmount={finalTotal}
              shippingDetails={{
                name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
                address: shippingDetails.address,
                city: shippingDetails.city,
                zip: shippingDetails.zipCode,
                phone: shippingDetails.phone ?? ''
              }}
              giftOptionsSlot={<GiftOptions value={giftOptions} onChange={setGiftOptions} />}
            />
          )}
        </div>
      </div>

      <CheckoutConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={closeConfirmationModal}
      />
    </div>
  );
};

export default CheckoutPage;