import React from 'react';
import { LiaSpinnerSolid } from 'react-icons/lia';
import Dropdown from '../../common/display/Dropdown';
import type { DropdownOption } from '../../../types/dropdown.types';
import { formatCurrency } from '../../../utils/currency.utils';

export type CartItemProps = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  loading: boolean;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
};

const CartItem: React.FC<CartItemProps> = React.memo(({ id, name, image, price, quantity, stock, onRemove, onQuantityChange, loading }) => {
  const handleRemove = React.useCallback(() => onRemove(id), [id, onRemove]);
  const handleQuantity = React.useCallback((value: string) => onQuantityChange(id, parseInt(value)), [id, onQuantityChange]);
  const quantityOptions: DropdownOption[] = React.useMemo(() => (
    Array.from({ length: Math.max(1, Math.min(stock, 20)) }, (_, i) => ({
      value: String(i + 1),
      label: String(i + 1)
    }))
  ), [stock]);
  return (
    <div className="relative flex items-center gap-4 py-4 border-b border-secondary last:border-b-0 bg-transparent">
      <button
        onClick={handleRemove}
        className={`absolute top-2 right-2 text-sm font-normal text-text/50 hover:text-primary/50 underline z-10 transition-colors ${loading ? 'pointer-events-none opacity-60' : ''}`}
        aria-label={`Remove ${name} from cart`}
        disabled={loading}
      >
        {loading ? (
          <LiaSpinnerSolid className="animate-spin inline mr-1 text-lg" />
        ) : null}
        Remove
      </button>
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded bg-secondary/50 flex items-center justify-center">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-semibold text-text break-words pr-16">{name}</h2>
        <p className="text-text/70">{formatCurrency(price)}</p>
        <div className="flex items-center mt-2 gap-2">
          <span className="text-sm text-text font-normal">Quantity</span>
          <div className="relative min-w-[48px]">
            <Dropdown
              label="Quantity"
              options={quantityOptions}
              selectedValue={String(quantity)}
              onValueChange={handleQuantity}
              className="no-border px-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
CartItem.displayName = 'CartItem';

export default CartItem;
