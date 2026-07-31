'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
gsap.registerPlugin(ScrollTrigger);
const Cta = () => {
    const footerRef = useRef(null);
    const logoRef = useRef(null);
    // Helper to split text into characters for staggering
    const splitText = (text) => {
        return text.split("").map((char, i) => (_jsx("span", { className: "footer-char inline-block translate-y-full opacity-0", children: char === " " ? "\u00A0" : char }, i)));
    };
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 80%",
                }
            });
            // 1. Slash reveal for the top logo
            tl.fromTo(logoRef.current, { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.3 }, {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                scale: 1,
                duration: 0.8,
                ease: "expo.out"
            })
                // 2. Character stagger for the heading
                .to(".footer-char", {
                y: 0,
                opacity: 1,
                stagger: 0.02,
                duration: 0.6,
                ease: "power4.out"
            }, "-=0.4")
                // 3. Fade in the button and credits
                .to(".footer-fade", {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 0.8
            }, "-=0.2");
        }, footerRef);
        return () => ctx.revert();
    }, []);
    return (_jsxs("footer", { ref: footerRef, className: 'text-white border-neutral-800 overflow-hidden relative ', children: [_jsx("div", { className: 'w-full overflow-hidden', children: _jsx("img", { ref: logoRef, src: '/images/slash_1.svg', alt: 'Slash Logo', className: 'w-full h-auto object-cover block will-change-transform' }) }), _jsxs("div", { className: 'relative max-w-7xl mx-auto pt-20 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden', children: [_jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" }), _jsxs("div", { className: "relative z-10 text-center", children: [_jsxs("h1", { className: 'text-4xl md:text-6xl font-switzer capitalize font-bold tracking-tighter leading-tight text-neutral-100 mb-10', children: [_jsx("span", { className: "block overflow-hidden", children: splitText("Start slashing your UI") }), _jsxs("span", { className: "block overflow-hidden", children: [splitText("development with "), _jsx("span", { className: 'italic font-hoshiko text-red-500 tracking-wider inline-block footer-char translate-y-full opacity-0', children: "Slash/Ui" }), splitText(" today!")] })] }), _jsx("div", { className: "footer-fade opacity-0 translate-y-4 flex justify-center overflow-x-hidden", children: _jsx(Link, { href: '/pricing', className: 'group relative px-15 py-4 tracking-widest overflow-hidden border text-white hover:text-black font-hoshiko rounded-full font-semibold transition-all duration-300 hover:bg-red-500 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2', children: "Slash Now" }) })] })] }), _jsx("div", { className: 'footer-fade opacity-0 py-8 border-t border-neutral-900', children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4", children: [_jsx("p", { className: 'text-sm font-cartographCF text-neutral-500 capitalize', children: "\u00A9 2026 Slash/Ui. All Rights Reserved." }), _jsxs("h1", { className: 'text-sm font-cartographCF text-neutral-500', children: ["Designed and Developed by", ' ', _jsx("a", { className: 'italic text-neutral-300 hover:text-white transition-colors duration-300 border-b border-neutral-700 hover:border-white', href: 'https://x.com/rahulll_parihar', target: '_blank', rel: 'noopener noreferrer', children: "@Rahul" })] })] }) })] }));
};
export default Cta;
