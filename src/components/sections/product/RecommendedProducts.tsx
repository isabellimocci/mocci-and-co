import React from 'react';
import { useParams } from 'react-router-dom';
import SectionTitle from '../../common/display/SectionTitle';
import { recommendedProductsMock } from '../../../data/recommendedProducts.data';
import ProductCard from '../../features/product/ProductCard';
import { products } from '../../../data/productsDetails.data';
import { useFavorites } from '../../../hooks/useFavorites';

const RECOMMENDATION_COUNT = 4;

const RecommendedProducts: React.FC = () => {
  const { id: currentProductId } = useParams<{ id: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();

  const recommendations = React.useMemo(
    () =>
      recommendedProductsMock
        .filter(recommended => recommended.id !== currentProductId)
        .slice(0, RECOMMENDATION_COUNT),
    [currentProductId]
  );

  const handleFavoriteClick = (id: string) => {
    toggleFavorite(id);
  };

  const checkIsFavorite = (product: { id: string }) => isFavorite(String(product.id));

  return (
    <div className='mt-16 w-full'>
      <SectionTitle>You Might Also Like</SectionTitle>
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
        {recommendations.map(recommended => {
          const product = products.find(p => p.id === recommended.id);
          if (!product) return null;

          return (
            <ProductCard
              key={product.id}
              product={product}
              actionLabel='View Details'
              onFavoriteClick={handleFavoriteClick}
              isFavorite={checkIsFavorite(product)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedProducts;
