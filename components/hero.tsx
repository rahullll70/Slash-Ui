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
    <section className='relative h-screen w-full pt-56 pb-24 overflow-hidden'>
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none' />

      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none' />

      <div className='container mx-auto px-6 relative z-10 flex flex-col items-center'>
        <h1 className='max-w-4xl text-center text-5xl font-sans font-bold tracking-tight text-white md:text-7xl lg:text-8xl overflow-hidden '>
          A NEW STANDARD <br />
          MODERN <br />
          UI COMPONENTS
        </h1>

        <p className='mt-8 max-w-2xl text-center font-cartographCF text-zinc-400 leading-normal md:text-md'>
          A collection of accessible, high-performance components built with
          React and Tailwind. Stop styling from scratch and start building.
        </p>

        <div className='mt-20 flex flex-col items-center gap-4 sm:flex-row font-cartographCF'>
          <button
            style={{ background: 'white' }}
            className='relative z-30 h-12 px-6 rounded-lg text-sm bg-white text-black font-bold hover:bg-zinc-100 cursor-pointer transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-4 group'
          >
            Explore Components
            <div className='flex items-center justify-center w-6 h-6  rounded-[4px] transition-transform group-hover:translate-x-1'>
              <ChevronRight size={18} className='text-black' />
            </div>
          </button>

          <div
            onClick={handleCopy}
            className='group flex h-12 items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 hover:bg-zinc-900/50 transition-colors cursor-pointer'
          >
            <Terminal size={16} className='text-zinc-500' />
            <code className='text-sm text-zinc-300 tracking-tight font-cartographCF'>
              {installCommand}
            </code>
            <div className='ml-2 border-l border-zinc-800 pl-3'>
              {copied ? (
                <Check size={16} className='text-white' />
              ) : (
                <Copy
                  size={16}
                  className='text-zinc-600 group-hover:text-zinc-400'
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
