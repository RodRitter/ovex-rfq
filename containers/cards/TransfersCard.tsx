import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import Card from '@/components/Card';

const TransfersCard = () => {
  return (
    <Card title="Transfers" icon={ArrowLeftRight}>
      <div className="h-[300px]"></div>
    </Card>
  );
};

export default TransfersCard;
