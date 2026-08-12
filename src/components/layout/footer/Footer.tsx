import React from 'react';
import FooterBrand from './FooterBrand';
import FooterNav from './FooterNav';
import FooterSocial from './FooterSocial';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-secondary border-t border-primary/20 pt-6 pb-3 md:pt-6 md:pb-2 lg:pt-8 lg:pb-3 px-4 mt-12'>
      <div className='container mx-auto max-w-5xl flex flex-col items-center gap-6'>
        <FooterBrand />
        <FooterNav />
        <FooterSocial />
      </div>
      <div className='container mx-auto max-w-5xl mt-6 border-t border-primary/10 pt-3 md:pt-2 lg:pt-3 text-center'>
        <p className='text-xs font-normal lg:text-sm text-text/60'>
          &copy; {currentYear} Mocci & Co. | All rights reserved.<br />
          <span className="block mt-1">
            Website credit: <a href="https://www.linkedin.com/in/isabellimocci/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Isabelli Mocci</a>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
