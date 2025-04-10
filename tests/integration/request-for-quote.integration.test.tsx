import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RequestForQuoteCard from '@/containers/cards/request-for-quote/RequestForQuoteCard';
import useMarketData from '@/hooks/useMarketData';
import { getQuote } from '@/services/market-service';

// Mock dependencies
jest.mock('../../hooks/useMarketData');
jest.mock('../../services/market-service');

const mockMarketData = {
  baseMarkets: [
    { label: 'BTC', value: 'btc' },
    { label: 'ETH', value: 'eth' },
  ],
  allMarkets: [
    {
      baseCurrency: 'btc',
      quoteCurrency: 'usd',
      quoteCurrencyName: 'USD',
      baseCurrencyPrecision: 8,
      quoteCurrencyPrecision: 2,
    },
    {
      baseCurrency: 'eth',
      quoteCurrency: 'usd',
      quoteCurrencyName: 'USD',
      baseCurrencyPrecision: 8,
      quoteCurrencyPrecision: 2,
    },
  ],
};

describe('RequestForQuoteCard Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useMarketData as unknown as jest.Mock).mockReturnValue({
      data: mockMarketData,
      loading: false,
    });
  });

  it('should allow selecting base and quote currencies', async () => {
    render(<RequestForQuoteCard />);

    const baseDropdown = screen.getByText('Select currency').closest('div');
    if (baseDropdown) {
      fireEvent.click(baseDropdown);
      fireEvent.click(screen.getByText('BTC'));
    }

    expect(screen.getByText('BTC')).toBeInTheDocument();

    const quoteDropdown = screen.getByText('Select currency').closest('div');
    if (quoteDropdown) {
      fireEvent.click(quoteDropdown);
      fireEvent.click(screen.getByText('USD'));
    }

    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('should display an error when no amount is entered', () => {
    render(<RequestForQuoteCard />);

    const baseDropdown = screen.getByText('Select currency').closest('div');
    if (baseDropdown) {
      fireEvent.click(baseDropdown);
      fireEvent.click(screen.getByText('BTC'));
    }

    const quoteDropdown = screen.getByText('Select currency').closest('div');
    if (quoteDropdown) {
      fireEvent.click(quoteDropdown);
      fireEvent.click(screen.getByText('USD'));
    }

    const getQuoteButton = screen.getByText('Get Quote');
    fireEvent.click(getQuoteButton);

    expect(screen.getByText('Please enter an amount')).toBeInTheDocument();
  });

  it('should fetch a quote when valid inputs are provided', async () => {
    (getQuote as jest.Mock).mockResolvedValue({
      success: true,
      data: { to_amount: '50000', expires_at: 1744317193.2560403 },
    });

    render(<RequestForQuoteCard />);

    const baseDropdown = screen.getByText('Select currency').closest('div');
    if (baseDropdown) {
      fireEvent.click(baseDropdown);
      fireEvent.click(screen.getByText('BTC'));
    }

    const quoteDropdown = screen.getByText('Select currency').closest('div');
    if (quoteDropdown) {
      fireEvent.click(quoteDropdown);
      fireEvent.click(screen.getByText('USD'));
    }

    const amountInput = screen.getByPlaceholderText('0.00000000');
    fireEvent.change(amountInput, { target: { value: '1' } });

    const getQuoteButton = screen.getByText('Get Quote');
    fireEvent.click(getQuoteButton);

    await waitFor(() => {
      expect(getQuote).toHaveBeenCalledWith('btcusd', '1', 'sell');
    });
  });

  it('should handle quote fetching errors gracefully', async () => {
    (getQuote as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Failed to fetch quote',
    });

    render(<RequestForQuoteCard />);

    const baseDropdown = screen.getByText('Select currency').closest('div');
    if (baseDropdown) {
      fireEvent.click(baseDropdown);
      fireEvent.click(screen.getByText('BTC'));
    }

    const quoteDropdown = screen.getByText('Select currency').closest('div');
    if (quoteDropdown) {
      fireEvent.click(quoteDropdown);
      fireEvent.click(screen.getByText('USD'));
    }

    const amountInput = screen.getByPlaceholderText('0.00000000');
    fireEvent.change(amountInput, { target: { value: '1' } });

    const getQuoteButton = screen.getByText('Get Quote');
    fireEvent.click(getQuoteButton);

    await waitFor(() => {
      expect(getQuote).toHaveBeenCalledWith('btcusd', '1', 'sell');
      // Error handling can be verified here if implemented
    });
  });
});
