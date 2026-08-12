import React from 'react';
import HeroSection from '../components/sections/home/HeroSection';
import CategorySection from '../components/sections/common/CategorySection';
import PopularToysSection from '../components/sections/home/PopularToySection';
import ValuePropositionSection from '../components/sections/home/ValuePropositionSection';
import NewsletterSection from '../components/sections/common/NewsletterSection';
import Seo, { SITE_URL } from '../components/common/Seo';

const HOME_JSONLD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mocci & Co.',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-500x500.png`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mocci & Co.',
    url: SITE_URL,
  },
];


const HomePage: React.FC = () => {
  return (
    <div className="p-4 text-center">
      <Seo
        description="Handmade plush toys by Mocci & Co. — unique, quality, and crafted with love."
        path="/"
        jsonLd={HOME_JSONLD}
      />
      <main>
        <HeroSection />
        <CategorySection />
        <PopularToysSection />
        <ValuePropositionSection />
        <NewsletterSection />
      </main>
    </div>
  );
};

export default HomePage;