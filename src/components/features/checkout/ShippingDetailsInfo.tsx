import React from 'react';
import type { ShippingDetails } from '../../../types/paymentForm.types';

interface ShippingDetailsInfoProps {
  shippingDetails: ShippingDetails;
}


const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <dt className='text-[11px] font-semibold uppercase tracking-wide text-text/50'>{label}</dt>
    <dd className='text-sm font-medium text-text break-words'>{value || '—'}</dd>
  </div>
);

const ShippingDetailsInfo: React.FC<ShippingDetailsInfoProps> = ({ shippingDetails }) => (
  <div className='mb-6'>
    <h3 className='text-xs font-bold uppercase tracking-wider text-text/60 mb-3'>Shipping Details</h3>
    <dl className='space-y-5'>
      <div className='space-y-2'>
        <Field label='Name' value={shippingDetails.name} />
        <Field label='Address' value={shippingDetails.address} />
      </div>
      <div className='space-y-2'>
        <Field label='City' value={shippingDetails.city} />
        <Field label='ZIP' value={shippingDetails.zip} />
      </div>
      <Field label='Phone' value={shippingDetails.phone} />
    </dl>
  </div>
);

export default ShippingDetailsInfo;
