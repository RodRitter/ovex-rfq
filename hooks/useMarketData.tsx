import { create } from 'zustand';
import { getMarkets } from '@/services/market-service';
import { MarketData } from '@/lib/types/market';

interface MarketDataState {
  data: MarketData;
  loading: boolean;
  fetchMarketData: () => Promise<void>;
}

const useMarketData = create<MarketDataState>((set) => {
  const fetchMarketData = async () => {
    set({ loading: true });

    const mdata = await getMarkets();

    if (mdata?.success) {
      set({ data: mdata.data, loading: false });
    } else {
      set({ loading: false });
    }
  };

  const store: MarketDataState = {
    data: { allMarkets: [], baseMarkets: [] },
    loading: false,
    fetchMarketData,
  };

  fetchMarketData();

  return store;
});

export default useMarketData;
