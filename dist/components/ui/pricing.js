'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { Check, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const PricingCard = ({ tier, price, description, features, isHighlighted = false, }) => {
    return (_jsxs("div", { className: `pricing-card relative flex flex-col p-8 rounded-3xl border transition-all duration-500 overflow-hidden h-full opacity-0 translate-y-8 ${isHighlighted
            ? // Changed: Removed border-white and used a subtle zinc border to match the dark theme
                'bg-neutral-900 border-zinc-800/40 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]'
            : 'border-zinc-800/40 bg-neutral-900 text-zinc-400'}`, children: [isHighlighted && (_jsxs(_Fragment, { children: [_jsx("div", { className: 'absolute -top-[20%] -right-[20%] w-[70%] h-[20%] bg-white/5 blur-[100px] pointer-events-none' }), _jsx("div", { className: 'absolute inset-0 pointer-events-none z-0', children: _jsx("img", { src: '/images/PricingSlash.svg', alt: '', className: 'w-full h-full object-cover scale-150 rotate-[-5deg] opacity-90 backdrop-blur-5xl ' }) }), _jsx("div", { className: 'w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-700/10 via-transparent to-transparent opacity-50' })] })), _jsxs("div", { className: `relative flex flex-col h-full z-10 ${isHighlighted ? 'z-10 mix-blend-difference' : 'z-10'}`, children: [_jsxs("div", { className: 'mb-8', children: [_jsx("h3", { className: `text-xs uppercase font-mono tracking-widest ${isHighlighted ? 'text-white' : 'text-zinc-500'}`, children: tier }), _jsx("p", { className: `text-sm mt-3 font-semibold leading-relaxed ${isHighlighted ? 'text-zinc-200' : 'text-zinc-400'}`, children: description })] }), _jsxs("div", { className: 'mb-8 flex items-baseline gap-1', children: [_jsx("span", { className: `text-6xl font-black tracking-tighter ${isHighlighted ? 'text-white' : 'text-zinc-100'}`, children: price }), _jsx("span", { className: 'text-zinc-500 text-[10px] uppercase tracking-widest ml-2', children: "Lifetime Access" })] }), _jsx("div", { className: 'space-y-4 mb-10 flex-grow', children: features.map((feature, index) => (_jsxs("div", { className: 'flex items-center font-cartographCF gap-3 text-[13px]', children: [_jsx(Check, { size: 14, className: isHighlighted ? 'text-white' : 'text-zinc-600' }), _jsx("span", { className: isHighlighted ? 'text-zinc-300' : 'text-zinc-500', children: feature })] }, index))) }), _jsx("div", { className: 'relative z-20', children: _jsx("div", { className: `w-full py-4 rounded-xl text-sm font-bold transition-all duration-500 flex items-center justify-center cursor-not-allowed ${isHighlighted
                                ? 'bg-white text-black hover:bg-zinc-200'
                                : 'bg-transparent text-white border border-white/10 hover:border-white/20'}`, children: "Coming Soon" }) })] })] }));
};
const Pricing = () => {
    const sectionRef = useRef(null);
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%', // Starts when the top of the section hits 70% of viewport height
                },
            });
            // Text Reveal Animation
            tl.to('.pricing-reveal', {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.1,
            })
                // Cards Stagger Reveal
                .to('.pricing-card', {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'expo.out',
                stagger: 0.2,
            }, '-=1');
        }, sectionRef);
        return () => ctx.revert();
    }, []);
    return (_jsx("section", { ref: sectionRef, className: 'w-full py-32 px-8', children: _jsxs("div", { className: 'max-w-4xl mx-auto', children: [_jsxs("div", { className: 'flex flex-col items-center text-center mb-20', children: [_jsxs("div", { className: 'pricing-reveal translate-y-4 opacity-0 flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-950 mb-6', children: [_jsx(Zap, { size: 12, className: 'text-white' }), _jsx("span", { className: 'text-[10px] font-bold text-zinc-400 uppercase tracking-widest', children: "Pricing Plans" })] }), _jsx("h2", { className: 'block overflow-hidden mb-6', children: _jsx("span", { className: 'pricing-reveal block text-5xl font-black text-white uppercase tracking-tighter translate-y-full opacity-0', children: "Unlock the Full Library" }) }), _jsx("p", { className: 'pricing-reveal translate-y-4 font-cartographCF opacity-0 text-zinc-500 text-sm max-w-lg leading-relaxed', children: "Professional-grade UI components for Next.js and Tailwind. Choose the pack that fits your scale." })] }), _jsxs("div", { className: 'grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch', children: [_jsx(PricingCard, { tier: 'Standard', price: '$00', 
                            // add href 
                            description: 'Perfect for individual projects and hobbyists.', features: [
                                '30+ Open Source Components',
                                'React / Tailwind Templates',
                                'Community Support',
                                'Lifetime Access',
                            ] }), _jsx(PricingCard, { tier: 'Premium', isHighlighted: true, price: '$00', 
                            // add href
                            description: 'Full access for professionals and agency work.', features: [
                                '100+ Premium Components',
                                'Agency/Commercial License',
                                'Priority Feature Requests',
                                'Figma Design Files',
                                'Private Discord Access',
                            ] })] })] }) }));
};
export default Pricing;
