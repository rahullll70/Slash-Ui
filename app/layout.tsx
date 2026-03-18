import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/navbar';
import { SearchProvider } from '@/hooks/use-component-search';
import SmoothScroll from '@/components/smooth-scroll';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Slash/U!',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <SmoothScroll>
          <SearchProvider>
            <Navbar />
            {children}
          </SearchProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
