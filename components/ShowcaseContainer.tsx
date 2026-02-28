'use client';

import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React, { useState, Suspense, useEffect, use } from 'react';
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
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Index } from '@/__registry__';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { getComponentSource } from '@/lib/registry';

export default function ShowcaseContainer({
  children,
  title,
  code: propsCode,
  description: propsDescription,
  install: propsInstall,
}: {
  children: React.ReactNode;
  title: string;
  code?: string;
  description?: string;
  install?: string;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'code' | 'info' | 'search' | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams();
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const componentsList = Object.values(Index['default']);
  const activeItem = Index['default'][id as string] as any;



  //style based on components id
  const getContainerStyle = () => {
   switch (id) {
      case 'neubrutal-button':
        return 'bg-[#538F37]'; 
      case 'dot-cursor':
      case 'navbar1':
        return '' ;
      default:
        return 'bg-[#0a0908]';
    }
  };

  // Handle Fullscreen state
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false));
      }
    }
  };

  // Sync state if user exits via ESC key
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // FETCH SOURCE CODE LOGIC
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

  const DynamicDetails = activeItem?.details;
  const dynamicCode = propsCode || sourceCode || activeItem?.content || '// No source code found.';
  const dynamicDescription = propsDescription || activeItem?.description || `Premium ${title} component.`;
  const dynamicInstall = propsInstall || activeItem?.install || 'npm install framer-motion lucide-react';

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredComponents = componentsList.filter((comp: any) =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className='h-screen w-screen bg-black p-2 overflow-hidden text-white font-sans'>
      <div className='h-full w-full rounded-[30px] border border-white/5 overflow-hidden flex relative bg-[#0A0A0A]'>
        {/* LEFT NAV SIDEBAR */}
        <aside
          className={`absolute top-0 left-0 z-[150] h-full w-[320px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-[#0A0A0A]/80 backdrop-blur-2xl border-r border-white/5 ${
            isSidebarOpen
              ? 'translate-x-0 opacity-100 pointer-events-auto'
              : '-translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <div className='flex flex-col h-full p-10'>
            <div className='flex items-center justify-between mb-12'>
              <div className='text-sm text-zinc-500'>Navigation</div>
              <button
                onClick={() => setSidebarOpen(false)}
                className='p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer'
              >
                <X size={16} />
              </button>
            </div>
            <nav className='flex-1 overflow-y-auto custom-scrollbar space-y-2'>
              {componentsList.map((comp: any, index: number) => {
                const isActive = id === comp.name;
                return (
                  <Link
                    key={comp.name}
                    href={`/component/${comp.name}`}
                    onClick={() => setSidebarOpen(false)}
                    className='group flex items-center gap-4 py-2'
                  >
                    <div className={`h-px transition-all duration-300 ${isActive ? 'w-6 bg-white' : 'w-3 bg-zinc-800 group-hover:bg-zinc-500'}`} />
                    <span className={`text-[13px] transition-colors ${isActive ? 'text-white font-medium' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                      <span className='font-mono mr-2 opacity-30'>{String(index + 1).padStart(2, '0')}</span>
                      {comp.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* CLICK OVERLAY FOR SIDEBAR */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className='absolute inset-0 bg-black/40 z-[140] backdrop-blur-sm cursor-pointer'
            />
          )}
        </AnimatePresence>

        <div className='flex w-full h-full relative'>
          {/* MAIN STAGE */}
          <main
            className={`flex-1 relative flex flex-col items-center justify-center  transition-all duration-700 ${getContainerStyle()} ease-in-out ${activePanel ? 'scale-[0.9] opacity-50' : 'scale-100 opacity-100'}`}
          >
            {/* HIDE THESE WHEN FULLSCREEN */}
            {!isFullscreen && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSidebarOpen(true);
                  }}
                  className='absolute top-8 left-8 z-[110] p-3 bg-[#161616]/80 backdrop-blur-md border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:border-white/20 transition-all cursor-pointer shadow-xl'
                >
                  <PanelLeft size={20} />
                </button>

                <div className='absolute top-10 right-10 text-right pointer-events-none'>
                  <h2 className='text-2xl text-white font-black uppercase tracking-tighter'>
                    {title}
                  </h2>
                </div>
              </>
            )}

            <div className='transition-transform duration-700'>{children}</div>

            {/* FLOATING TOOLBAR */}
            <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#161616]/90 border border-white/10 p-1.5 rounded-2xl shadow-2xl backdrop-blur-xl z-[120]'>
              <button onClick={toggleFullscreen} className='p-2.5 rounded-xl cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5 transition-all'>
                <Maximize size={18} />
              </button>
              <button
                onClick={() => setActivePanel(activePanel === 'info' ? null : 'info')}
                className={`p-2.5 rounded-xl cursor-pointer transition-all ${activePanel === 'info' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                <Info size={18} />
              </button>
              <div className='w-px h-4 bg-white/10 mx-1' />
              <button
                onClick={() => setActivePanel(activePanel === 'code' ? null : 'code')}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${activePanel === 'code' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                <Code2 size={18} />
              </button>
              <button
                onClick={() => setActivePanel('search')}
                className={`p-2.5 rounded-xl transition-all cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5`}
              >
                <Command size={18} />
              </button>
            </div>
          </main>

          {/* RIGHT SIDE PANEL */}
          <aside
            className={`h-full bg-[#080808] border-l border-white/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden relative z-[130] ${
              activePanel === 'code' || activePanel === 'info'
                ? 'w-[45%] opacity-100'
                : 'w-0 opacity-0'
            }`}
          >
            <div className='p-12 h-full flex flex-col min-w-[450px]'>
              <div className='flex items-center justify-between mb-12'>
                <AnimatePresence mode='wait'>
                  <motion.h3
                    key={activePanel}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className='text-sm uppercase font-beVietnamPro text-zinc-500'
                  >
                    {activePanel === 'code' ? 'Source Code' : 'Documentation'}
                  </motion.h3>
                </AnimatePresence>
                <button
                  onClick={() => setActivePanel(null)}
                  className='p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white cursor-pointer transition-colors'
                >
                  <X size={18} />
                </button>
              </div>

              <div className='flex-1 overflow-y-auto custom-scrollbar pr-4'>
                <AnimatePresence mode='wait'>
                  {activePanel === 'code' ? (
                    <motion.div
                      key='code'
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className='relative rounded-2xl bg-black border border-white/10 overflow-hidden'
                    >
                      {isLoadingCode ? (
                        <div className='flex flex-col items-center justify-center py-32 text-zinc-600 gap-4'>
                          <Loader2 className='animate-spin' size={24} />
                          <span className='text-[10px] uppercase tracking-widest font-bold'>
                            Fetching Code
                          </span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => copyToClipboard(dynamicCode)}
                            className='absolute top-4 right-4 p-2 bg-white/5 rounded-md text-zinc-400 cursor-pointer z-10 hover:bg-white/10 transition-colors'
                          >
                            {copied ? <Check size={14} className='text-white' /> : <Copy size={14} />}
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
                              overflowX: 'auto',
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
                    >
                      {DynamicDetails ? (
                        <Suspense
                          fallback={
                            <div className='flex flex-col items-center justify-center py-32 text-zinc-600 gap-4'>
                              <Loader2 className='animate-spin' size={24} />
                              <span className='text-[10px] uppercase tracking-widest font-bold'>
                                Loading Details
                              </span>
                            </div>
                          }
                        >
                          <DynamicDetails />
                        </Suspense>
                      ) : (
                        <div className='space-y-12'>
                          <section>
                            <h4 className='text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6'>
                              Description
                            </h4>
                            <div className='prose prose-invert prose-sm max-w-none text-zinc-400 leading-relaxed font-medium'>
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {dynamicDescription}
                              </ReactMarkdown>
                            </div>
                          </section>
                          <section>
                            <h4 className='text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6'>
                              Installation
                            </h4>
                            <div className='bg-black p-6 rounded-2xl border border-white/10 font-mono text-xs flex items-center justify-between group transition-all hover:border-white/20'>
                              <span className='text-zinc-300'>{dynamicInstall}</span>
                              <button
                                onClick={() => copyToClipboard(dynamicInstall)}
                                className='p-2 hover:bg-white/5 rounded-md text-zinc-500 hover:text-white cursor-pointer transition-colors'
                              >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                            </div>
                          </section>
                        </div>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </aside>
        </div>

        {/* SEARCH OVERLAY */}
        <AnimatePresence>
          {activePanel === 'search' && (
            <div className='fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActivePanel(null)}
                className='absolute inset-0 bg-black/80 backdrop-blur-md'
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className='relative w-full max-w-[600px] bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden'
              >
                <div className='flex items-center px-6 border-b border-white/5'>
                  <Search className='text-zinc-500' size={20} />
                  <input
                    autoFocus
                    placeholder='Find a component...'
                    className='w-full h-16 bg-transparent border-none outline-none px-4 text-white text-lg tracking-tight'
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className='px-2 py-1 rounded bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-500'>
                    ESC
                  </div>
                </div>
                <div className='max-h-[400px] overflow-y-auto p-3 custom-scrollbar'>
                  {filteredComponents.map((comp: any) => (
                    <Link
                      key={comp.name}
                      href={`/component/${comp.name}`}
                      onClick={() => setActivePanel(null)}
                      className='flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-white/5 group transition-all'
                    >
                      <div className='w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors'>
                        <Box size={18} />
                      </div>
                      <span className='text-sm font-medium text-zinc-400 group-hover:text-white transition-colors'>
                        {comp.name}
                      </span>
                    </Link>
                  ))}
                  {filteredComponents.length === 0 && (
                    <div className='py-12 text-center text-zinc-600 text-sm'>
                      No results for "{searchQuery}"
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}