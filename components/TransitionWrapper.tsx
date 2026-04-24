'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TransitionWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to('.layer', {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.1,
      })
      
      .to('.loader-text', {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, 0); 
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
    >
      {/* Centered Text Overlay */}
      <div className="absolute inset-0 z-[4] flex items-center justify-center pointer-events-none">
        <h1 className="loader-text text-4xl md:text-6xl font-hoshiko text-white tracking-widest">
          Slash/UI
        </h1>
      </div>

      {/* Layers (z-index 1-3) */}
      <div className="layer absolute inset-0 z-[3] bg-neutral-950" />
      <div className="layer absolute inset-0 z-[2] bg-neutral-900" />
      <div className="layer absolute inset-0 z-[1] bg-neutral-800" />
    </div>
  );
};

export default TransitionWrapper;