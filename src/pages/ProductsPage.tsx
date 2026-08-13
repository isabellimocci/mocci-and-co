import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/features/product/ProductList';
import { products } from '../data/productsDetails.data';
import { priceRanges, sortOptions, categories } from '../data/products.data';
import { getUniqueValues } from '../utils/productFilters.utils';
import { useProductFilters } from '../hooks/useProductFilters';
import { useFavorites } from '../hooks/useFavorites';
import FilterControls from '../components/features/filter/FilterControls';
import SidebarFilter from '../components/features/filter/SidebarFilter';
import Seo, { SITE_URL } from '../components/common/Seo';

const slugify = (value: string) => value.toLowerCase().replace(/\s+/g, '-');

const categoryFromSlug = (slug: string | null): string => {
  if (!slug) return 'All';
  return categories.find(category => slugify(category) === slug) ?? 'All';
};

const PRODUCTS_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
  ],
};

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = categoryFromSlug(searchParams.get('category'));
  const initialSearch = searchParams.get('search') ?? '';

  const {
    selectedCategory,
    setSelectedCategory,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedColor,
    setSelectedColor,
    sortBy,
    setSortBy,
    filteredProducts,
  } = useProductFilters(products, priceRanges, initialCategory, initialSearch);

  const { toggleFavorite, isFavorite } = useFavorites();

  const productCategories = React.useMemo(() => getUniqueValues(products, 'category'), []);
  const productColors = React.useMemo(() => getUniqueValues(products, 'color'), []);

  return (
    <div className='py-8'>
      <Seo
        title="Our Collection"
        description="Browse the full collection of handmade plush toys by Mocci & Co."
        path="/products"
        jsonLd={PRODUCTS_JSONLD}
      />
      <div className='container mx-auto px-4'>
        <h1 className='font-cardo text-2xl md:text-3xl lg:text-4xl font-black text-center text-primary m-6 lg:m-10 uppercase'>
          Our Collection
        </h1>
        <p className='lg:max-w-5xl mx-auto mb-10 text-xs md:text-sm lg:text-lg text-center text-text/80 leading-relaxed'>
          Our charming plush friends are made for both playtime adventures and
          quiet cuddles.
          <br />
          Whether you’re tucking them in for a nap or setting up a little tea
          party, they’re always ready to join the fun.
          <br />
          <br />
          <strong>
            Choose your companion and start a memory worth holding onto.
          </strong>
        </p>

        <div className='mb-8 block lg:hidden'>
          <SidebarFilter
            categories={productCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRanges={priceRanges}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            colors={productColors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
            productCount={filteredProducts.length}
          />
        </div>

        <div className='mb-8 hidden lg:flex'>
          <FilterControls
            categories={productCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRanges={priceRanges}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            colors={productColors}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
            productCount={filteredProducts.length}
          />
        </div>

        <ProductList
          products={filteredProducts}
          onFavoriteClick={toggleFavorite}
          isFavorite={product => isFavorite(String(product.id))}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
