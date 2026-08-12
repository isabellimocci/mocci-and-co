import React from 'react';
import { formatCurrency } from '../../../utils/currency.utils';

export type PriceDisplayProps = {
  price: number;
  discountPrice?: number;
};

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, discountPrice }) => (
  <div>
    {discountPrice ? (
      <>
        <span className="text-xs text-brown-700 line-through mr-2">
          {formatCurrency(price)}
        </span>
        <span className="text-lg md:text-xl font-medium text-brown-800">
          {formatCurrency(discountPrice)}
        </span>
      </>
    ) : (
      <span className="text-lg md:text-xl font-medium text-brown-800">
        {formatCurrency(price)}
      </span>
    )}
  </div>
);

export default PriceDisplay;
