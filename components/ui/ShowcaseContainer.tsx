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
  // Add other properties here
}

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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'code' | 'info' | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
  const dynamicInstall = propsInstall || activeItem?.install || '';

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
    <div className='h-screen w-screen bg-[#0A0A0A] p-2 overflow-hidden text-white font-sans'>
      <div className='h-full w-full rounded-[40px] overflow-hidden flex relative bg-[#0A0A0A] '>
        {/* LEFT NAV SIDEBAR */}
        <aside
          className={`absolute top-0 left-0 z-[150] outline-none border-none h-full w-[320px] rounded-l-[40px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]  ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
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
                    {/* tick rail */}
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

        <div className='relative flex w-full h-full'>
          <main
            className={`flex-1 relative transition-all duration-700 ease-in-out`}
          >
            {!isFullscreen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen((prev) => !prev);
                }}
                className='absolute top-8 left-8 z-[160] p-3 bg-[#161616]/80 backdrop-blur-sm border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-all cursor-pointer shadow-xl'
              >
                <PanelLeft size={20} />
              </button>
            )}

            {!isFullscreen && (
              <nav
                aria-label='breadcrumb'
                className='absolute top-8 left-24 z-[110] flex font-cartographCF items-center gap-2 text-xs h-[46px]'
              >
                <Link
                  href='/'
                  className='transition-colors text-zinc-500 hover:text-white'
                >
                  Home
                </Link>
                <span className='text-zinc-700'>/</span>
                <Link
                  href='/component'
                  className='transition-colors text-zinc-500 hover:text-white'
                >
                  Components
                </Link>
                {id && (
                  <>
                    <span className='text-zinc-700'>/</span>
                    {activePanel ? (
                      <Link
                        href={`/component/${id}`}
                        className='text-zinc-500 hover:text-white transition-colors truncate max-w-[140px]'
                      >
                        {id}
                      </Link>
                    ) : (
                      <span className='text-white truncate max-w-[160px]'>
                        {id}
                      </span>
                    )}
                  </>
                )}
                {activePanel && (
                  <>
                    <span className='text-zinc-700'>/</span>
                    <span className='text-white capitalize'>
                      {activePanel === 'code' ? 'Source' : 'Info'}
                    </span>
                  </>
                )}
              </nav>
            )}

            {iframeLoading && (
              <div className='absolute inset-0 flex items-center justify-center bg-[#0a0908] z-10 pointer-events-none'>
                <Loader2 className='animate-spin text-zinc-600' size={24} />
              </div>
            )}
            <iframe
              key={id as string}
              src={`/preview/${id}`}
              className='w-full h-full border-0 block overflow-visible rounded-[40px]'
              title={title}
              onLoad={() => setIframeLoading(false)}
            />

            {/* FLOATING TOOLBAR */}
            <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center  bg-[#161616]/90 border border-white/10 p-1 rounded-xl shadow-2xl backdrop-blur-xl z-[120]'>
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

          {/* RIGHT SIDE PANEL */}
          <aside
            className={`h-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-[130] border-l border-white/10 bg-[#0A0A0A]/95 backdrop-blur-2xl ${activePanel ? 'w-[50%] opacity-100' : 'w-0 opacity-0'}`}
          >
            <div className='p-8 h-full flex flex-col min-w-[450px]'>
              <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-1 p-1 border bg-white/5 border-white/10 rounded-xl'>
                  <button
                    onClick={() => setActivePanel('info')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activePanel === 'info' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                  >
                    Info
                  </button>
                  <button
                    onClick={() => setActivePanel('code')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${activePanel === 'code' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                  >
                    Source
                  </button>
                </div>

                <button
                  onClick={() => setActivePanel(null)}
                  className='p-2 transition-colors rounded-lg cursor-pointer hover:bg-white/5 text-zinc-500 hover:text-white'
                >
                  <X size={16} />
                </button>
              </div>

              <div className='mb-8'>
                <h3 className='text-lg font-semibold leading-tight text-white'>
                  {activeItem?.name || title}
                </h3>
                <p className='mt-1 text-xs text-zinc-600'>
                  {activePanel === 'code'
                    ? 'Component source'
                    : 'Details & usage'}
                </p>
              </div>

              <div className='flex-1 pr-4 overflow-y-auto custom-scrollbar'>
                <AnimatePresence mode='wait'>
                  {activePanel === 'code' ? (
                    <motion.div
                      key='code'
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className='relative overflow-hidden bg-black border rounded-2xl border-white/10'
                    >
                      {isLoadingCode ? (
                        <div className='flex flex-col items-center justify-center gap-4 py-32 text-zinc-600'>
                          <Loader2 className='animate-spin' size={24} />
                          <span className='text-[10px] uppercase tracking-widest font-bold'>
                            Fetching Code
                          </span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => copyToClipboard(dynamicCode)}
                            className='absolute z-10 p-2 rounded-md cursor-pointer top-4 right-4 bg-white/5 text-zinc-400 hover:bg-white/10'
                          >
                            {copied ? (
                              <Check size={14} className='text-white' />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                          <SyntaxHighlighter
                            language='tsx'
                            style={theme}
                            customStyle={{
                              margin: 0,
                              padding: '32px',
                              fontSize: '13px',
                              background: 'transparent',
                              lineHeight: '1.7',
                            }}
                          >
                            {dynamicCode}
                          </SyntaxHighlighter>
                        </>
                      )}
                    </motion.div>
                  ) : activePanel === 'info' ? (
                    <motion.div
                      key='info'
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className='h-full overflow-y-auto'
                    >
                      <section className='pb-20 space-y-12'>
                        <div>
                          <h4 className='text-[12px] uppercase text-zinc-600 mb-6'>
                            Description
                          </h4>
                          <div className='font-cartographCF '>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {dynamicDescription}
                            </ReactMarkdown>
                          </div>
                        </div>

                        {dynamicDependencies.length > 0 && (
                          <div>
                            <h4 className='text-[12px] uppercase text-zinc-600 mb-6'>
                              Dependencies
                            </h4>
                            <div className='flex gap-2'>
                              {dynamicDependencies.map(
                                (dep: string, i: number) => (
                                  <span
                                    key={i}
                                    className='px-2 py-1 text-xs border rounded-md bg-white/5 border-white/10 font-cartographCF text-zinc-400'
                                  >
                                    {dep}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className='text-[12px] uppercase text-zinc-600 mb-6'>
                            Installation
                          </h4>
                          <div className='flex items-center justify-between p-4 font-mono text-sm bg-black border rounded-xl border-white/10'>
                            <span className='text-zinc-300 font-cartographCF'>
                              {dynamicInstall}
                            </span>
                            <button
                              onClick={() => copyToClipboard(dynamicInstall)}
                              className='p-2 rounded-md hover:bg-white/5 text-zinc-500'
                            >
                              {copied ? (
                                <Check size={14} />
                              ) : (
                                <Copy size={14} />
                              )}
                            </button>
                          </div>
                        </div>

                        {dynamicInteraction.length > 0 && (
                          <div>
                            <h4 className='text-[12px] uppercase text-zinc-600 mb-6'>
                              Interaction Type
                            </h4>
                            <div className='space-y-4'>
                              {dynamicInteraction.map(
                                (item: Interaction, i: number) => (
                                  <div
                                    key={i}
                                    className='flex gap-2 px-1 py-5 text-sm rounded-md font-cartographCF bg-zinc-900'
                                  >
                                    <span className='text-zinc-500'>
                                      {item.type}:
                                    </span>
                                    <span className=''>{item.description}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {dynamicHowToUse && (
                          <div>
                            <h4 className='text-[12px] uppercase text-zinc-600 mb-6'>
                              How to use
                            </h4>
                            <div className='p-4 overflow-x-auto font-mono text-sm bg-black border rounded-xl border-white/10'>
                              <pre className='text-zinc-300 font-cartographCF'>
                                <SyntaxHighlighter
                                  language='tsx'
                                  style={theme}
                                  customStyle={{
                                    margin: 0,
                                    padding: '0px',
                                    fontSize: '15px',
                                    background: 'transparent',
                                    lineHeight: '1.7',
                                  }}
                                >
                                  {dynamicHowToUse}
                                </SyntaxHighlighter>
                              </pre>
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className='text-[12px] uppercase text-zinc-600 mb-6'>
                            Keep in mind
                          </h4>
                          <p className='font-cartographCF'>
                            Driven by the craft of high-end digital design.
                            These components are my explorations and modern
                            takes on industry-leading patterns I’ve encountered
                            across Awwwards and CodeGrid. I hold the original
                            creators of these concepts in high regard; this
                            library is my attempt to reverse-engineer,
                            standardize, and integrate their brilliance into a
                            consistent, developer-first toolkit.
                          </p>
                        </div>

                        <div>
                          <h4 className='text-[12px] uppercase text-zinc-600 mb-6'>
                            Contact
                          </h4>
                          <p className='flex items-center gap-1 font-cartographCF'>
                            Additionlly, if you find any bug or issue related to
                            component , feel free to drop a dm
                            <a
                              href={`mailto:`}
                              className='px-2 py-2 rounded-full bg-zinc-800'
                            >
                              <Mail size={14} className='' />{' '}
                            </a>
                          </p>
                        </div>

                        <div>
                          <h4 className='text-[12px] uppercase text-zinc-600 mb-6'>
                            License & Usage
                          </h4>
                          <p className='font-cartographCF'>
                            - Free to use and modify in both personal and
                            commercial projects. <br /> - Attribution to Skiper
                            UI is required when using the free version. <br /> -
                            No attribution required with Skiper UI Pro.
                          </p>
                        </div>
                      </section>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </aside>
        </div>

        {/* SEARCH OVERLAY */}
        <AnimatePresence>
          {isSearchOpen && (
            <div className='fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSearchOpen(false)}
                className='absolute inset-0 backdrop-blur-sm'
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className='relative w-full max-w-[600px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden'
              >
                <div className='flex items-center px-4 border-b border-zinc-800'>
                  <Search className='text-zinc-500' size={18} />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search components or pages...'
                    className='w-full px-4 text-sm text-white bg-transparent border-none outline-none h-14 placeholder:text-zinc-600'
                  />
                </div>
                <div className='max-h-[400px] overflow-y-auto p-2 custom-scrollbar'>
                  {searchQuery.length > 0 ? (
                    <div className='p-2'>
                      <p className='px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider'>
                        Component Results
                      </p>
                      {filteredComponents.length > 0 ? (
                        filteredComponents.map((comp: any) => (
                          <Link
                            key={comp.name}
                            href={`/component/${comp.name}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group'
                          >
                            <Box
                              size={16}
                              className='text-zinc-500 group-hover:text-white'
                            />
                            <span className='text-sm text-zinc-300 group-hover:text-white'>
                              {comp.name}
                            </span>
                          </Link>
                        ))
                      ) : (
                        <p className='px-3 py-4 text-sm text-zinc-600'>
                          No components found...
                        </p>
                      )}
                    </div>
                  ) : (
                    ['Pages', 'Get Started'].map((category) => (
                      <div key={category} className='mb-2'>
                        <p className='px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider'>
                          {category}
                        </p>
                        {staticSearchItems
                          .filter((item) => item.category === category)
                          .map((item) => (
                            <Link
                              key={item.label}
                              href={item.path}
                              onClick={() => setIsSearchOpen(false)}
                              className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group'
                            >
                              <div className='text-zinc-500 group-hover:text-white'>
                                {item.icon}
                              </div>
                              <span className='text-sm text-zinc-300 group-hover:text-white'>
                                {item.label}
                              </span>
                            </Link>
                          ))}
                      </div>
                    ))
                  )}
                </div>
                <div className='px-4 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-[10px] text-zinc-500 font-medium'>
                  <div className='flex gap-3'>
                    <span className='flex items-center gap-1'>
                      <Command size={10} /> to select
                    </span>
                    <span className='flex items-center gap-1'>
                      Enter to open
                    </span>
                  </div>
                  <span>ESC to close</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}