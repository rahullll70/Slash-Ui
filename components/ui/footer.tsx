import React from 'react';
import Link from 'next/link';

const FOOTER_CONFIG = {
  site: [
    { label: 'Components', path: '/components' },
    { label: 'Quick-start', path: '/docs' },
    { label: 'Pricing', path: '/pricing' },
  ],
  social: [
    { label: 'Github', path: 'https://github.com/rahull-70/Slash-Ui' },
    { label: 'Twitter', path: 'https://x.com/rahulll_parihar' },
    { label: 'LinkedIn', path: 'https://www.linkedin.com/in/rahul-pariharr/' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Support', path: '/support' },
  ],
};

export const Footer = () => {
  return (
    <footer className='px-6 py-16 border-t border-zinc-900'>
      <div className='max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12'>
        {/* Brand Column */}
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-bold tracking-tight text-white uppercase'>
            Slash UI
          </span>
          <p className='text-[13px] text-zinc-600 font-medium'>
            © 2026 slashh-ui.com
          </p>
        </div>

        {/* Links Grid: Switched to grid-cols-3 for forced column layout */}
        <div className='grid grid-cols-3 gap-8 md:gap-24 w-full md:w-auto'>
          {Object.entries(FOOTER_CONFIG).map(([category, links]) => (
            <div key={category} className='flex flex-col gap-3'>
              <p className='text-[13px] uppercase tracking-wider font-bold text-white'>
                {category}
              </p>
              <div className='flex flex-col gap-2'>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.path}
                    className='text-[13px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};