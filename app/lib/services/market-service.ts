import { APIResult } from '../types/core';
import { Market } from '../types/market';

export const getMarkets = async (): Promise<APIResult<Market[]>> => {
  return fetch(`${process.env.API_BASE}/markets`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }

      return response.json();
    })
    .then((data) => ({
      success: true as const,
      data: data.map((market: any) => ({
        baseCurrency: market.base_currency,
        baseCurrencyName: market.base_currency_long,
        baseCurrencyPrecision: market.base_precision,
        quoteCurrency: market.quote_currency,
        quoteCurrencyName: market.quote_currency_long,
        quoteCurrencyPrecision: market.quote_precision,
      })),
    }))
    .catch((error) => ({
      success: false as const,
      error: error.message,
    }));
};
