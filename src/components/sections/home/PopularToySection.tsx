import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../features/product/ProductCard';
import type { Product } from '../../../models/product.model';
import catVioletImg from '../../../assets/images/cat-violet.png';
import sheepMargotImg from '../../../assets/images/sheep-margot.png';
import bunnyFleurDeLisImg from '../../../assets/images/bunny-fleur-de-lis.png';
import cowDaisyImg from '../../../assets/images/cow-daisy.png';
import { useFavorites } from '../../../hooks/useFavoritesHooks';

const POPULAR_TOYS: Product[] = [ 
  {
    id: '5',
    name: 'Cat Violet',
    price: 178,
    currency: 'BRL',
    images: [catVioletImg],
    description: [
      'Pink fairycore cat with a violet ribbon.',
      'A magical friend for imaginative play.',
    ],
    details: [
      { label: 'Material', value: 'Organic Cotton' },
      { label: 'Dimensions', value: '26 cm (height)' },
      { label: 'Care', value: 'Hand wash recommended' },
    ],
    category: 'FAIRYCORE TOYS',
    stock: 9,
    reviewsCount: 19,
    rating: 4.7,
    color: 'Pink',
    link: '/products/5',
  },
  {
    id: '19',
    name: 'Sheep Margot',
    price: 185,
    currency: 'BRL',
    images: [sheepMargotImg],
    description: [
      'White sheep plush with soft wool and farmcore style.',
      'Gentle and calming for little ones.',
    ],
    details: [
      { label: 'Material', value: 'Organic Cotton' },
      { label: 'Dimensions', value: '25 cm (height)' },
      { label: 'Care', value: 'Hand wash recommended' },
    ],
    category: 'FARMCORE TOYS',
    stock: 7,
    reviewsCount: 9,
    rating: 4.7,
    color: 'White',
    link: '/products/19',
  },
  {
    id: '3',
    name: 'Bunny Fleur de Lis',
    price: 192,
    currency: 'BRL',
    images: [bunnyFleurDeLisImg],
    description: [
      'Beige bunny with a fleur de lis motif, cottagecore charm.',
      'Soft and huggable for bedtime.',
    ],
    details: [
      { label: 'Material', value: 'Organic Cotton' },
      { label: 'Dimensions', value: '29 cm (height)' },
      { label: 'Care', value: 'Machine wash cold' },
    ],
    category: 'COTTAGECORE TOYS',
    stock: 12,
    reviewsCount: 18,
    rating: 4.8,
    color: 'Beige',
    link: '/products/3',
  },
  {
    id: '7',
    name: 'Cow Daisy',
    price: 172,
    currency: 'BRL',
    images: [cowDaisyImg],
    description: [
      'Black and white cow plush with daisy embroidery.',
      'A farmcore favorite for all ages.',
    ],
    details: [
      { label: 'Material', value: 'Organic Cotton' },
      { label: 'Dimensions', value: '28 cm (height)' },
      { label: 'Care', value: 'Spot clean only' },
    ],
    category: 'FARMCORE TOYS',
    stock: 6,
    reviewsCount: 11,
    rating: 4.4,
    color: 'Black & White',
    link: '/products/7',
  },
];

const PopularToysSection: React.FC = () => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (id: string) => {
    toggleFavorite(id);
  };

  const checkIsFavorite = (product: Product) => isFavorite(String(product.id));

  return (
    <motion.section
      id='popular-toys-section'
      className='py-8'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className='container mx-auto px-4'>
        <motion.h2
          className='font-cardo text-2xl font-black text-left mb-8 uppercase'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          Popular Toys
        </motion.h2>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          {POPULAR_TOYS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onFavoriteClick={() => handleFavoriteClick(String(product.id))}
              isFavorite={checkIsFavorite(product)}
              actionLabel='Choose Options'
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PopularToysSection;
