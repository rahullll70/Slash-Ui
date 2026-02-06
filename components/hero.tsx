'use client';

import React, { JSX, useState } from 'react';
import {
  ChevronRight,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';

const Hero = (): JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);
  const installCommand: string = 'npx slash-ui@latest init';

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className='relative min-h-screen w-full pt-56 pb-24 overflow-hidden '>
  
      {/* 1. Subtle Grid Pattern */}
      {/* <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none' /> */}

      <div className='container mx-auto px-6 relative z-10 flex flex-col items-center'>
        <h1 className='max-w-4xl text-center text-5xl font-switzer font-bold tracking-tight text-white md:text-7xl lg:text-8xl leading-[0.9]'>
          A NEW STANDARD <br />
          <span className="text-zinc-500">MODERN</span> <br />
          UI COMPONENTS
        </h1>

        <p className='mt-8 max-w-2xl text-center font-cartographCF text-zinc-400 leading-relaxed md:text-lg'>
          A collection of accessible, high-performance components built with
          React and Tailwind. Stop styling from scratch and start building.
        </p>

        <div className='mt-20 flex flex-col items-center gap-4 sm:flex-row font-cartographCF'>
          <button
            className='relative z-30 h-14 px-8 rounded-xl text-sm bg-white text-black font-bold hover:bg-zinc-200 cursor-pointer transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-4 group'
          >
            Explore Components
            <div className='flex items-center justify-center transition-transform group-hover:translate-x-1'>
              <ChevronRight size={18} className='text-black' />
            </div>
          </button>

          <div
            onClick={handleCopy}
            className='group flex h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-5 hover:bg-white/10 transition-all cursor-pointer'
          >
            <Terminal size={16} className='text-zinc-500' />
            <code className='text-sm text-zinc-300 tracking-tight font-mono'>
              {installCommand}
            </code>
            <div className='ml-2 border-l border-white/10 pl-4'>
              {copied ? (
                <Check size={16} className='text-white' />
              ) : (
                <Copy
                  size={16}
                  className='text-zinc-600 group-hover:text-white transition-colors'
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;