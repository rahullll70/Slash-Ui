import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';

const Support = () => {
  return (
    <>
      <Navbar />
      <main className='w-full min-h-screen flex justify-center pb-20 px-6'>
        <div className='max-w-4xl pt-50'>
          {/* Intro */}
          <section>
            <h1 className='uppercase font-beVietnamPro md:text-5xl text-start'>
              SUPPORT
            </h1>
            <p className='mt-10 font-cartographCF text-lg leading-relaxed opacity-90'>
              Need help with Slash UI? Whether you've found a bug, need
              integration assistance, or have a business inquiry, we're here to
              ensure your build runs smoothly.
            </p>
          </section>

          {/* Sections */}
          <div className='mt-20 space-y-12 border-b pb-30 border-zinc-900'>
            <section>
              <h2 className='font-beVietnamPro text-xl mb-4 underline'>
                1. DOCUMENTATION
              </h2>
              <p className='font-cartographCF mb-4 opacity-90'>
                The fastest way to get answers is to check our documentation. We
                cover installation, component props, and common patterns.
              </p>
              <Link
                href='/docs'
                className='text-zinc-500 hover:text-white transition-colors underline underline-offset-4'
              >
                Explore the Documentation →
              </Link>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-xl mb-4 underline'>
                2. BUG REPORTS
              </h2>
              <p className='font-cartographCF mb-4 opacity-90'>
                Found an issue with a component or the CLI? Please open an issue
                on our GitHub repository. Ensure you include your environment
                details and a minimal reproduction snippet.
              </p>
              <Link
                href='https://github.com'
                className='text-zinc-500 hover:text-white transition-colors underline underline-offset-4'
              >
                Go to GitHub Issues →
              </Link>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-xl mb-4 underline'>
                3. BUSINESS & LICENSING
              </h2>
              <p className='font-cartographCF opacity-90'>
                For inquiries regarding enterprise licenses, custom agency
                implementation, or partnership opportunities, reach out to our
                management team directly.
              </p>
              <a
                href='mailto:management@slash.ui'
                className='text-zinc-500 hover:text-white transition-colors underline underline-offset-4'
              >
                management@slash.ui
              </a>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-xl mb-4 underline'>
                4. COMMUNITY
              </h2>
              <p className='font-cartographCF opacity-90'>
                Join the Slash UI developer community to share your work, get
                tips from other creators, and stay updated on the latest
                releases.
              </p>
              <div className='flex gap-3 mt-4'>
                {[
                  { id: 'v551nqGeHhGn', alt: 'Github' },
                  { id: 'YfCbGWCWcuar', alt: 'Twitter' },
                  { id: '99290', alt: 'LinkedIn' },
                ].map((icon) => (
                  <Link
                    key={icon.alt}
                    href='#'
                    className='flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:scale-110 transition-all duration-300 ease-out'
                  >
                    <img
                      src={`https://img.icons8.com/?size=100&id=${icon.id}&format=png&color=ffffff`}
                      alt={icon.alt}
                      className='w-5 opacity-70 hover:opacity-100 transition-opacity'
                    />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <footer className='px-6 py-16 '>
            <div className='max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-start gap-5'>
              <div className='flex flex-col gap-2'>
                <span className='text-sm font-bold tracking-tight text-white uppercase'>
                  Slash UI
                </span>
                <p className='text-[13px] text-zinc-600 font-medium'>
                  © 2026 slashh-ui.com
                </p>
              </div>
              <div className='flex gap-16 md:gap-24'>
                <div className='flex flex-col gap-1'>
                  <p className='text-[13px] uppercase tracking-wider font-bold text-white'>
                    Site
                  </p>
                  <div className='flex flex-col gap-0.5'>
                    {['Components', 'Quick-start', 'Pricing'].map((l) => (
                      <Link
                        key={l}
                        href='#'
                        className='text-[13px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors'
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-[13px] uppercase tracking-wider font-bold text-white'>
                    Social
                  </p>
                  <div className='flex flex-col gap-0.5'>
                    {['Github', 'twitter', 'Linkdin'].map((l) => (
                      <Link
                        key={l}
                        href='#'
                        className='text-[13px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors'
                      >
                        {l}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-[13px] uppercase tracking-wider font-bold text-white'>
                    Legal
                  </p>
                  <div className='flex flex-col gap-0.5'>
                    {['Privacy Policy', 'Terms of Service', 'Support'].map(
                      (l) => (
                        <Link
                          key={l}
                          href='#'
                          className='text-[13px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors'
                        >
                          {l}
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
};

export default Support;
