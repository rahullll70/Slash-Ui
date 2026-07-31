import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

// Keep this in a central data file in production
const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/rahull-70/Slash-Ui', id: 'v551nqGeHhGn' },
  { name: 'Twitter', href: 'https://x.com/rahulll_parihar', id: 'YfCbGWCWcuar' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rahul-pariharr/', id: '99290' },
];

const Support = () => {
  return (
    <>
      <Navbar />
      <main className='flex justify-center w-full min-h-screen px-6 pb-20 bg-brand-dark text-brand-light font-inter'>
        <div className='w-full max-w-3xl pt-50'>
          {/* Intro */}
          <section>
            <h1 className='text-3xl font-bold uppercase font-switzer md:text-5xl text-start text-brand-light'>
              SUPPORT
            </h1>
            <p className='mt-10 text-sm leading-relaxed font-inter md:text-md opacity-90 text-brand-light'>
              Need help with Slash UI? Whether you've found a bug, need
              integration assistance, or have a business inquiry, we're here to
              ensure your build runs smoothly.
            </p>
          </section>

          {/* Sections */}
          <div className='pb-20 mt-20 space-y-12 border-b md:pb-30 border-zinc-900'>
            {/* Documentation Section */}
            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                1. DOCUMENTATION
              </h2>
              <p className='mb-4 text-sm font-inter opacity-90 md:text-md text-brand-light'>
                The fastest way to get answers is to check our documentation. We
                cover installation, component props, and common patterns.
              </p>
              <Link
                href='/docs'
                className='text-sm underline transition-colors text-zinc-500 hover:text-brand-light underline-offset-4 font-inter'
              >
                Explore the Documentation →
              </Link>
            </section>

            {/* Bug Reports Section */}
            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                2. BUG REPORTS
              </h2>
              <p className='mb-4 text-sm font-inter opacity-90 md:text-md text-brand-light'>
                Found an issue with a component or the CLI? Please open an issue
                on our GitHub repository. Ensure you include your environment
                details and a minimal reproduction snippet.
              </p>
              <Link
                href='https://github.com/rahull-70/Slash-Ui'
                target='_blank'
                className='text-sm underline transition-colors text-zinc-500 hover:text-brand-light underline-offset-4 font-inter'
              >
                Go to GitHub Issues →
              </Link>
            </section>

            {/* Business Section */}
            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                3. BUSINESS & LICENSING
              </h2>
              <p className='mb-4 text-sm font-inter opacity-90 md:text-md text-brand-light'>
                For inquiries regarding enterprise licenses, custom agency
                implementation, or partnership opportunities, reach out to our
                management team directly.
              </p>
              <a
                href='mailto:management@slash.ui'
                className='text-sm underline transition-colors text-zinc-500 hover:text-brand-light underline-offset-4 font-inter'
              >
                management@slash.ui
              </a>
            </section>

            {/* Community Section */}
            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                4. COMMUNITY
              </h2>
              <p className='text-sm font-inter opacity-90 md:text-md text-brand-light'>
                Join the Slash UI developer community to share your work, get
                tips from other creators, and stay updated on the latest
                releases.
              </p>
              <div className='flex gap-3 mt-6'>
                {SOCIAL_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center w-10 h-10 transition-all duration-300 ease-out border rounded-full border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:scale-110'
                  >
                    <img
                      src={`https://img.icons8.com/?size=100&id=${link.id}&format=png&color=ffffff`}
                      alt={link.name}
                      className='w-5 transition-opacity opacity-70 hover:opacity-100'
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default Support;