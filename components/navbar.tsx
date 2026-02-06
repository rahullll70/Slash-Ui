'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Moon,
  Sun,
  Home,
  Box,
  Rocket,
  Command,
  LoaderCircle,
  MousePointer2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import path from 'path';

interface NavLink {
  name: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Docs', path: '/docs' },
    { name: 'Components', path: '/component' },
  ];

  const searchItems = [
    { icon: <Home size={16} />, label: 'Home', category: 'Pages', path: '/' },
    {
      icon: <LoaderCircle size={16} />,
      label: 'Loader',
      category: 'Pages',
      path: '/loader',
    },
    {
      icon: <MousePointer2 size={16} />,
      label: 'Cursor',
      category: 'Pages',
      path: 'id:/cursor',
    },
    {
      icon: <Box size={16} />,
      label: 'All Components',
      category: 'Pages',
      path: '/component',
    },
    {
      icon: <Rocket size={16} />,
      label: 'Quick Start',
      category: 'Get Started',
      path: '/docs',
    },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  if (!mounted) return null;

  return (
    <>
      <nav className='fixed top-0 left-0 w-full z-[100] flex justify-center pt-4 px-6 pointer-events-none'>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between px-6 transition-all duration-500 pointer-events-auto ${
            scrolled
              ? 'w-full md:w-[900px] h-14 bg-zinc-900/80 backdrop-blur-lg border border-zinc-800 rounded-2xl shadow-2xl'
              : 'w-full h-20  border-transparent px-10'
          }`}
        >
          <div className='flex items-center gap-8'>
            <div className='flex items-center gap-2 text-white font-bold cursor-pointer'>
              <a
                href='/'
                className={`hidden md:inline-block font-hoshiko tracking-wider transition-all ${scrolled ? 'text-lg' : 'text-2xl'}`}
              >
                Slash/U!
              </a>
            </div>

            <div className='hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400'>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className='hover:text-white transition-colors'
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div
              onClick={() => setIsOpen(true)}
              className='relative hidden md:block cursor-pointer group'
            >
              <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                <Search
                  size={14}
                  className='text-zinc-500 group-hover:text-zinc-300 transition-colors'
                />
              </div>
              <div
                className={`flex items-center pl-9 pr-10 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 transition-all duration-500 ${scrolled ? 'h-8 w-40' : 'h-9 w-56'}`}
              >
                Search...
              </div>
              <div className='absolute inset-y-0 right-2 flex items-center pointer-events-none'>
                <kbd className='px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-[10px] text-zinc-500'>
                  ⌘K
                </kbd>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className='p-2 hover:bg-zinc-800 rounded-full transition-all text-zinc-400 hover:text-white cursor-pointer'
              aria-label='Toggle Theme'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </nav>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className='fixed inset-0 z-[50] flex items-start justify-center pt-[18vh] px-4'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className='relative w-full max-w-[600px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden'
            >
              <div className='flex items-center px-4 border-b border-zinc-800'>
                <Search className='text-zinc-500' size={18} />
                <input
                  autoFocus
                  placeholder='Search documentation...'
                  className='w-full h-14 bg-transparent border-none outline-none px-4 text-white text-sm placeholder:text-zinc-600'
                />
              </div>

              <div className='max-h-[350px] overflow-y-auto p-2 custom-scrollbar'>
                {['Pages', 'Get Started'].map((category) => (
                  <div key={category} className='mb-2'>
                    <p className='px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider'>
                      {category}
                    </p>
                    {searchItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <a
                          key={item.label}
                          href={item.path}
                          className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-zinc-900 cursor-pointer group transition-all'
                        >
                          <div className='text-zinc-500 group-hover:text-white transition-colors'>
                            {item.icon}
                          </div>
                          <span className='text-sm text-zinc-300 group-hover:text-white'>
                            {item.label}
                          </span>
                        </a>
                      ))}
                  </div>
                ))}
              </div>

              <div className='px-4 py-3 border-t border-zinc-800 bg-zinc-900/30 flex justify-between items-center text-[10px] text-zinc-500 font-medium'>
                <div className='flex gap-3'>
                  <span className='flex items-center gap-1'>
                    <Command size={10} /> to select
                  </span>
                  <span className='flex items-center gap-1'>Enter to open</span>
                </div>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
