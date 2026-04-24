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
      <main className='w-full min-h-screen flex justify-center pb-20 px-6'>
        
        <div className='max-w-3xl pt-50 w-full'>
          {/* Intro */}
          <section>
            <h1 className='uppercase font-beVietnamPro text-3xl md:text-5xl text-start'>
              SUPPORT
            </h1>
            <p className='mt-10 font-cartographCF text-sm md:text-lg leading-relaxed opacity-90'>
              Need help with Slash UI? Whether you've found a bug, need
              integration assistance, or have a business inquiry, we're here to
              ensure your build runs smoothly.
            </p>
          </section>

          {/* Sections */}
          <div className='mt-20 space-y-12 border-b pb-20 md:pb-30 border-zinc-900'>
            {/* Documentation Section */}
            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                1. DOCUMENTATION
              </h2>
              <p className='font-cartographCF mb-4 opacity-90 text-sm md:text-base'>
                The fastest way to get answers is to check our documentation. We
                cover installation, component props, and common patterns.
              </p>
              <Link
                href='/docs'
                className='text-zinc-500 hover:text-white transition-colors underline underline-offset-4 text-sm'
              >
                Explore the Documentation →
              </Link>
            </section>

            {/* Bug Reports Section */}
            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                2. BUG REPORTS
              </h2>
              <p className='font-cartographCF mb-4 opacity-90 text-sm md:text-base'>
                Found an issue with a component or the CLI? Please open an issue
                on our GitHub repository. Ensure you include your environment
                details and a minimal reproduction snippet.
              </p>
              <Link
                href='https://github.com/rahull-70/Slash-Ui'
                target='_blank'
                className='text-zinc-500 hover:text-white transition-colors underline underline-offset-4 text-sm'
              >
                Go to GitHub Issues →
              </Link>
            </section>

            {/* Business Section */}
            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                3. BUSINESS & LICENSING
              </h2>
              <p className='font-cartographCF opacity-90 text-sm md:text-base'>
                For inquiries regarding enterprise licenses, custom agency
                implementation, or partnership opportunities, reach out to our
                management team directly.
              </p>
              <a
                href='mailto:management@slash.ui'
                className='text-zinc-500 hover:text-white transition-colors underline underline-offset-4 text-sm'
              >
                management@slash.ui
              </a>
            </section>

            {/* Community Section */}
            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                4. COMMUNITY
              </h2>
              <p className='font-cartographCF opacity-90 text-sm md:text-base'>
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
                    className='flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:scale-110 transition-all duration-300 ease-out'
                  >
                    <img
                      src={`https://img.icons8.com/?size=100&id=${link.id}&format=png&color=ffffff`}
                      alt={link.name}
                      className='w-5 opacity-70 hover:opacity-100 transition-opacity'
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