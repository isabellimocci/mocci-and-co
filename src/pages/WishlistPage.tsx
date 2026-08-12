import React from 'react';
import ProductList from '../components/features/product/ProductList';
import { EmptyState } from '../components/common/EmptyState';
import { useWishlist } from '../hooks/useWishlist';
import { WISHLIST_STRINGS } from '../constants/wishlist.constants';
import Seo from '../components/common/Seo';

const WishlistPage: React.FC = () => {
  const {
    favoriteProducts,
    handleFavoriteClick,
    checkIsFavorite,
    navigateToProducts
  } = useWishlist();

  const renderEmptyState = () => (
    <EmptyState
      title={WISHLIST_STRINGS.EMPTY_TITLE}
      description={WISHLIST_STRINGS.EMPTY_DESCRIPTION}
      buttonText={WISHLIST_STRINGS.EXPLORE_BUTTON}
      onButtonClick={navigateToProducts}
    />
  );

  if (favoriteProducts.length === 0) {
    return renderEmptyState();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Seo title="Wishlist" description="Your saved plush toys at Mocci & Co." path="/wishlist" noIndex />
      <h1 className="font-cardo text-2xl md:text-3xl lg:text-4xl font-black text-primary text-center m-10 uppercase">
        {WISHLIST_STRINGS.PAGE_TITLE}
      </h1>
      <ProductList
        products={favoriteProducts}
        onFavoriteClick={handleFavoriteClick}
        isFavorite={checkIsFavorite}
        emptyState={renderEmptyState()}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
      />
    </div>
  );
};

export default WishlistPage;
