import React from 'react';
import Dropdown from '../../common/display/Dropdown';
import type { DropdownOption } from '../../../types/dropdown.types';

const ColorTagButton = React.memo(({ opt, selected, onClick }: { opt: DropdownOption, selected: boolean, onClick: (v: string) => void }) => {
  const getColorStyle = (option: DropdownOption) => {
    if (option.label === 'All') return { display: 'none' };
    if ('color' in option && typeof (option as { color?: string }).color === 'string') {
      return { backgroundColor: (option as { color: string }).color };
    }
    const colorMap: Record<string, string> = {
      Red: '#ef4444', Blue: '#3b82f6', Green: '#22c55e', Yellow: '#eab308', Pink: '#ec4899', Purple: '#a21caf', Orange: '#f59e42', Black: '#222', White: '#fff', Gray: '#7b7280', Grey: '#7b7280', Brown: '#a16207', Beige: '#f5f5dc',
    };
    return { backgroundColor: colorMap[option.label] || '#e5e7eb' };
  };
  return (
    <button
      className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap flex items-center gap-2 transition-all duration-150
        ${selected ? 'bg-text/80 text-white scale-105' : 'bg-white text-primary border-primary/30 hover:bg-primary/10'}
        aria-checked:${selected}`}
      aria-checked={selected}
      aria-label={opt.label}
      tabIndex={0}
      onClick={() => onClick(opt.value)}
      type="button"
      role="radio"
      style={{ minWidth: 48 }}
    >
      {opt.label !== 'All' && (
        <span className="inline-block w-4 h-4 rounded-full border border-gray-300 mr-1" style={getColorStyle(opt)}></span>
      )}
      {opt.label}
    </button>
  );
});

interface ColorFilterProps {
  options: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
  asTags?: boolean;
}

const ColorFilter: React.FC<ColorFilterProps> = ({ options, value, onChange, className, asTags }) => {
  if (asTags) {
    return (
      <div className={`flex gap-2 flex-wrap py-1 ${className || ''}`} role="radiogroup" aria-label="Color filter">
        {options.map(opt => (
          <ColorTagButton key={opt.value} opt={opt} selected={value === opt.value} onClick={onChange} />
        ))}
      </div>
    );
  }
  return <Dropdown label='Color' options={options} selectedValue={value} onValueChange={onChange} className={className} />;
};

export default ColorFilter;
