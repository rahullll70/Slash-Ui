'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  Terminal,
  Code2,
  ChevronRight,
  Command,
  Moon,
  Info,
  Maximize2,
  PanelLeft,
  Home,
} from 'lucide-react';
import Navbar from '@/components/ui/navbar';

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
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24px'
      height='14px'
      viewBox='0 0 569 512'
    >
      <g fill='#58C4DC'>
        <path d='M285.5,201 C255.400481,201 231,225.400481 231,255.5 C231,285.599519 255.400481,310 285.5,310 C315.599519,310 340,285.599519 340,255.5 C340,225.400481 315.599519,201 285.5,201' />
        <path d='M568.959856,255.99437 C568.959856,213.207656 529.337802,175.68144 466.251623,150.985214 C467.094645,145.423543 467.85738,139.922107 468.399323,134.521063 C474.621631,73.0415145 459.808523,28.6686204 426.709856,9.5541429 C389.677085,-11.8291748 337.36955,3.69129898 284.479928,46.0162134 C231.590306,3.69129898 179.282771,-11.8291748 142.25,9.5541429 C109.151333,28.6686204 94.3382249,73.0415145 100.560533,134.521063 C101.102476,139.922107 101.845139,145.443621 102.708233,151.02537 C97.4493791,153.033193 92.2908847,155.161486 87.3331099,157.39017 C31.0111824,182.708821 0,217.765415 0,255.99437 C0,298.781084 39.6220545,336.307301 102.708233,361.003527 C101.845139,366.565197 101.102476,372.066633 100.560533,377.467678 C94.3382249,438.947226 109.151333,483.32012 142.25,502.434597 C153.629683,508.887578 166.52439,512.186771 179.603923,511.991836 C210.956328,511.991836 247.567589,495.487529 284.479928,465.972527 C321.372196,495.487529 358.003528,511.991836 389.396077,511.991836 C402.475265,512.183856 415.36922,508.884856 426.75,502.434597 C459.848667,483.32012 474.661775,438.947226 468.439467,377.467678 C467.897524,372.066633 467.134789,366.565197 466.291767,361.003527 C529.377946,336.347457 569,298.761006 569,255.99437' />
      </g>
    </svg>
  ),
  Gsap: () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='currentColor'
      viewBox='0 0 24 24'
    >
      <path d='m7.83,11.76h0s-.26,1.15-.26,1.15c-.01.06-.08.11-.15.11h-.32s-.04.02-.05.04c-.29.99-.69,1.68-1.21,2.09-.45.35-1,.51-1.73.51-.66,0-1.1-.21-1.48-.63-.5-.55-.7-1.46-.58-2.55.22-2.05,1.29-4.12,3.34-4.12.62,0,1.11.19,1.45.57.36.41.54,1.02.54,1.82,0,.07-.06.13-.13.13h-1.5c-.05,0-.1-.05-.1-.1-.01-.55-.18-.82-.5-.82-.58,0-.91.78-1.09,1.21-.25.6-.38,1.26-.35,1.92.01.3.06.73.35.91.26.16.62.05.84-.12.22-.17.4-.48.47-.75.01-.04.01-.07,0-.08-.01-.01-.04-.02-.06-.02h-.39s-.08-.02-.11-.05c-.02-.02-.03-.06-.02-.09l.26-1.14c.01-.06.07-.1.13-.11h0s2.53,0,2.53,0c0,0,.01,0,.02,0,.07,0,.11.07.11.14h0Z' />
      <path d='m12.18,10.45c0,.07-.06.13-.13.13h-1.38c-.09,0-.17-.07-.17-.16,0-.4-.14-.6-.42-.6s-.47.18-.47.48c0,.34.19.65.74,1.18.72.68,1.01,1.28,1,2.08-.02,1.29-.9,2.12-2.23,2.12-.68,0-1.2-.18-1.54-.54-.35-.36-.51-.9-.48-1.59,0-.07.06-.13.13-.13h1.43s.08.02.1.05c.02.03.03.06.03.09-.02.25.03.43.13.54.06.07.15.1.26.1.26,0,.42-.19.42-.51,0-.28-.08-.53-.57-1.03-.63-.61-1.19-1.24-1.17-2.23.01-.58.24-1.1.64-1.48.43-.4,1.01-.61,1.69-.61.68,0,1.2.2,1.53.58.32.36.47.88.46,1.54h0Z' />
      <path d='m16.47,15.43v-6.84c.01-.07-.05-.13-.12-.13,0,0,0,0,0,0h-2.14c-.07,0-.1.06-.12.1l-3.1,6.82h0s0,0,0,0c-.03.08.03.17.12.17h1.5c.08,0,.13-.02.16-.08l.3-.71c.04-.09.04-.1.15-.1h1.43c.1,0,.1,0,.1.1l-.03.66c0,.07.06.13.13.13,0,0,0,0,0,0h1.51s.07-.02.1-.04c.02-.02.03-.06.03-.09Zm-2.65-2.28s-.02,0-.03,0c-.02,0-.03-.02-.03-.04,0,0,0,0,0,0,0-.01,0-.02.01-.04l1.07-2.65s.02-.05.03-.08c.02-.04.04-.04.05-.01,0,.02-.12,2.72-.12,2.72-.01.1-.01.11-.11.11h-.86s0-.01,0-.01h0s0,0,0,0Z' />
      <path d='m19.51,8.46h-1.14c-.06,0-.13.03-.14.1l-1.58,6.86s0,.06.02.09c.03.03.07.05.11.05h1.42c.08,0,.13-.04.14-.1,0,0,.17-.78.17-.78.01-.06,0-.11-.06-.14-.03-.01-.05-.03-.08-.04l-.25-.13-.24-.13-.09-.05s-.03-.02-.02-.04c0-.03.02-.05.05-.05h.78c.23,0,.47-.01.69-.05,1.61-.3,2.68-1.59,2.71-3.34.03-1.5-.81-2.26-2.48-2.26,0,0,0,0,0,0Zm-.39,4.08h-.03c-.07,0-.08,0-.08,0,0,0,.45-1.98.45-1.98.01-.06.01-.09-.02-.11-.05-.02-.7-.37-.7-.37-.02,0-.03-.02-.02-.04,0-.03.02-.05.05-.05h1.04c.32,0,.5.3.49.79-.01.85-.42,1.74-1.17,1.77h0Z' />
    </svg>
  ),
  Clsx: () => (
    <svg width='14' height='14' viewBox='0 0 128 128'>
      <path
        fill='#cb3837'
        d='M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z'
      />
    </svg>
  ),
  LucideReact: () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='15'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path
        d='M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557'
        stroke='#fff'
      />
      <path
        d='M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21'
        stroke='#F56565'
      />
    </svg>
  ),
};

const PrerequisiteTag = ({
  name,
  icon,
  packageName,
}: {
  name: string;
  icon: React.ReactNode;
  packageName: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`npm install ${packageName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      className='flex items-center gap-2 px-3 py-1.5 bg-[#0c0c0c] border border-white/5 rounded-lg hover:border-white/10 transition-all group cursor-pointer active:scale-95'
    >
      <span className='group-hover:scale-110 transition-transform duration-300'>
        {copied ? <Check size={12} className='text-white' /> : icon}
      </span>
      <span className='text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors'>
        {copied ? 'Copied!' : name}
      </span>
    </div>
  );
};

const DocsPage = () => {
  const [copiedCli, setCopiedCli] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedUtils, setCopiedUtils] = useState(false);

  const cliCommand = 'npx slash-ui@latest init';
  const installDeps = 'npm add clsx framer-motion lucide-react tailwind-merge';
  const utilsCode = `import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

  const handleCopy = (text: string, setter: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen text-white font-sans selection:bg-white/20'>
        <header className='max-w-3xl mx-auto pt-40 pb-20 px-6'>
          <div className='flex items-center gap-2 text-zinc-500 text-md font-mono mb-8 tracking-[0.2em] uppercase'>
            Docs <ChevronRight size={10} /> Introduction
          </div>
          <h1 className='text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[0.9]'>
            Quick Start
          </h1>
          <p className='text-sm font-cartographCF leading-relaxed mb-12 max-w-2xl'>
            Slash UI is a collection of high-end animation registries. It&apos;s
            designed to be highly performant and easy to use.
          </p>

          <div
            onClick={() => handleCopy(cliCommand, setCopiedCli)}
            className='group relative bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 transition-all hover:border-white/20 shadow-2xl cursor-pointer'
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2 text-sm font-bold text-zinc-600 uppercase tracking-widest font-mono'>
                <Terminal size={14} /> CLI
              </div>
              {copiedCli ? (
                <Check size={16} className='text-emerald-500' />
              ) : (
                <Copy
                  size={16}
                  className='text-zinc-500 group-hover:text-white transition-colors'
                />
              )}
            </div>
            <div className='flex items-center gap-3 text-sm'>
              <span className='text-zinc-800 font-cartographCF text-md select-none'>
                $
              </span>
              <code className='text-white font-cartographCF text-md'>
                {cliCommand}
              </code>
            </div>
          </div>
        </header>

        <section className='max-w-3xl mx-auto py-24 px-6 border-t border-white/5'>
          <h2 className='text-3xl font-switzer font-bold text-white mb-4 tracking-tight'>
            Interface Symbols
          </h2>
          <div className='divide-y divide-white/[0.03] font-cartographCF'>
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
              desc='View component metadata'
            />
            <SymbolRow
              icon={<Maximize2 size={20} />}
              label='Fullscreen View'
              desc='View component in fullscreen'
            />
            <SymbolRow
              icon={<PanelLeft size={20} />}
              label='Panel Left'
              desc='Toggle left panel visibility'
            />
          </div>
        </section>

        <section className='max-w-3xl mx-auto py-24 px-6 border-t border-white/5'>
          <h2 className='text-3xl font-switzer font-bold text-white mb-12'>
            Prerequisites
          </h2>
          <div className='flex flex-wrap gap-3 mb-16 font-cartographCF'>
            <PrerequisiteTag
              name='framer-motion'
              icon={<TechIcons.Framer />}
              packageName='framer-motion'
            />
            <PrerequisiteTag
              name='tailwindcss'
              icon={<TechIcons.Tailwind />}
              packageName='tailwindcss'
            />
            <PrerequisiteTag
              name='react'
              icon={<TechIcons.React />}
              packageName='react'
            />
            <PrerequisiteTag
              name='clsx'
              icon={<TechIcons.Clsx />}
              packageName='clsx'
            />
            <PrerequisiteTag
              name='gsap'
              icon={<TechIcons.Gsap />}
              packageName='gsap'
            />
            <PrerequisiteTag
              name='Lucide React'
              icon={<TechIcons.LucideReact />}
              packageName='lucide-react'
            />
          </div>

          <div className='mt-16'>
            <p className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
              Install Dependencies
            </p>
            <div
              onClick={() => handleCopy(installDeps, setCopiedInstall)}
              className='bg-[#0c0c0c] border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:border-white/10 transition-all cursor-pointer'
            >
              <code className='text-sm font-cartographCF text-zinc-400'>
                {installDeps}
              </code>
              {copiedInstall ? (
                <Check size={14} className='text-emerald-500' />
              ) : (
                <Copy
                  size={14}
                  className='text-zinc-700 group-hover:text-white transition-colors'
                />
              )}
            </div>
          </div>

          <div className='mt-20'>
            <p className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
              Setup Lib
            </p>
            <div className='bg-[#0c0c0c] border border-white/5 rounded-2xl p-8 relative font-cartographCF text-sm leading-relaxed overflow-hidden'>
              <div className='text-zinc-600 mb-4 select-none'>
                // lib/utils.ts
              </div>
              <div className='space-y-1'>
                <p>
                  <span className='text-pink-400'>import</span> clsx, &#123;
                  ClassValue &#125; <span className='text-pink-400'>from</span>{' '}
                  <span className='text-emerald-400'>&quot;clsx&quot;</span>
                </p>
                <p>
                  <span className='text-pink-400'>import</span> &#123; twMerge
                  &#125; <span className='text-pink-400'>from</span>{' '}
                  <span className='text-emerald-400'>
                    &quot;tailwind-merge&quot;
                  </span>
                </p>
                <div className='h-4' />
                <p>
                  <span className='text-pink-400'>export function</span>{' '}
                  <span className='text-red-400'>cn</span>(...inputs:
                  ClassValue[]) &#123;
                </p>
                <p className='pl-6'>
                  <span className='text-pink-400'>return</span>{' '}
                  <span className='text-red-400'>twMerge</span>(
                  <span className='text-red-400'>clsx</span>(inputs))
                </p>
                <p>&#125;</p>
              </div>
              <div
                onClick={() => handleCopy(utilsCode, setCopiedUtils)}
                className='absolute top-8 right-8 cursor-pointer'
              >
                {copiedUtils ? (
                  <Check size={14} className='text-emerald-500' />
                ) : (
                  <Copy
                    size={14}
                    className='text-zinc-700 hover:text-white transition-colors'
                  />
                )}
              </div>
            </div>
          </div>

          <div className='mt-32'>
            <h2 className='text-md font-mono text-zinc-600 uppercase tracking-widest mb-6'>
              Keep In Mind
            </h2>
            <p className='text-md font-cartographCF text-white leading-relaxed tracking-tight'>
              Most components here are recreations of the best out there. I
              don&apos;t claim to be the original creator. This is my attempt to
              reverse-engineer and add extra features.
            </p>
          </div>
        </section>

        <footer className='max-w-3xl mx-auto py-40 px-6 border-t border-white/5 text-center'>
          <div className='mb-10 text-6xl font-hoshiko tracking-wider text-white'>
            Slash/Ui
          </div>
        </footer>
      </div>
    </>
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
      <span className='text-zinc-300 font-medium text-sm tracking-tight'>
        {label}
      </span>
    </div>
    <span className='text-[11px] text-zinc-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity'>
      {desc}
    </span>
  </div>
);

export default DocsPage;
