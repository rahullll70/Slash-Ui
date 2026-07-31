'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';
export default function AnimatedHeader() {
    const containerRef = useRef(null);
    useLayoutEffect(() => {
        var _a;
        // 1. Setup Lenis Smooth Scroll
        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
        gsap.registerPlugin(ScrollTrigger);
        const headers = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.animate-me');
        headers === null || headers === void 0 ? void 0 : headers.forEach((el) => {
            const element = el;
            const isAnimateOnScroll = element.dataset.animateOnScroll === 'true';
            const isScrub = element.dataset.scrub === 'true';
            // 2. Split text into characters
            const text = new SplitType(element, { types: 'chars,words' });
            // 3. Define the Animation Timeline
            const tl = gsap.timeline({ paused: true });
            // We set the starting state (hidden/offset) inside the timeline
            tl.set(text.chars, {
                x: 100,
                opacity: 0,
                skewX: 20,
            });
            tl.to(text.chars, {
                x: 0,
                opacity: 1,
                skewX: 0,
                ease: 'power3.out',
                duration: 0.8,
                stagger: 0.05,
            });
            // 4. Trigger Logic
            if (isScrub) {
                // Section 3: Animates as you scroll
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top 90%',
                    end: 'top 30%',
                    scrub: true,
                    animation: tl,
                });
            }
            else if (isAnimateOnScroll) {
                // Section 2: Plays when it enters the viewport
                ScrollTrigger.create({
                    trigger: element,
                    start: 'top 100%',
                    onEnter: () => tl.play(),
                    onLeaveBack: () => tl.reverse(),
                });
            }
            else {
                // Section 1: Plays immediately on load
                tl.play();
            }
        });
        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            gsap.ticker.remove(lenis.raf);
        };
    }, []);
    return (
    // REMOVED 'h-screen' and 'overflow-x-hidden' to allow scrolling
    _jsxs("div", { ref: containerRef, className: 'w-full h-screen', children: [_jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&display=swap');
        
        body { 
          margin: 0; 
          padding: 0; 
          font-family: 'Barlow Condensed', sans-serif;
          background-color: #23002b; /* Matches first section */
          overflow-x: hidden;
        }

        .char { 
          display: inline-block; 
          will-change: transform, opacity; 
        }
      ` }), _jsx("section", { className: 'h-screen w-full flex items-center justify-center bg-[#23002b]', children: _jsxs("h1", { className: 'animate-me text-9xl font-black uppercase tracking-tight text-center text-[#e894ff]', children: ["Loreum ipsum dolor ", _jsx("br", {}), "sit amet"] }) }), _jsx("section", { className: 'h-screen w-full flex items-center justify-center bg-[#002529]', children: _jsxs("h1", { className: 'animate-me text-9xl font-black uppercase tracking-tight text-center text-[#94ffe4]', "data-animate-on-scroll": 'true', children: ["Loreum ipsum ", _jsx("br", {}), " sit amet"] }) }), _jsx("section", { className: 'h-screen w-full flex items-center justify-center bg-[#291900]', children: _jsxs("h1", { className: 'animate-me text-9xl font-black uppercase tracking-tight text-center text-[#ffab46]', "data-scrub": 'true', children: ["Loreum ipsum dolor ", _jsx("br", {}), " sit amet"] }) })] }));
}
