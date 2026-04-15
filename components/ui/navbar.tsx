'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/use-component-search';
import { logout } from '@/lib/actions/auth.action';

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery, filteredItems, staticPages } =
    useSearch();

  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    async function getUser() {
      const res = await fetch('/api/me', {
        credentials: 'include',
        cache: 'no-store',
      });
      const data = await res.json();
      setUserEmail(data.user?.email || null);
      setAuthLoaded(true);
    }
    getUser();
  }, []);

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

  const menuLinks = React.useMemo(() => {
    return [
      { label: 'Quick Start', path: '/docs', tag: 'Docs' },
      { label: 'Pricing', path: '/pricing', tag: 'Free' },
      { label: 'Components', path: '/component', tag: '35+' },
      { label: 'Get Support', path: '/support', tag: null },
      ...(authLoaded
        ? userEmail
          ? [
              { label: 'Account', path: '/account', tag: userEmail },
              { label: 'Logout', path: '#logout', tag: null },
            ]
          : [{ label: 'Login', path: '/login', tag: 'NOT LOGGED IN' }]
        : []),
    ];
  }, [userEmail, authLoaded]);

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className='fixed top-0 left-0 w-full z-[100] flex justify-center pt-4 px-6 pointer-events-none'>
        <div className='flex items-center justify-between px-6 h-14 w-full max-w-[860px] bg-zinc-900 backdrop-blur-3xl border border-zinc-800 rounded-2xl pointer-events-auto'>
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
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
              className='flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer'
              aria-label='Open search'
            >
              <Command size={16} />
            </button>

            {/* 2-bar animated menu icon */}
            <button
              onClick={() => {
                setIsMenuOpen((v) => !v);
                setIsSearchOpen(false);
              }}
              className='flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer'
              aria-label='Toggle menu'
            >
              <div className='flex flex-col justify-center items-center w-4 h-4 gap-[5px]'>
                {/* Top bar — rotates to 45deg and moves down */}
                <span
                  className='block h-[1px] w-5 bg-current rounded-full transition-all duration-500 origin-center'
                  style={{
                    transform: isMenuOpen
                      ? 'translateY(3.25px) rotate(45deg)'
                      : 'none',
                  }}
                />
                {/* Bottom bar — rotates to -45deg and moves up */}
                <span
                  className='block h-[1px] w-5 bg-current rounded-full transition-all duration-500 origin-center'
                  style={{
                    transform: isMenuOpen
                      ? 'translateY(-3.25px) rotate(-45deg)'
                      : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── SLIDE-IN MENU PANEL ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className='fixed inset-0 z-[150]'
            />

            {/* Menu panel */}
            <motion.div
              initial={{ clipPath: 'inset(0 0 100% 0 round 0 0 16px 16px)' }}
              animate={{ clipPath: 'inset(0 0 0% 0 round 0 0 16px 16px)' }}
              exit={{ clipPath: 'inset(0 0 100% 0 round 0 0 16px 16px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className='fixed top-0 left-0 right-0 z-[160] flex justify-center px-6 pt-4 pointer-events-none'
            >
              <div className='w-full max-w-[860px] bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden pointer-events-auto'>
                {/* Mirrored navbar row */}
                <div className='flex items-center justify-between px-6 h-13  border-zinc-800'>
                  <Link href='/' className='font-bold text-white text-lg'>
                    Slash/Ui
                  </Link>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => {
                        setIsSearchOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className='flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer'
                    >
                      <Command size={16} />
                    </button>

                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className='flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer'
                      aria-label='Close menu'
                    >
                      <div className='flex flex-col justify-center items-center w-4 h-4 gap-[5px]'>
                        <span
                          className='block h-[1px] w-5 bg-current rounded-full transition-all duration-500 origin-center'
                          style={{
                            transform: 'translateY(3.25px) rotate(45deg)',
                          }}
                        />
                        <span
                          className='block h-[1px] w-5 bg-current rounded-full transition-all duration-500 origin-center'
                          style={{
                            transform: 'translateY(-3.25px) rotate(-45deg)',
                          }}
                        />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Menu body — 3 columns */}
                <div className='grid md:grid-cols-[160px_1fr_160px] grid-cols-1 gap-8 md:gap-4 px-6 py-10 md:py-6'>
                  {/* LEFT — legal (Hidden on very small screens or moved to bottom) */}
                  <div className='flex flex-col gap-1.5 pt-1 order-3 md:order-1'>
                    <div className='flex flex-row md:flex-col gap-4 md:gap-1 mt-4'>
                      {['Privacy Policy', 'Terms', 'Accessibility'].map((l) => (
                        <a
                          key={l}
                          href='#'
                          className='text-[10px] text-zinc-700 hover:text-zinc-400 transition-colors'
                        >
                          {l}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* CENTER — main nav links */}
                  <nav className='flex flex-col justify-center md:pl-4 border-zinc-800 order-1 md:order-2'>
                    {menuLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + i * 0.04, duration: 0.25 }}
                      >
                        {link.label === 'Logout' ? (
                          <form action={logout}>
                            <button
                              type='submit'
                              onClick={() => setIsMenuOpen(false)}
                              className='group flex items-center justify-between w-full py-1.5 cursor-pointer'
                            >
                              <span className='text-3xl md:text-3xl font-black uppercase tracking-tighter text-white/80 group-hover:text-white transition-colors'>
                                Logout
                              </span>
                            </button>
                          </form>
                        ) : (
                          <Link
                            href={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className='group flex items-center justify-between py-1.5'
                          >
                            <span className='text-3xl md:text-3xl font-black uppercase tracking-tighter text-white/80 group-hover:text-white transition-colors'>
                              {link.label}
                            </span>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </nav>

                  {/* RIGHT — tags (Hidden on mobile to keep focus on links) */}
                  <div className='hidden md:flex flex-col justify-center gap-0 border-zinc-800 pl-4 order-2 md:order-3'>
                    {menuLinks.map((link, i) => (
                      <motion.div
                        key={link.label + '-tag'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.04 }}
                        className='py-1.5 flex items-center h-[44px]'
                      >
                        {link.tag && (
                          <span className='text-[10px] text-zinc-500 tracking-widest uppercase'>
                            {link.tag}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
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
                      filteredItems.map((item: any) => (
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
                        .filter((p: any) => p.category === cat)
                        .map((p: any) => (
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
