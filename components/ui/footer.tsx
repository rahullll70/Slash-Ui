'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);

  // Helper to split text into characters for staggering
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="footer-char inline-block translate-y-full opacity-0">
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
    <footer ref={footerRef} className='text-white border-neutral-800 overflow-hidden relative '>
      {/* Top Full-Width Logo with Slash Reveal */}
      <div className='w-full overflow-hidden'>
        <img
          ref={logoRef}
          src='/images/slash_1.svg'
          alt='Slash Logo'
          className='w-full h-auto object-cover block will-change-transform'
        />
      </div>

      {/* Main CTA Section */}
      <div className='relative max-w-7xl mx-auto pt-20 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden'>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="relative z-10 text-center">
          <h1 className='text-4xl md:text-6xl font-switzer capitalize font-bold tracking-tighter leading-tight text-neutral-100 mb-10'>
            <span className="block overflow-hidden">
              {splitText("Start slashing your UI")}
            </span>
            <span className="block overflow-hidden">
              {splitText("development with ")}
              <span className='italic font-hoshiko text-red-500 tracking-wider inline-block footer-char translate-y-full opacity-0'>
                Slash/Ui
              </span>
              {splitText(" today!")}
            </span>
          </h1>
          
          <div className="footer-fade opacity-0 translate-y-4 flex justify-center overflow-x-hidden">
            <button className='group relative px-15 py-4 tracking-widest overflow-hidden border text-white hover:text-black font-hoshiko rounded-full font-semibold transition-all duration-300 hover:bg-red-500 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2'>
              Slash Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Credit Section */}
      <div className='footer-fade opacity-0 py-8 border-t border-neutral-900'>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className='text-sm font-cartographCF text-neutral-500 capitalize'>
            © 2026 Slash/Ui. All Rights Reserved.
          </p>
          
          <h1 className='text-sm font-cartographCF text-neutral-500'>
            Designed and Developed by{' '}
            <a
              className='italic text-neutral-300 hover:text-white transition-colors duration-300 border-b border-neutral-700 hover:border-white'
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
  );
};

export default Footer;