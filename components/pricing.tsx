'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

const PricingCard = ({
  
  tier,
  price,
  description,
  features,
  href,
  isHighlighted = false,
}: {
  tier: string;
  price: string;
  description: string;
  features: string[];
  href: string;
  isHighlighted?: boolean;
}) => {
  return (
    <div
      className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-500 overflow-hidden h-full ${
        isHighlighted
          ? 'border-white bg-neutral-900 shadow-[0_0_50px_-12px_rgba(255,255,255,0.2)]'
          : 'border-white/10 bg-neutral-900 text-zinc-400'
      }`}
    >
      {isHighlighted && (
        <>
          <div className='absolute -top-[20%] -right-[20%] w-[70%] h-[70%] bg-white/10 blur-[100px] pointer-events-none' />

          <div className='absolute inset-0 pointer-events-none z-0'>
            <img
              src='/images/PricingSlash.svg'
              alt=''
              className='w-full h-full object-cover scale-150 rotate-[-5deg] opacity-90'
            />
          </div>

          <div className='absolute inset-0 rounded-3xl border border-white/20 animate-pulse pointer-events-none' />
        </>
      )}

      <div
        className={`relative flex flex-col h-full ${isHighlighted ? 'z-10 mix-blend-difference' : 'z-10'}`}
      >
        <div className='mb-8'>
          <h3
            className={`text-xs uppercase font-mono tracking-widest ${isHighlighted ? 'text-white' : 'text-zinc-500'}`}
          >
            {tier}
          </h3>
          <p
            className={`text-sm mt-3 font-medium leading-relaxed ${isHighlighted ? 'text-white' : 'text-zinc-400'}`}
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
            <div
              key={index}
              className='flex items-center gap-3 text-[13px] font-cartographCF'
            >
              <Check
                size={14}
                className={isHighlighted ? 'text-white' : 'text-zinc-600'}
              />
              <span className={isHighlighted ? 'text-white' : 'text-zinc-500'}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className='relative z-20'>
          <Link
            href={'https://app.archway.finance/payment-requests/HDGAY/public'}
            className={`w-full py-4 rounded-xl font-beVietnamPro font-bold text-xs transition-all duration-500 flex items-center justify-center cursor-pointer ${
              isHighlighted
                ? 'bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:bg-zinc-100'
                : 'bg-transparent text-white border border-white/20 hover:border-white/60'
            }`}
          >
            Select {tier}
          </Link>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <section className='w-full py-32 px-8 '>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col items-center text-center mb-20'>
          <div className='flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-zinc-950 mb-6'>
            <Zap size={12} className='text-white' />
            <span className='text-[10px] font-bold text-zinc-400 uppercase tracking-widest'>
              Pricing Plans
            </span>
          </div>
          <h2 className='text-5xl font-black text-white uppercase tracking-tighter mb-6'>
            Unlock the Full Library
          </h2>
          <p className='text-zinc-500 text-sm max-w-lg leading-relaxed'>
            Professional-grade UI components for Next.js and Tailwind. Choose
            the pack that fits your scale.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch'>
          <PricingCard
            tier='Standard'
            price='$50'
            href='https://app.archway.finance/payment-requests/HDGAY/public'
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
            price='$129'
            href='https://app.archway.finance/payment-requests/HDGAY/public'
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
