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
          ? 'bg-neutral-900 border-zinc-800/40 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]'
          : 'border-zinc-800/40 bg-neutral-900 text-zinc-400'
      }`}
    >
      {isHighlighted && (
        <>
          <div className='absolute -top-[20%] -right-[20%] w-[70%] h-[20%] bg-white/5 blur-[100px] pointer-events-none' />
          <div className='absolute inset-0 z-0 pointer-events-none'>
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
            className={`text-sm mt-3 font-inter font-medium leading-relaxed ${isHighlighted ? 'text-zinc-200' : 'text-zinc-400'}`}
          >
            {description}
          </p>
        </div>

        <div className='flex items-baseline gap-1 mb-8'>
          <span
            className={`text-6xl font-black font-switzer tracking-tighter ${isHighlighted ? 'text-white' : 'text-zinc-100'}`}
          >
            {price}
          </span>
          <span className='text-zinc-500 text-[10px] uppercase font-mono tracking-widest ml-2'>
            Lifetime Access
          </span>
        </div>

        <div className='flex-grow mb-10 space-y-4'>
          {features.map((feature, index) => (
            <div key={index} className='flex items-center font-inter gap-3 text-[13px]'>
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
            className={`w-full py-4 rounded-xl text-sm font-inter font-bold transition-all duration-500 flex items-center justify-center cursor-not-allowed ${
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
        <span className='text-sm font-semibold transition-colors font-inter text-zinc-300 group-hover:text-white'>
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
          <p className='pb-2 text-xs font-medium leading-relaxed font-inter text-zinc-500'>
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
      { label: 'LinkedIn', path: 'https://www.linkedin.com/in/rahul-pariharr/' },
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
      <main className='w-screen overflow-x-hidden font-inter'>
        {/* Hero */}
        <div className='relative flex flex-col items-center justify-center h-screen gap-8 px-4 text-center'>
          <h1 className='text-3xl md:text-5xl font-switzer font-bold tracking-tight uppercase leading-[1.1]'>
            Unlock premium <br />
            components <br className='hidden md:block' />
            for your next big idea
          </h1>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <button className='px-6 py-3 text-[12px] font-bold text-black duration-500 bg-white border rounded-full cursor-pointer font-inter hover:opacity-90 hover:scale-103'>
              Get Instant Access
            </button>
            <Link
              href='/component'
              className='relative z-30 flex items-center h-12 gap-2 px-6 text-[12px] text-white transition-all rounded-lg font-inter group'
            >
              Explore All Components
              <div className='flex items-center justify-center transition-transform group-hover:translate-x-1'>
                <ChevronRight size={15} />
              </div>
            </Link>
          </div>
          <div className='absolute w-full px-4 -translate-x-1/2 bottom-10 left-1/2'>
            <div className='flex flex-wrap items-center justify-center text-xs gap-15 text-white/50 font-inter'>
              <p className='flex items-center gap-2 transition-colors hover:text-white cursor-help'>
                <BadgeAlertIcon size={14} />
                30+ Cool Components
              </p>

              <p className='flex items-center gap-2 transition-colors hover:text-white cursor-help'>
                <TerminalIcon size={14} />
                Source Code Access
              </p>

              <p className='flex items-center gap-2 transition-colors hover:text-white cursor-help'>
                <FeatherIcon size={14} />
                Smooth Animations
              </p>

              <p className='flex items-center gap-2 transition-colors hover:text-white cursor-help'>
                <CircleCheckIcon size={14} />
                Lifetime Updates
              </p>
            </div>
          </div>
          <div className='absolute bottom-0 left-0 right-0 h-74 bg-gradient-to-t from-white/[0.1] to-transparent pointer-events-none' />
        </div>

        {/* Pricing Section (Added above FAQ) */}
        <section ref={pricingSectionRef} className='w-full px-8 py-32 '>
          <div className='max-w-4xl mx-auto'>
            <div className='flex flex-col items-center mb-20 text-center'>
              <div className='flex items-center gap-2 px-3 py-1 mb-6 translate-y-4 border rounded-full opacity-0 pricing-reveal border-white/10 bg-zinc-950'>
                <Zap size={12} className='text-white' />
                <span className='text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest'>
                  Pricing Plans
                </span>
              </div>
              <h2 className='mb-6 text-5xl font-black tracking-tighter text-white uppercase translate-y-4 opacity-0 pricing-reveal font-switzer'>
                Unlock the Full Library
              </h2>
              <p className='max-w-lg text-sm leading-relaxed translate-y-4 opacity-0 pricing-reveal text-zinc-500 font-inter'>
                Professional-grade UI components for Next.js and Tailwind.
                Choose the pack that fits your scale.
              </p>
            </div>

            <div className='grid items-stretch grid-cols-1 gap-6 md:grid-cols-2'>
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
        <section className='max-w-3xl px-4 py-24 mx-auto border-t border-b border-zinc-900 font-inter'>
          <div className='flex flex-col items-center text-center mb-14'>
            <div className='inline-block px-3 py-1 rounded-full bg-[#121212] border border-zinc-800/50 mb-4'>
              <span className='text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase'>
                FAQ
              </span>
            </div>
            <h2 className='text-3xl font-bold tracking-tight uppercase md:text-4xl font-switzer'>
              Everything you need to know
            </h2>
            <p className='mt-3 text-sm font-medium text-zinc-500 font-inter'>
              Can&apos;t find an answer?{' '}
              <a
                href='mailto:hello@slashui.com'
                className='underline transition-colors hover:text-white'
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
      <footer className='px-6 py-16 border-t border-zinc-900 font-inter'>
        <div className='flex flex-col items-start justify-between max-w-3xl gap-12 mx-auto md:flex-row'>
          {/* Brand Column */}
          <div className='flex flex-col gap-2'>
            <span className='text-sm font-bold tracking-tight text-white uppercase font-hoshiko'>
              Slash UI
            </span>
            <p className='text-[13px] text-zinc-600 font-inter font-medium'>
              © 2026 slashh-ui.com
            </p>
          </div>

          {/* Links Grid */}
          <div className='flex gap-16 md:gap-24'>
            {Object.entries(FOOTER_CONFIG).map(([category, links]) => (
              <div key={category} className='flex flex-col gap-3'>
                <p className='text-[13px] uppercase tracking-wider font-bold text-white font-switzer'>
                  {category}
                </p>
                <div className='flex flex-col gap-2'>
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.path}
                      className='text-[13px] font-inter font-medium text-zinc-500 hover:text-zinc-300 transition-colors'
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