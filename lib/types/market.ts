export type Market = {
  baseCurrency: string;
  baseCurrencyPrecision: number;
  baseCurrencyName: string;
  quoteCurrency: string;
  quoteCurrencyName: string;
  quoteCurrencyPrecision: number;
};

export type MarketData = {
  baseMarkets: { label: string; value: string }[];
  allMarkets: Market[];
};
