'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Maximize2, Code2, Command, PanelLeft, Info } from 'lucide-react';
import { COMPONENTS } from '@/lib/registry';

export default function ShowcaseContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { id } = useParams();

  return (
    <div className='h-screen w-screen bg-neutral-900 p-2'>
      <div className='h-full w-full rounded-[30px] border border-white/5 overflow-hidden flex relative shadow-2xl bg-dark'>
        {/* 1. Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className='absolute top-8 left-8 z-[60] p-2 bg-[#161616] border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer'
        >
          <PanelLeft size={20} />
        </button>

        {/* 2. FLOATING SIDEBAR */}

        <aside
          className={`absolute top-0 left-0 z-50 h-full transition-all duration-500 ease-in-out flex flex-col bg-dark/80 backdrop-blur-md justify-center overflow-hidden whitespace-nowrap  border-white/5 ${
            isSidebarOpen
              ? 'w-80 opacity-100'
              : 'w-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className='px-12'>
            <div className='text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-10 opacity-50 font-medium'>
              Sorted by Id
            </div>
            <nav className='space-y-4'>
              {COMPONENTS.map((comp, index) => {
                const isActive = id === comp.id;
                return (
                  <Link
                    key={comp.id}
                    href={`/component/${comp.id}`}
                    className='group flex items-center gap-4 cursor-pointer'
                  >
                    <div
                      className={`h-px transition-all duration-300 ${
                        isActive
                          ? 'w-6 bg-white'
                          : 'w-3 bg-zinc-800 group-hover:bg-zinc-500'
                      }`}
                    />
                    <span
                      className={`text-[13px] transition-colors ${
                        isActive
                          ? 'text-white font-medium'
                          : 'text-zinc-500 group-hover:text-zinc-300'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')} {comp.title}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* 3. Main Stage  */}
        <main className='flex-1 relative flex items-center justify-center'>
          <div className='scale-125 transition-transform duration-700'>
            {children}
          </div>

          {/* Toolbar */}
          <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40'>
            <div className='flex items-center gap-1 bg-[#161616]/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl shadow-2xl'>
              <button className='p-2.5 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer'>
                <Maximize2 size={16} />
              </button>
              <button className='p-2.5 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer'>
                <Info size={18} />
              </button>
              <div className='w-px h-6 bg-white/5 mx-1' />
              <button className='p-2.5 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer'>
                <Code2 size={18} />
              </button>
              <button className='p-2.5 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white transition-all cursor-pointer'>
                <Command size={18} />
              </button>
            </div>

            <button className='px-8 py-3 bg-[#1a1a1a] border border-white/10 text-white rounded-2xl cursor-pointer text-[13px] font-cartographCF hover:bg-[#222] transition-all shadow-lg active:scale-95'>
              Toggle
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
