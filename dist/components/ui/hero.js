'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Terminal, Copy, Check } from 'lucide-react';
import { gsap } from 'gsap';
const Hero = () => {
    const [copied, setCopied] = useState(false);
    const installCommand = 'npx slashh-ui@latest init';
    const scope = useRef(null);
    const splitText = (text) => {
        return text.split('').map((char, i) => (_jsx("span", { className: 'reveal-char inline-block translate-y-[110%] opacity-0 will-change-transform', children: char === ' ' ? '\u00A0' : char }, i)));
    };
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1 } });
            tl.to('.reveal-char', {
                y: 0,
                opacity: 1,
                stagger: 0.02,
                delay: 0.5,
            }).to('.fade-in-item', {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }, '-=0.4');
        }, scope);
        return () => ctx.revert();
    }, []);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(installCommand);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    return (_jsxs("section", { ref: scope, className: 'relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden', children: [_jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, className: 'absolute inset-0 z-0 h-full w-full object-cover mix-blend-screen grayscale', children: _jsx("source", { src: '/video/hero_video.mp4', type: 'video/mp4' }) }), _jsxs("div", { className: 'relative z-10 container mx-auto px-6 flex mt-40 flex-col items-center', children: [_jsxs("h1", { className: 'max-w-4xl text-center text-4xl tracking-tight md:text-7xl text-white flex flex-col items-center -space-y-2 md:-space-y-5', children: [_jsx("span", { className: 'block overflow-hidden pb-1 leading-none font-semibold', children: splitText('Slash/Ui') }), _jsx("span", { className: 'block overflow-hidden pt-1 leading-none', children: _jsx("span", { className: 'font-serif italic text-5xl md:text-8xl text-zinc-200 block [line-height:0.8]', children: splitText('components') }) })] }), _jsxs("div", { className: 'fade-in-item opacity-0 translate-y-4 flex flex-col items-center', children: [_jsx("p", { className: 'mt-8 max-w-2xl text-center font-cartographCF text-zinc-400 leading-relaxed md:text-sm text-[12px]', children: "A collection of accessible, high-performance components built with React and Tailwind. Stop styling from scratch and start building." }), _jsxs("div", { className: 'mt-10 flex flex-col items-center gap-4 sm:flex-row font-cartographCF', children: [_jsxs(Link, { href: '/component', className: 'h-14 px-8 rounded-xl text-sm bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-4 group', children: ["Explore Components", _jsx(ChevronRight, { size: 18, className: 'transition-transform group-hover:translate-x-1' })] }), _jsxs("div", { onClick: handleCopy, className: 'group flex h-14 items-center gap-3 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md px-5 hover:bg-white/10 transition-all cursor-pointer', children: [_jsx(Terminal, { size: 16, className: 'text-zinc-500' }), _jsx("code", { className: 'text-sm text-zinc-300 font-mono', children: installCommand }), _jsx("div", { className: 'ml-2 border-l border-white/10 pl-4', children: copied ? (_jsx(Check, { size: 16, className: 'text-white' })) : (_jsx(Copy, { size: 16, className: 'text-zinc-600 group-hover:text-white' })) })] })] })] })] })] }));
};
export default Hero;
