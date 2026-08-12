import { memo } from 'react';
import RatingStars from '../../common/display/RatingStars';
import PriceDisplay from './PriceDisplay';

interface ProductHeaderProps {
  category: string;
  name: string;
  rating: number;
  reviewsCount: number;
  price: number;
  discountPrice?: number;
}

const ProductHeader = memo(function ProductHeader({
  category,
  name,
  rating,
  reviewsCount,
  price,
  discountPrice,
}: ProductHeaderProps) {
  return (
    <>
      <span className='uppercase tracking-wide text-xs text-brown-700 mb-2 md:mb-3 md:text-sm md:tracking-widest md:block text-left'>
        {category}
      </span>

      <h1 className='font-cardo text-3xl md:text-5xl font-bold text-primary mb-2 md:mb-4 text-left'>
        {name}
      </h1>

      <div className='flex flex-col md:flex-row md:items-center md:gap-3 items-start mb-4 md:mb-6'>
        <div className='flex items-center gap-1 text-base md:text-lg'>
          <RatingStars rating={rating} />
        </div>
        <span className='hidden md:inline mx-2 text-text/40'>|</span>
        <a
          href='#reviews'
          className='text-xs text-primary hover:underline transition-colors md:text-sm md:ml-2'
        >
          {reviewsCount} reviews
        </a>
      </div>

      <div className='mb-3 md:mb-5 md:text-lg text-left'>
        <PriceDisplay
          price={price}
          discountPrice={discountPrice}
        />
      </div>
    </>
  );
});

export default ProductHeader;
