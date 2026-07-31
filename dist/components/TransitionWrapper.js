'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
const TransitionWrapper = ({ direction = 'up' }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            // Determine movement based on direction
            // 'up' moves items off the top (-100%)
            // 'down' moves items off the bottom (100%)
            const yValue = direction === 'up' ? '-100%' : '100%';
            tl.to('.layer', {
                y: yValue,
                duration: 0.7,
                ease: 'power3.inOut',
                stagger: 0.1,
            })
                .to('.loader-text', {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
            }, 0);
        }, containerRef);
        return () => ctx.revert();
    }, [direction]); // Re-run when direction changes
    return (_jsxs("div", { ref: containerRef, className: 'fixed inset-0 z-[9999] pointer-events-none flex flex-col', children: [_jsx("div", { className: 'absolute inset-0 z-[4] flex items-center justify-center', children: _jsx("h1", { className: 'loader-text text-4xl md:text-6xl font-hoshiko text-white tracking-widest', children: "Slash/UI" }) }), _jsx("div", { className: 'layer absolute inset-0 z-[3] bg-neutral-950' }), _jsx("div", { className: 'layer absolute inset-0 z-[2] bg-neutral-900' }), _jsx("div", { className: 'layer absolute inset-0 z-[1] bg-neutral-800' })] }));
};
export default TransitionWrapper;
