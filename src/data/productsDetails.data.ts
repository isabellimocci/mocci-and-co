import type { Product } from '../models/product.model';

import bearLadyVelvetImg from '../assets/images/bear-lady-velvet.png';
import bunnyDahliaImg from '../assets/images/bunny-dahlia.png';
import bunnyFleurDeLisImg from '../assets/images/bunny-fleur-de-lis.png';
import catLordCrimsonImg from '../assets/images/cat-lord-crimson.png';
import catVioletImg from '../assets/images/cat-violet.png';
import chickenWillowbelleImg from '../assets/images/chicken-willowbelle.png';
import cowDaisyImg from '../assets/images/cow-daisy.png';
import deerCharlieImg from '../assets/images/deer-charlie.png';
import dogGigiImg from '../assets/images/dog-gigi.png';
import duckPeonyImg from '../assets/images/duck-peony.png';
import elephantPrincessPearlImg from '../assets/images/elephant-princess-pearl.png';
import foxCelesteImg from '../assets/images/fox-celeste.png';
import giraffeSylvieImg from '../assets/images/giraffe-sylvie.png';
import monkeySunnyImg from '../assets/images/monkey-sunny.png';
import mouseCrystalImg from '../assets/images/mouse-crystal.png';
import owlPenelopeImg from '../assets/images/owl-penelope.png';
import penguinBlossomImg from '../assets/images/penguin-blossom.png';
import pigOliviaImg from '../assets/images/pig-olivia.png';
import sheepMargotImg from '../assets/images/sheep-margot.png';
import squirrelLilybelleImg from '../assets/images/squirrel-lilybelle.png';

const MATERIAL_ORGANIC_COTTON = { label: 'Material', value: 'Organic Cotton' };
const MATERIAL_ORGANIC_COTTON_LINEN = { label: 'Material', value: 'Organic Cotton & Linen' };
const MATERIAL_100_ORGANIC_COTTON = { label: 'Material', value: '100% Organic Cotton' };
const CARE_SPOT_CLEAN = { label: 'Care', value: 'Spot clean only' };
const CARE_HAND_WASH = { label: 'Care', value: 'Hand wash recommended' };
const CARE_MACHINE_WASH = { label: 'Care', value: 'Machine wash cold' };

const getDimension = (height: number) => ({ label: 'Dimensions', value: `${height} cm (height)` });

function createProduct({
  id,
  name,
  price,
  images,
  description,
  details,
  category,
  stock,
  reviewsCount,
  rating,
  color,
  link,
  currency = 'BRL',
}: Omit<Product, 'currency'> & { currency?: string }): Product {
  return {
    id,
    name,
    price,
    currency,
    images,
    description,
    details,
    category,
    stock,
    reviewsCount,
    rating,
    color,
    link,
  };
}

export const PRODUCTS: Product[] = [
  createProduct({
    id: '1',
    name: 'Bear Lady Velvet',
    price: 199,
    images: [bearLadyVelvetImg],
    description: [
      'A plush bear with a velvet dress, inspired by Victorian elegance.',
      'Perfect for collectors and children alike.'
    ],
    details: [MATERIAL_100_ORGANIC_COTTON, getDimension(30), CARE_SPOT_CLEAN],
    category: 'VICTORIAN TOYS',
    stock: 10,
    reviewsCount: 32,
    rating: 4.9,
    color: 'Brown',
    link: '/products/1',
  }),
  createProduct({
    id: '2',
    name: 'Bunny Dahlia',
    price: 175,
    images: [bunnyDahliaImg],
    description: [
      'A soft white bunny with floral details, farmcore inspired.',
      'A gentle companion for all ages.'
    ],
    details: [MATERIAL_ORGANIC_COTTON_LINEN, getDimension(28), CARE_HAND_WASH],
    category: 'FARMCORE TOYS',
    stock: 8,
    reviewsCount: 21,
    rating: 4.7,
    color: 'White',
    link: '/products/2',
  }),
  createProduct({
    id: '3',
    name: 'Bunny Fleur de Lis',
    price: 192,
    images: [bunnyFleurDeLisImg],
    description: [
      'Beige bunny with a fleur de lis motif, cottagecore charm.',
      'Soft and huggable for bedtime.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(29), CARE_MACHINE_WASH],
    category: 'COTTAGECORE TOYS',
    stock: 12,
    reviewsCount: 18,
    rating: 4.8,
    color: 'Beige',
    link: '/products/3',
  }),
  createProduct({
    id: '4',
    name: 'Cat Lord Crimson',
    price: 180,
    images: [catLordCrimsonImg],
    description: [
      'A regal orange cat with a crimson bow tie.',
      'Victorian style for a touch of class.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(27), CARE_SPOT_CLEAN],
    category: 'VICTORIAN TOYS',
    stock: 7,
    reviewsCount: 15,
    rating: 4.6,
    color: 'Orange',
    link: '/products/4',
  }),
  createProduct({
    id: '5',
    name: 'Cat Violet',
    price: 178,
    images: [catVioletImg],
    description: [
      'Pink fairycore cat with a violet ribbon.',
      'A magical friend for imaginative play.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(26), CARE_HAND_WASH],
    category: 'FAIRYCORE TOYS',
    stock: 9,
    reviewsCount: 19,
    rating: 4.7,
    color: 'Pink',
    link: '/products/5',
  }),
  createProduct({
    id: '6',
    name: 'Chicken Willowbelle',
    price: 160,
    images: [chickenWillowbelleImg],
    description: [
      'White chicken plush with farmcore vibes.',
      'Soft, safe, and perfect for little hands.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(25), CARE_MACHINE_WASH],
    category: 'FARMCORE TOYS',
    stock: 11,
    reviewsCount: 13,
    rating: 4.5,
    color: 'White',
    link: '/products/6',
  }),
  createProduct({
    id: '7',
    name: 'Cow Daisy',
    price: 172,
    images: [cowDaisyImg],
    description: [
      'Black and white cow plush with daisy embroidery.',
      'A farmcore favorite for all ages.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(28), CARE_SPOT_CLEAN],
    category: 'FARMCORE TOYS',
    stock: 6,
    reviewsCount: 11,
    rating: 4.4,
    color: 'Black & White',
    link: '/products/7',
  }),
  createProduct({
    id: '8',
    name: 'Deer Charlie',
    price: 188,
    images: [deerCharlieImg],
    description: [
      'Brown deer plush with cottagecore details.',
      'Gentle and sweet, perfect for cuddles.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(30), CARE_HAND_WASH],
    category: 'COTTAGECORE TOYS',
    stock: 10,
    reviewsCount: 14,
    rating: 4.8,
    color: 'Brown',
    link: '/products/8',
  }),
  createProduct({
    id: '9',
    name: 'Dog Gigi',
    price: 170,
    images: [dogGigiImg],
    description: [
      'Brown Victorian dog plush with a classic look.',
      'A loyal friend for every child.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(27), CARE_SPOT_CLEAN],
    category: 'VICTORIAN TOYS',
    stock: 8,
    reviewsCount: 10,
    rating: 4.6,
    color: 'Brown',
    link: '/products/9',
  }),
  createProduct({
    id: '10',
    name: 'Duck Peony',
    price: 155,
    images: [duckPeonyImg],
    description: [
      'Beige duck plush with peony flower details.',
      'Victorian inspired, soft and safe.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(25), CARE_MACHINE_WASH],
    category: 'VICTORIAN TOYS',
    stock: 7,
    reviewsCount: 9,
    rating: 4.5,
    color: 'Beige',
    link: '/products/10',
  }),
  createProduct({
    id: '11',
    name: 'Elephant Princess Pearl',
    price: 210,
    images: [elephantPrincessPearlImg],
    description: [
      'Grey elephant plush with a pearl crown.',
      'Victorian luxury for your plush collection.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(32), CARE_SPOT_CLEAN],
    category: 'VICTORIAN TOYS',
    stock: 5,
    reviewsCount: 8,
    rating: 4.9,
    color: 'Grey',
    link: '/products/11',
  }),
  createProduct({
    id: '12',
    name: 'Fox Celeste',
    price: 165,
    images: [foxCelesteImg],
    description: [
      'Orange fairycore fox plush with celestial details.',
      'A magical friend for every adventure.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(27), CARE_HAND_WASH],
    category: 'FAIRYCORE TOYS',
    stock: 9,
    reviewsCount: 12,
    rating: 4.7,
    color: 'Orange',
    link: '/products/12',
  }),
  createProduct({
    id: '13',
    name: 'Giraffe Sylvie',
    price: 185,
    images: [giraffeSylvieImg],
    description: [
      'Orange giraffe plush with Victorian style.',
      'Tall, soft, and perfect for hugs.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(33), CARE_SPOT_CLEAN],
    category: 'VICTORIAN TOYS',
    stock: 6,
    reviewsCount: 10,
    rating: 4.6,
    color: 'Orange',
    link: '/products/13',
  }),
  createProduct({
    id: '14',
    name: 'Monkey Sunny',
    price: 168,
    images: [monkeySunnyImg],
    description: [
      'Beige monkey plush with a sunny smile.',
      'Cottagecore inspired, always cheerful.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(28), CARE_MACHINE_WASH],
    category: 'COTTAGECORE TOYS',
    stock: 8,
    reviewsCount: 11,
    rating: 4.5,
    color: 'Beige',
    link: '/products/14',
  }),
  createProduct({
    id: '15',
    name: 'Mouse Crystal',
    price: 158,
    images: [mouseCrystalImg],
    description: [
      'White fairycore mouse plush with crystal details.',
      'A tiny friend for magical moments.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(20), CARE_HAND_WASH],
    category: 'FAIRYCORE TOYS',
    stock: 10,
    reviewsCount: 13,
    rating: 4.7,
    color: 'White',
    link: '/products/15',
  }),
  createProduct({
    id: '16',
    name: 'Owl Penelope',
    price: 150,
    images: [owlPenelopeImg],
    description: [
      'Beige owl plush with wise eyes and soft wings.',
      'Cottagecore favorite for bedtime stories.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(22), CARE_SPOT_CLEAN],
    category: 'COTTAGECORE TOYS',
    stock: 7,
    reviewsCount: 9,
    rating: 4.6,
    color: 'Beige',
    link: '/products/16',
  }),
  createProduct({
    id: '17',
    name: 'Penguin Blossom',
    price: 162,
    images: [penguinBlossomImg],
    description: [
      'Black penguin plush with blossom embroidery.',
      'Fairycore style, soft and cuddly.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(24), CARE_MACHINE_WASH],
    category: 'FAIRYCORE TOYS',
    stock: 6,
    reviewsCount: 8,
    rating: 4.5,
    color: 'Black',
    link: '/products/17',
  }),
  createProduct({
    id: '18',
    name: 'Pig Olivia',
    price: 159,
    images: [pigOliviaImg],
    description: [
      'Pink pig plush with a cute snout and farmcore charm.',
      'A playful friend for every child.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(23), CARE_SPOT_CLEAN],
    category: 'FARMCORE TOYS',
    stock: 8,
    reviewsCount: 10,
    rating: 4.6,
    color: 'Pink',
    link: '/products/18',
  }),
  createProduct({
    id: '19',
    name: 'Sheep Margot',
    price: 185,
    images: [sheepMargotImg],
    description: [
      'White sheep plush with soft wool and farmcore style.',
      'Gentle and calming for little ones.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(25), CARE_HAND_WASH],
    category: 'FARMCORE TOYS',
    stock: 7,
    reviewsCount: 9,
    rating: 4.7,
    color: 'White',
    link: '/products/19',
  }),
  createProduct({
    id: '20',
    name: 'Squirrel Lilybelle',
    price: 163,
    images: [squirrelLilybelleImg],
    description: [
      'Grey squirrel plush with a bushy tail and fairycore details.',
      'A whimsical friend for every adventure.'
    ],
    details: [MATERIAL_ORGANIC_COTTON, getDimension(21), CARE_SPOT_CLEAN],
    category: 'FAIRYCORE TOYS',
    stock: 6,
    reviewsCount: 8,
    rating: 4.5,
    color: 'Grey',
    link: '/products/20',
  }),
];

export { PRODUCTS as products };