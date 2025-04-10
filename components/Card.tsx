import React, { PropsWithChildren } from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps extends PropsWithChildren {
  title?: string;
  icon?: LucideIcon;
  className?: string;
  loading?: boolean; // Added loading prop
}

const Card = ({
  children,
  title,
  icon: Icon,
  className,
  loading = false,
}: CardProps) => (
  <div
    className={`relative max-w-7xl bg-white flex-1 rounded-lg p-4 min-h-[200px] shadow ${className}`}
  >
    {loading ? (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <span className="loader animate-spin border-2 border-t-transparent border-gray-500 rounded-full w-6 h-6"></span>
      </div>
    ) : (
      <>
        {title && (
          <div className="flex items-center mb-4">
            {Icon && <Icon size={20} />}
            <h2 className="text-lg font-semibold text-black ml-2">{title}</h2>
          </div>
        )}
        {children}
      </>
    )}
  </div>
);

export default Card;
