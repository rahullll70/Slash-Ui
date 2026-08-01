import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';

const TermsOfService = () => {
  return (
    <>
      <Navbar />
      <main className='flex justify-center w-full min-h-screen px-6 pb-20 bg-brand-dark text-brand-light font-inter'>
        <div className='max-w-3xl pt-50'>
          {/* Intro */}
          <section>
            <h1 className='text-3xl font-bold uppercase font-switzer md:text-5xl text-start text-brand-light'>
              TERMS OF SERVICE
            </h1>
            <p className='mt-2 text-sm font-inter opacity-70 text-brand-light'>
              Last Updated: April 22, 2026
            </p>
            <p className='mt-10 text-sm leading-relaxed font-inter md:text-md opacity-90 text-brand-light'>
              Welcome to Slash UI. By accessing our website, downloading our
              components, or utilizing our CLI, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these
              terms, please refrain from using our services.
            </p>
          </section>

          {/* Sections */}
          <div className='mt-20 space-y-12 border-b pb-30 border-zinc-900'>
            <section>
              <h2 className='mb-4 font-bold underline font-switzer md:text-xl text-md text-brand-light'>
                1. LICENSE & USAGE
              </h2>
              <p className='mb-4 text-sm font-inter opacity-90 md:text-md text-brand-light'>
                Slash UI grants you a limited, non-exclusive, non-transferable
                license to use our components in your personal and commercial
                projects.
              </p>
              <ul className='space-y-2 text-sm list-disc list-inside font-inter opacity-90 md:text-md text-brand-light'>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Permitted:
                  </strong>{' '}
                  Using components to build websites, SaaS products, and apps.
                </li>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Prohibited:
                  </strong>{' '}
                  You may not redistribute, resell, or sublicense the component
                  source code as a competing UI library or template kit.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='mb-4 font-bold underline font-switzer md:text-xl text-md text-brand-light'>
                2. INTELLECTUAL PROPERTY
              </h2>
              <p className='text-sm font-inter opacity-90 md:text-md text-brand-light'>
                All components, CLI tools, designs, and content on this site are
                the exclusive property of Slash UI. Unauthorized reproduction or
                reverse engineering of our proprietary systems is strictly
                prohibited.
              </p>
            </section>

            <section>
              <h2 className='mb-4 font-bold underline font-switzer md:text-xl text-md text-brand-light'>
                3. LIMITATION OF LIABILITY
              </h2>
              <p className='text-sm font-inter opacity-90 md:text-md text-brand-light'>
                Slash UI is provided "as is" without any warranties. We are not
                responsible for any damages, data loss, or business
                interruptions resulting from the use of our components. Use our
                code at your own discretion.
              </p>
            </section>

            <section>
              <h2 className='mb-4 font-bold underline font-switzer md:text-xl text-md text-brand-light'>
                4. UPDATES & TERMINATION
              </h2>
              <p className='text-sm font-inter opacity-90 md:text-md text-brand-light'>
                We reserve the right to modify these terms or update our
                components at any time. Continued use of the library after
                changes constitutes your acceptance of the new terms.
              </p>
            </section>
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default TermsOfService;
