'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
const inspirations = [
    { name: 'Codegrid', url: 'https://youtube.com/codegrid' },
    { name: 'Manu Arora', url: 'https://twitter.com/mannupaaji' },
    { name: 'Shadcn', url: 'https://twitter.com/shadcn' },
    { name: 'Skiper-Ui', url: 'https://github.com' },
];
const techStack = [
    { name: 'Tailwind CSS', icon: '', url: 'https://tailwindcss.com' },
    { name: 'Next.js', icon: '', url: 'https://nextjs.org' },
    { name: 'Motion.dev', icon: '', url: 'https://motion.dev' },
    { name: 'Framer Motion', icon: '', url: 'https://framer.com' },
    { name: 'GSAP', icon: '', url: 'https://gsap.com' },
    { name: 'TypeScript', icon: '', url: 'https://typescriptlang.org' },
    { name: 'React', icon: '', url: 'https://react.dev' },
    { name: 'Vercel', icon: '', url: 'https://vercel.com' },
];
const ScrollMarquee = ({ items, direction = 'left' }) => {
    return (
    /* Adjusted: Increased vertical padding (py-12) and added a negative vertical margin (-my-8)
       to keep the layout layout structure tight while giving tooltips enough room to render */
    _jsxs("div", { className: "overflow-hidden w-full group/marquee relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-12 -my-8", children: [_jsx("style", { jsx: true, global: true, children: `
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
      ` }), _jsx("div", { className: `flex gap-12 w-max will-change-transform group-hover/marquee:[animation-play-state:paused] ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`, children: [...items, ...items].map((item, i) => {
                    const isStringItem = !('icon' in item);
                    return (_jsxs("a", { href: item.url, target: "_blank", rel: "noopener noreferrer", className: "relative inline-flex items-center gap-3 text-base font-medium text-white/60 tracking-widest transition-all duration-300 hover:scale-110 hover:text-white group/item cursor-pointer", children: [isStringItem ? (_jsx(_Fragment, { children: item.name })) : (_jsxs(_Fragment, { children: [item.icon && _jsx("span", { className: "text-white/75 text-[13px]", children: item.icon }), item.name] })), _jsxs("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 text-[10px] tracking-normal font-mono text-zinc-400 bg-zinc-950 border border-white/10 rounded pointer-events-none opacity-0 translate-y-1 scale-95 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:scale-100 whitespace-nowrap z-50", children: ["Visit ", item.name, " \u2197"] })] }, i));
                }) })] }));
};
const DashedDivider = ({ label }) => (_jsxs("div", { className: "flex items-center gap-4 w-full my-10", children: [_jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent to-white/20" }), _jsx("span", { className: "text-[9px] tracking-[0.2em] text-white/30 font-mono uppercase shrink-0", children: label }), _jsx("div", { className: "flex-1 h-px bg-gradient-to-l from-transparent to-white/20" })] }));
export default function IndustryProof() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);
    return (_jsxs("section", { className: "relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden", children: [_jsx("div", { className: "absolute bottom-0 left-0 right-0 h-74 bg-gradient-to-t from-white/[0.1] to-transparent pointer-events-none" }), _jsxs("div", { className: `relative z-10 w-full max-w-[860px] transition-all duration-[1000ms] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`, children: [_jsx(DashedDivider, { label: "Inspired & Legends" }), _jsx("div", { className: "mb-4 font-cartographCF", children: _jsx(ScrollMarquee, { items: inspirations, direction: "left" }) }), _jsx("div", { className: "mb-12 font-cartographCF", children: _jsx(ScrollMarquee, { items: [...inspirations].reverse(), direction: "right" }) }), _jsx("div", { className: "mb-4 font-cartographCF", children: _jsx(ScrollMarquee, { items: techStack, direction: "left" }) }), _jsx("div", { className: "mb-12 font-cartographCF", children: _jsx(ScrollMarquee, { items: [...techStack].reverse(), direction: "right" }) }), _jsx("div", { className: "mt-8 flex justify-center", children: _jsxs(Link, { href: "/pricing", className: "relative z-30 h-12 px-6 rounded-lg text-sm text-white transition-all flex items-center gap-2 group", children: ["Be a part now", _jsx("div", { className: "flex items-center justify-center transition-transform group-hover:translate-x-1", children: _jsx(ChevronRight, { size: 18 }) })] }) })] })] }));
}
