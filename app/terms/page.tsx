import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';

const TermsOfService = () => {
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
  return (
    <>
      <Navbar />
      <main className='w-full min-h-screen flex justify-center pb-20 px-6'>
        <div className='max-w-4xl pt-50'>
          {/* Intro */}
          <section>
            <h1 className='uppercase font-beVietnamPro md:text-5xl text-start'>
              TERMS OF SERVICE
            </h1>
            <p className='font-cartographCF text-sm opacity-70 mt-2'>
              Last Updated: April 22, 2026
            </p>
            <p className='mt-10 font-cartographCF text-lg leading-relaxed opacity-90'>
              Welcome to Slash UI. By accessing our website, downloading our
              components, or utilizing our CLI, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these
              terms, please refrain from using our services.
            </p>
          </section>

          {/* Sections */}
          <div className='mt-20 space-y-12 border-b pb-30 border-zinc-900'>
            <section>
              <h2 className='font-beVietnamPro text-xl mb-4 underline'>
                1. LICENSE & USAGE
              </h2>
              <p className='font-cartographCF mb-4 opacity-90'>
                Slash UI grants you a limited, non-exclusive, non-transferable
                license to use our components in your personal and commercial
                projects.
              </p>
              <ul className='list-disc list-inside font-cartographCF space-y-2 opacity-90'>
                <li>
                  <strong>Permitted:</strong> Using components to build
                  websites, SaaS products, and apps.
                </li>
                <li>
                  <strong>Prohibited:</strong> You may not redistribute, resell,
                  or sublicense the component source code as a competing UI
                  library or template kit.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-xl mb-4 underline'>
                2. INTELLECTUAL PROPERTY
              </h2>
              <p className='font-cartographCF opacity-90'>
                All components, CLI tools, designs, and content on this site are
                the exclusive property of Slash UI. Unauthorized reproduction or
                reverse engineering of our proprietary systems is strictly
                prohibited.
              </p>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-xl mb-4 underline'>
                3. LIMITATION OF LIABILITY
              </h2>
              <p className='font-cartographCF opacity-90'>
                Slash UI is provided "as is" without any warranties. We are not
                responsible for any damages, data loss, or business
                interruptions resulting from the use of our components. Use our
                code at your own discretion.
              </p>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-xl mb-4 underline'>
                4. UPDATES & TERMINATION
              </h2>
              <p className='font-cartographCF opacity-90'>
                We reserve the right to modify these terms or update our
                components at any time. Continued use of the library after
                changes constitutes your acceptance of the new terms.
              </p>
            </section>
          </div>

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

              {/* Links Grid */}
              <div className='flex gap-16 md:gap-24'>
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
        </div>
      </main>
    </>
  );
};

export default TermsOfService;
