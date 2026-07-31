'use client';

import React, { JSX, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Terminal, Copy, Check } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = (): JSX.Element => {
  const [copied, setCopied] = useState<boolean>(false);
  const installCommand: string = 'npx slashh-ui@latest init';
  const scope = useRef(null);

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

      <div className='container relative z-10 flex flex-col items-center px-6 mx-auto mt-40'>
        <h1 className='flex flex-col items-center max-w-4xl -space-y-2 text-4xl tracking-tight text-center text-white md:text-7xl md:-space-y-5 font-switzer'>
          <span className='block pb-1 overflow-hidden font-semibold leading-none'>
            {splitText('Slash/Ui')}
          </span>
          <span className='block pt-1 overflow-hidden leading-none'>
            <span className='font-serif italic text-5xl md:text-8xl text-zinc-200 block [line-height:0.8]'>
              {splitText('components')}
            </span>
          </span>
        </h1>

        <div className='flex flex-col items-center translate-y-4 opacity-0 fade-in-item'>
          <p className='mt-8 max-w-2xl text-center font-inter text-zinc-400 leading-relaxed md:text-sm text-[12px]'>
            A collection of accessible, high-performance components built with
            React and Tailwind. Stop styling from scratch and start building.
          </p>

          <div className='flex flex-col items-center gap-3 mt-8 sm:flex-row font-inter'>
            {/* Reduced height to h-11, text-xs, and changed text to 'Explore' */}
            <Link
              href='/component'
              className='flex items-center gap-2 px-5 text-xs font-semibold text-black transition-all bg-white rounded-lg h-11 hover:bg-zinc-200 group'
            >
              Explore
              <ChevronRight
                size={14}
                className='transition-transform group-hover:translate-x-1'
              />
            </Link>

            {/* Reduced height to h-11 and text-xs */}
            <div
              onClick={handleCopy}
              className='flex items-center gap-2.5 px-4 transition-all border cursor-pointer group h-11 rounded-lg border-white/10 bg-black/50 backdrop-blur-md hover:bg-white/10'
            >
              <Terminal size={14} className='text-zinc-500' />
              <code className='font-mono text-xs text-zinc-300'>
                {installCommand}
              </code>
              <div className='pl-3 ml-1 border-l border-white/10'>
                {copied ? (
                  <Check size={14} className='text-white' />
                ) : (
                  <Copy
                    size={14}
                    className='text-zinc-600 group-hover:text-white'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;