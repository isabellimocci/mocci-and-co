import React, { memo } from "react";
import type { CartItem as CartItemType } from "../../../context/CartProvider";
import { formatCurrency } from "../../../utils/currency.utils";
import { calculateOrderTotal, getShippingCost, type ShippingMethod } from "../../../utils/order.utils";

interface CheckoutSummaryProps {
  items: CartItemType[];
  subtotal: number;
  shippingMethod: ShippingMethod;
  discount?: number;
  giftWrapCost?: number;
  totalUnits: number;
  discountForm?: React.ReactNode;
}

function getShippingLabel(method: ShippingMethod): string {
  return method === "express" ? "Express" : "Standard";
}

const CheckoutItem: React.FC<{ item: CartItemType }> = memo(({ item }) => {
  return (
    <div className="flex items-center gap-4" key={item.id}>
      <div className="flex-shrink-0 w-16 h-16 relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain p-1 bg-primary/10"
          loading="lazy"
        />
        <span className="absolute -top-2 -right-2 text-xs bg-primary/80 text-white w-5 h-5 flex items-center justify-center rounded-full">
          {item.quantity}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-text line-clamp-1">{item.name}</h3>
        <p className="text-xs text-text/70">Quantity: {item.quantity}</p>
      </div>
      <span className="text-sm font-medium text-text">{formatCurrency(item.price * item.quantity)}</span>
    </div>
  );
});

const CheckoutSummary: React.FC<CheckoutSummaryProps> = memo(
  ({ items, subtotal, shippingMethod, discount = 0, giftWrapCost = 0, totalUnits, discountForm }) => {
    const shippingCost = getShippingCost(shippingMethod);
    const total = calculateOrderTotal({ subtotal, discount, shipping: shippingCost, extras: giftWrapCost });

    return (
      <section className="bg-white/20 p-6" aria-label="Order Summary">
        <header>
          <h2 className="font-cardo font-bold text-primary text-2xl sm:text-3xl mb-8">Order Summary</h2>
        </header>
        <div className="space-y-4 mb-4 border-b border-secondary pb-4">
          {items.map((item) => (
            <CheckoutItem item={item} key={item.id} />
          ))}
        </div>
        <div className="space-y-2 text-sm text-text/80 mb-4">
          <div className="flex justify-between">
            <span>
              Subtotal &bull; {totalUnits} {totalUnits === 1 ? "item" : "items"}
            </span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping ({getShippingLabel(shippingMethod)})</span>
            <span>{shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}</span>
          </div>
          {giftWrapCost > 0 && (
            <div className="flex justify-between">
              <span>Gift wrap</span>
              <span>{formatCurrency(giftWrapCost)}</span>
            </div>
          )}
          <div className="flex justify-between italic">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        </div>
        <div className="flex justify-between font-normal text-xl text-primary pt-4 border-t border-secondary mb-10">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        {discountForm && <div className="mb-2">{discountForm}</div>}
      </section>
    );
  }
);

export default CheckoutSummary;