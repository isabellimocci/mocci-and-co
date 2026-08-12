import React, { useCallback } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi2';
import { usePopAnimation } from '../../../hooks/usePopAnimation';
import '../../../styles/pop-animation.css';

type FavoriteButtonVariant = 'detail' | 'default';

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onClick?: () => void;
  label?: string;
  variant?: FavoriteButtonVariant;
}

const BUTTON_CLASSES: Record<FavoriteButtonVariant, string> = {
  detail: [
    'w-12',
    'h-12',
    'min-h-[48px]',
    'p-0',
    'transition-colors',
    'flex',
    'items-center',
    'justify-center',
    'bg-white',
    'border',
    'border-brown-800',
    'hover:bg-brown-50',
    'hover:-translate-y-0.5',
    'hover:scale-102',
    'duration-200',
    'pointer-events-auto',
  ].join(' '),
  default: [
    'w-8',
    'h-8',
    'p-0',
    'transition-colors',
    'flex',
    'items-center',
    'justify-center',
    'bg-transparent',
    'absolute',
    'right-2',
    'top-2',
    'z-10',
    'hover:scale-105',
    'duration-200',
    'pointer-events-auto',
  ].join(' '),
};

const ICON_CLASSES = {
  base: 'text-2xl transition-transform duration-300',
  favorite: 'text-accent',
  notFavorite: 'text-gray-600',
};

const getAriaLabel = (isFavorite: boolean, label?: string): string => {
  if (label) return label;
  return isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite = false, onClick, label, variant = 'default' }) => {
  const [heartRef, triggerPop] = usePopAnimation();

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.classList.add('animate-ping-heart');
    window.setTimeout(() => {
      button.classList.remove('animate-ping-heart');
    }, 400);
    if (onClick) onClick();
    triggerPop();
  }, [onClick, triggerPop]);

  const ariaLabel = getAriaLabel(isFavorite, label);
  const buttonClass = BUTTON_CLASSES[variant];
  const iconClass = `${ICON_CLASSES.base} ${isFavorite ? ICON_CLASSES.favorite : ICON_CLASSES.notFavorite}`;

  return (
    <button
      type="button"
      className={buttonClass}
      aria-label={ariaLabel}
      aria-pressed={isFavorite}
      onClick={handleClick}
      style={{ overflow: 'visible' }}
    >
      <span ref={heartRef} className="inline-block">
        {isFavorite ? (
          <HiHeart className={iconClass} />
        ) : (
          <HiOutlineHeart className={iconClass} />
        )}
      </span>
      <span className="sr-only">{ariaLabel}</span>
    </button>
  );
};

export default FavoriteButton;
