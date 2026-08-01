'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearch } from '@/hooks/use-component-search';
import { logout } from '@/lib/actions/auth.action';
import { SearchModal } from '@/components/SearchModal';

const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery, filteredItems } = useSearch();

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
      {/* ── TOP SCREEN BLUR OVERLAY (Skiper style) ── */}
      <div className='fixed top-0 left-0 right-0 h-28 z-[90] pointer-events-none bg-gradient-to-b from-brand-dark via-brand-dark/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]' />

      {/* ── BOTTOM SCREEN BLUR OVERLAY (Skiper style) ── */}
      <div className='fixed bottom-0 left-0 right-0 h-28 z-[90] pointer-events-none bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent backdrop-blur-md [mask-image:linear-gradient(to_top,black_40%,transparent_100%)]' />

      {/* ── NAVBAR ── */}
      <nav className='fixed top-0 left-0 w-full z-[100] flex justify-center pt-4 px-6 pointer-events-none font-inter'>
        <div className='flex items-center justify-between px-6 h-13 w-full max-w-[860px] bg-brand-accent backdrop-blur-2xl rounded-md pointer-events-auto shadow-2xl shadow-black/80'>
          {/* Left */}
          <div className='flex items-center gap-8'>
            <Link href='/' className='text-lg font-hoshiko text-brand-light'>
              Slash/Ui
            </Link>
            <div className='items-center hidden gap-6 text-sm inter md:flex text-zinc-400'>
              <Link
                href='/docs'
                className='transition-colors hover:text-brand-light'
              >
                Docs
              </Link>
              <Link
                href='/component'
                className='transition-colors hover:text-brand-light'
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
              className='flex items-center justify-center transition-all rounded-lg cursor-pointer w-9 h-9 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-brand-light'
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
              className='flex items-center justify-center transition-all rounded-lg cursor-pointer w-9 h-9 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white'
              aria-label='Toggle menu'
            >
              <div className='flex flex-col justify-center items-center w-4 h-4 gap-[5px]'>
                <span
                  className='block h-[1px] w-5 bg-current rounded-full transition-all duration-500 origin-center'
                  style={{
                    transform: isMenuOpen
                      ? 'translateY(3.25px) rotate(45deg)'
                      : 'none',
                  }}
                />
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
              <div className='w-full max-w-[860px] bg-brand-accent backdrop-blur-2xl rounded-2xl overflow-hidden pointer-events-auto shadow-2xl shadow-black'>
                {/* Mirrored navbar row */}
                <div className='flex items-center justify-between px-6 h-12.5'>
                  <Link
                    href='/'
                    className='text-lg text-brand-light font-hoshiko'
                  >
                    Slash/Ui
                  </Link>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => {
                        setIsSearchOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className='flex items-center justify-center transition-all rounded-lg cursor-pointer w-9 h-9 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white'
                    >
                      <Command size={16} />
                    </button>

                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className='flex items-center justify-center transition-all rounded-lg cursor-pointer w-9 h-9 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white'
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
                  {/* LEFT — legal */}
                  <div className='flex flex-col gap-1.5 pt-1 order-3 md:order-1 font-inter'>
                    <div className='flex flex-row gap-4 mt-4 md:flex-col md:gap-1'>
                      <Link
                        href='/privacy-policy'
                        className='text-[10px] text-zinc-700 hover:text-zinc-400 transition-colors'
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        href='/terms'
                        className='text-[10px] text-zinc-700 hover:text-zinc-400 transition-colors'
                      >
                        Terms
                      </Link>
                      <Link
                        href='/accessibility'
                        className='text-[10px] text-zinc-700 hover:text-zinc-400 transition-colors'
                      >
                        Accessibility
                      </Link>
                    </div>
                  </div>

                  {/* CENTER — main nav links */}
                  <nav className='flex flex-col justify-center order-1 md:pl-4 md:order-2 font-switzer'>
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
                              className='group flex items-center justify-between w-full py-1.5 cursor-pointer font-switzer font-bold'
                            >
                              <span className='text-3xl tracking-tighter uppercase transition-colors md:text-3xl text-brand-light/50 group-hover:text-brand-light'>
                                Logout
                              </span>
                            </button>
                          </form>
                        ) : (
                          <Link
                            href={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            className='group flex items-center justify-between py-1.5 font-switzer font-bold'
                          >
                            <span className='text-3xl uppercase transition-colors md:text-3xl text-brand-light/50 group-hover:text-brand-light'>
                              {link.label}
                            </span>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </nav>

                  {/* RIGHT — tags */}
                  <div className='flex-col justify-center order-2 hidden gap-0 pl-4 md:flex md:order-3 font-inter'>
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

      {/* ── SEARCH MODAL COMPONENT ── */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredItems={filteredItems}
        userEmail={userEmail}
        authLoaded={authLoaded}
      />
    </>
  );
};

export default Navbar;
