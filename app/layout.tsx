import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SearchProvider } from '@/hooks/use-component-search';
import SmoothScroll from '@/components/smooth-scroll';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Slash/Ui',
  description: 'A coolest react components library',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${inter.variable} antialiased text-brand-light bg-brand-dark`}>
        <SmoothScroll>
          <SearchProvider>{children}</SearchProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}