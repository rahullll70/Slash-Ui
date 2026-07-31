'use client';

import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TechItem {
  name: string;
  url: string;
}

interface InspirationItem {
  name: string;
  url: string;
}

type MarqueeItem = InspirationItem | TechItem;

const inspirations: InspirationItem[] = [
  { name: 'Codegrid', url: 'https://youtube.com/codegrid' },
  { name: 'Manu Arora', url: 'https://twitter.com/mannupaaji' },
  { name: 'Shadcn', url: 'https://twitter.com/shadcn' },
  { name: 'Skiper-Ui', url: 'https://github.com' },
];

const techStack: TechItem[] = [
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
  { name: 'Next.js', url: 'https://nextjs.org' },
  { name: 'Motion.dev', url: 'https://motion.dev' },
  { name: 'Framer Motion', url: 'https://framer.com' },
  { name: 'GSAP', url: 'https://gsap.com' },
  { name: 'TypeScript', url: 'https://typescriptlang.org' },
  { name: 'React', url: 'https://react.dev' },
  { name: 'Vercel', url: 'https://vercel.com' },
];

interface ScrollMarqueeProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
}

const ScrollMarquee = ({ items, direction = 'left' }: ScrollMarqueeProps) => {
  return (
    <div className="overflow-hidden w-full group/marquee relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-8 -my-4">
      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 35s linear infinite;
        }
      `}</style>

      <div
        className={`flex gap-10 w-max will-change-transform group-hover/marquee:[animation-play-state:paused] ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {[...items, ...items, ...items].map((item, i) => {
          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/item inline-flex items-center gap-2 text-xs font-switzer font-medium text-zinc-500 transition-all duration-300 hover:text-white/80 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] cursor-pointer select-none"
            >
              <span className="transition-colors duration-300 text-zinc-700 group-hover/item:text-zinc-400">/</span>
              {item.name}

              {/* Minimal Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-[9px] font-mono text-zinc-400 bg-zinc-950/90 border border-white/10 rounded pointer-events-none opacity-0 translate-y-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-y-0 whitespace-nowrap z-[100] shadow-xl backdrop-blur-md">
                Visit {item.name} ↗
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

interface SectionLabelProps {
  label: string;
}

const SectionLabel = ({ label }: SectionLabelProps) => (
  <div className="flex items-center justify-center w-full my-6">
    <span className="text-[9px] font-mono uppercase text-zinc-500">
      {label}
    </span>
  </div>
);

export default function IndustryProof() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-20 overflow-hidden font-inter">
      <div
        className={`relative z-10 w-full max-w-4xl transition-all duration-[1000ms] ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Inspirations Block */}
        <SectionLabel label="Inspired & Legends" />
        <div className="space-y-1">
          <ScrollMarquee items={inspirations} direction="left" />
          <ScrollMarquee items={[...inspirations].reverse()} direction="right" />
        </div>

        {/* Tech Stack Block */}
        <SectionLabel label="Powered By Technology" />
        <div className="space-y-1">
          <ScrollMarquee items={techStack} direction="left" />
          <ScrollMarquee items={[...techStack].reverse()} direction="right" />
        </div>

        {/* Borderless Link Text & Visible Arrow Icon */}
        <div className="flex justify-center mt-12">
          <Link
            href="/pricing"
            className="group relative z-30 flex items-center gap-1.5 text-[11px] font-inter font-medium text-zinc-500 hover:text-white/80 transition-colors duration-300 cursor-pointer"
          >
            <span>Be a part now</span>
            <div className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 text-zinc-400 group-hover:text-white/80 shrink-0">
              <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}