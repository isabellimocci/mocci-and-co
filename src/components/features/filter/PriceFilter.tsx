import React from 'react';
import Dropdown from '../../common/display/Dropdown';
import type { DropdownOption } from '../../../types/dropdown.types';

interface PriceFilterProps {
  options?: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

const PriceFilter: React.FC<PriceFilterProps> = React.memo(({ options, value, onChange, className }) => (
  <Dropdown
    label='Price'
    options={options || []}
    selectedValue={value}
    onValueChange={onChange}
    className={className}
  />
));

PriceFilter.displayName = 'PriceFilter';

export default PriceFilter;
