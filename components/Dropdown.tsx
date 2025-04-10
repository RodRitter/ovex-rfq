import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(placeholder);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (label: string, value: string) => {
    setSelectedLabel(label);
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full select-none">
      <div
        className={`flex items-center justify-between px-4 py-2 rounded cursor-pointer bg-accent h-[50px] font-semibold text-sm ${
          disabled ? 'opacity-50 cursor-default' : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span
          className={`${selectedLabel === placeholder ? 'opacity-50' : ''}`}
        >
          {selectedLabel}
        </span>
        {!disabled &&
          (isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          ))}
      </div>

      {isOpen && !disabled && (
        <ul className="absolute mt-1 bg-white border border-accent rounded shadow-lg z-10 w-full min-w-max select-none text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option.label, option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
