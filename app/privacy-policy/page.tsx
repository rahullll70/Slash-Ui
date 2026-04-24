import React from 'react';
import Navbar from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <main className='w-full min-h-screen flex justify-center pb-20 px-6'>
        <div className='max-w-3xl pt-50 w-full'>
          {/* Intro */}
          <section>
            <h1 className='uppercase font-beVietnamPro text-3xl md:text-5xl text-start'>
              PRIVACY POLICY
            </h1>
            <p className='font-cartographCF text-xs md:text-sm opacity-70 mt-2'>
              Effective Date: April 22, 2026
            </p>
            <p className='mt-10 font-cartographCF text-base md:text-lg leading-relaxed opacity-90'>
              At Slash UI, we believe in transparency, minimal data collection,
              and protecting the privacy of the developers who build with our
              tools. This policy outlines how we handle your information when
              you access our library, use our CLI, or interact with our website.
            </p>
          </section>

          {/* Sections */}
          {/* Responsive bottom padding: pb-20 on mobile, pb-30 on desktop */}
          <div className='mt-20 space-y-12 border-b pb-20 md:pb-30 border-zinc-900'>
            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                1. INFORMATION WE COLLECT
              </h2>
              <p className='font-cartographCF mb-4 opacity-90 text-sm md:text-base'>
                We only collect data that is strictly necessary to provide and
                improve our services:
              </p>
              <ul className='list-disc list-inside font-cartographCF space-y-2 opacity-90 text-sm md:text-base'>
                <li>
                  <strong>Identity Information:</strong> Name and email address
                  if you subscribe.
                </li>
                <li>
                  <strong>Usage Telemetry:</strong> Anonymous, aggregated data
                  on component usage (no source code tracking).
                </li>
                <li>
                  <strong>Technical Data:</strong> Browser, device info, and IP
                  addresses via analytics.
                </li>
                <li>
                  <strong>Financial Data:</strong> Securely processed via
                  third-party providers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                2. HOW WE USE YOUR INFORMATION
              </h2>
              <p className='font-cartographCF mb-4 opacity-90 text-sm md:text-base'>
                We process your information for the following purposes:
              </p>
              <ul className='list-disc list-inside font-cartographCF space-y-2 opacity-90 text-sm md:text-base'>
                <li>
                  <strong>Service Delivery:</strong> Managing account access and
                  library components.
                </li>
                <li>
                  <strong>Improvement:</strong> Refining our UI/UX architecture.
                </li>
                <li>
                  <strong>Communication:</strong> Version updates, security
                  patches, and releases.
                </li>
                <li>
                  <strong>Support:</strong> Handling technical inquiries.
                </li>
              </ul>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                3. DATA SECURITY
              </h2>
              <p className='font-cartographCF opacity-90 text-sm md:text-base'>
                We treat your data with the same rigor as our code. We implement
                industry-standard encryption and security measures to protect
                your information against unauthorized access or disclosure.
              </p>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                4. THIRD-PARTY SERVICES
              </h2>
              <p className='font-cartographCF opacity-90 text-sm md:text-base'>
                We rely on trusted partners for analytics, payments, and
                hosting. These services have their own privacy policies, and we
                encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className='font-beVietnamPro text-lg md:text-xl mb-4 underline'>
                5. YOUR RIGHTS
              </h2>
              <p className='font-cartographCF opacity-90 text-sm md:text-base'>
                You retain the right to access, correct, or request the deletion
                of your personal data from our systems at any time. For
                inquiries, please contact us at
                <a href='mailto:management@slash.ui' className='underline ml-1'>
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