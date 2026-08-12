import type { ChangeEvent, FC } from 'react';
import type { FormFields } from '../../../data/contactPage.data';

const INPUT_CLASS =
  "mt-1 block w-full px-4 py-3 bg-background border border-primary/50 rounded-sm shadow-sm placeholder-text/70 focus:outline-none focus:border-primary transition-colors";

interface InputProps {
  id: string;
  name: keyof FormFields;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
}

export const TextInput: FC<InputProps> = ({ id, name, type = 'text', placeholder, value, onChange, required }) => (
  <>
    <label htmlFor={id} className="sr-only">{placeholder}</label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={INPUT_CLASS}
      required={required}
      aria-required={required}
      autoComplete={name}
    />
  </>
);

interface TextAreaProps extends Omit<InputProps, 'type'> {
  rows?: number;
}

export const TextArea: FC<TextAreaProps> = ({ id, name, placeholder, value, onChange, required, rows = 6 }) => (
  <>
    <label htmlFor={id} className="sr-only">{placeholder}</label>
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={INPUT_CLASS + ' resize-y'}
      required={required}
      aria-required={required}
      rows={rows}
    />
  </>
);
