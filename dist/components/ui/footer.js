import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
const FOOTER_CONFIG = {
    site: [
        { label: 'Components', path: '/components' },
        { label: 'Quick-start', path: '/docs' },
        { label: 'Pricing', path: '/pricing' },
    ],
    social: [
        { label: 'Github', path: 'https://github.com/rahull-70/Slash-Ui' },
        { label: 'Twitter', path: 'https://x.com/rahulll_parihar' },
        { label: 'LinkedIn', path: 'https://www.linkedin.com/in/rahul-pariharr/' },
    ],
    legal: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Support', path: '/support' },
    ],
};
export const Footer = () => {
    return (_jsx("footer", { className: 'px-6 py-16 border-t border-zinc-900', children: _jsxs("div", { className: 'max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12', children: [_jsxs("div", { className: 'flex flex-col gap-2', children: [_jsx("span", { className: 'text-sm font-bold tracking-tight text-white uppercase', children: "Slash UI" }), _jsx("p", { className: 'text-[13px] text-zinc-600 font-medium', children: "\u00A9 2026 slashh-ui.com" })] }), _jsx("div", { className: 'grid grid-cols-3 gap-8 md:gap-24 w-full md:w-auto', children: Object.entries(FOOTER_CONFIG).map(([category, links]) => (_jsxs("div", { className: 'flex flex-col gap-3', children: [_jsx("p", { className: 'text-[13px] uppercase tracking-wider font-bold text-white', children: category }), _jsx("div", { className: 'flex flex-col gap-2', children: links.map((link) => (_jsx(Link, { href: link.path, className: 'text-[13px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors', children: link.label }, link.label))) })] }, category))) })] }) }));
};
