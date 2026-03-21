'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import Link from 'next/link';
const ComponentCard = ({ title, author, videoSrc, children, span = '', }) => {
    const videoRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };
    return (_jsxs("div", { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: `group relative flex flex-col justify-between rounded-3xl bg-[#161616] border border-white/5 p-1 hover:border-white/20 transition-all duration-500 h-full ${span}`, children: [_jsx("div", { className: `absolute inset-0 transition-opacity duration-500 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)] ${isHovered ? 'opacity-100' : 'opacity-0'}` }), _jsx("div", { className: 'relative flex-grow overflow-hidden rounded-[22px] bg-[#0A0A0A] flex items-center justify-center min-h-[200px] cursor-pointer border border-white/[0.03]', children: videoSrc ? (_jsx("video", { ref: videoRef, src: videoSrc, loop: true, muted: true, playsInline: true, className: `absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isHovered ? 'opacity-100 scale-105' : 'opacity-30 scale-100'}` })) : (_jsx("div", { className: 'relative z-10 w-full h-full flex items-center justify-center', children: children })) }), _jsxs("div", { className: 'px-4 py-3 flex justify-between items-center bg-transparent relative z-10', children: [_jsx("h3", { className: 'text-sm font-medium text-zinc-400 group-hover:text-white transition-colors', children: title }), _jsx("span", { className: 'text-[10px] text-zinc-600 font-mono italic', children: author || 'skiper' })] })] }));
};
const ComponentsPage = () => {
    return (_jsx("div", { className: 'min-h-screen  pt-32 pb-20 px-6', children: _jsx("div", { className: 'max-w-7xl mx-auto space-y-32', children: _jsxs("section", { children: [_jsxs("div", { className: 'mb-12', children: [_jsxs("h2", { className: 'text-white text-3xl font-bold flex items-center gap-3', children: ["Some Random Components", ' '] }), _jsx("p", { className: 'text-zinc-500 text-sm mt-2', children: "Collection of interactive components [Click to view]" })] }), _jsxs("div", { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]', children: [_jsx(Link, { href: '/component/image-reveal', className: 'block', children: _jsx(ComponentCard, { title: 'Image reveal', author: 'skiper1', videoSrc: '/videos/reveal-demo.mp4' }) }), _jsx(Link, { href: '/component/hover-members', className: 'lg:col-span-2', children: _jsx(ComponentCard, { title: 'Hover members', author: 'skiper2', videoSrc: '/videos/members-demo.mp4' }) }), _jsx(Link, { href: '/component/drag-scroll', className: 'lg:row-span-2', children: _jsx(ComponentCard, { title: 'Things drag and scroll', author: 'skiper3', videoSrc: '/videos/drag-demo.mp4' }) }), _jsx(Link, { href: '/component/dynamic-island', className: 'block', children: _jsx(ComponentCard, { title: 'Dynamic island', author: 'skiper4' }) }), _jsx(Link, { href: '/component/devouring-details', className: 'lg:col-span-2', children: _jsx(ComponentCard, { title: 'Devouring details', author: 'skiper5', videoSrc: '/videos/details-demo.mp4' }) }), _jsx(Link, { href: '/component/scrollbar', className: 'block', children: _jsx(ComponentCard, { title: 'Anime js scrollbar', author: 'skiper6', videoSrc: '/videos/scrollbar.mp4' }) })] })] }) }) }));
};
export default ComponentsPage;
