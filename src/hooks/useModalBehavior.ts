import { useEffect } from 'react';

interface UseModalBehaviorOptions {
  isOpen: boolean;
  onClose: () => void;
  /** Panel element to focus on open (and restore focus from on close). */
  ref?: React.RefObject<HTMLElement | null>;
  /** Lock body scroll while open (default true). Disable for dropdown-style menus. */
  lockScroll?: boolean;
}

/**
 * Shared accessible-modal behavior: Escape to close, body scroll lock, and
 * focus move to the panel on open with focus restored to the trigger on close.
 */
export function useModalBehavior({ isOpen, onClose, ref, lockScroll = true }: UseModalBehaviorOptions) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !lockScroll) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen, lockScroll]);

  useEffect(() => {
    if (!isOpen || !ref?.current) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    ref.current.focus();
    return () => previouslyFocused?.focus?.();
  }, [isOpen, ref]);
}
