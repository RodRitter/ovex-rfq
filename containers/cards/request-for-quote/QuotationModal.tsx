import React, { useEffect, useState } from 'react';
import PopupModal from '@/components/PopupModal';
import Typography from '@/components/Typography';
import QuotationModalListItem from './QuotationModalListItem';
import { Market } from '@/lib/types/market';
import { numberToDecimals } from '@/lib/utils/primitive';
import { DateTime } from 'luxon';
import { CountdownTimer } from '@/components/CountdownTimer';
import Button, { ButtonSize } from '@/components/Button';

const getTradeCost = (latestQuote: any) => ({
  amount: latestQuote?.to_amount,
  currency: latestQuote?.to_currency,
});

const getMarketRate = (
  latestQuote: any,
  selectedMarketData: Market | null
) => ({
  rate: numberToDecimals(
    Number(latestQuote?.rate),
    Number(selectedMarketData?.quoteCurrencyPrecision)
  ),
  currency: latestQuote?.rate_is_from_currency
    ? latestQuote?.from_currency
    : latestQuote?.to_currency,
});

const getAmountReceived = (
  latestQuote: any,
  selectedMarketData: Market | null
) => ({
  amount: numberToDecimals(
    Number(latestQuote?.from_amount),
    Number(
      latestQuote?.rate_is_from_currency
        ? selectedMarketData?.quoteCurrencyPrecision
        : selectedMarketData?.baseCurrencyPrecision
    )
  ),
  currency: latestQuote?.from_currency,
});

const QuotationModal = ({
  isOpen,
  onClose,
  latestQuote,
  selectedMarketData,
}: {
  isOpen: boolean;
  onClose: () => void;
  latestQuote: any | null;
  selectedMarketData: Market | null;
}) => {
  const tradeCost = getTradeCost(latestQuote);
  const marketRate = getMarketRate(latestQuote, selectedMarketData);
  const amountReceived = getAmountReceived(latestQuote, selectedMarketData);
  const expiryDate = latestQuote?.expires_at;
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsExpired(false);
    }
  }, [isOpen]);

  return (
    <PopupModal isOpen={isOpen} onClose={onClose}>
      <Typography kind="h1">Quotation</Typography>

      {latestQuote && (
        <div>
          <QuotationModalListItem label="Trade Cost">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{tradeCost.amount}</span>
              <span className="uppercase text-sm">{tradeCost.currency}</span>
            </div>
          </QuotationModalListItem>

          <QuotationModalListItem label="Market Rate">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{marketRate.rate}</span>
              <span className="uppercase text-sm">{marketRate.currency}</span>
            </div>
          </QuotationModalListItem>

          <QuotationModalListItem label="Amount Received">
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{amountReceived.amount}</span>
              <span className="uppercase text-sm">
                {amountReceived.currency}
              </span>
            </div>
          </QuotationModalListItem>

          <QuotationModalListItem label="Expires In">
            <div className="font-semibold">
              <CountdownTimer
                expiresAt={expiryDate}
                onExpire={() => setIsExpired(true)}
              />
            </div>
          </QuotationModalListItem>

          <div className="mt-6">
            <Button size={ButtonSize.Large} disabled={isExpired} block>
              Purchase
            </Button>
          </div>
        </div>
      )}
    </PopupModal>
  );
};

export default QuotationModal;
