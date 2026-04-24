import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

const TermsOfService = () => {
  
  return (
    <>
      <Navbar />
      <main className='w-full min-h-screen flex justify-center pb-20 px-6'>
        <div className='max-w-3xl pt-50'>
          {/* Intro */}
          <section>
            <h1 className='uppercase text-3xl font-beVietnamPro md:text-5xl text-start'>
              TERMS OF SERVICE
            </h1>
            <p className='font-cartographCF text-sm opacity-70 mt-2'>
              Last Updated: April 22, 2026
            </p>
            <p className='mt-10 font-cartographCF md:text-lg text-sm leading-relaxed opacity-90'>
              Welcome to Slash UI. By accessing our website, downloading our
              components, or utilizing our CLI, you agree to be bound by these
              Terms of Service. If you do not agree with any part of these
              terms, please refrain from using our services.
            </p>
          </section>

          {/* Sections */}
          <div className='mt-20 space-y-12 border-b pb-30 border-zinc-900'>
            <section>
              <h2 className='font-beVietnamPro md:text-xl text-md mb-4 underline'>
                1. LICENSE & USAGE
              </h2>
              <p className='font-cartographCF mb-4 opacity-90 text-sm md:text-md '>
                Slash UI grants you a limited, non-exclusive, non-transferable
                license to use our components in your personal and commercial
                projects.
              </p>
              <ul className='list-disc list-inside font-cartographCF space-y-2 opacity-90 md:text-lg text-sm'>
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
              <h2 className='font-beVietnamPro md:text-xl text-md mb-4 underline'>
                2. INTELLECTUAL PROPERTY
              </h2>
              <p className='font-cartographCF opacity-90 md:text-lg text-sm'>
                All components, CLI tools, designs, and content on this site are
                the exclusive property of Slash UI. Unauthorized reproduction or
                reverse engineering of our proprietary systems is strictly
                prohibited.
              </p>
            </section>

            <section>
              <h2 className='font-beVietnamPro md:text-xl text-md mb-4 underline'>
                3. LIMITATION OF LIABILITY
              </h2>
              <p className='font-cartographCF opacity-90 md:text-lg text-sm'>
                Slash UI is provided "as is" without any warranties. We are not
                responsible for any damages, data loss, or business
                interruptions resulting from the use of our components. Use our
                code at your own discretion.
              </p>
            </section>

            <section>
              <h2 className='font-beVietnamPro md:text-xl text-md mb-4 underline'>
                4. UPDATES & TERMINATION
              </h2>
              <p className='font-cartographCF opacity-90 md:text-lg text-sm'>
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
