import React, { useCallback } from 'react';
import CartItem from '../components/features/cart/CartItem';
import OrderSummary from '../components/common/OrderSummary';
import EmptyCart from '../components/features/cart/EmptyCart';
import DiscountForm from '../components/common/form/DiscountForm';
import { useCartPageState } from '../hooks/useCartPageState';
import Seo from '../components/common/Seo';

const CartPage: React.FC = () => {
  const {
    cartItems,
    subtotal,
    total,
    discountStatus,
    discountMessage,
    loadingRemove,
    loadingDiscount,
    loadingCheckout,
    handleGoToCheckout,
    handleContinueShopping,
    handleApplyDiscount,
    handleRemove,
    handleQuantityChange,
  } = useCartPageState();

  const renderCartItems = useCallback(() => {
    return (
      <div className="w-full lg:w-3/4 xl:w-4/5 flex flex-col h-full">
        <h1 className="font-cardo text-2xl sm:text-3xl font-black text-primary mb-6 break-words">Shopping Cart</h1>
        <div className="border-b border-t border-secondary p-2 sm:p-4">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              stock={item.stock}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
              loading={loadingRemove === item.id}
            />
          ))}
        </div>
      </div>
    );
  }, [cartItems, handleRemove, handleQuantityChange, loadingRemove]);

  const renderOrderSummary = useCallback(() => {
    return (
      <OrderSummary
        subtotal={subtotal}
        total={total}
        onCheckout={handleGoToCheckout}
        onContinueShopping={handleContinueShopping}
        loadingCheckout={loadingCheckout}
        totalUnits={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      >
        <DiscountForm
          onApply={handleApplyDiscount}
          loading={loadingDiscount}
          status={discountStatus}
          message={discountMessage}
        />
      </OrderSummary>
    );
  }, [subtotal, total, handleGoToCheckout, handleContinueShopping, loadingCheckout, cartItems, handleApplyDiscount, loadingDiscount, discountStatus, discountMessage]);

  const isCartValid = Array.isArray(cartItems);
  const isCartEmpty = isCartValid && cartItems.length === 0;

  if (!isCartValid) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  if (isCartEmpty) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-32 pt-16 pb-2 lg:pt-28 lg:pb-4 max-w-[98vw] min-h-[80vh] flex flex-col justify-start">
      <Seo title="Cart" description="Your shopping cart at Mocci & Co." path="/cart" noIndex />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 flex-1">
        {renderCartItems()}
        {renderOrderSummary()}
      </div>
    </div>
  );
};

export default CartPage;