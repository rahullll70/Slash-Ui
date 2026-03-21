'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
const Navbar = () => {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };
    const navLinks = [
        { name: 'Archives', slug: 'work' },
        { name: 'Capabilities', slug: 'service' },
        { name: 'Ethos', slug: 'about' },
    ];
    if (!mounted)
        return null;
    return (_jsx("nav", { className: 'fixed top-0 left-0 w-full z-[100] flex justify-center pt-6 px-6 pointer-events-none mt-10', children: _jsxs(motion.div, { initial: { y: -100 }, animate: { y: 0 }, className: `
          flex items-center justify-between px-6 transition-all duration-500 pointer-events-auto
          ${scrolled
                ? 'w-full md:w-[800px] h-14 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl'
                : 'w-full h-20 bg-transparent border-transparent'}
        `, children: [_jsx(Link, { href: '/', className: 'group flex items-center', children: _jsx("span", { className: ' text-3xl uppercase tracking-wide font-bold', children: "Renoh" }) }), _jsx("div", { className: 'hidden md:flex items-center space-x-8', children: navLinks.map((link) => (_jsxs(Link, { href: `/${link.slug}`, className: 'text-[10px]  font-plex uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors relative group', children: [link.name, _jsx("span", { className: 'absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full' })] }, link.slug))) }), _jsxs("div", { className: 'flex items-center space-x-4', children: [_jsx("button", { onClick: toggleTheme, className: 'p-2 hover:bg-white/10 rounded-full transition-colors text-white', children: _jsx(AnimatePresence, { mode: 'wait', children: _jsx(motion.div, { initial: { opacity: 0, rotate: -90 }, animate: { opacity: 1, rotate: 0 }, exit: { opacity: 0, rotate: 90 }, transition: { duration: 0.2 }, children: isDark ? _jsx(Sun, { size: 16 }) : _jsx(Moon, { size: 16 }) }, isDark ? 'dark' : 'light') }) }), _jsx(Link, { href: '/contact', children: _jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: 'px-4 py-2 bg-white text-black text-[10px] font-plex uppercase tracking-widest rounded-full', children: "Inquire" }) })] })] }) }));
};
export default Navbar;
