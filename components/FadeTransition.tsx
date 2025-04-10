import React, { useState, useEffect, useRef } from 'react';

const FadeTransition: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
      if (ref.current) {
        ref.current.classList.remove(
          'duration-200',
          'ease-in-out',
          'transform'
        );
        void ref.current.offsetWidth; // force reflow
        ref.current.classList.add('duration-200', 'ease-in-out', 'transform');
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-200 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      } ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default FadeTransition;
