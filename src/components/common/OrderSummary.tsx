import React from 'react';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { formatCurrency } from '../../utils/currency.utils';

export type OrderSummaryProps = {
  subtotal: number;
  total: number;
  loadingCheckout: boolean;
  onCheckout: () => void;
  onContinueShopping: () => void;
  totalUnits: number;
  children?: React.ReactNode;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, total, loadingCheckout, onCheckout, onContinueShopping, totalUnits, children }) => (
  <div className="w-full lg:w-1/3">
    <h2 className="font-cardo text-2xl sm:text-3xl font-black text-primary mb-6">Order Summary</h2>
    <div className="border-t border-secondary p-6 font-normal">
      <div className="flex justify-between text-text/80 mb-8">
        <span>Subtotal •   {totalUnits} {totalUnits === 1 ? 'item' : 'items'}</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between items-center text-text/80 mb-6">
        <span>Shipping</span>
        <span className="text-xs italic text-text/60">Calculated at checkout</span>
      </div>
      <div className="flex justify-between text-xl font-normal text-primary pt-4 border-t border-secondary mb-4">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      {children}
      <button
        onClick={onCheckout}
        className={`mt-3 w-full px-6 py-3 border border-text text-text text-xs font-semibold uppercase transition-colors duration-200 hover:bg-primary hover:text-white focus:bg-primary focus:text-white ${loadingCheckout ? 'pointer-events-none opacity-60' : ''}`}
        disabled={loadingCheckout}
      >
        {loadingCheckout ? (
          <LiaSpinnerSolid className="animate-spin inline mr-2 text-lg" />
        ) : null}
        Checkout Now
      </button>
      <span
        onClick={onContinueShopping}
        className="mt-4 block w-full text-left text-xs font-semibold uppercase underline cursor-pointer hover:text-primary/90 transition-colors"
        role="button"
        tabIndex={0}
        onKeyPress={e => { if (e.key === "Enter" || e.key === " ") onContinueShopping(); }}
      >
        Continue Shopping
      </span>
    </div>
  </div>
);

export default OrderSummary;
