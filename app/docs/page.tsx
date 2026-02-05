'use client';

import React, { useState } from 'react';
import {
  Copy,
  Terminal,
  Code2,
  ChevronRight,
  Mail,
  Command,
  Moon,
  Info,
  Maximize2,
  PanelLeft,
  Home,
} from 'lucide-react';

const TechIcons = {
  Framer: () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M0 0l12 12L24 0H0zm0 12l12 12V12H0z' />
    </svg>
  ),
  Tailwind: () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='#38BDF8'>
      <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
    </svg>
  ),
  React: () => (
    <svg width='14' height='14' viewBox='0 0 100 100' fill='#61DAFB'>
      <circle cx='50' cy='50' r='10' />
      <path
        d='M50 30c15 0 28 8 28 18s-13 18-28 18-28-8-28-18 13-18 28-18'
        fill='none'
        stroke='currentColor'
        strokeWidth='6'
      />
      <path
        d='M50 30c15 0 28 8 28 18s-13 18-28 18-28-8-28-18 13-18 28-18'
        fill='none'
        stroke='currentColor'
        strokeWidth='6'
        transform='rotate(60 50 50)'
      />
      <path
        d='M50 30c15 0 28 8 28 18s-13 18-28 18-28-8-28-18 13-18 28-18'
        fill='none'
        stroke='currentColor'
        strokeWidth='6'
        transform='rotate(120 50 50)'
      />
    </svg>
  ),
  Gsap: () => (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='#88CE02'>
      <path
        d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
};

const PrerequisiteTag = ({
  name,
  icon,
}: {
  name: string;
  icon: React.ReactNode;
}) => (
  <div className='flex items-center gap-2 px-3 py-1.5 bg-[#0c0c0c] border border-white/5 rounded-lg hover:border-white/10 transition-colors group cursor-pointer'>
    <span className='group-hover:scale-110 transition-transform duration-300'>
      {icon}
    </span>
    <span className='text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors'>
      {name}
    </span>
  </div>
);

const DocsPage = () => {
  const [copied, setCopied] = useState(false);
  const command = 'npx slash-ui@latest init';

  return (
    <div className='min-h-screen text-white font-sans selection:bg-white/20'>
      {/* 1. HERO SECTION */}
      <header className='max-w-3xl mx-auto pt-40 pb-20 px-6'>
        <div className='flex items-center gap-2 text-zinc-500 text-md font-mono mb-8 tracking-[0.2em] uppercase'>
          Docs <ChevronRight size={10} /> Introduction
        </div>
        <h1 className='text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[0.9]'>
          Quick Start
        </h1>
        <p className='text-lg font-cartographCF leading-relaxed  mb-12 max-w-2xl'>
          Slash UI is a collection of high-end animation registries. It&apos;s
          designed to be highly performant and easy to use.
        </p>

        <div className='group relative bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 transition-all hover:border-white/20 shadow-2xl cursor-pointer'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2 text-md font-bold text-zinc-600 uppercase tracking-widest font-mono'>
              <Terminal size={14} /> CLI
            </div>
            <Copy
              size={16}
              className='text-zinc-500 group-hover:text-white transition-colors'
            />
          </div>
          <div className='flex items-center gap-3 text-md'>
            <span className='text-zinc-800 font-cartographCF text-md select-none'>
              $
            </span>
            <code className='text-white font-cartographCF text-md'>
              {command}
            </code>
          </div>
        </div>
      </header>

      {/* 2. SYMBOLS */}
      <section className='max-w-3xl mx-auto py-24 px-6 border-t border-white/5'>
        <h2 className='text-3xl font-switzer font-bold text-white mb-4 tracking-tight'>
          Interface Symbols
        </h2>
        <div className='divide-y divide-white/[0.03] font-cartographCF '>
          <SymbolRow
            icon={<Home size={20} />}
            label='Home'
            desc='Navigate to the home page'
          />
          <SymbolRow
            icon={<Code2 size={20} />}
            label='Source code'
            desc='Copy the component logic'
          />
          <SymbolRow
            icon={<Command size={20} />}
            label='Search'
            desc='Search components quickly'
          />
          <SymbolRow
            icon={<Moon size={20} />}
            label='Theme Toggle'
            desc='Change between light & dark modes'
          />

          <SymbolRow
            icon={<Info size={20} />}
            label='Component Info'
            desc='View component metadata and documentation'
          />
          <SymbolRow
            icon={<Maximize2 size={20} />}
            label='Fullscreen View'
            desc='View component in fullscreen mode'
          />
          <SymbolRow
            icon={<PanelLeft size={20} />}
            label='Panel Left'
            desc='Toggle left panel visibility'
          />
        </div>
      </section>

      {/* 3. PREREQUISITES & INSTALL */}
      <section className='max-w-3xl mx-auto py-24 px-6 border-t border-white/5'>
        <h2 className='text-3xl font-switzer font-bold text-white mb-12'>
          Prerequisites
        </h2>
        <div className='flex flex-wrap gap-3 mb-16 font-cartographCF'>
          <PrerequisiteTag name='framer-motion' icon={<TechIcons.Framer />} />
          <PrerequisiteTag name='tailwindcss' icon={<TechIcons.Tailwind />} />
          <PrerequisiteTag name='react' icon={<TechIcons.React />} />
          <PrerequisiteTag
            name='clsx'
            icon={<div className='w-3 h-3 bg-red-600 rounded-sm' />}
          />
          <PrerequisiteTag name='gsap' icon={<TechIcons.Gsap />} />
        </div>

        <div className='mt-16'>
          <p className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
            Install Dependencies
          </p>
          <div className='bg-[#0c0c0c] border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:border-white/10 transition-all'>
            <code className='text-md font-cartographCF text-zinc-400 '>
              npm add clsx framer-motion lucide-react tailwind-merge
            </code>
            <Copy
              size={14}
              className='text-zinc-700 group-hover:text-white transition-colors cursor-pointer'
            />
          </div>
        </div>

        {/* SETUP LIB BLOCK */}
        <div className='mt-20'>
          <p className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
            Setup Lib
          </p>
          <div className='bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 relative font-cartographCF text-md leading-relaxed overflow-hidden'>
            <div className='text-zinc-600 mb-4 select-none'>
              // lib/utils.ts
            </div>
            <div className='space-y-1'>
              <p>
                <span className='text-blue-400'>import</span> clsx, &#123;
                ClassValue &#125; <span className='text-blue-400'>from</span>{' '}
                <span className='text-emerald-400'>&quot;clsx&quot;</span>
              </p>
              <p>
                <span className='text-blue-400'>import</span> &#123; twMerge
                &#125; <span className='text-blue-400'>from</span>{' '}
                <span className='text-emerald-400'>
                  &quot;tailwind-merge&quot;
                </span>
              </p>
              <div className='h-4' />
              <p>
                <span className='text-blue-400'>export function</span>{' '}
                <span className='text-yellow-400'>cn</span>(...inputs:
                ClassValue[]) &#123;
              </p>
              <p className='pl-6'>
                <span className='text-blue-400'>return</span>{' '}
                <span className='text-yellow-400'>twMerge</span>(
                <span className='text-yellow-400'>clsx</span>(inputs))
              </p>
              <p>&#125;</p>
            </div>
            <Copy
              size={14}
              className='absolute top-8 right-8 text-zinc-700 hover:text-white cursor-pointer transition-colors'
            />
          </div>
        </div>

        {/* KEEP IN MIND */}
        <div className='mt-32'>
          <h2 className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
            Keep In Mind
          </h2>
          <p className='text-2xl font-cartographCF text-white leading-relaxed tracking-tight'>
            Most components here are recreations of the best out there. I
            don&apos;t claim to be the original creator. This is my attempt to
            reverse-engineer, replicate, and often add a few extra features.
          </p>
        </div>

        {/* CONTACT & LICENSE */}
        <div className='mt-32 space-y-24'>
          <div>
            <h2 className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
              Contact
            </h2>
            <div className=' items-center  gap-3 text-lg grid font-cartographCF text-white'>
              Additionally, if you find any bug or issue, feel free to
              <span className='flex items-center gap-2 px-3 py-2 bg-white/5 w-35 rounded-full text-zinc-400 text-sm border border-white/5 hover:bg-white/10 transition-colors cursor-pointer'>
                <Mail size={14} className='' /> Drop a dm.
              </span>
            </div>
          </div>

          <div>
            <h2 className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
              License & Usage
            </h2>
            <ul className='space-y-4 text-lg font-cartographCF text-white/90'>
              <li className='flex gap-4'>
                <span>—</span> Free to use and modify in both personal and
                commercial projects.
              </li>
              <li className='flex gap-4'>
                <span>—</span> Attribution to Skiper UI is required when using
                the free version.
              </li>
              <li className='flex gap-4'>
                <span>—</span> No attribution required with Skiper UI Pro.
              </li>
            </ul>
          </div>

          <div>
            <h2 className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
              Enjoy Building!
            </h2>
            <p className='text-3xl font-switzer font-bold text-white tracking-tight'>
              Build crazy projects and tag us on{' '}
              <span className='text-zinc-500 hover:text-red-500 transition-colors cursor-pointer underline decoration-zinc-800'>
                x.com/Slash/Ui
              </span>{' '}
              peace out
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className='max-w-3xl mx-auto py-40 px-6 border-t border-white/5 text-center'>
        <div className='mb-10 text-6xl font-hoshiko tracking-wider text-white'>
          Slash/Ui
        </div>
        <p className='text-sm text-zinc-700 font-mono uppercase tracking-[0.5em]'>
          Standardizing Modern Interfaces
        </p>
      </footer>
    </div>
  );
};

const SymbolRow = ({
  icon,
  label,
  desc,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
}) => (
  <div className='flex items-center justify-between py-6 group'>
    <div className='flex items-center gap-10'>
      <span className='text-zinc-600 group-hover:text-white transition-all duration-300'>
        {icon}
      </span>
      <span className='text-zinc-300 font-medium text-md tracking-tight'>
        {label}
      </span>
    </div>
    <span className='text-[11px] text-zinc-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity'>
      {desc}
    </span>
  </div>
);

export default DocsPage;
