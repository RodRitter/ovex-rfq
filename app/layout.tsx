import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/containers/NavBar';

export const metadata: Metadata = {
  title: 'Traderly',
  description: 'A simple trading app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="max-w-7xl m-auto">
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
