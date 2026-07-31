'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Code2, Command, PanelLeft, Info, Check, X, Search, Box, Copy, Loader2, Maximize, Home, LoaderCircle, MousePointer2, Rocket, Mail, } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Index as RegistryMeta } from '@/registry/index';
import { getComponentSource } from '@/lib/registry';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('javascript', javascript);
function normalizeRegistryToList(registry) {
    if (!registry)
        return [];
    if (Array.isArray(registry))
        return registry;
    const candidate = (registry === null || registry === void 0 ? void 0 : registry.components) || (registry === null || registry === void 0 ? void 0 : registry.default) || (registry === null || registry === void 0 ? void 0 : registry.registry) || registry;
    if (Array.isArray(candidate))
        return candidate;
    if (candidate && typeof candidate === 'object') {
        return Object.entries(candidate).map(([key, val]) => {
            const inferredName = val && typeof val === 'object' && val.name ? val.name : key;
            return Object.assign({ name: inferredName }, (val || {}));
        });
    }
    return [];
}
export default function ShowcaseContainer({ children, title, code: propsCode, description: propsDescription, install: propsInstall, dependencies: propsDependencies, interactionType: propsInteraction, howToUse: propsHowToUse, }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activePanel, setActivePanel] = useState(null);
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { id } = useParams();
    const [sourceCode, setSourceCode] = useState(null);
    const [isLoadingCode, setIsLoadingCode] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [iframeLoading, setIframeLoading] = useState(true);
    const activeItem = React.useMemo(() => {
        if (!id)
            return null;
        const normalizedId = id.toString().toLowerCase();
        return normalizeRegistryToList(RegistryMeta).find((c) => { var _a; return ((_a = c === null || c === void 0 ? void 0 : c.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === normalizedId; });
    }, [id]);
    const list = normalizeRegistryToList(RegistryMeta);
    useEffect(() => {
        setIframeLoading(true);
    }, [id]);
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
    const dynamicCode = sourceCode ||
        propsCode ||
        (activeItem === null || activeItem === void 0 ? void 0 : activeItem.content) ||
        '// No source code found.';
    const dynamicDescription = propsDescription ||
        (activeItem === null || activeItem === void 0 ? void 0 : activeItem.description) ||
        `Premium ${title} component.`;
    const dynamicInstall = propsInstall || (activeItem === null || activeItem === void 0 ? void 0 : activeItem.install) || '';
    const dynamicDependencies = propsDependencies || (activeItem === null || activeItem === void 0 ? void 0 : activeItem.dependencies) || [];
    const dynamicInteraction = propsInteraction || (activeItem === null || activeItem === void 0 ? void 0 : activeItem.interactionType) || [];
    const dynamicHowToUse = propsHowToUse || (activeItem === null || activeItem === void 0 ? void 0 : activeItem.howToUse) || '';
    const filteredComponents = list.filter((comp) => {
        var _a;
        const nm = ((_a = comp === null || comp === void 0 ? void 0 : comp.name) !== null && _a !== void 0 ? _a : '').toString().toLowerCase();
        const q = (searchQuery !== null && searchQuery !== void 0 ? searchQuery : '').toString().toLowerCase();
        return nm.includes(q);
    });
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
    return (_jsx("div", { className: 'h-screen w-screen bg-[#0A0A0A] p-2 overflow-hidden text-white font-sans', children: _jsxs("div", { className: 'h-full w-full rounded-[40px] overflow-hidden flex relative bg-[#0A0A0A] ', children: [_jsx("aside", { className: `absolute top-0 left-0 z-[150] outline-none border-none h-full w-[320px] rounded-l-[40px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]  ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`, children: _jsx("div", { className: 'flex flex-col h-full p-10 pt-24', children: _jsx("nav", { className: 'flex-1 overflow-y-auto custom-scrollbar bg-transparent', style: {
                                maskImage: 'linear-gradient(to bottom, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)',
                            }, children: filteredComponents.map((comp, index) => {
                                var _a, _b, _c;
                                const compName = ((_c = (_b = (_a = comp === null || comp === void 0 ? void 0 : comp.name) !== null && _a !== void 0 ? _a : comp === null || comp === void 0 ? void 0 : comp.label) !== null && _b !== void 0 ? _b : comp === null || comp === void 0 ? void 0 : comp.title) !== null && _c !== void 0 ? _c : '').toString();
                                if (!compName)
                                    return null;
                                const isActive = id === compName;
                                const isNew = !!(comp === null || comp === void 0 ? void 0 : comp.isNew);
                                return (_jsxs(Link, { href: `/component/${compName}`, onClick: () => setSidebarOpen(false), className: 'group relative flex items-center gap-3 py-[7px] bg-transparent', children: [_jsx("div", { className: `h-px shrink-0 transition-all duration-300 ease-out ${isActive
                                                ? 'w-8 bg-white'
                                                : 'w-3 bg-zinc-800 group-hover:w-5 group-hover:bg-zinc-500'}` }), _jsxs("div", { className: 'flex items-center gap-1.5 min-w-0', children: [_jsx("span", { className: `text-[13px] leading-none tabular-nums shrink-0 transition-colors ${isActive
                                                        ? 'text-zinc-300'
                                                        : 'text-zinc-700 group-hover:text-zinc-500'}`, children: String(index + 1).padStart(2, '0') }), _jsx("span", { className: `text-[13px] leading-none truncate transition-colors ${isActive
                                                        ? 'text-white'
                                                        : 'text-zinc-500 group-hover:text-white'}`, children: compName }), isNew && (_jsx("span", { className: 'text-[9px] leading-none font-semibold text-zinc-400 self-start translate-y-[-2px]', children: "New" }))] })] }, compName || index));
                            }) }) }) }), _jsx(AnimatePresence, { children: isSidebarOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setSidebarOpen(false), className: 'absolute inset-0 z-[140] cursor-pointer' })) }), _jsxs("div", { className: 'flex w-full h-full relative', children: [_jsxs("main", { className: `flex-1 relative transition-all duration-700 ease-in-out`, children: [!isFullscreen && (_jsx("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        setSidebarOpen((prev) => !prev);
                                    }, className: 'absolute top-8 left-8 z-[160] p-3 bg-[#161616]/80 backdrop-blur-sm border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-all cursor-pointer shadow-xl', children: _jsx(PanelLeft, { size: 20 }) })), !isFullscreen && (_jsxs("nav", { "aria-label": 'breadcrumb', className: 'absolute top-8 left-24 z-[110] flex items-center gap-2 text-xs h-[46px]', children: [_jsx(Link, { href: '/', className: 'text-zinc-500 hover:text-white transition-colors', children: "Home" }), _jsx("span", { className: 'text-zinc-700', children: "/" }), _jsx(Link, { href: '/component', className: 'text-zinc-500 hover:text-white transition-colors', children: "Components" }), id && (_jsxs(_Fragment, { children: [_jsx("span", { className: 'text-zinc-700', children: "/" }), activePanel ? (_jsx(Link, { href: `/component/${id}`, className: 'text-zinc-500 hover:text-white transition-colors truncate max-w-[140px]', children: id })) : (_jsx("span", { className: 'text-white truncate max-w-[160px]', children: id }))] })), activePanel && (_jsxs(_Fragment, { children: [_jsx("span", { className: 'text-zinc-700', children: "/" }), _jsx("span", { className: 'text-white capitalize', children: activePanel === 'code' ? 'Source' : 'Info' })] }))] })), iframeLoading && (_jsx("div", { className: 'absolute inset-0 flex items-center justify-center bg-[#0a0908] z-10 pointer-events-none', children: _jsx(Loader2, { className: 'animate-spin text-zinc-600', size: 24 }) })), _jsx("iframe", { src: `/preview/${id}`, className: 'w-full h-full border-0 block overflow-visible rounded-[40px]', title: title, onLoad: () => setIframeLoading(false) }, id), _jsxs("div", { className: 'absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#161616]/90 border border-white/10 p-1.5 rounded-2xl shadow-2xl backdrop-blur-xl z-[120]', children: [_jsx("button", { onClick: toggleFullscreen, className: 'p-2.5 rounded-xl cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5 transition-all', children: _jsx(Maximize, { size: 18 }) }), _jsx("button", { onClick: () => setActivePanel(activePanel === 'info' ? null : 'info'), className: `p-2.5 rounded-xl cursor-pointer transition-all ${activePanel === 'info' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`, children: _jsx(Info, { size: 18 }) }), _jsx("div", { className: 'w-px h-4 bg-white/10 mx-1' }), _jsx("button", { onClick: () => setActivePanel(activePanel === 'code' ? null : 'code'), className: `p-2.5 rounded-xl transition-all cursor-pointer ${activePanel === 'code' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`, children: _jsx(Code2, { size: 18 }) }), _jsx("button", { onClick: () => setIsSearchOpen(true), className: 'p-2.5 rounded-xl transition-all cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5', children: _jsx(Command, { size: 18 }) })] })] }), _jsx("aside", { className: `h-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-[130] border-l border-white/10 bg-[#0A0A0A]/95 backdrop-blur-2xl ${activePanel ? 'w-[50%] opacity-100' : 'w-0 opacity-0'}`, children: _jsxs("div", { className: 'p-8 h-full flex flex-col min-w-[450px]', children: [_jsxs("div", { className: 'flex items-center justify-between mb-8', children: [_jsxs("div", { className: 'flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl', children: [_jsx("button", { onClick: () => setActivePanel('info'), className: `px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activePanel === 'info' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`, children: "Info" }), _jsx("button", { onClick: () => setActivePanel('code'), className: `px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activePanel === 'code' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`, children: "Source" })] }), _jsx("button", { onClick: () => setActivePanel(null), className: 'p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white cursor-pointer transition-colors', children: _jsx(X, { size: 16 }) })] }), _jsxs("div", { className: 'mb-8', children: [_jsx("h3", { className: 'text-lg font-semibold text-white leading-tight', children: (activeItem === null || activeItem === void 0 ? void 0 : activeItem.name) || title }), _jsx("p", { className: 'text-xs text-zinc-600 mt-1', children: activePanel === 'code'
                                                    ? 'Component source'
                                                    : 'Details & usage' })] }), _jsx("div", { className: 'flex-1 overflow-y-auto custom-scrollbar pr-4', children: _jsx(AnimatePresence, { mode: 'wait', children: activePanel === 'code' ? (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: 'relative rounded-2xl bg-black border border-white/10 overflow-hidden', children: isLoadingCode ? (_jsxs("div", { className: 'flex flex-col items-center justify-center py-32 text-zinc-600 gap-4', children: [_jsx(Loader2, { className: 'animate-spin', size: 24 }), _jsx("span", { className: 'text-[10px] uppercase tracking-widest font-bold', children: "Fetching Code" })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => copyToClipboard(dynamicCode), className: 'absolute top-4 right-4 p-2 bg-white/5 rounded-md text-zinc-400 cursor-pointer z-10 hover:bg-white/10', children: copied ? (_jsx(Check, { size: 14, className: 'text-white' })) : (_jsx(Copy, { size: 14 })) }), _jsx(SyntaxHighlighter, { language: 'tsx', style: theme, customStyle: {
                                                                margin: 0,
                                                                padding: '32px',
                                                                fontSize: '13px',
                                                                background: 'transparent',
                                                                lineHeight: '1.7',
                                                            }, children: dynamicCode })] })) }, 'code')) : activePanel === 'info' ? (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 }, className: 'h-full overflow-y-auto', children: _jsxs("section", { className: 'space-y-12 pb-20', children: [_jsxs("div", { children: [_jsx("h4", { className: 'text-[12px] uppercase text-zinc-600 mb-6', children: "Description" }), _jsx("div", { className: 'font-cartographCF ', children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: dynamicDescription }) })] }), dynamicDependencies.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: 'text-[12px] uppercase text-zinc-600 mb-6', children: "Dependencies" }), _jsx("div", { className: 'flex gap-2', children: dynamicDependencies.map((dep, i) => (_jsx("span", { className: 'px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-cartographCF text-zinc-400', children: dep }, i))) })] })), _jsxs("div", { children: [_jsx("h4", { className: 'text-[12px] uppercase text-zinc-600 mb-6', children: "Installation" }), _jsxs("div", { className: 'bg-black p-4 rounded-xl border border-white/10 font-mono text-sm flex items-center justify-between', children: [_jsx("span", { className: 'text-zinc-300 font-cartographCF', children: dynamicInstall }), _jsx("button", { onClick: () => copyToClipboard(dynamicInstall), className: 'p-2 hover:bg-white/5 rounded-md text-zinc-500', children: copied ? (_jsx(Check, { size: 14 })) : (_jsx(Copy, { size: 14 })) })] })] }), dynamicInteraction.length > 0 && (_jsxs("div", { children: [_jsx("h4", { className: 'text-[12px] uppercase text-zinc-600 mb-6', children: "Interaction Type" }), _jsx("div", { className: 'space-y-4', children: dynamicInteraction.map((item, i) => (_jsxs("div", { className: 'flex gap-2 font-cartographCF bg-zinc-900 py-5 px-1 rounded-md text-sm', children: [_jsxs("span", { className: 'text-zinc-500', children: [item.type, ":"] }), _jsx("span", { className: '', children: item.description })] }, i))) })] })), dynamicHowToUse && (_jsxs("div", { children: [_jsx("h4", { className: 'text-[12px] uppercase text-zinc-600 mb-6', children: "How to use" }), _jsx("div", { className: 'bg-black p-4 rounded-xl border border-white/10 font-mono text-sm overflow-x-auto', children: _jsx("pre", { className: 'text-zinc-300 font-cartographCF', children: _jsx(SyntaxHighlighter, { language: 'tsx', style: theme, customStyle: {
                                                                                margin: 0,
                                                                                padding: '0px',
                                                                                fontSize: '15px',
                                                                                background: 'transparent',
                                                                                lineHeight: '1.7',
                                                                            }, children: dynamicHowToUse }) }) })] })), _jsxs("div", { children: [_jsx("h4", { className: 'text-[12px] uppercase text-zinc-600 mb-6', children: "Keep in mind" }), _jsx("p", { className: 'font-cartographCF', children: "Driven by the craft of high-end digital design. These components are my explorations and modern takes on industry-leading patterns I\u2019ve encountered across Awwwards and CodeGrid. I hold the original creators of these concepts in high regard; this library is my attempt to reverse-engineer, standardize, and integrate their brilliance into a consistent, developer-first toolkit." })] }), _jsxs("div", { children: [_jsx("h4", { className: 'text-[12px] uppercase text-zinc-600 mb-6', children: "Contact" }), _jsxs("p", { className: 'font-cartographCF flex items-center gap-1', children: ["Additionlly, if you find any bug or issue related to component , feel free to drop a dm", _jsxs("a", { href: `mailto:`, className: 'bg-zinc-800 rounded-full py-2 px-2', children: [_jsx(Mail, { size: 14, className: '' }), ' '] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: 'text-[12px] uppercase text-zinc-600 mb-6', children: "License & Usage" }), _jsxs("p", { className: 'font-cartographCF', children: ["- Free to use and modify in both personal and commercial projects. ", _jsx("br", {}), " - Attribution to Skiper UI is required when using the free version. ", _jsx("br", {}), " - No attribution required with Skiper UI Pro."] })] })] }) }, 'info')) : null }) })] }) })] }), _jsx(AnimatePresence, { children: isSearchOpen && (_jsxs("div", { className: 'fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4', children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setIsSearchOpen(false), className: 'absolute inset-0 backdrop-blur-sm' }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -20 }, className: 'relative w-full max-w-[600px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden', children: [_jsxs("div", { className: 'flex items-center px-4 border-b border-zinc-800', children: [_jsx(Search, { className: 'text-zinc-500', size: 18 }), _jsx("input", { autoFocus: true, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: 'Search components or pages...', className: 'w-full h-14 bg-transparent border-none outline-none px-4 text-white text-sm placeholder:text-zinc-600' })] }), _jsx("div", { className: 'max-h-[400px] overflow-y-auto p-2 custom-scrollbar', children: searchQuery.length > 0 ? (_jsxs("div", { className: 'p-2', children: [_jsx("p", { className: 'px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider', children: "Component Results" }), filteredComponents.length > 0 ? (filteredComponents.map((comp) => (_jsxs(Link, { href: `/component/${comp.name}`, onClick: () => {
                                                        setIsSearchOpen(false);
                                                        setSearchQuery('');
                                                    }, className: 'flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group', children: [_jsx(Box, { size: 16, className: 'text-zinc-500 group-hover:text-white' }), _jsx("span", { className: 'text-sm text-zinc-300 group-hover:text-white', children: comp.name })] }, comp.name)))) : (_jsx("p", { className: 'px-3 py-4 text-sm text-zinc-600', children: "No components found..." }))] })) : (['Pages', 'Get Started'].map((category) => (_jsxs("div", { className: 'mb-2', children: [_jsx("p", { className: 'px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider', children: category }), staticSearchItems
                                                    .filter((item) => item.category === category)
                                                    .map((item) => (_jsxs(Link, { href: item.path, onClick: () => setIsSearchOpen(false), className: 'flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group', children: [_jsx("div", { className: 'text-zinc-500 group-hover:text-white', children: item.icon }), _jsx("span", { className: 'text-sm text-zinc-300 group-hover:text-white', children: item.label })] }, item.label)))] }, category)))) }), _jsxs("div", { className: 'px-4 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-[10px] text-zinc-500 font-medium', children: [_jsxs("div", { className: 'flex gap-3', children: [_jsxs("span", { className: 'flex items-center gap-1', children: [_jsx(Command, { size: 10 }), " to select"] }), _jsx("span", { className: 'flex items-center gap-1', children: "Enter to open" })] }), _jsx("span", { children: "ESC to close" })] })] })] })) })] }) }));
}
