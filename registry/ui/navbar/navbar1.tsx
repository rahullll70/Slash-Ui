'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'Archives', slug: 'work' },
    { name: 'Capabilities', slug: 'service' },
    { name: 'Ethos', slug: 'about' },
  ];

  if (!mounted) return null;

  return (
    <nav className='fixed top-0 left-0 w-full z-[100] flex justify-center pt-6 px-6 pointer-events-none mt-10'>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          flex items-center justify-between px-6 transition-all duration-500 pointer-events-auto
          ${
            scrolled
              ? 'w-full md:w-[800px] h-14 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl'
              : 'w-full h-20 bg-transparent border-transparent'
          }
        `}
      >
        <Link href='/' className='group flex items-center'>
          <span className=' text-3xl uppercase tracking-wide font-bold'>
            Renoh
          </span>
        </Link>

        <div className='hidden md:flex items-center space-x-8'>
          {navLinks.map((link) => (
            <Link
              key={link.slug}
              href={`/${link.slug}`}
              className='text-[10px]  font-plex uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors relative group'
            >
              {link.name}
              <span className='absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full' />
            </Link>
          ))}
        </div>

        <div className='flex items-center space-x-4'>
          <button
            onClick={toggleTheme}
            className='p-2 hover:bg-white/10 rounded-full transition-colors text-white'
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <Link href='/contact'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-4 py-2 bg-white text-black text-[10px] font-plex uppercase tracking-widest rounded-full'
            >
              Inquire
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
