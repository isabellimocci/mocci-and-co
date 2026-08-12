import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import type { ShippingFormData } from '../../../types/shipping.types';
import CheckoutForm from './CheckoutForm';

const defaultProps = {
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    zipCode: '',
    address: '',
    shippingMethod: 'standard' as const,
  } satisfies ShippingFormData,
  onChange: vi.fn(),
  onNext: vi.fn(),
  loading: false,
};

const renderComponent = () =>
  render(
    <MemoryRouter>
      <CheckoutForm {...defaultProps} />
    </MemoryRouter>
  );

describe('CheckoutForm', () => {
  it('renders shipping fields', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address')).toBeInTheDocument();
  });

  it('shows both shipping method options', () => {
    renderComponent();
    expect(screen.getByText('STANDARD SHIPPING')).toBeInTheDocument();
    expect(screen.getByText('EXPRESS SHIPPING')).toBeInTheDocument();
  });
});
