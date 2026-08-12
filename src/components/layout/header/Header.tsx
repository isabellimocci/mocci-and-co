import React, { useState } from 'react';
import { HiOutlineBars3CenterLeft, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import Logo from './Logo';
import HeaderIcons from './HeaderIcons';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : '/products');
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  return (
    <header className='shadow-sm p-4 sticky top-0 z-50 bg-background'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='flex items-center lg:hidden'>
            <button
              className='text-2xl p-2'
              onClick={() => setIsMobileMenuOpen(open => !open)}
              aria-label='Open mobile menu'
              aria-expanded={isMobileMenuOpen}
              aria-controls='mobile-menu'
              type='button'
            >
              <HiOutlineBars3CenterLeft aria-hidden='true' />
            </button>
          </div>
          <DesktopNav />
        </div>
        <Logo />
        <div className='flex items-center gap-1'>
          <button
            className='text-xl p-2 text-text-color'
            type='button'
            aria-label='Search products'
            aria-expanded={isSearchOpen}
            aria-controls='header-search'
            onClick={() => setIsSearchOpen(open => !open)}
          >
            <HiOutlineMagnifyingGlass aria-hidden='true' />
          </button>
          <HeaderIcons />
        </div>
      </div>
      {isSearchOpen && (
        <form
          id='header-search'
          onSubmit={handleSearchSubmit}
          className='container mx-auto mt-3'
          role='search'
        >
          <input
            autoFocus
            type='search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') setIsSearchOpen(false); }}
            placeholder='Search products by name…'
            aria-label='Search products by name'
            className='w-full border-b border-secondary bg-transparent px-2 py-2 text-text placeholder:text-text/60 focus:outline-none focus:border-primary'
          />
        </form>
      )}
      <MobileMenu
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
