import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(placeholder);
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownPanelRef = useRef<HTMLUListElement>(null);

  const handleOptionClick = (label: string, value: string) => {
    setSelectedLabel(label);
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownPanelRef.current &&
      !dropdownPanelRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  useEffect(() => {
    if (onToggle) {
      onToggle(isOpen);
    }
  }, [isOpen, onToggle]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: 'absolute',
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
      });
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full select-none">
      <div
        className={`flex items-center justify-between px-4 py-2 rounded cursor-pointer bg-accent h-[50px] font-semibold text-sm ${
          disabled ? 'opacity-50 cursor-default' : ''
        }`}
        onClick={toggleDropdown}
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

      {isOpen &&
        !disabled &&
        createPortal(
          <ul
            ref={dropdownPanelRef}
            style={dropdownStyles}
            className="bg-white border border-accent rounded shadow-lg z-[9999] min-w-max select-none text-sm max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option.label, option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
};

export default Dropdown;
