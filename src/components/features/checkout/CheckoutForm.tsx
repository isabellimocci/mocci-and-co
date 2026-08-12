import React, { memo, useCallback } from 'react';
import { LiaSpinnerSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import type { ShippingFormData } from '../../../types/shipping.types';
import useFormValidation from '../../../hooks/useFormValidation';
import FormField from '../../common/form/FormField';
import ShippingMethod from './ShippingMethod';
import { FormSection, FormRow, FormFieldWrapper } from '../../common/form/FormLayout';
import { styles } from '../../../styles/checkout-form.styles';
import { formatCurrency } from '../../../utils/currency.utils';
import { EXPRESS_SHIPPING_COST } from '../../../utils/order.utils';

interface CheckoutFormProps {
  data: ShippingFormData;
  onChange: React.Dispatch<React.SetStateAction<ShippingFormData>>;
  onNext: () => void;
  loading: boolean;
}

const CheckoutForm: React.FC<CheckoutFormProps> = memo(
  ({ data, onChange, onNext, loading }) => {
    const navigate = useNavigate();
    const { errors, validateForm, clearError } = useFormValidation(data);

      const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange(prevData => ({
          ...prevData,
          [name]: value
        }));
        clearError(name);
      },
      [onChange, clearError]
    );    const handleBackToCart = useCallback(() => {
      navigate('/cart');
    }, [navigate]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
          onNext();
        }
      },
      [validateForm, onNext]
    );

    return (
      <section className={styles.container} aria-label='Checkout Form'>
        <FormSection title="Contact">
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <FormRow>
              <FormFieldWrapper>
                <FormField
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  error={errors.firstName}
                  required
                />
              </FormFieldWrapper>
              <FormFieldWrapper>
                <FormField
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  error={errors.lastName}
                  required
                />
              </FormFieldWrapper>
            </FormRow>

            <FormRow>
              <FormFieldWrapper>
                <FormField
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Email"
                  error={errors.email}
                  required
                />
              </FormFieldWrapper>
              <FormFieldWrapper>
                <FormField
                  type="text"
                  id="phone"
                  name="phone"
                  value={data.phone || ''}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  error={errors.phone}
                  required
                />
              </FormFieldWrapper>
            </FormRow>

            <FormSection title="Delivery">
              <FormRow>
                <FormFieldWrapper>
                  <FormField
                    type="text"
                    id="country"
                    name="country"
                    value={data.country}
                    onChange={handleChange}
                    placeholder="Country"
                    error={errors.country}
                    required
                  />
                </FormFieldWrapper>
                <FormFieldWrapper>
                  <FormField
                    type="text"
                    id="city"
                    name="city"
                    value={data.city}
                    onChange={handleChange}
                    placeholder="City"
                    error={errors.city}
                    required
                  />
                </FormFieldWrapper>
              </FormRow>

              <FormRow>
                <FormFieldWrapper>
                  <FormField
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={data.zipCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    error={errors.zipCode}
                    required
                  />
                </FormFieldWrapper>
                <FormFieldWrapper>
                  <FormField
                    type="text"
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    placeholder="Address"
                    error={errors.address}
                    required
                  />
                </FormFieldWrapper>
              </FormRow>
            </FormSection>

            <div className={styles.shippingMethodsContainer}>
              <div className="shipping-method-radio">
                <ShippingMethod
                  label="STANDARD SHIPPING"
                  value="standard"
                  checked={data.shippingMethod === 'standard'}
                  onChange={onChange}
                  description="8-10 days"
                  priceLabel="FREE"
                  required
                />
              </div>
              <div className="shipping-method-radio">
                <ShippingMethod
                  label="EXPRESS SHIPPING"
                  value="express"
                  checked={data.shippingMethod === 'express'}
                  onChange={onChange}
                  description="2-3 days"
                  priceLabel={formatCurrency(EXPRESS_SHIPPING_COST)}
                />
              </div>
            </div>
            <div className='h-2' />
            <div className='flex flex-col items-start checkout-buttons px-4 md:px-0'>
              <button
                type='submit'
                className={styles.submitButton(loading)}
                disabled={loading}
              >
                {loading ? (
                  <LiaSpinnerSolid className='animate-spin inline mr-2 text-lg' />
                ) : (
                  'Payment Method'
                )}
              </button>
            </div>

            <span
              className={styles.backButton}
              role='button'
              tabIndex={0}
              onClick={handleBackToCart}
              onKeyPress={e => {
                if (e.key === 'Enter' || e.key === ' ') handleBackToCart();
              }}
            >
              Back to Shopping Cart
            </span>
          </form>
        </FormSection>
      </section>
    );
  }
);

export default CheckoutForm;
