'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
const inspirations = [
    'Codegrid',
    'Manu Arora',
    'Shadcn',
    'Skiper-Ui',
];
const techStack = [
    { name: 'Tailwind CSS', icon: '' },
    { name: 'Next.js', icon: '' },
    { name: 'Motion.dev', icon: '' },
    { name: 'Framer Motion', icon: '' },
    { name: 'GSAP', icon: '' },
    { name: 'TypeScript', icon: '' },
    { name: 'React', icon: '' },
    { name: 'Vercel', icon: '' },
];
const ScrollMarquee = ({ items, direction = 1 }) => {
    const trackRef = useRef(null);
    const animRef = useRef(0);
    const posRef = useRef(0);
    useEffect(() => {
        const track = trackRef.current;
        if (!track)
            return;
        const step = () => {
            posRef.current -= direction * 0.5;
            const halfWidth = track.scrollWidth / 2;
            if (direction > 0 && Math.abs(posRef.current) >= halfWidth) {
                posRef.current = 0;
            }
            else if (direction < 0 && posRef.current >= 0) {
                posRef.current = -halfWidth;
            }
            track.style.transform = `translateX(${posRef.current}px)`;
            animRef.current = requestAnimationFrame(step);
        };
        animRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animRef.current);
    }, [direction]);
    return (_jsx("div", { className: 'overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]', children: _jsx("div", { ref: trackRef, className: 'flex gap-12 whitespace-nowrap will-change-transform', style: { width: 'max-content' }, children: [...items, ...items].map((item, i) => (_jsx("span", { className: 'inline-flex items-center gap-3 text-base font-medium text-white/75 tracking-widest', children: typeof item === 'string' ? (_jsxs(_Fragment, { children: [_jsx("span", { className: 'text-white/75 text-[10px]', children: "\u25C6" }), item] })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: 'text-white/75 text-[13px]', children: item.icon }), item.name] })) }, i))) }) }));
};
const DashedDivider = ({ label }) => (_jsxs("div", { className: 'flex items-center gap-4 w-full my-10', children: [_jsx("div", { className: 'flex-1 h-px bg-gradient-to-r from-transparent to-white/20' }), _jsx("span", { className: 'text-[9px] tracking-[0.2em] text-white/30 font-mono uppercase shrink-0', children: label }), _jsx("div", { className: 'flex-1 h-px bg-gradient-to-l from-transparent to-white/20' })] }));
export default function IndustryProof() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);
    return (_jsx("section", { className: 'relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden ', children: _jsxs("div", { className: `relative z-10 w-full max-w-[860px] transition-all duration-[1000ms] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`, children: [_jsx(DashedDivider, { label: 'Inspired & Legends' }), _jsx("div", { className: 'mb-4', children: _jsx(ScrollMarquee, { items: inspirations, direction: 1 }) }), _jsx("div", { className: 'mb-12', children: _jsx(ScrollMarquee, { items: [...inspirations].reverse(), direction: -1 }) }), _jsx(DashedDivider, { label: 'Tools & Stack' }), _jsx("div", { className: 'mb-4', children: _jsx(ScrollMarquee, { items: techStack, direction: 1 }) }), _jsx("div", { className: 'mb-12', children: _jsx(ScrollMarquee, { items: [...techStack].reverse(), direction: -1 }) }), _jsx("div", { className: 'mt-8 flex justify-center', children: _jsxs(Link, { href: '/pricing', className: 'relative z-30 h-12 px-6 rounded-lg text-sm text-white transition-all flex items-center gap-2 group', children: ["Be a part now", _jsx("div", { className: 'flex items-center justify-center transition-transform group-hover:translate-x-1', children: _jsx(ChevronRight, { size: 18 }) })] }) })] }) }));
}
