import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useFavorites } from '../../../hooks/useFavorites';

type BadgeProps = {
  count: number;
  positionClass?: string;
};

function Badge({ count, positionClass = "-bottom-2 -right-1" }: BadgeProps) {
  if (count <= 0) return null;
  return (
    <span className={`absolute ${positionClass} bg-accent text-white rounded-full text-xs w-4 h-4 flex items-center justify-center`}>
      {count}
    </span>
  );
}

function HeaderIcons() {
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const { favorites } = useFavorites();
  const cartCount = getCartItemCount();
  const favoritesCount = favorites.length;

  return (
    <div className="flex items-center gap-1">
      <button
        className="text-text-color text-xl lg:mr-3 relative"
        onClick={() => navigate('/wishlist')}
        aria-label="Go to wishlist"
      >
        <HiOutlineHeart aria-label="Wishlist" />
        <Badge count={favoritesCount} positionClass="-bottom-2 -right-1" />
      </button>
      <button
        className="text-text-color text-xl p-2 relative"
        onClick={() => navigate('/cart')}
        aria-label="Go to cart"
      >
        <HiOutlineShoppingBag aria-label="Shopping Cart" />
        <Badge count={cartCount} positionClass="-bottom-0 -right-0" />
      </button>
    </div>
  );
}

export default HeaderIcons;
