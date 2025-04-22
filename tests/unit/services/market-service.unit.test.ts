import { getMarkets, getQuote } from '@/services/market-service';

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
      data: [
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
      ],
    });

    expect(global.fetch).toHaveBeenCalledWith(`/api/markets`);
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

describe('getQuote', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success with quote data', async () => {
    const mockApiResponse = {
      price: '50000',
      amount: '0.01',
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getQuote('btc-usd', '0.01', 'buy');

    expect(result).toEqual({
      success: true,
      data: mockApiResponse,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `/api/quote?market=btc-usd&amount=0.01&side=buy`
    );
  });

  it('should return failure when fetch throws an error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getQuote('btc-usd', '0.01', 'buy');

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

    const result = await getQuote('btc-usd', '0.01', 'buy');

    expect(result).toEqual({
      success: false,
      error: 'Failed to fetch quote: Internal Server Error',
    });
  });
});
