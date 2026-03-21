import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const metadata = {
    title: 'Slash/U!',
    description: '',
};
export default function RootLayout({ children, }) {
    return (_jsx("html", { lang: 'en', children: _jsx("body", { className: `${geistSans.variable} ${geistMono.variable} antialiased text-white`, children: _jsx(SmoothScroll, { children: _jsxs(SearchProvider, { children: [_jsx(Navbar, {}), children] }) }) }) }));
}
