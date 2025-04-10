import React, { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import Card from '@/components/Card';
import CardToggle from '@/components/CardToggle';
import Dropdown from '@/components/Dropdown';
import useMarketData from '@/hooks/useMarketData';
import Typography from '@/components/Typography';
import FadeTransition from '@/components/FadeTransition';
import { Market, MarketData } from '@/lib/types/market';
import Button, { ButtonSize } from '@/components/Button';
import TextInput from '@/components/TextInput';
import { numberToDecimals } from '@/lib/utils/primitive';
import PopupModal from '@/components/PopupModal';

const RequestForQuoteCard = () => {
  const { data, loading } = useMarketData();
  const [selectingBase, setSelectingBase] = useState(false);
  const [isBuy, setIsBuy] = useState(true);
  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [quoteCurrency, setQuoteCurrency] = useState<string | null>(null);
  const [selectedMarketData, setSelectedMarketData] = useState<Market | null>(
    null
  );
  const [buyAmount, setBuyAmount] = useState<string | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // resets quote currency when base currency is being selected
  useEffect(() => {
    if (selectingBase) {
      setQuoteCurrency(null);
    }
  }, [selectingBase]);

  // resets buyAmount when selecting new buy/sell strategy
  useEffect(() => {
    setBuyAmount(null);
  }, [isBuy]);

  // stores full market data for currency pair once both are selected
  useEffect(() => {
    const result = data.allMarkets.filter(
      (market) =>
        market.baseCurrency === baseCurrency &&
        market.quoteCurrency === quoteCurrency
    );

    setSelectedMarketData(result.length > 0 ? result[0] : null);
  }, [baseCurrency, quoteCurrency, selectingBase]);

  const onStrategyToggle = (isSell: boolean) => {
    setIsBuy(!isSell);
  };

  const onBaseMarketSelect = (value: string) => {
    setBaseCurrency(value);
  };

  const onBaseMarketDropdownToggle = (openState: boolean) => {
    setSelectingBase(openState);
  };

  const onQuoteMarketSelect = (value: string) => {
    setQuoteCurrency(value);
  };

  const onBuyAmountChange = (value: string) => {
    setBuyAmount(value);
  };

  const onQuoteModalClose = () => {
    setQuoteModalOpen(false);
  };

  const getQuoteCurrencyOptions = (data: MarketData) => {
    const quoteCurrencyData = data.allMarkets.filter(
      (market) => market.baseCurrency === baseCurrency
    );

    return quoteCurrencyData.map((market) => ({
      label: market.quoteCurrencyName,
      value: market.quoteCurrency,
    }));
  };

  const hasAmountError = () => {
    return !buyAmount || Number(buyAmount) === 0;
  };

  const getAmountInputError = () => {
    return hasAmountError() ? 'Please enter an amount' : '';
  };

  const getAmountPlaceholder = (data: Market, isBase: boolean) => {
    return numberToDecimals(
      0,
      isBase ? data.baseCurrencyPrecision : data.quoteCurrencyPrecision
    );
  };

  return (
    <>
      <PopupModal isOpen={quoteModalOpen} onClose={onQuoteModalClose}>
        Test
      </PopupModal>

      <Card title="Quote" icon={FileText} className="flex flex-col gap-4">
        <CardToggle
          leftLabel="Buy"
          rightLabel="Sell"
          onClick={onStrategyToggle}
        />

        <FadeTransition className="flex gap-4">
          <div className="flex-1">
            <Typography kind="h3">{isBuy ? 'Buying' : 'Selling'}</Typography>

            <Dropdown
              options={data.baseMarkets}
              placeholder="Select currency"
              disabled={loading}
              onChange={onBaseMarketSelect}
              onToggle={onBaseMarketDropdownToggle}
            />
          </div>

          {isBuy && quoteCurrency && baseCurrency && selectedMarketData && (
            <div className="flex-1 flex items-end">
              <TextInput
                onChange={onBuyAmountChange}
                type="number"
                suffix={baseCurrency.toUpperCase()}
                decimals={selectedMarketData.baseCurrencyPrecision}
                error={getAmountInputError()}
                placeholder={getAmountPlaceholder(selectedMarketData, true)}
              />
            </div>
          )}
        </FadeTransition>

        {baseCurrency && !selectingBase && (
          <FadeTransition className="flex gap-4">
            <div className="flex-1">
              <Typography kind="h3">{isBuy ? 'Selling' : 'Buying'}</Typography>

              <Dropdown
                options={getQuoteCurrencyOptions(data)}
                onChange={onQuoteMarketSelect}
                placeholder="Select currency"
                disabled={loading}
              />
            </div>

            {!isBuy && quoteCurrency && selectedMarketData && (
              <div className="flex-1 flex items-end">
                <TextInput
                  onChange={onBuyAmountChange}
                  type="number"
                  suffix={quoteCurrency.toUpperCase()}
                  decimals={selectedMarketData.quoteCurrencyPrecision}
                  error={getAmountInputError()}
                  placeholder={getAmountPlaceholder(selectedMarketData, false)}
                />
              </div>
            )}
          </FadeTransition>
        )}

        {quoteCurrency && (
          <FadeTransition>
            <div className="mt-3">
              <Button
                onClick={() => {
                  setQuoteModalOpen(true);
                }}
                size={ButtonSize.Large}
                disabled={hasAmountError()}
                block
              >
                Get Quote
              </Button>
            </div>
          </FadeTransition>
        )}
      </Card>
    </>
  );
};

export default RequestForQuoteCard;
