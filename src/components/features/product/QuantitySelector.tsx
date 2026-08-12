import React, { useId } from 'react';

export type QuantitySelectorProps = {
  quantity: number;
  setQuantity: (q: number) => void;
  stock: number;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity, stock }) => {
  const inputId = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(Math.min(val, stock));
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '' || parseInt(e.target.value) < 1) setQuantity(1);
  };
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center mb-1">
        <label htmlFor={inputId} className="text-xs text-text font-medium">Quantity</label>
        <span className="mx-2 text-text/40">|</span>
        <span className="text-sm text-text/60">{stock} in stock</span>
      </div>
      <div className="flex items-center border border-brown-800 overflow-hidden bg-white mt-1">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="px-3 py-2 text-brown-800 hover:bg-brown-100 transition-colors outline-none border-none bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ boxShadow: 'none', border: 'none' }}
          type="button"
        >-</button>
        <input
          type="text"
          id={inputId}
          value={quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-12 text-center border-x border-brown-800 text-text bg-white"
          style={{ boxShadow: 'none' }}
        />
        <button
          onClick={() => setQuantity(Math.min(stock, quantity + 1))}
          disabled={quantity >= stock}
          aria-label="Increase quantity"
          className="px-3 py-2 text-brown-800 hover:bg-brown-100 transition-colors outline-none border-none bg-white disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ boxShadow: 'none', border: 'none' }}
          type="button"
        >+</button>
      </div>
    </div>
  );
};

export default QuantitySelector;
