import { getMarkets } from '@/lib/services/market-service';
import { MarketData } from '@/lib/types/market';
import { create } from 'zustand';

interface MarketDataState {
  data: MarketData;
  loading: boolean;
  fetchMarketData: () => Promise<void>;
}

const useMarketData = create<MarketDataState>((set) => {
  const fetchMarketData = async () => {
    set({ loading: true });
    const _mdata = await getMarkets();
    if (_mdata.success) {
      set({ data: _mdata.data, loading: false });
    } else {
      set({ loading: false });
    }
  };

  const store: MarketDataState = {
    data: { allMarkets: [], baseMarketNames: [] },
    loading: false,
    fetchMarketData,
  };

  fetchMarketData();

  return store;
});

export default useMarketData;
