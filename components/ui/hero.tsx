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
      className='relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden'
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className='absolute inset-0 z-0 h-full w-full object-cover mix-blend-screen grayscale'
      >
        <source src='/video/hero_video.mp4' type='video/mp4' />
      </video>

      <div className='relative z-10 container mx-auto px-6 flex mt-40 flex-col items-center'>
        <h1 className='max-w-4xl text-center text-5xl font-beVietnamPro tracking-tight md:text-7xl leading-[1] text-white'>
          <span className='block overflow-hidden'>{splitText('SLASH/UI')}</span>
          <span className='block overflow-hidden'>
            <span className='font-sans italic text-6xl md:text-8xl text-zinc-200'>
              {splitText('components')}
            </span>
          </span>
        </h1>

        <div className='fade-in-item opacity-0 translate-y-4 flex flex-col items-center'>
          <p className='mt-8 max-w-2xl text-center font-cartographCF text-zinc-400 leading-relaxed md:text-sm text-[12px]'>
            A collection of accessible, high-performance components built with
            React and Tailwind. Stop styling from scratch and start building.
          </p>

          <div className='mt-10 flex flex-col items-center gap-4 sm:flex-row font-cartographCF'>
            <Link
              href='/component'
              className='h-14 px-8 rounded-xl text-sm bg-white text-black font-bold hover:bg-zinc-200 transition-all flex items-center gap-4 group'
            >
              Explore Components
              <ChevronRight
                size={18}
                className='transition-transform group-hover:translate-x-1'
              />
            </Link>

            <div
              onClick={handleCopy}
              className='group flex h-14 items-center gap-3 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md px-5 hover:bg-white/10 transition-all cursor-pointer'
            >
              <Terminal size={16} className='text-zinc-500' />
              <code className='text-sm text-zinc-300 font-mono'>
                {installCommand}
              </code>
              <div className='ml-2 border-l border-white/10 pl-4'>
                {copied ? (
                  <Check size={16} className='text-white' />
                ) : (
                  <Copy
                    size={16}
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
