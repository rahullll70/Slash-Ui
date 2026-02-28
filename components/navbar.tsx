'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  Moon,
  Sun,
  Command,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/use-component-search';

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery, filteredItems, staticPages } = useSearch();
  
  const [isDark, setIsDark] = useState<boolean>(true);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0); 
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K Toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      if (!isOpen) return;

      // ESC to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchQuery('');
      }

      // Keyboard Navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        const selected = filteredItems[selectedIndex];
        if (selected) {
          window.location.href = selected.path;
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, filteredItems, selectedIndex, setSearchQuery]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

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
              : 'w-full h-20 border-transparent px-10'
          }`}
        >
          <div className='flex items-center gap-8'>
            <Link href='/' className={`font-bold text-white transition-all ${scrolled ? 'text-lg' : 'text-2xl'}`}>
              Slash/U!
            </Link>

            <div className='hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400'>
              <Link href="/docs" className='hover:text-white transition-colors'>Docs</Link>
              <Link href="/component" className='hover:text-white transition-colors'>Components</Link>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            {/* Trigger Button */}
            <div onClick={() => setIsOpen(true)} className='relative hidden md:block cursor-pointer group'>
              <div className='absolute inset-y-0 left-3 flex items-center'><Search size={14} className='text-zinc-500' /></div>
              <div className={`flex items-center pl-9 pr-10 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 transition-all ${scrolled ? 'h-8 w-40' : 'h-9 w-56'}`}>
                Search...
              </div>
              <div className='absolute inset-y-0 right-2 flex items-center'><kbd className='px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-[10px] text-zinc-500'>⌘K</kbd></div>
            </div>

            {/* <button onClick={toggleTheme} className='p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white'>
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button> */}
          </div>
        </motion.div>
      </nav>

      {/*  SEARCH MODAL */}
     <AnimatePresence>
  {isOpen && (
    <div className='fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className='absolute inset-0 bg-black/60 backdrop-blur-md'
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className='relative w-full max-w-[600px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden'
      >
        <div className='flex items-center px-4 border-b border-zinc-800'>
          <Search className='text-zinc-500' size={18} />
          <input
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search components or pages...'
            className='w-full h-14 bg-transparent border-none outline-none px-4 text-white text-sm placeholder:text-zinc-600'
          />
        </div>

        <div className='max-h-[400px] overflow-y-auto p-2 custom-scrollbar'>
          {searchQuery.length > 0 ? (
            <div className='p-2'>
              <p className='px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider'>
                Results
              </p>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => { setIsOpen(false); setSearchQuery(''); }}
                    className='flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group'
                  >
                    <div className='flex items-center gap-3'>
                      <item.icon size={16} className='text-zinc-500 group-hover:text-white' />
                      <span className='text-sm text-zinc-300 group-hover:text-white'>
                        {item.label}
                      </span>
                    </div>
                    <span className='text-[10px] opacity-50 uppercase tracking-widest'>
                      {item.category}
                    </span>
                  </Link>
                ))
              ) : (
                <p className='px-3 py-4 text-sm text-zinc-600'>No results found...</p>
              )}
            </div>
          ) : (
            ['Pages', 'Get Started'].map((cat) => (
              <div key={cat} className='mb-2'>
                <p className='px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider'>
                  {cat}
                </p>
                {staticPages
                  .filter((p) => p.category === cat)
                  .map((p) => (
                    <Link
                      key={p.label}
                      href={p.path}
                      onClick={() => setIsOpen(false)}
                      className='flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group'
                    >
                      <div className='text-zinc-500 group-hover:text-white'>
                        <p.icon size={16} />
                      </div>
                      <span className='text-sm text-zinc-300 group-hover:text-white'>
                        {p.label}
                      </span>
                    </Link>
                  ))}
              </div>
            ))
          )}
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