import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';
import { useDiscount } from './useDiscount';
import { calculateOrderTotal } from '../utils/order.utils';

function useCartNavigation() {
  const navigate = useNavigate();
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const goToCheckout = useCallback((onError: (message: string) => void) => {
    setLoadingCheckout(true);
    setTimeout(() => {
      setLoadingCheckout(false);
      try {
        navigate('/checkout');
      } catch {
        onError('Error redirecting to checkout.');
      }
    }, 900);
  }, [navigate]);

  const continueShopping = useCallback((onError: (message: string) => void) => {
    try {
      navigate('/products');
    } catch {
      onError('Error redirecting to products.');
    }
  }, [navigate]);

  return { goToCheckout, continueShopping, loadingCheckout };
}

export function useCartPageState() {
  const { cartItems, removeFromCart, updateCartItemQuantity, getCartTotal } = useCart();
  const [loadingRemove, setLoadingRemove] = useState<string | null>(null);

  const subtotal = useMemo(() => getCartTotal(), [getCartTotal]);
  const { discount, isLoading: loadingDiscount, applyDiscount } = useDiscount();
  const total = useMemo(
    () => calculateOrderTotal({ subtotal, discount: discount.value }),
    [subtotal, discount.value]
  );
  const { goToCheckout, continueShopping, loadingCheckout } = useCartNavigation();

  const handleGoToCheckout = useCallback(() => {
    goToCheckout(() => {});
  }, [goToCheckout]);

  const handleContinueShopping = useCallback(() => {
    continueShopping(() => {});
  }, [continueShopping]);

  const handleApplyDiscount = useCallback((code: string) => {
    applyDiscount(code, () => {});
  }, [applyDiscount]);

  const handleRemove = useCallback((id: string) => {
    setLoadingRemove(id);
    setTimeout(() => {
      removeFromCart(id);
      setLoadingRemove(null);
    }, 900);
  }, [removeFromCart]);

  const handleQuantityChange = useCallback((id: string, quantity: number) => {
    updateCartItemQuantity(id, quantity);
  }, [updateCartItemQuantity]);

  return {
    cartItems,
    subtotal,
    total,
    discountStatus: discount.status,
    discountMessage: discount.message,
    loadingRemove,
    loadingDiscount,
    loadingCheckout,
    handleGoToCheckout,
    handleContinueShopping,
    handleApplyDiscount,
    handleRemove,
    handleQuantityChange,
  };
}
