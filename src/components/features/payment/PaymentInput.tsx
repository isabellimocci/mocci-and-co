import React from 'react';

interface PaymentInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

const PaymentInput: React.FC<PaymentInputProps> = ({
  id,
  name,
  value,
  onChange,
  required,
  placeholder,
  icon,
}) => (
  <div className='flex flex-col relative'>
    <label htmlFor={id} className='sr-only'>{placeholder}</label>
    <input
      type='text'
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 border-0 border-b border-secondary bg-transparent focus:outline-none focus:border-primary transition-colors placeholder:text-text/70 placeholder:text-base${icon ? ' pr-10' : ''}`}
      required={required}
      aria-required={required || undefined}
    />
    {icon}
  </div>
);

export default PaymentInput;
