'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Command, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/use-component-search';
import { Slant as Hamburger } from 'hamburger-react';

const menuLinks = [
  { label: 'How to Use', path: '/how-to-use', tag: 'Guide' },
  { label: 'Legacy Version', path: '/legacy', tag: null },
  { label: 'Pricing', path: '/pricing', tag: 'Free' },
  { label: 'Components', path: '/component', tag: '105+' },
  { label: 'Get Support', path: '/support', tag: null },
  { label: 'Founder', path: '/founder', tag: null },
  { label: 'Account', path: '/account', tag: null },
  { label: 'Logout', path: '/logout', tag: null },
];

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery, filteredItems, staticPages } =
    useSearch();

  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
        setIsMenuOpen(false);
      }
      if (!isSearchOpen) return;
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredItems.length) % filteredItems.length,
        );
      } else if (e.key === 'Enter') {
        const selected = filteredItems[selectedIndex];
        if (selected) {
          window.location.href = selected.path;
          setIsSearchOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, filteredItems, selectedIndex, setSearchQuery]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* ── NAVBAR — always capsule ── */}
      <nav className='fixed top-0 left-0 w-full z-[100] flex justify-center pt-4 px-6 pointer-events-none'>
        <div className='flex items-center justify-between px-6 h-14 w-full max-w-[860px] bg-zinc-900/80 backdrop-blur-lg border border-zinc-800 rounded-2xl shadow-2xl pointer-events-auto'>
          {/* Left */}
          <div className='flex items-center gap-8'>
            <Link href='/' className='font-bold text-white text-lg'>
              Slash/Ui
            </Link>
            <div className='hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400'>
              <Link href='/docs' className='hover:text-white transition-colors'>
                Docs
              </Link>
              <Link
                href='/component'
                className='hover:text-white transition-colors'
              >
                Components
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className='flex items-center gap-2'>
            {/* CMD search trigger */}
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
              className='flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700   text-zinc-400 hover:text-white transition-all cursor-pointer'
              aria-label='Open search'
            >
              <Command size={16} />
            </button>

            {/* Hamburger — same box size as CMD button */}
            <button
              onClick={() => {
                setIsMenuOpen((v) => !v);
                setIsSearchOpen(false);
              }}
              className='flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700   text-zinc-400 hover:text-white transition-all cursor-pointer'
              aria-label='Open menu'
            >
              <AnimatePresence mode='wait' initial={false}>
                {isMenuOpen ? (
                  <motion.span key='close'>
                    <Hamburger size={16} toggled={isMenuOpen} />
                  </motion.span>
                ) : (
                  <motion.span key='open'>
                    <Hamburger
                      size={16}
                      toggled={isMenuOpen}
                      toggle={() => {}}
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* ── SLIDE-IN MENU PANEL ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className='fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm'
            />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className='fixed top-0 right-0 h-full w-full max-w-sm z-[160] bg-zinc-950 border-l border-zinc-800/60 flex flex-col'
            >
              <nav className='flex-1 overflow-y-auto px-4 py-4 my-10'>
                {menuLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className='group flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-zinc-800/60 transition-all duration-200'
                    >
                      <span className='text-sm font-medium text-zinc-300 group-hover:text-white transition-colors'>
                        {link.label}
                      </span>
                      <div className='flex items-center gap-2'>
                        {link.tag && (
                          <span className='px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700'>
                            {link.tag}
                          </span>
                        )}
                        <ArrowUpRight
                          size={14}
                          className='text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all'
                        />
                      </div>
                    </Link>
                    {(link.label === 'Pricing' ||
                      link.label === 'Get Support') && (
                      <div className='mx-3 my-1 border-t border-zinc-800/60' />
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SEARCH MODAL ── */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className='fixed inset-0 z-[200] flex items-start justify-center pt-[18vh] px-4'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className='relative w-full max-w-[600px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden'
            >
              <div className='flex items-center px-4 border-b border-zinc-800'>
                <Command className='text-zinc-500' size={18} />
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
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className='flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all group'
                        >
                          <div className='flex items-center gap-3'>
                            <item.icon
                              size={16}
                              className='text-zinc-500 group-hover:text-white'
                            />
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
                      <p className='px-3 py-4 text-sm text-zinc-600'>
                        No results found...
                      </p>
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
                            onClick={() => setIsSearchOpen(false)}
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
