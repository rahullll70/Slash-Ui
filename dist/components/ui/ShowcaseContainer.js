'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Code2, Command, PanelLeft, Info, Check, X, Search, Box, Copy, Loader2, Maximize, Home, LoaderCircle, MousePointer2, Rocket, } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Index } from '@/__registry__';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { getComponentSource } from '@/lib/registry';
export default function ShowcaseContainer({ children, title, code: propsCode, description: propsDescription, install: propsInstall, }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activePanel, setActivePanel] = useState(null);
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { id } = useParams();
    const [sourceCode, setSourceCode] = useState(null);
    const [isLoadingCode, setIsLoadingCode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const componentsList = Object.values(Index['default']);
    const activeItem = Index['default'][id];
    // Sync state if user exits via ESC or uses Cmd+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsSearchOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setActivePanel(null);
            }
        };
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);
    useEffect(() => {
        async function fetchSource() {
            if (activePanel === 'code' && (activeItem === null || activeItem === void 0 ? void 0 : activeItem.files)) {
                setIsLoadingCode(true);
                const code = await getComponentSource(activeItem.files);
                setSourceCode(code !== null && code !== void 0 ? code : '// Error: Source code not found.');
                setIsLoadingCode(false);
            }
        }
        fetchSource();
    }, [activePanel, activeItem, id]);
    const getContainerStyle = () => {
        switch (id) {
            case 'neubrutal-button':
                return 'bg-[#538F37]';
            case 'dot-cursor':
            case 'flaoting-navbar':
                return '';
            default:
                return 'bg-[#0a0908]';
        }
    };
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement
                .requestFullscreen()
                .then(() => setIsFullscreen(true));
        }
        else {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    };
    const copyToClipboard = async (text) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const dynamicCode = propsCode ||
        sourceCode ||
        (activeItem === null || activeItem === void 0 ? void 0 : activeItem.content) ||
        '// No source code found.';
    const dynamicDescription = propsDescription ||
        (activeItem === null || activeItem === void 0 ? void 0 : activeItem.description) ||
        `Premium ${title} component.`;
    const dynamicInstall = propsInstall ||
        (activeItem === null || activeItem === void 0 ? void 0 : activeItem.install) ||
        'npm install framer-motion lucide-react';
    // Filter logic for the search modal
    const filteredComponents = componentsList.filter((comp) => comp.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const staticSearchItems = [
        { icon: _jsx(Home, { size: 16 }), label: 'Home', category: 'Pages', path: '/' },
        {
            icon: _jsx(LoaderCircle, { size: 16 }),
            label: 'Loader',
            category: 'Pages',
            path: '/loader',
        },
        {
            icon: _jsx(MousePointer2, { size: 16 }),
            label: 'Cursor',
            category: 'Pages',
            path: '/cursor',
        },
        {
            icon: _jsx(Box, { size: 16 }),
            label: 'All Components',
            category: 'Pages',
            path: '/component',
        },
        {
            icon: _jsx(Rocket, { size: 16 }),
            label: 'Quick Start',
            category: 'Get Started',
            path: '/docs',
        },
    ];
    return (_jsx("div", { className: 'h-screen w-screen bg-black p-2 overflow-hidden text-white font-sans', children: _jsxs("div", { className: 'h-full w-full rounded-[30px] border border-white/5 overflow-hidden flex relative bg-[#0A0A0A]', children: [_jsx("aside", { className: `absolute top-0 left-0 z-[150] h-full w-[320px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-[#0A0A0A]/80 backdrop-blur-2xl border-r border-white/5 ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`, children: _jsxs("div", { className: 'flex flex-col h-full p-10', children: [_jsxs("div", { className: 'flex items-center justify-between mb-12', children: [_jsx("div", { className: 'text-sm text-zinc-500', children: "Navigation" }), _jsx("button", { onClick: () => setSidebarOpen(false), className: 'p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer', children: _jsx(X, { size: 16 }) })] }), _jsx("nav", { className: 'flex-1 overflow-y-auto custom-scrollbar space-y-2', children: componentsList.map((comp, index) => (_jsxs(Link, { href: `/component/${comp.name}`, onClick: () => setSidebarOpen(false), className: 'group flex items-center gap-4 py-2', children: [_jsx("div", { className: `h-px transition-all duration-300 ${id === comp.name ? 'w-6 bg-white' : 'w-3 bg-zinc-800 group-hover:bg-zinc-500'}` }), _jsxs("span", { className: `text-[13px] transition-colors ${id === comp.name ? 'text-white font-medium' : 'text-zinc-500 group-hover:text-zinc-300'}`, children: [_jsx("span", { className: 'font-mono mr-2 opacity-30', children: String(index + 1).padStart(2, '0') }), comp.name] })] }, comp.name))) })] }) }), _jsx(AnimatePresence, { children: isSidebarOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setSidebarOpen(false), className: 'absolute inset-0 bg-black/40 z-[140] backdrop-blur-sm cursor-pointer' })) }), _jsxs("div", { className: 'flex w-full h-full relative', children: [_jsxs("main", { className: `flex-1 relative flex flex-col items-center justify-center transition-all duration-700 ${getContainerStyle()} ease-in-out ${activePanel || isSearchOpen ? 'scale-[0.9] opacity-50' : 'scale-100 opacity-100'}`, children: [!isFullscreen && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: (e) => {
                                                e.stopPropagation();
                                                setSidebarOpen(true);
                                            }, className: 'absolute top-8 left-8 z-[110] p-3 bg-[#161616]/80 backdrop-blur-md border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-all cursor-pointer shadow-xl', children: _jsx(PanelLeft, { size: 20 }) }), _jsx("div", { className: 'absolute top-10 right-10 text-right pointer-events-none', children: _jsx("h2", { className: 'text-2xl text-white font-black uppercase tracking-tighter', children: title }) })] })), _jsx("div", { className: 'transition-transform duration-700', children: children }), _jsxs("div", { className: 'absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#161616]/90 border border-white/10 p-1.5 rounded-2xl shadow-2xl backdrop-blur-xl z-[120]', children: [_jsx("button", { onClick: toggleFullscreen, className: 'p-2.5 rounded-xl cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5 transition-all', children: _jsx(Maximize, { size: 18 }) }), _jsx("button", { onClick: () => setActivePanel(activePanel === 'info' ? null : 'info'), className: `p-2.5 rounded-xl cursor-pointer transition-all ${activePanel === 'info' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`, children: _jsx(Info, { size: 18 }) }), _jsx("div", { className: 'w-px h-4 bg-white/10 mx-1' }), _jsx("button", { onClick: () => setActivePanel(activePanel === 'code' ? null : 'code'), className: `p-2.5 rounded-xl transition-all cursor-pointer ${activePanel === 'code' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`, children: _jsx(Code2, { size: 18 }) }), _jsx("button", { onClick: () => setIsSearchOpen(true), className: `p-2.5 rounded-xl transition-all cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5`, children: _jsx(Command, { size: 18 }) })] })] }), _jsx("aside", { className: `h-full bg-[#080808] border-l border-white/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden relative z-[130] ${activePanel ? 'w-[45%] opacity-100' : 'w-0 opacity-0'}`, children: _jsxs("div", { className: 'p-12 h-full flex flex-col min-w-[450px]', children: [_jsxs("div", { className: 'flex items-center justify-between mb-12', children: [_jsx("h3", { className: 'text-sm uppercase font-beVietnamPro text-zinc-500', children: activePanel === 'code' ? 'Source Code' : 'Documentation' }), _jsx("button", { onClick: () => setActivePanel(null), className: 'p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white cursor-pointer transition-colors', children: _jsx(X, { size: 18 }) })] }), _jsx("div", { className: 'flex-1 overflow-y-auto custom-scrollbar pr-4', children: _jsx(AnimatePresence, { mode: 'wait', children: activePanel === 'code' ? (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: 'relative rounded-2xl bg-black border border-white/10 overflow-hidden', children: isLoadingCode ? (_jsxs("div", { className: 'flex flex-col items-center justify-center py-32 text-zinc-600 gap-4', children: [_jsx(Loader2, { className: 'animate-spin', size: 24 }), _jsx("span", { className: 'text-[10px] uppercase tracking-widest font-bold', children: "Fetching Code" })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => copyToClipboard(dynamicCode), className: 'absolute top-4 right-4 p-2 bg-white/5 rounded-md text-zinc-400 cursor-pointer z-10 hover:bg-white/10', children: copied ? (_jsx(Check, { size: 14, className: 'text-white' })) : (_jsx(Copy, { size: 14 })) }), _jsx(SyntaxHighlighter, { language: 'tsx', style: theme, customStyle: {
                                                                margin: 0,
                                                                padding: '32px',
                                                                fontSize: '13px',
                                                                background: 'transparent',
                                                                lineHeight: '1.7',
                                                            }, children: dynamicCode })] })) }, 'code')) : activePanel === 'info' ? (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, children: _jsxs("section", { className: 'space-y-12', children: [_jsxs("div", { children: [_jsx("h4", { className: 'text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6', children: "Description" }), _jsx("div", { className: 'prose prose-invert prose-sm text-zinc-400', children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: dynamicDescription }) })] }), _jsxs("div", { children: [_jsx("h4", { className: 'text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6', children: "Installation" }), _jsxs("div", { className: 'bg-black p-6 rounded-2xl border border-white/10 font-mono text-xs flex items-center justify-between', children: [_jsx("span", { className: 'text-zinc-300', children: dynamicInstall }), _jsx("button", { onClick: () => copyToClipboard(dynamicInstall), className: 'p-2 hover:bg-white/5 rounded-md text-zinc-500', children: copied ? (_jsx(Check, { size: 14 })) : (_jsx(Copy, { size: 14 })) })] })] })] }) }, 'info')) : null }) })] }) })] }), _jsx(AnimatePresence, { children: isSearchOpen && (_jsxs("div", { className: 'fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4', children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setIsSearchOpen(false), className: 'absolute inset-0 bg-black/60 backdrop-blur-md' }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -20 }, className: 'relative w-full max-w-[600px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden', children: [_jsxs("div", { className: 'flex items-center px-4 border-b border-zinc-800', children: [_jsx(Search, { className: 'text-zinc-500', size: 18 }), _jsx("input", { autoFocus: true, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: 'Search components or pages...', className: 'w-full h-14 bg-transparent border-none outline-none px-4 text-white text-sm placeholder:text-zinc-600' })] }), _jsx("div", { className: 'max-h-[400px] overflow-y-auto p-2 custom-scrollbar', children: searchQuery.length > 0 ? (_jsxs("div", { className: 'p-2', children: [_jsx("p", { className: 'px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider', children: "Component Results" }), filteredComponents.length > 0 ? (filteredComponents.map((comp) => (_jsxs(Link, { href: `/component/${comp.name}`, onClick: () => {
                                                        setIsSearchOpen(false);
                                                        setSearchQuery('');
                                                    }, className: 'flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group', children: [_jsx(Box, { size: 16, className: 'text-zinc-500 group-hover:text-white' }), _jsx("span", { className: 'text-sm text-zinc-300 group-hover:text-white', children: comp.name })] }, comp.name)))) : (_jsx("p", { className: 'px-3 py-4 text-sm text-zinc-600', children: "No components found..." }))] })) : (['Pages', 'Get Started'].map((category) => (_jsxs("div", { className: 'mb-2', children: [_jsx("p", { className: 'px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider', children: category }), staticSearchItems
                                                    .filter((item) => item.category === category)
                                                    .map((item) => (_jsxs(Link, { href: item.path, onClick: () => setIsSearchOpen(false), className: 'flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group', children: [_jsx("div", { className: 'text-zinc-500 group-hover:text-white', children: item.icon }), _jsx("span", { className: 'text-sm text-zinc-300 group-hover:text-white', children: item.label })] }, item.label)))] }, category)))) }), _jsxs("div", { className: 'px-4 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-[10px] text-zinc-500 font-medium', children: [_jsxs("div", { className: 'flex gap-3', children: [_jsxs("span", { className: 'flex items-center gap-1', children: [_jsx(Command, { size: 10 }), " to select"] }), _jsx("span", { className: 'flex items-center gap-1', children: "Enter to open" })] }), _jsx("span", { children: "ESC to close" })] })] })] })) })] }) }));
}
