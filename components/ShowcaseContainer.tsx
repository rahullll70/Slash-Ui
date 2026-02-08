'use client';

import { atomDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React, { useState } from 'react';
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
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Index } from '@/__registry__';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

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

  const componentsList = Object.values(Index['default']);
  const activeItem = Index['default'][id as string] as any;

  const dynamicCode = propsCode || activeItem?.content || '// No source code found.';
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
          className={`absolute top-0 left-0 z-[100] h-full transition-all duration-500 ease-in-out flex flex-col pointer-events-none ${
            isSidebarOpen
              ? 'translate-x-0 opacity-100'
              : '-translate-x-full opacity-0'
          }`}
        >
          <div className='relative px-12 py-24 min-w-[320px] pointer-events-auto h-full backdrop-blur-xl border-white/5'>
            <div className='text-sm text-zinc-500 uppercase mb-10 opacity-50 font-mono'>
              Navigation
            </div>
            <nav className='space-y-4'>
              {componentsList.map((comp: any, index: number) => {
                const isActive = id === comp.name;
                return (
                  <Link
                    key={comp.name}
                    href={`/component/${comp.name}`}
                    className='group flex items-center gap-4'
                  >
                    <div
                      className={`h-px transition-all duration-300 ${isActive ? 'w-6 bg-white' : 'w-3 bg-zinc-800 group-hover:bg-zinc-500'}`}
                    />
                    <span
                      className={`text-[13px] transition-colors ${isActive ? 'text-white font-medium' : 'text-zinc-500 group-hover:text-zinc-300'}`}
                    >
                      {String(index + 1).padStart(2, '0')} {comp.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className='flex w-full h-full'>
          {/* MAIN STAGE */}
          <main className='flex-1 relative flex flex-col items-center justify-center transition-all duration-500 ease-in-out'>
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className='absolute top-8 left-8 z-[110] p-2 bg-[#161616]/80 backdrop-blur-md border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer'
            >
              <PanelLeft size={20} />
            </button>

            <div className='absolute top-10 right-10 text-right pointer-events-none'>
              <h2 className='text-xl text-white capitalize tracking-tighter'>
                {title}
              </h2>
            </div>

            <div className='scale-110 transition-transform duration-700'>
              {children}
            </div>

            {/* FLOATING TOOLBAR */}
            <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#161616]/90 border border-white/10 p-1.5 rounded-2xl shadow-2xl backdrop-blur-xl z-40'>
              <button
                onClick={() => setActivePanel('info')}
                className={`p-2.5 rounded-xl cursor-pointer transition-all ${activePanel === 'info' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                <Info size={18} />
              </button>
              <div className='w-px h-4 bg-white/10 mx-1' />
              <button
                onClick={() => setActivePanel('code')}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${activePanel === 'code' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                <Code2 size={18} />
              </button>
              <button
                onClick={() => setActivePanel('search')}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${activePanel === 'search' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                <Command size={18} />
              </button>
            </div>
          </main>

          {/* RIGHT SIDE PANEL */}
          <div
            className={`h-full bg-neutral-900 border-white/5 transition-all duration-500 ease-in-out overflow-hidden rounded-l-2xl ${
              activePanel === 'code' || activePanel === 'info'
                ? 'w-[45%]'
                : 'w-0'
            }`}
          >
            <div className='p-10 h-full flex flex-col min-w-[450px]'>
              <div className='flex items-center justify-between mb-8'>
                <AnimatePresence mode='wait'>
                  <motion.h3
                    key={activePanel}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className='text-xl text-zinc-500'
                  >
                    {activePanel === 'code'
                      ? 'Source Code'
                      : 'Component Details'}
                  </motion.h3>
                </AnimatePresence>
                <button
                  onClick={() => setActivePanel(null)}
                  className='p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white cursor-pointer'
                >
                  <X size={18} />
                </button>
              </div>

              <div className='flex-1 overflow-y-auto custom-scrollbar relative'>
                <AnimatePresence mode='wait'>
                  {activePanel === 'code' ? (
                    <motion.div
                      key='code'
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className='relative rounded-2xl bg-black/40 border border-white/5 overflow-hidden'
                    >
                      <button
                        onClick={() => copyToClipboard(dynamicCode)}
                        className='absolute top-4 right-4 p-2 bg-white/5 rounded-md text-zinc-400 cursor-pointer z-10 hover:bg-white/10'
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
                          padding: '24px',
                          fontSize: '13px',
                          background: 'transparent',
                          lineHeight: '1.6',
                        }}
                      >
                        {dynamicCode}
                      </SyntaxHighlighter>
                    </motion.div>
                  ) : activePanel === 'info' ? (
                    <motion.div
                      key='info'
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className='space-y-10'
                    >
                      <section>
                        <h4 className='text-white mb-4 text-[11px] tracking-widest uppercase opacity-40'>
                          Description
                        </h4>
                        <div
                          className='prose prose-invert prose-sm max-w-none 
                            prose-headings:text-white prose-headings:font-medium
                            prose-hr:border-white/10 
                            prose-table:border prose-table:border-white/5 
                            prose-th:bg-white/5 prose-th:p-2 prose-th:text-left
                            prose-td:p-2 prose-td:border-t prose-td:border-white/5
                            prose-code:text-sky-400 prose-code:bg-white/5 prose-code:px-1 prose-code:rounded'
                        >
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {dynamicDescription}
                          </ReactMarkdown>
                        </div>
                      </section>
                      <section>
                        <h4 className='text-white mb-4 text-[11px] tracking-widest uppercase opacity-40'>
                          Dependencies
                        </h4>
                        <div className='relative group'>
                          <div className='bg-black p-5 rounded-xl border border-white/5 text-sm text-zinc-500 font-mono flex items-center justify-between'>
                            <span>{dynamicInstall}</span>
                            <button
                              onClick={() => copyToClipboard(dynamicInstall)}
                              className='p-2 hover:bg-white/5 rounded-md transition-colors cursor-pointer'
                            >
                               {copied ? <Check size={14} className='text-white' /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
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
                className='absolute inset-0 bg-black/60 backdrop-blur-sm'
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
                    placeholder='Search components...'
                    className='w-full h-14 bg-transparent border-none outline-none px-4 text-white text-sm'
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className='max-h-[350px] overflow-y-auto p-2'>
                  {filteredComponents.map((comp: any) => (
                    <Link
                      key={comp.name}
                      href={`/component/${comp.name}`}
                      onClick={() => setActivePanel(null)}
                      className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-900 group transition-all'
                    >
                      <div className='w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white'>
                        <Box size={14} />
                      </div>
                      <span className='text-sm text-zinc-300 group-hover:text-white'>
                        {comp.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}