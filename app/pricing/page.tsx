'use client';

import Navbar from '@/components/ui/navbar';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Check, Zap, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BadgeAlertIcon } from '@/components/ui/badge-alert';
import { CircleCheckIcon } from '@/components/ui/circle-check';
import { TerminalIcon } from '@/components/ui/terminal';
import { FeatherIcon } from '@/components/ui/feather';

gsap.registerPlugin(ScrollTrigger);

// --- Pricing Components ---
const PricingCard = ({
  tier,
  price,
  description,
  features,
  isHighlighted = false,
}: {
  tier: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
}) => {
  return (
    <div
      className={`pricing-card relative flex flex-col p-8 rounded-3xl border transition-all duration-500 overflow-hidden h-full opacity-0 translate-y-8 ${
        isHighlighted
          ? // Changed: Removed border-white and used a subtle zinc border to match the dark theme
            'bg-neutral-900 border-zinc-800/40 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]'
          : 'border-zinc-800/40 bg-neutral-900 text-zinc-400'
      }`}
    >
      {isHighlighted && (
        <>
          <div className='absolute -top-[20%] -right-[20%] w-[70%] h-[20%] bg-white/5 blur-[100px] pointer-events-none' />
          <div className='absolute inset-0 pointer-events-none z-0'>
            <img
              src='/images/PricingSlash.svg'
              alt=''
              className='w-full h-full object-cover scale-150 rotate-[-5deg] opacity-90 backdrop-blur-5xl '
            />
          </div>
          <div className='w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-700/10 via-transparent to-transparent opacity-50' />
        </>
      )}

      <div
        className={`relative flex flex-col h-full z-10 ${isHighlighted ? 'z-10 mix-blend-difference' : 'z-10'}`}
      >
        <div className='mb-8'>
          <h3
            className={`text-xs uppercase font-mono tracking-widest ${isHighlighted ? 'text-white' : 'text-zinc-500'}`}
          >
            {tier}
          </h3>
          <p
            className={`text-sm mt-3 font-medium leading-relaxed ${isHighlighted ? 'text-zinc-200' : 'text-zinc-400'}`}
          >
            {description}
          </p>
        </div>

        <div className='mb-8 flex items-baseline gap-1'>
          <span
            className={`text-6xl font-black tracking-tighter ${isHighlighted ? 'text-white' : 'text-zinc-100'}`}
          >
            {price}
          </span>
          <span className='text-zinc-500 text-[10px] uppercase tracking-widest ml-2'>
            Lifetime Access
          </span>
        </div>

        <div className='space-y-4 mb-10 flex-grow'>
          {features.map((feature, index) => (
            <div key={index} className='flex items-center gap-3 text-[13px]'>
              <Check
                size={14}
                className={isHighlighted ? 'text-white' : 'text-zinc-600'}
              />
              <span
                className={isHighlighted ? 'text-zinc-300' : 'text-zinc-500'}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className='relative z-20'>
          <div
            className={`w-full py-4 rounded-xl text-sm font-bold transition-all duration-500 flex items-center justify-center cursor-not-allowed ${
              isHighlighted
                ? 'bg-white text-black hover:bg-zinc-200'
                : 'bg-transparent text-white border border-white/10 hover:border-white/20'
            }`}
          >
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FAQ Components ---
const faqs = [
  {
    q: 'What exactly do I get with Slash UI?',
    a: 'You get lifetime access to 103+ premium components built with React, Tailwind CSS, and Framer Motion.',
  },
  {
    q: 'How do I access the components after purchase?',
    a: 'Instantly. Once your payment is confirmed, you get immediate access via your dashboard.',
  },
  {
    q: 'Do I get updates when new components are added?',
    a: 'Yes — lifetime updates are included at no extra cost.',
  },
  {
    q: 'Can I use Slash UI in client projects?',
    a: 'Absolutely. Your license covers unlimited personal and commercial projects.',
  },
  {
    q: 'What tech stack do the components use?',
    a: 'All components are built with Next.js, React, Tailwind CSS, and Framer Motion.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Yes. If you are not satisfied within 7 days, we issue a full refund — no questions asked.',
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className='group mb-1 cursor-pointer overflow-hidden rounded-2xl bg-[#121212] px-6 py-3 transition-all duration-300 hover:bg-[#161616]'
    >
      <div className='flex items-center justify-between gap-4'>
        <span className='text-sm font-semibold text-zinc-300 transition-colors group-hover:text-white'>
          {q}
        </span>
        <span
          className={`text-2xl text-zinc-500 transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`}
        >
          +
        </span>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] mt-4 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className='overflow-hidden'>
          <p className='pb-2 text-xs font-semibold leading-relaxed text-zinc-500'>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---
const Page = () => {
  const FOOTER_CONFIG = {
    site: [
      { label: 'Components', path: '/components' },
      { label: 'Quick-start', path: '/docs' },
      { label: 'Pricing', path: '/pricing' },
    ],
    social: [
      { label: 'Github', path: 'https://github.com/rahull-70/Slash-Ui' },
      { label: 'Twitter', path: 'https://x.com/rahulll_parihar' },
      { label: 'LinkedIn', path: 'https://www.linkedin.com/in/rahul-parihar-6aba79300/' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy-policy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Support', path: '/support' },
    ],
  };

  const pricingSectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.pricing-reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: pricingSectionRef.current,
          start: 'top 70%',
        },
      });

      gsap.to('.pricing-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: pricingSectionRef.current,
          start: 'top 60%',
        },
      });
    }, pricingSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main className='w-screen overflow-x-hidden'>
        {/* Hero */}
        <div className='flex flex-col items-center justify-center h-screen text-center gap-8 px-4 relative'>
          <h1 className='text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]'>
            Unlock premium <br />
            components <br className='hidden md:block' />
            for your next big idea
          </h1>
          <div className='flex items-center gap-4 flex-wrap justify-center'>
            <button className='px-6 py-3 rounded-full font-bold text-sm hover:opacity-90 border bg-white text-black hover:scale-103 duration-500 cursor-pointer'>
              Get Instant Access
            </button>
            <Link
              href='/component'
              className='relative z-30 h-12 px-6 rounded-lg text-sm text-white transition-all flex items-center gap-2 group'
            >
              Explore All Components
              <div className='flex items-center justify-center transition-transform group-hover:translate-x-1'>
                <ChevronRight size={18} />
              </div>
            </Link>
          </div>
          <div className='absolute bottom-10 left-1/2 -translate-x-1/2 w-full px-4'>
            <div className='flex flex-wrap items-center justify-center gap-15 text-xs text-white/50'>
              <p className='flex items-center gap-2 hover:text-white transition-colors cursor-help'>
                <BadgeAlertIcon size={14} />
                30+ Cool Components
              </p>

              <p className='flex items-center gap-2 hover:text-white transition-colors cursor-help'>
                <TerminalIcon size={14} />
                Source Code Access
              </p>

              <p className='flex items-center gap-2 hover:text-white transition-colors cursor-help'>
                <FeatherIcon size={14} />
                Smooth Animations
              </p>

              <p className='flex items-center gap-2 hover:text-white transition-colors cursor-help'>
                <CircleCheckIcon size={14} />
                Lifetime Updates
              </p>
            </div>
          </div>
          <div className='absolute  bottom-0 left-0 right-0 h-74 bg-gradient-to-t from-white/[0.1] to-transparent pointer-events-none' />
        </div>

        {/* Pricing Section (Added above FAQ) */}
        <section ref={pricingSectionRef} className='w-full py-32 px-8 '>
          <div className='max-w-4xl mx-auto'>
            <div className='flex flex-col items-center text-center mb-20'>
              <div className='pricing-reveal translate-y-4 opacity-0 flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-950 mb-6'>
                <Zap size={12} className='text-white' />
                <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-widest'>
                  Pricing Plans
                </span>
              </div>
              <h2 className='pricing-reveal translate-y-4 opacity-0 text-5xl font-black text-white uppercase tracking-tighter mb-6'>
                Unlock the Full Library
              </h2>
              <p className='pricing-reveal translate-y-4 opacity-0 text-zinc-500 text-sm max-w-lg leading-relaxed'>
                Professional-grade UI components for Next.js and Tailwind.
                Choose the pack that fits your scale.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'>
              <PricingCard
                tier='Standard'
                price='$00'
                description='Perfect for individual projects and hobbyists.'
                features={[
                  '30+ Open Source Components',
                  'React / Tailwind Templates',
                  'Community Support',
                  'Lifetime Access',
                ]}
              />
              <PricingCard
                tier='Premium'
                isHighlighted={true}
                price='$00'
                description='Full access for professionals and agency work.'
                features={[
                  '100+ Premium Components',
                  'Agency/Commercial License',
                  'Priority Feature Requests',
                  'Figma Design Files',
                  'Private Discord Access',
                ]}
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='max-w-3xl mx-auto px-4 py-24 border-t border-zinc-900 border-b'>
          <div className='flex flex-col items-center text-center mb-14'>
            <div className='inline-block px-3 py-1 rounded-full bg-[#121212] border border-zinc-800/50 mb-4'>
              <span className='text-[10px] font-bold tracking-widest text-zinc-500 uppercase'>
                FAQ
              </span>
            </div>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight'>
              Everything you need to know
            </h2>
            <p className='mt-3 text-sm text-zinc-500 font-medium'>
              Can&apos;t find an answer?{' '}
              <a
                href='mailto:hello@slashui.com'
                className='underline hover:text-white transition-colors'
              >
                Reach out to us.
              </a>
            </p>
          </div>
          <div>
            {faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
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
    </>
  );
};

export default Page;
