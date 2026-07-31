'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '@/components/ui/navbar';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Check, Zap, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeAlertIcon } from '@/components/ui/badge-alert';
import { CircleCheckIcon } from '@/components/ui/circle-check';
import { TerminalIcon } from '@/components/ui/terminal';
import { FeatherIcon } from '@/components/ui/feather';
gsap.registerPlugin(ScrollTrigger);
// --- Pricing Components ---
const PricingCard = ({ tier, price, description, features, isHighlighted = false, }) => {
    return (_jsxs("div", { className: `pricing-card relative flex flex-col p-8 rounded-3xl border transition-all duration-500 overflow-hidden h-full opacity-0 translate-y-8 ${isHighlighted
            ? // Changed: Removed border-white and used a subtle zinc border to match the dark theme
                'bg-neutral-900 border-zinc-800/40 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]'
            : 'border-zinc-800/40 bg-neutral-900 text-zinc-400'}`, children: [isHighlighted && (_jsxs(_Fragment, { children: [_jsx("div", { className: 'absolute -top-[20%] -right-[20%] w-[70%] h-[20%] bg-white/5 blur-[100px] pointer-events-none' }), _jsx("div", { className: 'absolute inset-0 pointer-events-none z-0', children: _jsx("img", { src: '/images/PricingSlash.svg', alt: '', className: 'w-full h-full object-cover scale-150 rotate-[-5deg] opacity-90 backdrop-blur-5xl ' }) }), _jsx("div", { className: 'w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-700/10 via-transparent to-transparent opacity-50' })] })), _jsxs("div", { className: `relative flex flex-col h-full z-10 ${isHighlighted ? 'z-10 mix-blend-difference' : 'z-10'}`, children: [_jsxs("div", { className: 'mb-8', children: [_jsx("h3", { className: `text-xs uppercase font-mono tracking-widest ${isHighlighted ? 'text-white' : 'text-zinc-500'}`, children: tier }), _jsx("p", { className: `text-sm mt-3 font-medium leading-relaxed ${isHighlighted ? 'text-zinc-200' : 'text-zinc-400'}`, children: description })] }), _jsxs("div", { className: 'mb-8 flex items-baseline gap-1', children: [_jsx("span", { className: `text-6xl font-black tracking-tighter ${isHighlighted ? 'text-white' : 'text-zinc-100'}`, children: price }), _jsx("span", { className: 'text-zinc-500 text-[10px] uppercase tracking-widest ml-2', children: "Lifetime Access" })] }), _jsx("div", { className: 'space-y-4 mb-10 flex-grow', children: features.map((feature, index) => (_jsxs("div", { className: 'flex items-center gap-3 text-[13px]', children: [_jsx(Check, { size: 14, className: isHighlighted ? 'text-white' : 'text-zinc-600' }), _jsx("span", { className: isHighlighted ? 'text-zinc-300' : 'text-zinc-500', children: feature })] }, index))) }), _jsx("div", { className: 'relative z-20', children: _jsx("div", { className: `w-full py-4 rounded-xl text-sm font-bold transition-all duration-500 flex items-center justify-center cursor-not-allowed ${isHighlighted
                                ? 'bg-white text-black hover:bg-zinc-200'
                                : 'bg-transparent text-white border border-white/10 hover:border-white/20'}`, children: "Coming Soon" }) })] })] }));
};
// --- FAQ Components ---
const faqs = [
    {
        q: 'What exactly do I get with Slash UI?',
        a: 'You get lifetime access to 103+ premium components built with React, Tailwind CSS, and Framer Motion.',
    },
    {
        q: 'How do I access the components after purchase?',
        a: 'Instantly. Once your payment is confirmed, you get immediate access via your dashboard.',
    },
    {
        q: 'Do I get updates when new components are added?',
        a: 'Yes — lifetime updates are included at no extra cost.',
    },
    {
        q: 'Can I use Slash UI in client projects?',
        a: 'Absolutely. Your license covers unlimited personal and commercial projects.',
    },
    {
        q: 'What tech stack do the components use?',
        a: 'All components are built with Next.js, React, Tailwind CSS, and Framer Motion.',
    },
    {
        q: 'Is there a refund policy?',
        a: 'Yes. If you are not satisfied within 7 days, we issue a full refund — no questions asked.',
    },
];
const FAQItem = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (_jsxs("div", { onClick: () => setOpen(!open), className: 'group mb-1 cursor-pointer overflow-hidden rounded-2xl bg-[#121212] px-6 py-3 transition-all duration-300 hover:bg-[#161616]', children: [_jsxs("div", { className: 'flex items-center justify-between gap-4', children: [_jsx("span", { className: 'text-sm font-semibold text-zinc-300 transition-colors group-hover:text-white', children: q }), _jsx("span", { className: `text-2xl text-zinc-500 transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`, children: "+" })] }), _jsx("div", { className: `grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`, children: _jsx("div", { className: 'overflow-hidden', children: _jsx("p", { className: 'pb-2 text-xs font-semibold leading-relaxed text-zinc-500', children: a }) }) })] }));
};
// --- Main Page ---
const Page = () => {
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
    const pricingSectionRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('.pricing-reveal', {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: pricingSectionRef.current,
                    start: 'top 70%',
                },
            });
            gsap.to('.pricing-card', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'expo.out',
                stagger: 0.2,
                scrollTrigger: {
                    trigger: pricingSectionRef.current,
                    start: 'top 60%',
                },
            });
        }, pricingSectionRef);
        return () => ctx.revert();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsxs("main", { className: 'w-screen overflow-x-hidden', children: [_jsxs("div", { className: 'flex flex-col items-center justify-center h-screen text-center gap-8 px-4 relative', children: [_jsxs("h1", { className: 'text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]', children: ["Unlock premium ", _jsx("br", {}), "components ", _jsx("br", { className: 'hidden md:block' }), "for your next big idea"] }), _jsxs("div", { className: 'flex items-center gap-4 flex-wrap justify-center', children: [_jsx("button", { className: 'px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 border bg-white text-black hover:scale-103 duration-500 cursor-pointer', children: "Get Instant Access" }), _jsxs(Link, { href: '/component', className: 'relative z-30 h-12 px-6 rounded-lg text-sm text-white transition-all flex items-center gap-2 group', children: ["Explore All Components", _jsx("div", { className: 'flex items-center justify-center transition-transform group-hover:translate-x-1', children: _jsx(ChevronRight, { size: 18 }) })] })] }), _jsx("div", { className: 'absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-4', children: _jsxs("div", { className: 'flex flex-wrap items-center justify-center gap-15 text-xs text-white/50', children: [_jsxs("p", { className: 'flex items-center gap-2 hover:text-white transition-colors cursor-help', children: [_jsx(BadgeAlertIcon, { size: 14 }), "30+ Cool Components"] }), _jsxs("p", { className: 'flex items-center gap-2 hover:text-white transition-colors cursor-help', children: [_jsx(TerminalIcon, { size: 14 }), "Source Code Access"] }), _jsxs("p", { className: 'flex items-center gap-2 hover:text-white transition-colors cursor-help', children: [_jsx(FeatherIcon, { size: 14 }), "Smooth Animations"] }), _jsxs("p", { className: 'flex items-center gap-2 hover:text-white transition-colors cursor-help', children: [_jsx(CircleCheckIcon, { size: 14 }), "Lifetime Updates"] })] }) }), _jsx("div", { className: 'absolute  bottom-0 left-0 right-0 h-74 bg-gradient-to-t from-white/[0.1] to-transparent pointer-events-none' })] }), _jsx("section", { ref: pricingSectionRef, className: 'w-full py-32 px-8 ', children: _jsxs("div", { className: 'max-w-4xl mx-auto', children: [_jsxs("div", { className: 'flex flex-col items-center text-center mb-20', children: [_jsxs("div", { className: 'pricing-reveal translate-y-4 opacity-0 flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-950 mb-6', children: [_jsx(Zap, { size: 12, className: 'text-white' }), _jsx("span", { className: 'text-[10px] font-bold text-zinc-400 uppercase tracking-widest', children: "Pricing Plans" })] }), _jsx("h2", { className: 'pricing-reveal translate-y-4 opacity-0 text-5xl font-black text-white uppercase tracking-tighter mb-6', children: "Unlock the Full Library" }), _jsx("p", { className: 'pricing-reveal translate-y-4 opacity-0 text-zinc-500 text-sm max-w-lg leading-relaxed', children: "Professional-grade UI components for Next.js and Tailwind. Choose the pack that fits your scale." })] }), _jsxs("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch', children: [_jsx(PricingCard, { tier: 'Standard', price: '$00', description: 'Perfect for individual projects and hobbyists.', features: [
                                                '30+ Open Source Components',
                                                'React / Tailwind Templates',
                                                'Community Support',
                                                'Lifetime Access',
                                            ] }), _jsx(PricingCard, { tier: 'Premium', isHighlighted: true, price: '$00', description: 'Full access for professionals and agency work.', features: [
                                                '100+ Premium Components',
                                                'Agency/Commercial License',
                                                'Priority Feature Requests',
                                                'Figma Design Files',
                                                'Private Discord Access',
                                            ] })] })] }) }), _jsxs("section", { className: 'max-w-3xl mx-auto px-4 py-24 border-t border-zinc-900 border-b', children: [_jsxs("div", { className: 'flex flex-col items-center text-center mb-14', children: [_jsx("div", { className: 'inline-block px-3 py-1 rounded-full bg-[#121212] border border-zinc-800/50 mb-4', children: _jsx("span", { className: 'text-[10px] font-bold tracking-widest text-zinc-500 uppercase', children: "FAQ" }) }), _jsx("h2", { className: 'text-3xl md:text-4xl font-bold tracking-tight', children: "Everything you need to know" }), _jsxs("p", { className: 'mt-3 text-sm text-zinc-500 font-medium', children: ["Can't find an answer?", ' ', _jsx("a", { href: 'mailto:hello@slashui.com', className: 'underline hover:text-white transition-colors', children: "Reach out to us." })] })] }), _jsx("div", { children: faqs.map((item) => (_jsx(FAQItem, { q: item.q, a: item.a }, item.q))) })] })] }), _jsx("footer", { className: 'px-6 py-16 border-t border-zinc-900', children: _jsxs("div", { className: 'max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12', children: [_jsxs("div", { className: 'flex flex-col gap-2', children: [_jsx("span", { className: 'text-sm font-bold tracking-tight text-white uppercase', children: "Slash UI" }), _jsx("p", { className: 'text-[13px] text-zinc-600 font-medium', children: "\u00A9 2026 slashh-ui.com" })] }), _jsx("div", { className: 'flex gap-16 md:gap-24', children: Object.entries(FOOTER_CONFIG).map(([category, links]) => (_jsxs("div", { className: 'flex flex-col gap-3', children: [_jsx("p", { className: 'text-[13px] uppercase tracking-wider font-bold text-white', children: category }), _jsx("div", { className: 'flex flex-col gap-2', children: links.map((link) => (_jsx(Link, { href: link.path, className: 'text-[13px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors', children: link.label }, link.label))) })] }, category))) })] }) })] }));
};
export default Page;
