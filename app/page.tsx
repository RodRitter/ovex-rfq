'use client';
import NavBar from './containers/NavBar';
import Card from './containers/Card';
import { GalleryHorizontalEnd, ArrowLeftRight, FileText } from 'lucide-react';
import CardToggle from './components/CardToggle';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="grid grid-cols-12 gap-4 px-6">
        <div className="col-span-12 md:col-span-5">
          <Card title="Quote" icon={FileText}>
            <CardToggle leftLabel="Buy" rightLabel="Sell" />
          </Card>
        </div>

        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
          <Card title="Transfers" icon={ArrowLeftRight}>
            <div className="h-[300px]"></div>
          </Card>

          <Card title="Portfolio" icon={GalleryHorizontalEnd}>
            <div className="h-[300px]"></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
