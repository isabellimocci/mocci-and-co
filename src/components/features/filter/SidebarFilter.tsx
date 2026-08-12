import React, { useState } from 'react';
import { PiSortAscendingThin, PiListHeartLight } from 'react-icons/pi';
import { useModalBehavior } from '../../../hooks/useModalBehavior';
import FilterControls from './FilterControls';
import type { FilterControlsProps } from '../../../types/filterControls.types';

type SidebarFilterProps = FilterControlsProps;

const BUTTON_CLASS = `
  flex items-center gap-1 md:gap-2 justify-center w-fit px-1 md:px-2 py-1 md:py-2 mt-4 mb-6
  bg-background border-b border-text/60 text-md md:text-lg sticky top-0 z-[1001]
`;

function SidebarFilter(props: SidebarFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const asideRef = React.useRef<HTMLDivElement>(null);
  useModalBehavior({ isOpen, onClose: () => setIsOpen(false), ref: asideRef });
  const OVERLAY_CLASS = 'fixed inset-0 bg-black/40 z-[1000]';
  const ASIDE_CLASS =
    'fixed top-0 right-0 h-full w-full max-w-md z-[1001] bg-[#f5f0ec] transition-all duration-300';
  const openSidebar = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => setOpen(true);
  const closeSidebar = (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => setOpen(false);

  return (
    <div className='flex items-center w-full'>
      <div className='flex-shrink-0'>
        <button
          className={BUTTON_CLASS}
          onClick={() => openSidebar(setIsOpen)}
          aria-label='Open filters and sort options'
          tabIndex={0}
          title='Open filters and sort options'
        >
          <PiSortAscendingThin className=' w-5 h-6 md:w-6 md:h-6 text-text' />
          <span>Filters & Sort</span>
        </button>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <span className="inline-flex items-center gap-1 text-text/70 text-sm md:text-base select-none">
          <PiListHeartLight className="w-5 h-5 text-primary/60" />
          {props.productCount} results
        </span>
      </div>
      {isOpen && (
        <div
          className={OVERLAY_CLASS}
          onClick={() => closeSidebar(setIsOpen)}
        />
      )}
      <aside
        ref={asideRef}
        className={
          ASIDE_CLASS +
          ' ' +
          (isOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : '-translate-x-10 scale-95 opacity-0 pointer-events-none')
        }
        tabIndex={-1}
        aria-modal={isOpen}
        inert={!isOpen}
        role='dialog'
      >
        <div className='flex items-center justify-between gap-2 px-6 py-4 border-b border-primary/10 bg-[#f5f0ec]/95 rounded-tr-3xl'>
          <span className='text-lg font-semibold uppercase'>Filters</span>
          <div className='flex gap-2 items-center'>
            <button
              onClick={() => closeSidebar(setIsOpen)}
              aria-label='Close filters'
              className='w-10 h-10 flex items-center justify-center text-primary text-2xl'
              type='button'
            >
              ×
            </button>
          </div>
        </div>
        <div className='flex-1 overflow-y-auto px-6 py-4'>
          <FilterControls {...props} />
        </div>
        <div className='sticky bottom-0 left-0 w-full bg-[#f5f0ec]/95 px-6 py-4 border-t border-primary/10 flex justify-center z-10'>
          <button
            onClick={() => closeSidebar(setIsOpen)}
            className='font-cardo px-24 py-2 text-text border border-text font-black uppercase focus:outline-none focus:ring-2 focus:ring-primary/40'
            type='button'
          >
            View Products
          </button>
        </div>
      </aside>
    </div>
  );
}

export default SidebarFilter;
