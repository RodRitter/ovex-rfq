import React from 'react';
import { GalleryHorizontalEnd } from 'lucide-react';
import Card from '@/components/Card';

const PortfolioCard = () => {
  return (
    <Card title="Portfolio" icon={GalleryHorizontalEnd}>
      <div className="h-[300px]"></div>
    </Card>
  );
};

export default PortfolioCard;
