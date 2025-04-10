import React from 'react';

interface TypographyProps {
  kind: 'h1' | 'h2' | 'h3' | 'p';
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ kind = 'p', children }) => {
  switch (kind) {
    case 'h1':
      return <h1 className="text-lg font-semibold mb-1">{children}</h1>;
    case 'h2':
      return <h2 className="text-md font-semibold mb-1">{children}</h2>;
    case 'h3':
      return <h3 className="text-sm font-semibold mb-1">{children}</h3>;
    case 'p':
      return <p>{children}</p>;
    default:
      return null;
  }
};

export default Typography;
