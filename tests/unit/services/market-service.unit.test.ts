import { getMarkets } from '@/lib/services/market-service';

describe('getMarkets', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success with mapped market data', async () => {
    const mockApiResponse = [
      {
        base_currency: 'btc',
        base_currency_long: 'Bitcoin',
        base_precision: 8,
        quote_currency: 'usd',
        quote_currency_long: 'US Dollar',
        quote_precision: 2,
      },
      {
        base_currency: 'eth',
        base_currency_long: 'Ethereum',
        base_precision: 8,
        quote_currency: 'usd',
        quote_currency_long: 'US Dollar',
        quote_precision: 2,
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getMarkets();

    expect(result).toEqual({
      success: true,
      data: {
        baseMarketNames: ['Bitcoin', 'Ethereum'],
        allMarkets: [
          {
            baseCurrency: 'btc',
            baseCurrencyName: 'Bitcoin',
            baseCurrencyPrecision: 8,
            quoteCurrency: 'usd',
            quoteCurrencyName: 'US Dollar',
            quoteCurrencyPrecision: 2,
          },
          {
            baseCurrency: 'eth',
            baseCurrencyName: 'Ethereum',
            baseCurrencyPrecision: 8,
            quoteCurrency: 'usd',
            quoteCurrencyName: 'US Dollar',
            quoteCurrencyPrecision: 2,
          },
        ],
      },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE}/markets`
    );
  });

  it('should return failure when fetch throws an error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getMarkets();

    expect(result).toEqual({
      success: false,
      error: 'Network error',
    });
  });

  it('should return failure when response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Internal Server Error',
    });

    const result = await getMarkets();

    expect(result).toEqual({
      success: false,
      error: 'Failed to fetch markets: Internal Server Error',
    });
  });
});
