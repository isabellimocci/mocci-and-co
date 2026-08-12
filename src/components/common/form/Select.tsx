import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const styles = {
  label: 'text-sm text-text/70 mb-1 block',
  select: [
    'w-full',
    'px-3 py-2',
    'border-0 border-b border-secondary',
    'bg-[#f5f0ec]',
    'text-text/80',
    'focus:outline-none',
    'focus:border-primary',
    'transition-colors',
    'duration-200',
    'text-sm',
    'appearance-none',
  ].join(' '),
  error: 'text-red-500 text-xs mt-1',
  disabled: 'opacity-60 cursor-not-allowed'
};

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  className = '',
  disabled,
  id,
  children,
  ...props
}) => {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;
  return (
    <div className='mt-4 w-full'>
      {label && <label htmlFor={selectId} className={styles.label}>{label}</label>}
      <select
        id={selectId}
        className={`${styles.select} ${disabled ? styles.disabled : ''} ${className}`}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <span id={errorId} role="alert" className={styles.error}>{error}</span>}
    </div>
  );
};
