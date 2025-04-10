import { APIResult } from '@/lib/types/core';
import { MarketData } from '@/lib/types/market';

export const getMarkets = async (): Promise<APIResult<MarketData>> =>
  fetch('/api/markets')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch markets: ${response.statusText}`);
      }

      return response.json();
    })
    .then((data) => ({
      success: true as const,
      data,
    }))
    .catch((error) => ({
      success: false as const,
      error: error.message,
    }));

export const getQuote = async (
  market: string,
  amount: string,
  side: 'buy' | 'sell'
) => {
  const params = new URLSearchParams({ market, amount, side });
  const url = `/api/quote?${params.toString()}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch quote: ${response.statusText}`);
      }

      return response.json();
    })
    .then((data) => ({
      success: true as const,
      data,
    }))
    .catch((error) => ({
      success: false as const,
      error: error.message,
    }));
};
