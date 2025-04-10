import { APIResult } from '@/lib/types/core';
import { MarketData } from '@/lib/types/market';

export const getMarkets = async (): Promise<APIResult<MarketData>> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE}/markets`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }

      return response.json();
    })
    .then((data) => {
      const uniqueBaseCurrencies: { label: string; value: string }[] =
        Array.from(
          new Map<string, { label: string; value: string }>(
            data.map((market: any) => [
              market.base_currency as string,
              {
                label: market.base_currency_long as string,
                value: market.base_currency as string,
              },
            ])
          ).values()
        );

      return {
        success: true as const,
        data: {
          baseMarkets: uniqueBaseCurrencies,
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
