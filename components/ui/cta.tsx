'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Footer } from './footer';

gsap.registerPlugin(ScrollTrigger);

const Cta = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);

  // Helper to split text into characters for staggering
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="inline-block translate-y-full opacity-0 footer-char">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      });

      // 1. Slash reveal for the top logo
      tl.fromTo(logoRef.current, 
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.3 },
        { 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
          scale: 1, 
          duration: 0.8, 
          ease: "expo.out" 
        }
      )
      // 2. Character stagger for the heading
      .to(".footer-char", {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.6,
        ease: "power4.out"
      }, "-=0.4")
      // 3. Fade in the button and credits
      .to(".footer-fade", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8
      }, "-=0.2");

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <footer ref={footerRef} className='relative overflow-hidden text-white border-neutral-800 '>
      {/* Top Full-Width Logo with Slash Reveal */}
      <div className='w-full overflow-hidden'>
        <img
          ref={logoRef}
          src='/images/slash_1.svg'
          alt='Slash Logo'
          className='block object-cover w-full h-auto will-change-transform'
        />
      </div>

      {/* Main CTA Section */}
      <div className='relative px-4 pt-20 pb-40 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8'>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="relative z-10 text-center">
          <h1 className='mb-10 text-4xl font-bold leading-tight tracking-tighter capitalize md:text-6xl font-switzer text-neutral-100'>
            <span className="block overflow-hidden">
              {splitText("Start slashing your UI")}
            </span>
            <span className="block overflow-hidden">
              {splitText("development with ")}
              <span className='inline-block italic tracking-wider text-red-500 translate-y-full opacity-0 font-hoshiko footer-char'>
                Slash/Ui
              </span>
              {splitText(" today!")}
            </span>
          </h1>
          
          <div className="flex justify-center overflow-x-hidden translate-y-4 opacity-0 footer-fade">
            <Link href='/pricing' className='relative flex items-center gap-2 py-4 overflow-hidden font-semibold tracking-widest text-white transition-all duration-300 border rounded-full cursor-pointer group px-15 hover:text-black font-hoshiko hover:bg-red-500 hover:scale-105 active:scale-95'>
              Slash Now
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Credit Section */}
      <div className='border-t opacity-0 py-18 footer-fade border-neutral-900 font-inter'>
        <div className="flex flex-col items-center justify-between gap-4 px-6 mx-auto max-w-7xl md:flex-row">
          <p className='text-sm capitalize text-neutral-500'>
            © 2026 Slash/Ui. All Rights Reserved.
          </p>
          
          <h1 className='text-sm text-neutral-500'>
            Designed and Developed by{' '}
            <a
              className='italic transition-colors duration-300 border-b text-neutral-300 hover:text-white border-neutral-700 hover:border-white'
              href='https://x.com/rahulll_parihar'
              target='_blank'
              rel='noopener noreferrer'
            >
              @Rahul
            </a>
          </h1>
        </div>
      </div>
    
    </footer>
    </>
  );
};

export default Cta;