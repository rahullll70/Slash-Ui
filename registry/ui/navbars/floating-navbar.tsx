'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

const Navbar = () => {
  const pathname = usePathname();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Audio Logic (Preserved) ---
  useEffect(() => {
    if (!audioElementRef.current) return;
    if (isAudioPlaying) {
      audioElementRef.current
        .play()
        .catch(() => console.log('Audio blocked by browser'));
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
    setIsIndicatorActive(!isIndicatorActive);
  };

  // --- GSAP Lifecycle Management (Pure GSAP) ---
  useEffect(() => {
    // Context ensures all animations inside are cleaned up on unmount
    let ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup to prevent memory leaks
  }, []);

  // --- Manual Hover Logic ---
  const handleHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const targets = e.currentTarget.querySelectorAll('.letter');
    if (!targets.length) return;

    // Manual kill to prevent overlapping animation "fights"
    gsap.killTweensOf(targets);

    gsap.to(targets, {
      y: -20,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      stagger: 0.02,
      onComplete: () => {
        gsap.set(targets, { y: 20 });
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
          stagger: 0.02,
        });
      },
    });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>  
    <div
      ref={containerRef}
      className='fixed left-1/2 -translate-x-1/2 top-8 z-[100] w-auto'
    >
      <nav className='flex items-center gap-5 px-6 py-3 rounded-lg bg-zinc-800 backdrop-blur-xl border border-white/10 shadow-2xl'>
        {/* Audio Visualizer */}
        <button
          onClick={toggleAudio}
          className='flex items-end gap-[3px] h-3 w-5 hover:opacity-80 transition-opacity'
        >
          <audio ref={audioElementRef} src='/audio/ambient.mp3' loop />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-[1.5px] bg-white transition-all duration-300 ${isIndicatorActive ? 'animate-pulse' : ''}`}
              style={{
                height: isIndicatorActive ? `${20 + i * 20}%` : '30%',
                transitionDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </button>

        <div className='w-[0.5px] h-7 bg-white/90' />

        {/* Navigation Links */}
        <div className='flex items-center gap-8'>
          {navLinks.map((link) => {
            const active = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className='relative text-[10px] uppercase tracking-[0.2em] font-sans group text-white'
              >
                <span
                  className='inline-flex overflow-hidden'
                  onMouseEnter={handleHover}
                >
                  {link.name.split('').map((char, i) => (
                    <span key={i} className='inline-block overflow-hidden'>
                      <span className='letter inline-block'>
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    </span>
                  ))}
                </span>
                <span
                  className={`absolute -bottom-1.5 left-0 h-[1px] bg-white transition-all duration-700 ease-in-out ${active ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}`}
                />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
    </>
  );
};

export default Navbar;
