import React from 'react';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <main className='flex justify-center w-full min-h-screen px-6 pb-20 bg-brand-dark text-brand-light font-inter'>
        <div className='w-full max-w-3xl pt-50'>
          {/* Intro */}
          <section>
            <h1 className='text-3xl font-bold uppercase font-switzer md:text-5xl text-start text-brand-light'>
              PRIVACY POLICY
            </h1>
            <p className='mt-2 text-xs font-inter md:text-sm opacity-70 text-brand-light'>
              Effective Date: April 22, 2026
            </p>
            <p className='mt-10 text-sm leading-relaxed font-inter md:text-md opacity-90 text-brand-light'>
              At Slash UI, we believe in transparency, minimal data collection,
              and protecting the privacy of the developers who build with our
              tools. This policy outlines how we handle your information when
              you access our library, use our CLI, or interact with our website.
            </p>
          </section>

          {/* Sections */}
          <div className='pb-20 mt-20 space-y-12 border-b md:pb-30 border-zinc-900'>
            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                1. INFORMATION WE COLLECT
              </h2>
              <p className='mb-4 text-sm font-inter opacity-90 md:text-md text-brand-light'>
                We only collect data that is strictly necessary to provide and
                improve our services:
              </p>
              <ul className='space-y-2 text-sm list-disc list-inside font-inter opacity-90 md:text-md text-brand-light'>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Identity Information:
                  </strong>{' '}
                  Name and email address if you subscribe.
                </li>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Usage Telemetry:
                  </strong>{' '}
                  Anonymous, aggregated data on component usage (no source code
                  tracking).
                </li>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Technical Data:
                  </strong>{' '}
                  Browser, device info, and IP addresses via analytics.
                </li>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Financial Data:
                  </strong>{' '}
                  Securely processed via third-party providers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                2. HOW WE USE YOUR INFORMATION
              </h2>
              <p className='mb-4 text-sm font-inter opacity-90 md:text-md text-brand-light'>
                We process your information for the following purposes:
              </p>
              <ul className='space-y-2 text-sm list-disc list-inside font-inter opacity-90 md:text-md text-brand-light'>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Service Delivery:
                  </strong>{' '}
                  Managing account access and library components.
                </li>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Improvement:
                  </strong>{' '}
                  Refining our UI/UX architecture.
                </li>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Communication:
                  </strong>{' '}
                  Version updates, security patches, and releases.
                </li>
                <li>
                  <strong className='font-semibold font-switzer'>
                    Support:
                  </strong>{' '}
                  Handling technical inquiries.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                3. DATA SECURITY
              </h2>
              <p className='text-sm font-inter opacity-90 md:text-md text-brand-light'>
                We treat your data with the same rigor as our code. We implement
                industry-standard encryption and security measures to protect
                your information against unauthorized access or disclosure.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                4. THIRD-PARTY SERVICES
              </h2>
              <p className='text-sm font-inter opacity-90 md:text-md text-brand-light'>
                We rely on trusted partners for analytics, payments, and
                hosting. These services have their own privacy policies, and we
                encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className='mb-4 text-lg font-bold underline font-switzer md:text-xl text-brand-light'>
                5. YOUR RIGHTS
              </h2>
              <p className='text-sm font-inter opacity-90 md:text-md text-brand-light'>
                You retain the right to access, correct, or request the deletion
                of your personal data from our systems at any time. For
                inquiries, please contact us at
                <a
                  href='mailto:management@slash.ui'
                  className='ml-1 underline transition-colors text-zinc-400 hover:text-brand-light font-inter'
                >
                  management@slash.ui
                </a>
                .
              </p>
            </section>
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
