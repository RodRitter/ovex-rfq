import type { Metadata } from 'next';
import './globals.css';

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
        <div className="max-w-7xl m-auto">{children}</div>
      </body>
    </html>
  );
}
