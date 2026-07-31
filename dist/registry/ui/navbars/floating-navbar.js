'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
const Navbar = () => {
    const pathname = usePathname();
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const audioElementRef = useRef(null);
    const containerRef = useRef(null);
    // --- Audio Logic (Preserved) ---
    useEffect(() => {
        if (!audioElementRef.current)
            return;
        if (isAudioPlaying) {
            audioElementRef.current
                .play()
                .catch(() => console.log('Audio blocked by browser'));
        }
        else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);
    const toggleAudio = () => {
        setIsAudioPlaying(!isAudioPlaying);
        setIsIndicatorActive(!isIndicatorActive);
    };
    // --- GSAP Lifecycle Management (Pure GSAP) ---
    useEffect(() => {
        // Context ensures all animations inside are cleaned up on unmount
        let ctx = gsap.context(() => {
            gsap.from(containerRef.current, {
                y: -50,
                opacity: 0,
                duration: 1.2,
                ease: 'expo.out',
                delay: 0.5,
            });
        }, containerRef);
        return () => ctx.revert(); // Cleanup to prevent memory leaks
    }, []);
    // --- Manual Hover Logic ---
    const handleHover = (e) => {
        const targets = e.currentTarget.querySelectorAll('.letter');
        if (!targets.length)
            return;
        // Manual kill to prevent overlapping animation "fights"
        gsap.killTweensOf(targets);
        gsap.to(targets, {
            y: -20,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            stagger: 0.02,
            onComplete: () => {
                gsap.set(targets, { y: 20 });
                gsap.to(targets, {
                    y: 0,
                    opacity: 1,
                    duration: 0.25,
                    ease: 'power2.out',
                    stagger: 0.02,
                });
            },
        });
    };
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Work', path: '/work' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];
    return (_jsx(_Fragment, { children: _jsx("div", { ref: containerRef, className: 'fixed left-1/2 -translate-x-1/2 top-8 z-[100] w-auto', children: _jsxs("nav", { className: 'flex items-center gap-5 px-6 py-3 rounded-lg bg-zinc-800 backdrop-blur-xl border border-white/10 shadow-2xl', children: [_jsxs("button", { onClick: toggleAudio, className: 'flex items-end gap-[3px] h-3 w-5 hover:opacity-80 transition-opacity', children: [_jsx("audio", { ref: audioElementRef, src: '/audio/ambient.mp3', loop: true }), [1, 2, 3, 4].map((i) => (_jsx("div", { className: `w-[1.5px] bg-white transition-all duration-300 ${isIndicatorActive ? 'animate-pulse' : ''}`, style: {
                                    height: isIndicatorActive ? `${20 + i * 20}%` : '30%',
                                    transitionDelay: `${i * 0.05}s`,
                                } }, i)))] }), _jsx("div", { className: 'w-[0.5px] h-7 bg-white/90' }), _jsx("div", { className: 'flex items-center gap-8', children: navLinks.map((link) => {
                            const active = pathname === link.path;
                            return (_jsxs(Link, { href: link.path, className: 'relative text-[10px] uppercase tracking-[0.2em] font-sans group text-white', children: [_jsx("span", { className: 'inline-flex overflow-hidden', onMouseEnter: handleHover, children: link.name.split('').map((char, i) => (_jsx("span", { className: 'inline-block overflow-hidden', children: _jsx("span", { className: 'letter inline-block', children: char === ' ' ? '\u00A0' : char }) }, i))) }), _jsx("span", { className: `absolute -bottom-1.5 left-0 h-[1px] bg-white transition-all duration-700 ease-in-out ${active ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}` })] }, link.name));
                        }) })] }) }) }));
};
export default Navbar;
