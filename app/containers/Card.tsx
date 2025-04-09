import React, { PropsWithChildren } from 'react';
import { LucideIcon } from 'lucide-react';

interface CardProps extends PropsWithChildren {
  title?: string;
  icon?: LucideIcon;
}

const Card = ({ children, title, icon: Icon }: CardProps) => {
  return (
    <div className="max-w-7xl bg-white flex-1 rounded-lg p-4 shadow">
      {title && (
        <div className="flex items-center mb-4">
          {Icon && <Icon size={20} />}
          <h2 className="text-lg font-semibold text-black ml-2">{title}</h2>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
