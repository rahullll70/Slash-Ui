'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Terminal, Copy, Check } from 'lucide-react';
const Hero = () => {
    const [copied, setCopied] = useState(false);
    const installCommand = 'npx slash-ui@latest init';
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
    return (_jsxs("section", { className: 'relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden ', children: [_jsxs("video", { autoPlay: true, muted: true, loop: true, playsInline: true, className: 'absolute inset-0 z-0 h-full w-full object-cover mix-blend-screen grayscale-100', children: [_jsx("source", { src: '/video/hero_video.mp4', type: 'video/mp4' }), "Your browser does not support the video tag."] }), _jsxs("div", { className: 'relative z-10 container mx-auto px-6 flex mt-40 flex-col items-center', children: [_jsxs("h1", { className: 'max-w-4xl text-center text-3xl font-beVietnamPro tracking-tight md:text-5xl lg:text-8xl text-white', children: ["SLASH/UI ", _jsx("br", {}), _jsx("span", { className: 'font-sans italic text-6xl md:text-8xl text-zinc-200', children: "components" })] }), _jsx("p", { className: 'mt-8 max-w-2xl text-center font-cartographCF text-zinc-400 leading-relaxed md:text-sm', children: "A collection of accessible, high-performance components built with React and Tailwind. Stop styling from scratch and start building." }), _jsxs("div", { className: 'mt-10 flex flex-col items-center gap-4 sm:flex-row font-cartographCF', children: [_jsxs(Link, { href: '/component', className: 'h-14 px-8 rounded-xl text-sm bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-4 group', children: ["Explore Components", _jsx(ChevronRight, { size: 18, className: 'transition-transform group-hover:translate-x-1' })] }), _jsxs("div", { onClick: handleCopy, className: 'group flex h-14 items-center gap-3 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md px-5 hover:bg-white/10 transition-all cursor-pointer', children: [_jsx(Terminal, { size: 16, className: 'text-zinc-500' }), _jsx("code", { className: 'text-sm text-zinc-300 font-mono', children: installCommand }), _jsx("div", { className: 'ml-2 border-l border-white/10 pl-4', children: copied ? (_jsx(Check, { size: 16, className: 'text-green-400' })) : (_jsx(Copy, { size: 16, className: 'text-zinc-600 group-hover:text-white' })) })] })] })] })] }));
};
export default Hero;
