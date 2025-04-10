import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';
import Card from '@/components/Card';
import CardToggle from '@/components/CardToggle';
import Dropdown from '@/components/Dropdown';
import useMarketData from '@/hooks/useMarketData';
import Typography from '@/components/Typography';

const mockOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Long Option Number Two', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const RequestForQuoteCard = () => {
  const { data, loading } = useMarketData();
  const [isBuy, setIsBuy] = React.useState(true);

  useEffect(() => {
    console.log('Market Data:', data);
  }, [data]);

  const onStrategyToggle = (isSell: boolean) => {
    setIsBuy(!isSell);
  };

  const onMarketSelect = () => {};
  return (
    <Card title="Quote" icon={FileText} className="flex flex-col gap-4">
      <CardToggle
        leftLabel="Buy"
        rightLabel="Sell"
        onClick={onStrategyToggle}
      />

      <div>
        <Typography kind="h3">{isBuy ? 'Buying' : 'Selling'}</Typography>

        <Dropdown
          options={mockOptions}
          onChange={onMarketSelect}
          placeholder="Select currency"
        />
      </div>
    </Card>
  );
};

export default RequestForQuoteCard;
