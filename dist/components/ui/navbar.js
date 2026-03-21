'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/use-component-search';
import { Slant as Hamburger } from 'hamburger-react';
import { logout } from '@/lib/actions/auth.action';
const Navbar = () => {
    const { searchQuery, setSearchQuery, filteredItems, staticPages } = useSearch();
    const [mounted, setMounted] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [userEmail, setUserEmail] = useState(null);
    const [authLoaded, setAuthLoaded] = useState(false);
    useEffect(() => {
        async function getUser() {
            var _a;
            const res = await fetch('/api/me', {
                credentials: 'include',
                cache: 'no-store',
            });
            const data = await res.json();
            setUserEmail(((_a = data.user) === null || _a === void 0 ? void 0 : _a.email) || null);
            setAuthLoaded(true);
        }
        getUser();
    }, []);
    useEffect(() => {
        setMounted(true);
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
                setIsMenuOpen(false);
            }
            if (!isSearchOpen)
                return;
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setSearchQuery('');
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
            }
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
            }
            else if (e.key === 'Enter') {
                const selected = filteredItems[selectedIndex];
                if (selected) {
                    window.location.href = selected.path;
                    setIsSearchOpen(false);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, filteredItems, selectedIndex, setSearchQuery]);
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);
    const menuLinks = React.useMemo(() => {
        return [
            { label: 'Quick Start', path: '/docs', tag: 'Guide' },
            { label: 'Pricing', path: '/pricing', tag: 'Free' },
            { label: 'Components', path: '/component', tag: '105+' },
            { label: 'Get Support', path: '/support', tag: null },
            ...(authLoaded
                ? userEmail
                    ? [
                        { label: 'Account', path: '/account', tag: userEmail },
                        { label: 'Logout', path: '#logout', tag: null },
                    ]
                    : [{ label: 'Login', path: '/login', tag: null }]
                : []),
        ];
    }, [userEmail, authLoaded]);
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: 'fixed top-0 left-0 w-full z-[100] flex justify-center pt-4 px-6 pointer-events-none', children: _jsxs("div", { className: 'flex items-center justify-between px-6 h-14 w-full max-w-[860px] bg-zinc-900/80 backdrop-blur-3xl border border-zinc-800 rounded-2xl pointer-events-auto', children: [_jsxs("div", { className: 'flex items-center gap-8', children: [_jsx(Link, { href: '/', className: 'font-bold text-white text-lg', children: "Slash/Ui" }), _jsxs("div", { className: 'hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400', children: [_jsx(Link, { href: '/docs', className: 'hover:text-white transition-colors', children: "Docs" }), _jsx(Link, { href: '/component', className: 'hover:text-white transition-colors', children: "Components" })] })] }), _jsxs("div", { className: 'flex items-center gap-2', children: [_jsx("button", { onClick: () => {
                                        setIsSearchOpen(true);
                                        setIsMenuOpen(false);
                                    }, className: 'flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer', "aria-label": 'Open search', children: _jsx(Command, { size: 16 }) }), _jsx("button", { onClick: () => {
                                        setIsMenuOpen((v) => !v);
                                        setIsSearchOpen(false);
                                    }, className: 'flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer', "aria-label": 'Open menu', children: _jsx(AnimatePresence, { mode: 'wait', initial: false, children: isMenuOpen ? (_jsx(motion.span, { children: _jsx(Hamburger, { size: 16, toggled: isMenuOpen }) }, 'close')) : (_jsx(motion.span, { children: _jsx(Hamburger, { size: 16, toggled: isMenuOpen, toggle: () => { } }) }, 'open')) }) })] })] }) }), _jsx(AnimatePresence, { children: isMenuOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, onClick: () => setIsMenuOpen(false), className: 'fixed inset-0 z-[150] backdrop-blur-md' }), _jsxs(motion.div, { initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.1 }, transition: { type: 'spring', damping: 25, stiffness: 200 }, className: 'fixed inset-0 z-[160] flex flex-col justify-center items-center bg-transparent pointer-events-none', children: [_jsx("nav", { className: 'flex flex-col items-center justify-center w-full max-w-4xl pointer-events-auto', children: menuLinks.map((link, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.05, duration: 0.4 }, className: 'w-full', children: link.label === 'Logout' ? (_jsx("form", { action: logout, className: 'w-full', children: _jsxs("button", { type: 'submit', onClick: () => setIsMenuOpen(false), className: 'group flex flex-col items-center py-2 w-full cursor-pointer', children: [_jsx("span", { className: 'text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white transition-transform duration-300 group-hover:scale-105', children: "Logout" }), link.tag && (_jsx("span", { className: 'text-[10px] mt-2 opacity-50 tracking-widest', children: link.tag }))] }) })) : (_jsxs(Link, { href: link.path, onClick: () => setIsMenuOpen(false), className: 'group flex flex-col items-center py-2', children: [_jsx("span", { className: 'text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-white transition-transform duration-300 group-hover:scale-105', children: link.label }), link.tag && (_jsx("span", { className: 'text-[10px] mt-2 opacity-50 tracking-widest', children: link.tag }))] })) }, link.label))) }), _jsxs("div", { className: 'absolute bottom-10 w-full flex justify-between px-10 text-md font-bold text-zinc-500 uppercase pointer-events-auto', children: [_jsx(Link, { href: '/privacy-policy', className: 'hover:text-white transition-all duration-500', children: "Privacy Policy" }), _jsx(Link, { href: '/terms-of-service', className: 'hover:text-white transition-all duration-500', children: "Terms of Service" })] })] })] })) }), _jsx(AnimatePresence, { children: isSearchOpen && (_jsxs("div", { className: 'fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4', children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setIsSearchOpen(false), className: 'absolute inset-0 bg-black/60 backdrop-blur-sm' }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -20 }, className: 'relative w-full max-w-[600px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden', children: [_jsxs("div", { className: 'flex items-center px-4 border-b border-zinc-800', children: [_jsx(Command, { className: 'text-zinc-500', size: 18 }), _jsx("input", { autoFocus: true, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: 'Search components or pages...', className: 'w-full h-14 bg-transparent border-none outline-none px-4 text-white text-sm placeholder:text-zinc-600' })] }), _jsx("div", { className: 'max-h-[400px] overflow-y-auto p-2 custom-scrollbar', children: searchQuery.length > 0 ? (_jsxs("div", { className: 'p-2', children: [_jsx("p", { className: 'px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider', children: "Results" }), filteredItems.length > 0 ? (filteredItems.map((item) => (_jsxs(Link, { href: item.path, onClick: () => {
                                                    setIsSearchOpen(false);
                                                    setSearchQuery('');
                                                }, className: 'flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group', children: [_jsxs("div", { className: 'flex items-center gap-3', children: [_jsx(item.icon, { size: 16, className: 'text-zinc-500 group-hover:text-white' }), _jsx("span", { className: 'text-sm text-zinc-300 group-hover:text-white', children: item.label })] }), _jsx("span", { className: 'text-[10px] opacity-50 uppercase tracking-widest', children: item.category })] }, item.path)))) : (_jsx("p", { className: 'px-3 py-4 text-sm text-zinc-600', children: "No results found..." }))] })) : (['Pages', 'Get Started'].map((cat) => (_jsxs("div", { className: 'mb-2', children: [_jsx("p", { className: 'px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider', children: cat }), staticPages
                                                .filter((p) => p.category === cat)
                                                .map((p) => (_jsxs(Link, { href: p.path, onClick: () => setIsSearchOpen(false), className: 'flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group', children: [_jsx("div", { className: 'text-zinc-500 group-hover:text-white', children: _jsx(p.icon, { size: 16 }) }), _jsx("span", { className: 'text-sm text-zinc-300 group-hover:text-white', children: p.label })] }, p.label)))] }, cat)))) }), _jsxs("div", { className: 'px-4 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-[10px] text-zinc-500 font-medium', children: [_jsxs("div", { className: 'flex gap-3', children: [_jsxs("span", { className: 'flex items-center gap-1', children: [_jsx(Command, { size: 10 }), " to select"] }), _jsx("span", { className: 'flex items-center gap-1', children: "Enter to open" })] }), _jsx("span", { children: "ESC to close" })] })] })] })) })] }));
};
export default Navbar;
