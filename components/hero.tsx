'use client';

import React, { JSX, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Copy, Check, ChevronsUpDown } from 'lucide-react';
import { gsap } from 'gsap';

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

const COMMANDS: Record<PackageManager, string> = {
  pnpm: 'pnpm dlx slashh-ui@latest init',
  npm: 'npx slashh-ui@latest init',
  yarn: 'yarn dlx slashh-ui@latest init',
  bun: 'bunx slashh-ui@latest init',
};

const Hero = (): JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPm, setSelectedPm] = useState<PackageManager>('npm');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const scope = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const currentCommand = COMMANDS[selectedPm];

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className='reveal-char inline-block translate-y-[110%] opacity-0 will-change-transform'
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1 } });

      tl.to('.reveal-char', {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        delay: 0.5,
      }).to(
        '.fade-in-item',
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.4',
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section
      ref={scope}
      className='relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-brand-dark font-inter'
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className='absolute inset-0 z-0 object-cover w-full h-full mix-blend-screen grayscale'
      >
        <source src='/video/hero_video.mp4' type='video/mp4' />
      </video>

      <div className='container relative z-10 flex flex-col items-center px-6 mx-auto mt-50'>
        <h1 className='flex flex-col items-center max-w-4xl -space-y-2 text-4xl tracking-tight text-center text-white md:text-8xl md:-space-y-5 font-switzer'>
          <span className='block pb-1 overflow-hidden font-semibold leading-none'>
            {splitText('Slash/Ui')}
          </span>
          <span className='block overflow-hidden leading-none'>
            <span className='font-serif italic text-5xl md:text-9xl text-zinc-200 block [line-height:0.8]'>
              {splitText('components')}
            </span>
          </span>
        </h1>

        <div className='flex flex-col items-center translate-y-4 opacity-0 fade-in-item'>
          <p className='mt-8 max-w-2xl text-center font-inter text-zinc-400 leading-relaxed md:text-sm text-[12px]'>
            A collection of accessible, high-performance components built with
            React and Tailwind. Stop styling from scratch and start building.
          </p>

          <div className='flex flex-col items-center gap-3 mt-20 sm:flex-row font-inter'>
            <Link
              href='/component'
              className='flex items-center gap-2 px-5 text-xs font-semibold text-black transition-all bg-white rounded-xl h-11 hover:px-7'
            >
              Explore
              <ChevronRight
                size={14}
                className='transition-transform group-hover:translate-x-1'
              />
            </Link>

            {/* Command Bar with Package Switcher */}
            <div className='relative' ref={dropdownRef}>
              {/* Dropdown Menu Popup */}
              {isDropdownOpen && (
                <div className='absolute bottom-full left-0 mb-2 w-20 bg-brand-accent   backdrop-blur-xl rounded-xl p-1 shadow-2xl z-50 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150'>
                  {(['pnpm', 'npm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
                    <button
                      key={pm}
                      onClick={() => {
                        setSelectedPm(pm);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs rounded-md transition-colors ${
                        selectedPm === pm
                          ? 'bg-white/15 text-white font-medium'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              )}

              {/* Main Command Bar Component */}
              <div className='flex items-center gap-3 px-3 transition-all rounded-xl h-11 backdrop-blur-md bg-brand-accent hover:px-5'>
                {/* Package Manager Toggle Button */}
                <button
                  type='button'
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className='flex items-center gap-1.5 px-2 py-1 text-xs font-medium font-inter text-zinc-300 hover:text-white hover:bg-white/10 rounded-md transition-all'
                >
                  <span>{selectedPm}</span>
                  <ChevronsUpDown size={12} className='text-zinc-500' />
                </button>

                <div className='h-4 w-[1px] bg-white/10' />

                {/* Command Output */}
                <code className='pr-2 font-mono text-xs select-all text-zinc-300'>
                  {currentCommand}
                </code>

                {/* Copy Button */}
                <button
                  type='button'
                  onClick={handleCopy}
                  className='pl-2 transition-colors border-l border-white/10 text-zinc-400 hover:text-white'
                  aria-label='Copy command'
                >
                  {copied ? (
                    <Check size={14} className='text-emerald-400' />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;