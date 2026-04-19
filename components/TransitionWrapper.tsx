'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TransitionWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Entrance: Layers slide down from top
      tl.to('.layer', {
        y: '0%',
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.1, // This creates the "multiple layers" effect
      })
      // Exit: Layers slide up to reveal the page
      .to('.layer', {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        stagger: 0.1,
        delay: 0.2, // Hold for a moment to reveal the page content
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] pointer-events-none flex"
    >
      {/* Three layers to create the depth effect */}
      <div className="layer w-full h-full bg-neutral-950 translate-y-[-100%]" />
      <div className="layer w-full h-full bg-neutral-900 translate-y-[-100%]" />
      <div className="layer w-full h-full bg-neutral-800 translate-y-[-100%]" />
    </div>
  );
};

export default TransitionWrapper;