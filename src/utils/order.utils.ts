export const EXPRESS_SHIPPING_COST = 10;
export const GIFT_WRAP_COST = 15;

export type ShippingMethod = 'standard' | 'express';

export const getShippingCost = (method: ShippingMethod): number =>
  method === 'express' ? EXPRESS_SHIPPING_COST : 0;

export interface OrderTotalInput {
  subtotal: number;
  discount?: number;
  shipping?: number;
  extras?: number;
}

export const calculateOrderTotal = ({
  subtotal,
  discount = 0,
  shipping = 0,
  extras = 0,
}: OrderTotalInput): number => Math.max(0, subtotal - discount + shipping + extras);
