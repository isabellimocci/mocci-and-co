import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../../data/navLinks.data';
import { useNavLinkHandler } from '../../../hooks/useNavLinkHandler';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useModalBehavior } from '../../../hooks/useModalBehavior';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const handleNavClick = useNavLinkHandler(onClose);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, () => {
    if (open) onClose();
  }, open);
  useModalBehavior({ isOpen: open, onClose, lockScroll: false });
  if (!open) return null;
  return (
    <div
      ref={menuRef}
      id='mobile-menu'
      className='bg-white/90 lg:hidden absolute top-full left-0 w-full p-4 z-40'
    >
      <nav aria-label='Mobile'>
        <ul className='flex flex-col gap-4'>
          {NAV_LINKS.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className='block text-text-color hover:text-primary py-2'
                onClick={link.scrollTo ? (e) => handleNavClick(e, link) : () => onClose && onClose()}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
