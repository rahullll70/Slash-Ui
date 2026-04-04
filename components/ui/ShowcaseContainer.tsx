'use client';

import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
  const [activePanel, setActivePanel] = useState<'code' | 'info' | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams();
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [isLoadingCode, setIsLoadingCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const componentsList = Object.values(Index['default']);
  const activeItem = Index['default'][id as string] as any;

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
    propsCode ||
    sourceCode ||
    activeItem?.content ||
    '// No source code found.';
  const dynamicDescription =
    propsDescription ||
    activeItem?.description ||
    `Premium ${title} component.`;
  const dynamicInstall =
    propsInstall ||
    activeItem?.install ||
    'npm install framer-motion lucide-react';

  const filteredComponents = componentsList.filter((comp: any) =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const staticSearchItems = [
    { icon: <Home size={16} />, label: 'Home', category: 'Pages', path: '/' },
    { icon: <LoaderCircle size={16} />, label: 'Loader', category: 'Pages', path: '/loader' },
    { icon: <MousePointer2 size={16} />, label: 'Cursor', category: 'Pages', path: '/cursor' },
    { icon: <Box size={16} />, label: 'All Components', category: 'Pages', path: '/component' },
    { icon: <Rocket size={16} />, label: 'Quick Start', category: 'Get Started', path: '/docs' },
  ];

  return (
    <div className='h-screen w-screen bg-[#0A0A0A] p-2 overflow-hidden text-white font-sans'>
      <div className='h-full w-full rounded-[40px] overflow-hidden flex relative bg-[#0A0A0A]'>

        {/* LEFT NAV SIDEBAR */}
        <aside
          className={`absolute top-0 left-0 z-[150] h-full w-[320px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] bg-[#0A0A0A] border-r border-white/5 ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
        >
          <div className='flex flex-col h-full p-10'>
            <div className='flex items-center justify-between mb-12'>
              <div className='text-sm text-zinc-500'>Navigation</div>
              <button onClick={() => setSidebarOpen(false)} className='p-2 text-zinc-500 hover:text-white transition-colors cursor-pointer'>
                <X size={16} />
              </button>
            </div>
            <nav className='flex-1 overflow-y-auto custom-scrollbar space-y-2'>
              {componentsList.map((comp: any, index: number) => (
                <Link
                  key={comp.name}
                  href={`/component/${comp.name}`}
                  onClick={() => setSidebarOpen(false)}
                  className='group flex items-center gap-4 py-2'
                >
                  <div className={`h-px transition-all duration-300 ${id === comp.name ? 'w-6 bg-white' : 'w-3 bg-zinc-800 group-hover:bg-zinc-500'}`} />
                  <span className={`text-[13px] transition-colors ${id === comp.name ? 'text-white font-medium' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                    <span className='font-mono mr-2 opacity-30'>{String(index + 1).padStart(2, '0')}</span>
                    {comp.name}
                  </span>
                </Link>
              ))}
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

        <div className='flex w-full h-full relative'>
         
          <main
            className={`flex-1 relative transition-all duration-700 ease-in-out`}
          >
          
            {!isFullscreen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(true);
                }}
                className='absolute top-8 left-8 z-[110] p-3 bg-[#161616]/80 backdrop-blur-sm border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-all cursor-pointer shadow-xl'
              >
                <PanelLeft size={20} />
              </button>
            )}

            {/* Loading spinner shown while iframe loads */}
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
                onClick={() => setIsSearchOpen(true)}
                className='p-2.5 rounded-xl transition-all cursor-pointer text-zinc-500 hover:text-white hover:bg-white/5'
              >
                <Command size={18} />
              </button>
            </div>
          </main>

          {/* RIGHT SIDE PANEL */}
          <aside
            className={`h-full  border-white/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]  relative z-[130] ${activePanel ? 'w-[35%] opacity-100' : 'w-0 opacity-0'}`}
          >
            <div className='p-8 h-full flex flex-col min-w-[450px]'>
              <div className='flex items-center justify-between mb-12'>
                <h3 className='text-sm uppercase font-beVietnamPro text-zinc-500'>
                  {activePanel === 'code' ? 'Source Code' : 'Documentation'}
                </h3>
                <button onClick={() => setActivePanel(null)} className='p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white cursor-pointer transition-colors'>
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
                          <span className='text-[10px] uppercase tracking-widest font-bold'>Fetching Code</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => copyToClipboard(dynamicCode)}
                            className='absolute top-4 right-4 p-2 bg-white/5 rounded-md text-zinc-400 cursor-pointer z-10 hover:bg-white/10'
                          >
                            {copied ? <Check size={14} className='text-white' /> : <Copy size={14} />}
                          </button>
                          <SyntaxHighlighter
                            language='tsx'
                            style={theme}
                            customStyle={{ margin: 0, padding: '32px', fontSize: '13px', background: 'transparent', lineHeight: '1.7' }}
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
                      <section className='space-y-12'>
                        <div>
                          <h4 className='text-[12px]  uppercase  text-zinc-600 mb-6'>Description</h4>
                          <div className='prose prose-invert prose-sm text-zinc-400'>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{dynamicDescription}</ReactMarkdown>
                          </div>
                        </div>
                        <div>
                          <h4 className='text-[12px] uppercase  text-zinc-600 mb-6'>Installation</h4>
                          <div className='bg-black p-6 rounded-2xl border border-white/10 font-mono text-xs flex items-center justify-between'>
                            <span className='text-zinc-300'>{dynamicInstall}</span>
                            <button onClick={() => copyToClipboard(dynamicInstall)} className='p-2 hover:bg-white/5 rounded-md text-zinc-500'>
                              {copied ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                          </div>
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
                    className='w-full h-14 bg-transparent border-none outline-none px-4 text-white text-sm placeholder:text-zinc-600'
                  />
                </div>
                <div className='max-h-[400px] overflow-y-auto p-2 custom-scrollbar'>
                  {searchQuery.length > 0 ? (
                    <div className='p-2'>
                      <p className='px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider'>Component Results</p>
                      {filteredComponents.length > 0 ? (
                        filteredComponents.map((comp: any) => (
                          <Link
                            key={comp.name}
                            href={`/component/${comp.name}`}
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                            className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group'
                          >
                            <Box size={16} className='text-zinc-500 group-hover:text-white' />
                            <span className='text-sm text-zinc-300 group-hover:text-white'>{comp.name}</span>
                          </Link>
                        ))
                      ) : (
                        <p className='px-3 py-4 text-sm text-zinc-600'>No components found...</p>
                      )}
                    </div>
                  ) : (
                    ['Pages', 'Get Started'].map((category) => (
                      <div key={category} className='mb-2'>
                        <p className='px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider'>{category}</p>
                        {staticSearchItems
                          .filter((item) => item.category === category)
                          .map((item) => (
                            <Link
                              key={item.label}
                              href={item.path}
                              onClick={() => setIsSearchOpen(false)}
                              className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group'
                            >
                              <div className='text-zinc-500 group-hover:text-white'>{item.icon}</div>
                              <span className='text-sm text-zinc-300 group-hover:text-white'>{item.label}</span>
                            </Link>
                          ))}
                      </div>
                    ))
                  )}
                </div>
                <div className='px-4 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-[10px] text-zinc-500 font-medium'>
                  <div className='flex gap-3'>
                    <span className='flex items-center gap-1'><Command size={10} /> to select</span>
                    <span className='flex items-center gap-1'>Enter to open</span>
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