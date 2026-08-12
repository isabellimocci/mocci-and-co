import React from 'react';
import type { GiftOptions as GiftOptionsValue } from '../../../hooks/useCheckoutState';
import { formatCurrency } from '../../../utils/currency.utils';
import { GIFT_WRAP_COST } from '../../../utils/order.utils';

interface GiftOptionsProps {
  value: GiftOptionsValue;
  onChange: React.Dispatch<React.SetStateAction<GiftOptionsValue>>;
}

const MAX_MESSAGE = 200;

const GiftOptions: React.FC<GiftOptionsProps> = ({ value, onChange }) => {
  const toggleWrap = () => onChange(prev => ({ ...prev, giftWrap: !prev.giftWrap }));

  const changeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange(prev => ({ ...prev, giftMessage: e.target.value.slice(0, MAX_MESSAGE) }));

  const hasMessage = value.giftMessage.length > 0;

  return (
    <section className="border border-secondary rounded p-4 mb-6 bg-white/50" aria-label="Gift options">
      <h3 className="font-semibold text-primary mb-3 text-base">Gift options</h3>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={value.giftWrap}
          onChange={toggleWrap}
          className="mt-0.5 accent-primary w-4 h-4 shrink-0"
        />
        {/* Title carries the weight; description recedes; price is right-aligned
            as a scannable money value (same pattern as the Order Summary). */}
        <span className="flex-1 flex items-start justify-between gap-3">
          <span>
            <span className="block text-sm font-semibold text-text">Add gift wrap</span>
            <span className="block text-xs text-text/60">A lovely ribbon and a personalized gift tag</span>
          </span>
          <span className="text-sm font-semibold text-primary whitespace-nowrap">
            +{formatCurrency(GIFT_WRAP_COST)}
          </span>
        </span>
      </label>

      <div className="mt-5">
        <label htmlFor="gift-message" className="block text-sm text-text mb-1">
          Personalized card message <span className="text-text/50 font-normal">(optional)</span>
        </label>
        <textarea
          id="gift-message"
          value={value.giftMessage}
          onChange={changeMessage}
          rows={3}
          maxLength={MAX_MESSAGE}
          placeholder="Write a message for the gift tag…"
          className={`w-full rounded bg-white/70 px-3 py-2 text-sm text-text placeholder:text-text/40 border transition-colors focus:outline-none focus:border-primary ${hasMessage ? 'border-secondary' : 'border-secondary/50'}`}
        />
        <div className="mt-1 text-right text-[10px] text-text/40">
          {value.giftMessage.length}/{MAX_MESSAGE}
        </div>
      </div>
    </section>
  );
};

export default GiftOptions;
