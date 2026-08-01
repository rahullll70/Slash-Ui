'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Code2,
  Command,
  PanelLeft,
  Info,
  Check,
  X,
  Search,
  Box,
  Copy,
  Loader2,
  Maximize,
  Home,
  LoaderCircle,
  MousePointer2,
  Rocket,
  Mail,
  Terminal,
  FileCode2,
  Sparkles,
  BookOpen,
  Layers,
  ShieldCheck,
} from 'lucide-react';
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
import { SearchModal } from './SearchModal';
import { useSearch } from '@/hooks/use-component-search';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('javascript', javascript);

type Interaction = {
  type: string;
  description: string;
};

function normalizeRegistryToList(registry: any) {
  if (!registry) return [];

  if (Array.isArray(registry)) return registry;

  const candidate =
    registry?.components || registry?.default || registry?.registry || registry;

  if (Array.isArray(candidate)) return candidate;

  if (candidate && typeof candidate === 'object') {
    return Object.entries(candidate).map(([key, val]: any) => {
      const inferredName =
        val && typeof val === 'object' && val.name ? val.name : key;
      return { name: inferredName, ...(val || {}) };
    });
  }

  return [];
}

export interface RegistryItem {
  name: string;
  description: string;
  content: React.ReactNode;
}

type PkgManager = 'pnpm' | 'npm' | 'bun' | 'yarn';

export default function ShowcaseContainer({
  children,
  title,
  code: propsCode,
  description: propsDescription,
  install: propsInstall,
  dependencies: propsDependencies,
  interactionType: propsInteraction,
  howToUse: propsHowToUse,
}: {
  children: React.ReactNode;
  title: string;
  code?: string;
  description?: string;
  install?: string;
  dependencies?: string[];
  interactionType?: Interaction[];
  howToUse?: string;
}) {
  const { searchQuery, setSearchQuery, filteredItems } = useSearch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'code' | 'info' | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [pkgManager, setPkgManager] = useState<PkgManager>('pnpm');
  const { id } = useParams();
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const activeItem = React.useMemo(() => {
    if (!id) return null;
    const normalizedId = id.toString().toLowerCase();
    return normalizeRegistryToList(RegistryMeta).find(
      (c: any) => c?.name?.toLowerCase() === normalizedId,
    );
  }, [id]);

  const list = normalizeRegistryToList(RegistryMeta);

  useEffect(() => {
    setIframeLoading(true);
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      if (activePanel === 'code' && activeItem?.files) {
        setIsLoadingCode(true);
        const code = await getComponentSource(activeItem.files);
        setSourceCode(code ?? '// Error: Source code not found.');
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
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const copyToClipboard = async (text: string, isInstall = false) => {
    await navigator.clipboard.writeText(text);
    if (isInstall) {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const dynamicCode =
    sourceCode ||
    propsCode ||
    activeItem?.content ||
    '// No source code found.';
  const dynamicDescription =
    propsDescription ||
    activeItem?.description ||
    `Premium ${title} component.`;
  const rawInstall = propsInstall || activeItem?.install || `npx shadcn@latest add ${id || 'component'}`;

  const getFormattedInstall = (cmd: string, pm: PkgManager) => {
    if (cmd.startsWith('npx shadcn')) {
      switch (pm) {
        case 'pnpm': return cmd.replace('npx', 'pnpm dlx');
        case 'bun': return cmd.replace('npx', 'bunx');
        case 'yarn': return cmd.replace('npx', 'yarn dlx');
        default: return cmd;
      }
    }
    return cmd;
  };

  const formattedInstall = getFormattedInstall(rawInstall, pkgManager);

  const dynamicDependencies =
    propsDependencies || activeItem?.dependencies || [];
  const dynamicInteraction =
    propsInteraction || activeItem?.interactionType || [];
  const dynamicHowToUse = propsHowToUse || activeItem?.howToUse || '';

  const filteredComponents = list.filter((comp: any) => {
    const nm = (comp?.name ?? '').toString().toLowerCase();
    const q = (searchQuery ?? '').toString().toLowerCase();
    return nm.includes(q);
  });

  const staticSearchItems = [
    { icon: <Home size={16} />, label: 'Home', category: 'Pages', path: '/' },
    {
      icon: <LoaderCircle size={16} />,
      label: 'Loader',
      category: 'Pages',
      path: '/loader',
    },
    {
      icon: <MousePointer2 size={16} />,
      label: 'Cursor',
      category: 'Pages',
      path: '/cursor',
    },
    {
      icon: <Box size={16} />,
      label: 'All Components',
      category: 'Pages',
      path: '/component',
    },
    {
      icon: <Rocket size={16} />,
      label: 'Quick Start',
      category: 'Get Started',
      path: '/docs',
    },
  ];

  return (
    <div className='h-screen w-screen bg-[#0A0A0A] p-2 overflow-hidden text-white font-inter'>
      <div className='h-full w-full rounded-[40px] overflow-hidden flex relative bg-[#0A0A0A]'>
        {/* LEFT NAV SIDEBAR */}
        <aside
          className={`absolute top-0 left-0 z-[150] outline-none border-none h-full w-[320px] rounded-l-[40px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
        >
          <div className='flex flex-col h-full p-10 pt-24'>
            <nav
              className='flex-1 overflow-y-auto bg-transparent custom-scrollbar'
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)',
              }}
            >
              {filteredComponents.map((comp: any, index: number) => {
                const compName = (
                  (comp?.name ?? comp?.label ?? comp?.title ?? '') as any
                ).toString();
                if (!compName) return null;

                const isActive = id === compName;
                const isNew = !!comp?.isNew;

                return (
                  <Link
                    key={compName || index}
                    href={`/component/${compName}`}
                    onClick={() => setSidebarOpen(false)}
                    prefetch={false}
                    className='group relative flex items-center gap-3 py-[7px] bg-transparent'
                  >
                    <div
                      className={`h-px shrink-0 transition-all duration-300 ease-out ${
                        isActive
                          ? 'w-8 bg-white'
                          : 'w-3 bg-zinc-800 group-hover:w-5 group-hover:bg-zinc-500'
                      }`}
                    />

                    <div className='flex items-center gap-1.5 min-w-0'>
                      <span
                        className={`text-[13px] leading-none tabular-nums shrink-0 transition-colors ${
                          isActive
                            ? 'text-zinc-300'
                            : 'text-zinc-700 group-hover:text-zinc-500'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span
                        className={`text-[13px] leading-none truncate transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-zinc-500 group-hover:text-white'
                        }`}
                      >
                        {compName}
                      </span>

                      {isNew && (
                        <span className='text-[9px] leading-none font-semibold text-zinc-400 self-start translate-y-[-2px]'>
                          New
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className='absolute inset-0 z-[140] cursor-pointer'
            />
          )}
        </AnimatePresence>

        <div className='relative flex w-full h-full overflow-hidden'>
          <main className='relative flex-1 transition-all duration-700 ease-in-out'>
            {/* TOP BAR: SIDEBAR TOGGLE + BREADCRUMBS */}
            {!isFullscreen && (
              <div className='absolute top-8 left-8 z-[160] flex items-center gap-3 max-w-[calc(100%-4rem)] pointer-events-auto'>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSidebarOpen((prev) => !prev);
                  }}
                  className='p-3 bg-[#161616]/80 backdrop-blur-md rounded-2xl text-zinc-400 hover:text-white transition-all cursor-pointer shadow-xl shrink-0'
                >
                  <PanelLeft size={20} />
                </button>

                <nav
                  aria-label='breadcrumb'
                  className='flex items-center min-w-0 gap-2 overflow-hidden text-xs font-medium text-zinc-400'
                >
                  <Link
                    href='/'
                    className='transition-colors hover:text-white shrink-0'
                  >
                    Home
                  </Link>
                  <span className='text-zinc-600 shrink-0'>/</span>
                  <Link
                    href='/component'
                    className='transition-colors hover:text-white shrink-0'
                  >
                    Components
                  </Link>
                  {id && (
                    <>
                      <span className='text-zinc-600 shrink-0'>/</span>
                      {activePanel ? (
                        <Link
                          href={`/component/${id}`}
                          className='hover:text-white transition-colors truncate max-w-[120px]'
                        >
                          {id}
                        </Link>
                      ) : (
                        <span className='text-white truncate max-w-[140px]'>
                          {id}
                        </span>
                      )}
                    </>
                  )}
                  {activePanel && (
                    <>
                      <span className='text-zinc-600 shrink-0'>/</span>
                      <span className='text-white capitalize shrink-0'>
                        {activePanel === 'code' ? 'Source' : 'Info'}
                      </span>
                    </>
                  )}
                </nav>
              </div>
            )}

            {iframeLoading && (
              <div className='absolute inset-0 flex items-center justify-center bg-[#0a0908] z-10 pointer-events-none'>
                <Loader2 className='animate-spin text-zinc-600' size={24} />
              </div>
            )}

            {/* IFRAME CANVAS */}
            <iframe
              key={id as string}
              src={`/preview/${id}`}
              className='relative z-0 w-full h-full border-0 block overflow-visible rounded-[40px]'
              title={title}
              onLoad={() => setIframeLoading(false)}
            />

            {/* FLOATING TOOLBAR */}
            <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center bg-[#161616]/90 p-1 rounded-xl shadow-2xl backdrop-blur-xl z-[120]'>
              <button
                onClick={toggleFullscreen}
                className='p-2.5 rounded-xl cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5 transition-all'
              >
                <Maximize size={15} />
              </button>
              <button
                onClick={() =>
                  setActivePanel(activePanel === 'info' ? null : 'info')
                }
                className={`p-2.5 rounded-xl cursor-pointer transition-all ${activePanel === 'info' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                <Info size={15} />
              </button>

              <button
                onClick={() =>
                  setActivePanel(activePanel === 'code' ? null : 'code')
                }
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${activePanel === 'code' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                <Code2 size={15} />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className='p-2.5 rounded-xl transition-all cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5'
              >
                <Command size={15} />
              </button>
            </div>
          </main>

          {/* RIGHT SIDEBAR PANEL */}
          <aside
            className={`h-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-[130] bg-[#0c0c0e]/95 backdrop-blur-3xl flex flex-col ${
              activePanel ? 'w-[520px] opacity-100' : 'w-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className='p-6 h-full flex flex-col min-w-[520px]'>
              {/* HEADER BAR */}
              <div className='flex items-center justify-between pb-5 shrink-0'>
                <div className='flex items-center gap-2'>
                  <div className='relative flex items-center p-1 bg-brand-accent rounded-xl'>
                    <button
                      onClick={() => setActivePanel('info')}
                      className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-switzer transition-colors cursor-pointer ${
                        activePanel === 'info' ? 'text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {activePanel === 'info' && (
                        <motion.div
                          layoutId='panel-active-pill'
                          className='absolute inset-0 bg-white rounded-lg -z-10'
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Info size={13} />
                      Info
                    </button>
                    <button
                      onClick={() => setActivePanel('code')}
                      className={`relative z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-switzer transition-colors cursor-pointer ${
                        activePanel === 'code' ? 'text-black' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {activePanel === 'code' && (
                        <motion.div
                          layoutId='panel-active-pill'
                          className='absolute inset-0 bg-white rounded-lg -z-10'
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Code2 size={13} />
                      Source
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setActivePanel(null)}
                  className='p-1.5 transition-colors rounded-lg cursor-pointer hover:bg-white/10 text-zinc-400 hover:text-white'
                >
                  <X size={16} />
                </button>
              </div>

              {/* COMPONENT TITLE BAR */}
              <div className='flex items-start justify-between pb-5 shrink-0'>
                <div>
                  <h3 className='text-xl font-bold leading-tight tracking-tight text-white font-switzer'>
                    {activeItem?.name || title}
                  </h3>
                  <p className='mt-1 text-xs text-zinc-400 font-inter'>
                    {activePanel === 'code' ? 'Component source file & syntax' : 'Documentation, dependencies & usage'}
                  </p>
                </div>
              </div>

              {/* SCROLLABLE CONTENT AREA */}
              <div className='flex-1 min-h-0 overflow-y-auto'>
                <AnimatePresence mode='wait'>
                  {activePanel === 'code' ? (
                    <motion.div
                      key='code'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className='flex flex-col mb-6 overflow-hidden rounded-2xl bg-brand-accent'
                    >
                      {/* Code Header Bar */}
                      <div className='flex items-center justify-between px-4 py-3 text-xs bg-brand-accent font-cartographCF text-zinc-400 shrink-0'>
                        <div className='flex items-center gap-2'>
                          <FileCode2 size={14} className='text-zinc-400' />
                          <span>{activeItem?.name || title}.tsx</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className='text-[10px] font-mono px-2 py-0.5 rounded bg-black/20 text-zinc-300'>
                            TypeScript
                          </span>
                          <button
                            onClick={() => copyToClipboard(dynamicCode)}
                            className='flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-black/20 hover:bg-black/40 text-zinc-300 transition-colors cursor-pointer'
                          >
                            {copied ? (
                              <>
                                <Check size={12} className='text-emerald-400' />
                                <span className='font-medium text-emerald-400 font-switzer'>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} />
                                <span className='font-switzer'>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Syntax Container */}
                      <div className='relative overflow-x-auto bg-black/30 custom-scrollbar'>
                        {isLoadingCode ? (
                          <div className='flex flex-col items-center justify-center gap-3 py-28 text-zinc-400'>
                            <Loader2 className='animate-spin' size={22} />
                            <span className='font-mono text-xs tracking-wider uppercase'>
                              Loading Source...
                            </span>
                          </div>
                        ) : (
                          <SyntaxHighlighter
                            language='tsx'
                            style={theme}
                            customStyle={{
                              margin: 0,
                              padding: '24px',
                              fontSize: '12.5px',
                              background: 'transparent',
                              lineHeight: '1.6',
                              fontFamily: 'var(--font-cartographCF), monospace',
                            }}
                          >
                            {dynamicCode}
                          </SyntaxHighlighter>
                        )}
                      </div>
                    </motion.div>
                  ) : activePanel === 'info' ? (
                    <motion.div
                      key='info'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className='pb-8 pr-2 space-y-5'
                    >
                      {/* Description Card */}
                      <div className='p-4 rounded-2xl bg-brand-accent'>
                        <div className='flex items-center gap-2 mb-2 text-xs font-semibold tracking-wider uppercase text-zinc-300 font-switzer'>
                          <BookOpen size={13} className='text-zinc-400' />
                          <span>Description</span>
                        </div>
                        <div className='text-sm leading-relaxed text-zinc-200 font-inter'>
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {dynamicDescription}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Installation Card with Package Switcher */}
                      <div className='p-4 rounded-2xl bg-brand-accent'>
                        <div className='flex items-center justify-between mb-3'>
                          <div className='flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-300 font-switzer'>
                            <Terminal size={13} className='text-zinc-400' />
                            <span>Installation</span>
                          </div>
                          
                          <div className='flex bg-black/30 p-0.5 rounded-lg text-[10px] font-mono'>
                            {(['pnpm', 'npm', 'bun', 'yarn'] as PkgManager[]).map((pm) => (
                              <button
                                key={pm}
                                onClick={() => setPkgManager(pm)}
                                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                                  pkgManager === pm ? 'bg-black/60 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                                }`}
                              >
                                {pm}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className='flex items-center justify-between p-3 text-xs rounded-xl bg-brand-accent font-cartographCF'>
                          <span className='pr-2 truncate text-zinc-200'>
                            {formattedInstall}
                          </span>
                          <button
                            onClick={() => copyToClipboard(formattedInstall, true)}
                            className='p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-zinc-300 transition-colors shrink-0 cursor-pointer'
                          >
                            {copiedInstall ? (
                              <Check size={13} className='text-emerald-400' />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Dependencies & Interactions */}
                      {(dynamicDependencies.length > 0 || dynamicInteraction.length > 0) && (
                        <div className='grid grid-cols-1 gap-4'>
                          {dynamicDependencies.length > 0 && (
                            <div className='p-4 rounded-2xl bg-brand-accent'>
                              <div className='flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider uppercase text-zinc-300 font-switzer'>
                                <Layers size={13} className='text-zinc-400' />
                                <span>Dependencies</span>
                              </div>
                              <div className='flex flex-wrap gap-1.5'>
                                {dynamicDependencies.map((dep: string, i: number) => (
                                  <span
                                    key={i}
                                    className='px-2.5 py-1 text-xs rounded-lg bg-black/20 font-cartographCF text-zinc-200'
                                  >
                                    {dep}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {dynamicInteraction.length > 0 && (
                            <div className='p-4 rounded-2xl bg-brand-accent'>
                              <div className='flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider uppercase text-zinc-300 font-switzer'>
                                <Sparkles size={13} className='text-zinc-400' />
                                <span>Interactions</span>
                              </div>
                              <div className='space-y-2'>
                                {dynamicInteraction.map((item: Interaction, i: number) => (
                                  <div
                                    key={i}
                                    className='p-2.5 rounded-xl bg-black/20 text-xs flex items-start gap-2'
                                  >
                                    <span className='font-semibold text-zinc-200 font-switzer shrink-0'>
                                      {item.type}:
                                    </span>
                                    <span className='text-zinc-300'>{item.description}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* How to Use Card */}
                      {dynamicHowToUse && (
                        <div className='p-4 rounded-2xl bg-brand-accent'>
                          <div className='flex items-center gap-2 mb-3 text-xs font-semibold tracking-wider uppercase text-zinc-300 font-switzer'>
                            <Code2 size={13} className='text-zinc-400' />
                            <span>Usage Snippet</span>
                          </div>
                          <div className='p-3 overflow-x-auto bg-black/30 rounded-xl custom-scrollbar'>
                            <SyntaxHighlighter
                              language='tsx'
                              style={theme}
                              customStyle={{
                                margin: 0,
                                padding: '0px',
                                fontSize: '12px',
                                background: 'transparent',
                                lineHeight: '1.6',
                                fontFamily: 'var(--font-cartographCF), monospace',
                              }}
                            >
                              {dynamicHowToUse}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      )}

                      {/* Footer Info Card */}
                      <div className='p-4 space-y-3 text-xs rounded-2xl bg-brand-accent text-zinc-300'>
                        <div className='flex items-center gap-2 font-semibold tracking-wider uppercase text-zinc-200 font-switzer'>
                          <ShieldCheck size={14} className='text-zinc-400' />
                          <span>License & Guidelines</span>
                        </div>
                        <p className='leading-relaxed'>
                          Free to use in personal & commercial applications. Standard attribution requested for non-pro users.
                        </p>
                        <div className='flex items-center justify-between pt-2 text-zinc-400'>
                          <span>Found an issue?</span>
                          <a
                            href='mailto:'
                            className='inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/20 hover:bg-black/40 text-zinc-200 transition-colors'
                          >
                            <Mail size={12} /> DM Support
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </aside>
        </div>

        {/* SEARCH OVERLAY MODAL */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredItems={filteredItems}
          
        />
      </div>
    </div>
  );
}