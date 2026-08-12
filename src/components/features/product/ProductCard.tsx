import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../../common/buttons/FavoriteButton';
import type { ProductCardProps } from '../../../types/productCard.types';
import { formatCurrency } from '../../../utils/currency.utils';
import {
  CARD_CLASS,
  IMAGE_WRAPPER_CLASS,
  IMAGE_CLASS,
  CONTENT_CLASS,
  TITLE_CLASS,
  PRICE_CLASS,
  LINK_CLASS
} from '../../../styles/productCard.styles';


interface ProductImageProps {
  src: string;
  alt: string;
  link: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, link }) => (
  <Link to={link}>
    <img src={src} alt={alt} className={`${IMAGE_CLASS} cursor-pointer`} loading="lazy" />
  </Link>
);


interface ProductContentProps {
  name: string;
  price: number;
  link: string;
  actionLabel: string;
}

const ProductContent: React.FC<ProductContentProps> = ({ name, price, link, actionLabel }) => (
  <div className={CONTENT_CLASS}>
    <div>
      <Link to={link}>
        <h3 className={`${TITLE_CLASS} cursor-pointer`}>{name}</h3>
      </Link>
      <p className={PRICE_CLASS}>{formatCurrency(price)}</p>
    </div>
    <Link to={link} className={LINK_CLASS}>
      {actionLabel}
    </Link>
  </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavoriteClick, isFavorite = false, actionLabel = 'Choose Options' }) => {
  const productLink = product.link || `/products/${product.id}`;
  const handleFavoriteClick = onFavoriteClick ? () => onFavoriteClick(String(product.id)) : undefined;

  return (
    <article className={CARD_CLASS}>
      <div className={IMAGE_WRAPPER_CLASS}>
        <ProductImage src={product.images[0]} alt={product.name} link={productLink} />
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={handleFavoriteClick}
          label={`Favorite ${product.name}`}
        />
      </div>
      <ProductContent
        name={product.name}
        price={product.price}
        link={productLink}
        actionLabel={actionLabel}
      />
    </article>
  );
};

export default ProductCard;
