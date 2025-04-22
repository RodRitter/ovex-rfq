import React, { useRef, useEffect, useState } from 'react';

interface TextInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
  type?: 'string' | 'number';
  decimals?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  onChange,
  placeholder = 'Enter text',
  disabled = false,
  className = '',
  prefix,
  suffix,
  error,
  type = 'string',
  decimals,
}) => {
  const prefixRef = useRef<HTMLSpanElement>(null);
  const suffixRef = useRef<HTMLSpanElement>(null);
  const [prefixWidth, setPrefixWidth] = useState(0);
  const [suffixWidth, setSuffixWidth] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (prefixRef.current) {
      setPrefixWidth(prefixRef.current.offsetWidth);
    }
    if (suffixRef.current) {
      setSuffixWidth(suffixRef.current.offsetWidth);
    }
  }, [prefix, suffix]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (type === 'number') {
      newValue = newValue.replace(/[^0-9.]/g, '');

      if (decimals !== undefined && newValue.includes('.')) {
        const [integerPart, decimalPart] = newValue.split('.');
        newValue = `${integerPart}.${decimalPart.slice(0, decimals)}`;
      }
    }
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <div>{error && <p className="text-red-400 text-xs mb-1">{error}</p>}</div>
      <div className="relative w-full">
        {prefix && (
          <span
            ref={prefixRef}
            className="absolute text-sm font-semibold left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {prefix}
          </span>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            paddingLeft: prefix ? `${prefixWidth + 5 + 16}px` : '16px',
            paddingRight: suffix ? `${suffixWidth + 5 + 16}px` : '16px',
          }}
          className={`w-full py-2 rounded bg-white border h-[50px] font-semibold text-sm ${
            error ? 'border-red-400' : 'border-gray-300'
          } ${disabled ? 'opacity-50 cursor-default' : ''} ${className}`}
        />
        {suffix && (
          <span
            ref={suffixRef}
            className="absolute text-sm font-semibold right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
