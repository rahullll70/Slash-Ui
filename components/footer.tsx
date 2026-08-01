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
    <footer className='px-6 py-16 border-t border-zinc-900 bg-brand-dark text-brand-light font-inter'>
      <div className='flex flex-col items-start justify-between max-w-3xl gap-12 mx-auto md:flex-row'>
        {/* Brand Column */}
        <div className='flex flex-col gap-2'>
          <span className='text-base font-hoshiko text-brand-light'>
            Slash/Ui
          </span>
          <p className='text-[13px] text-zinc-500 font-medium font-inter'>
            © 2026 slashh-ui.com
          </p>
        </div>

        {/* Links Grid */}
        <div className='grid w-full grid-cols-3 gap-8 md:gap-24 md:w-auto'>
          {Object.entries(FOOTER_CONFIG).map(([category, links]) => (
            <div key={category} className='flex flex-col gap-3'>
              <p className='text-[13px] uppercase tracking-wider font-switzer font-bold text-brand-light'>
                {category}
              </p>
              <div className='flex flex-col gap-2'>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.path}
                    className='text-[13px] font-medium text-zinc-500 hover:text-brand-light transition-colors font-inter'
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