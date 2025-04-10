import React, { useState, useEffect, useRef } from 'react';

interface CardToggleProps {
  leftLabel: string;
  rightLabel: string;
  onClick?: (isActive: boolean) => void;
}

const CardToggle: React.FC<CardToggleProps> = ({
  leftLabel,
  rightLabel,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [containerWidth, setContainerWidth] = useState(200);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (onClick) onClick(newState);
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const pillWidth = containerWidth / 2 - 10;
  const pillTranslate = containerWidth - pillWidth - 5;

  return (
    <div className="flex justify-center items-center">
      <div
        ref={containerRef}
        className="relative w-full h-[50px] bg-accent rounded-sm flex items-center cursor-pointer select-none"
        onClick={toggle}
      >
        {/* Pill */}
        <div
          className={`absolute h-[40px] bg-white rounded-sm transition-transform duration-200`}
          style={{
            width: `${pillWidth}px`,
            transform: `translateX(${isActive ? pillTranslate : 5}px)`,
          }}
        ></div>

        {/* Text values */}
        <div className="flex justify-around w-full px-2 text-sm font-bold z-10">
          <span className={`${!isActive ? 'text-black' : 'text-gray-400'}`}>
            {leftLabel}
          </span>
          <span className={`${isActive ? 'text-black' : 'text-gray-400'}`}>
            {rightLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardToggle;
