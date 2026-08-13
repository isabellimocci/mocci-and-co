import { useEffect } from 'react';
import { getScrollContainer } from '../utils/scrollContainer.utils';

interface UseModalBehaviorOptions {
  isOpen: boolean;
  onClose: () => void;
  ref?: React.RefObject<HTMLElement | null>;
  lockScroll?: boolean;
}

export function useModalBehavior({
  isOpen,
  onClose,
  ref,
  lockScroll = true,
}: UseModalBehaviorOptions) {
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
    const container = getScrollContainer();
    const previousContainer = container.style.overflow;
    const previousBody = document.body.style.overflow;
    container.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      container.style.overflow = previousContainer;
      document.body.style.overflow = previousBody;
    };
  }, [isOpen, lockScroll]);

  useEffect(() => {
    if (!isOpen || !ref?.current) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    ref.current.focus();
    return () => previouslyFocused?.focus?.();
  }, [isOpen, ref]);
}
