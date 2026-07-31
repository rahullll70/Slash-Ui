'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Zap } from 'lucide-react';
import { motion, Variants } from 'motion/react';

interface PricingCardProps {
  tier: string;
  price: string;
  features: string[];
  isHighlighted?: boolean;
  href?: string;
}

const cardVariants : Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const PricingCard = ({
  tier,
  price,
  features,
  isHighlighted = false,
  href,
}: PricingCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      /* Height & Ratio tweaks: min-h-[640px] and max-w-[380px] force tall rectangular proportion */
      className="relative flex flex-col justify-between p-8 md:p-10 rounded-[32px] bg-neutral-900 overflow-hidden min-h-[640px] w-full max-w-[380px] mx-auto font-switzer shadow-2xl"
    >
      {/* Background Glow Accent for Highlighted Card */}
      {isHighlighted && (
        <>
          <div className="absolute rounded-full pointer-events-none -bottom-16 -left-16 w-80 h-80 bg-brand-light/20 blur-3xl" />
          <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
            <img
              src="/images/PricingSlash.svg"
              alt=""
              className="w-full h-full object-cover scale-150 rotate-[-5deg]"
            />
          </div>
        </>
      )}

      {/* Card Header & Content */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Tier Header */}
        <h3 className="mb-2 text-lg font-bold text-brand-light/80">
          {tier}
        </h3>

        {/* Big Bold Price */}
        <div className="mb-12 text-6xl font-black tracking-tight md:text-7xl text-brand-light">
          {price}
        </div>

        {/* Feature List (Larger Text & Spacing) */}
        <div className="flex-grow mb-12 space-y-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 text-base font-medium md:text-md text-brand-light/90"
            >
              <Check size={18} className="text-brand-light shrink-0 stroke-[2.5]" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="relative z-10">
        {href ? (
          <Link
            href={href}
            className="block w-full py-4 text-sm font-bold text-center text-black transition-all duration-300 rounded-full shadow-lg bg-brand-light hover:opacity-90"
          >
            Get Instant Access
          </Link>
        ) : (
          <div className="block w-full py-4 text-sm font-bold text-center rounded-full cursor-not-allowed text-brand-light/60 bg-brand-light/10">
            Coming Soon
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <section className="w-full px-6 py-24 font-switzer">
      {/* Container restricted to max-w-2xl so two cards side-by-side stay long and narrow */}
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <motion.div
            variants={cardVariants}
            className="flex items-center gap-2 px-3 py-1 mb-6 rounded-full shadow-lg bg-neutral-900"
          >
            <Zap size={12} className="text-brand-light" />
            <span className="text-[10px] font-mono font-bold text-brand-light uppercase tracking-widest">
              Pricing Plans
            </span>
          </motion.div>

          <h2 className="block overflow-hidden">
            <motion.span
              variants={cardVariants}
              className="block text-4xl font-black tracking-tighter md:text-5xl text-brand-light"
            >
              Unlock the Full Library
            </motion.span>
          </h2>
        </motion.div>

        {/* Tall Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.2 }}
          className="grid items-stretch justify-center grid-cols-1 gap-8 md:grid-cols-2"
        >
          <PricingCard
            tier="Standard"
            price="$00"
            href="#"
            isHighlighted={true}
            features={[
              '30+ Open Source Components',
              'React / Tailwind Templates',
              'Community Support',
              'Lifetime Access',
            ]}
          />

          <PricingCard
            tier="Premium"
            price="$00"
            features={[
              '100+ Premium Components',
              'Agency/Commercial License',
              'Priority Feature Requests',
              'Figma Design Files',
              'Private Discord Access',
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;