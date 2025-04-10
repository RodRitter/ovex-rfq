'use client';

import RequestForQuoteCard from '@/containers/cards/request-for-quote/RequestForQuoteCard';
import TransfersCard from '@/containers/cards/TransfersCard';
import PortfolioCard from '@/containers/cards/PortfolioCard';

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4 px-6">
      <div className="col-span-12 md:col-span-5">
        <RequestForQuoteCard />
      </div>

      <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
        <TransfersCard />
        <PortfolioCard />
      </div>
    </div>
  );
}
