import { APIResult } from '../types/core';
import { MarketData } from '../types/market';

export const getMarkets = async (): Promise<APIResult<MarketData>> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE}/markets`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }

      return response.json();
    })
    .then((data) => {
      const uniqueBaseCurrencies: string[] = Array.from(
        new Map<string, string>(
          data.map((market: any) => [
            market.base_currency as string,
            market.base_currency_long as string,
          ])
        ).values()
      );

      return {
        success: true as const,
        data: {
          baseMarketNames: uniqueBaseCurrencies,
          allMarkets: data.map((market: any) => ({
            baseCurrency: market.base_currency,
            baseCurrencyName: market.base_currency_long,
            baseCurrencyPrecision: market.base_precision,
            quoteCurrency: market.quote_currency,
            quoteCurrencyName: market.quote_currency_long,
            quoteCurrencyPrecision: market.quote_precision,
          })),
        },
      };
    })
    .catch((error) => ({
      success: false as const,
      error: error.message,
    }));
};
