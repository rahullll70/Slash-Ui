'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Check, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
  href?: string;
}

const PricingCard = ({
  tier,
  price,
  description,
  features,
  isHighlighted = false,
  href,
}: PricingCardProps) => {
  return (
    <div
      className={`pricing-card relative flex flex-col p-8 rounded-3xl transition-all duration-500 overflow-hidden h-full opacity-0 translate-y-8 ${
        isHighlighted
          ? 'bg-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.05)]'
          : 'bg-neutral-900 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
      }`}
    >
      {isHighlighted && (
        <>
          <div className='absolute -top-[20%] -right-[20%] w-[70%] h-[20%] bg-brand-light/10 blur-[100px] pointer-events-none' />
          <div className='absolute inset-0 z-0 pointer-events-none opacity-20'>
            <img
              src='/images/PricingSlash.svg'
              alt=''
              className='w-full h-full object-cover scale-150 rotate-[-5deg] backdrop-blur-5xl'
            />
          </div>
        </>
      )}

      <div className='relative z-10 flex flex-col h-full'>
        <div className='mb-8'>
          <h3 className='font-mono text-xs tracking-widest uppercase text-brand-light/70'>
            {tier}
          </h3>
          <p className='mt-3 text-sm font-semibold leading-relaxed font-switzer text-brand-light'>
            {description}
          </p>
        </div>

        <div className='flex items-baseline gap-1 mb-8'>
          <span className='text-6xl font-black tracking-tighter font-switzer text-brand-light'>
            {price}
          </span>
          <span className='text-brand-light/60 text-[10px] uppercase font-mono tracking-widest ml-2'>
            Lifetime Access
          </span>
        </div>

        <div className='flex-grow mb-10 space-y-4'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex items-center font-switzer gap-3 text-[13px]'
            >
              <Check size={14} className='text-brand-light' />
              <span className='text-brand-light/80'>{feature}</span>
            </div>
          ))}
        </div>

        <div className='relative z-20'>
          {href ? (
            <Link
              href={href}
              className='w-full py-4 rounded-xl text-sm font-switzer font-bold transition-all duration-300 flex items-center justify-center cursor-pointer bg-brand-light text-black hover:opacity-90 shadow-[0_4px_20px_rgba(255,255,255,0.15)]'
            >
              Get Started
            </Link>
          ) : (
            <div className='flex items-center justify-center w-full py-4 text-sm font-bold transition-all duration-300 cursor-not-allowed rounded-xl font-switzer bg-brand-light/10 text-brand-light'>
              Coming Soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      tl.to('.pricing-reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
      }).to(
        '.pricing-card',
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          stagger: 0.2,
        },
        '-=1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='w-full px-8 py-32 font-switzer'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col items-center mb-20 text-center'>
          <div className='pricing-reveal translate-y-4 opacity-0 flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 shadow-[0_4px_15px_rgba(0,0,0,0.5)] mb-6'>
            <Zap size={12} className='text-brand-light' />
            <span className='text-[10px] font-mono font-bold text-brand-light uppercase tracking-widest'>
              Pricing Plans
            </span>
          </div>

          <h2 className='block mb-6 overflow-hidden'>
            <span className='block text-5xl font-black tracking-tighter uppercase translate-y-full opacity-0 pricing-reveal text-brand-light'>
              Unlock the Full Library
            </span>
          </h2>

          <p className='max-w-lg text-sm leading-relaxed translate-y-4 opacity-0 pricing-reveal font-switzer text-brand-light/60'>
            Professional-grade UI components for Next.js and Tailwind. Choose
            the pack that fits your scale.
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
  );
};

export default Pricing;