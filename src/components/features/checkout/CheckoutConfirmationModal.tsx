import React, { useRef, useEffect } from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useModalBehavior } from '../../../hooks/useModalBehavior';

export interface CheckoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutConfirmationModal: React.FC<CheckoutConfirmationModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useModalBehavior({ isOpen, onClose, ref: modalRef });

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-confirm-title"
        tabIndex={-1}
        className="bg-white p-10 max-w-[400px] w-full mx-auto shadow-xl text-center rounded-sm animate-modalEntry outline-none"
      >
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <IoCheckmarkCircleOutline className="text-primary text-5xl" />
          </div>
        </div>
        <h2 id="checkout-confirm-title" className="font-cardo text-3xl font-black text-primary mb-4">Order Confirmed</h2>
        <div className="space-y-3 mb-8">
          <p className="text-text/80 font-light">
            Your order has been confirmed & it is on the way.
          </p>
          <p className="text-sm text-text/60 font-light">
            Check your email for the details.
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full px-8 py-4 bg-transparent border border-primary text-primary text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          Back to Home
        </button>
      </div>
    </ModalOverlay>
  );
};

const ModalOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-fadeIn">
    {children}
  </div>
);

export default CheckoutConfirmationModal;