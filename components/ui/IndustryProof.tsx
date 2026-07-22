'use client';

import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TechItem {
  name: string;
  icon: string;
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
  { name: 'Tailwind CSS', icon: '', url: 'https://tailwindcss.com' },
  { name: 'Next.js', icon: '', url: 'https://nextjs.org' },
  { name: 'Motion.dev', icon: '', url: 'https://motion.dev' },
  { name: 'Framer Motion', icon: '', url: 'https://framer.com' },
  { name: 'GSAP', icon: '', url: 'https://gsap.com' },
  { name: 'TypeScript', icon: '', url: 'https://typescriptlang.org' },
  { name: 'React', icon: '', url: 'https://react.dev' },
  { name: 'Vercel', icon: '', url: 'https://vercel.com' },
];

interface ScrollMarqueeProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
}

const ScrollMarquee = ({ items, direction = 'left' }: ScrollMarqueeProps) => {
  return (
    /* Adjusted: Increased vertical padding (py-12) and added a negative vertical margin (-my-8) 
       to keep the layout layout structure tight while giving tooltips enough room to render */
    <div className="overflow-hidden w-full group/marquee relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-12 -my-8">
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
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 25s linear infinite;
        }
      `}</style>

      <div
        className={`flex gap-12 w-max will-change-transform group-hover/marquee:[animation-play-state:paused] ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {[...items, ...items].map((item, i) => {
          const isStringItem = !('icon' in item);
          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 text-base font-medium text-white/60 tracking-widest transition-all duration-300 hover:scale-110 hover:text-white group/item cursor-pointer"
            >
              {isStringItem ? (
                <>
                  
                  {item.name}
                </>
              ) : (
                <>
                  {item.icon && <span className="text-white/75 text-[13px]">{item.icon}</span>}
                  {item.name}
                </>
              )}

              {/* Minimalist Premium Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2.5 py-1 text-[10px] tracking-normal font-mono text-zinc-400 bg-zinc-950 border border-white/10 rounded pointer-events-none opacity-0 translate-y-1 scale-95 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:scale-100 whitespace-nowrap z-50">
                Visit {item.name} ↗
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

interface DashedDividerProps {
  label: string;
}

const DashedDivider = ({ label }: DashedDividerProps) => (
  <div className="flex items-center gap-4 w-full my-10">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20" />
    <span className="text-[9px] tracking-[0.2em] text-white/30 font-mono uppercase shrink-0">
      {label}
    </span>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20" />
  </div>
);

export default function IndustryProof() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-74 bg-gradient-to-t from-white/[0.1] to-transparent pointer-events-none" />

      <div
        className={`relative z-10 w-full max-w-[860px] transition-all duration-[1000ms] ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <DashedDivider label="Inspired & Legends" />

        <div className="mb-4 font-cartographCF">
          <ScrollMarquee items={inspirations} direction="left" />
        </div>
        <div className="mb-12 font-cartographCF">
          <ScrollMarquee items={[...inspirations].reverse()} direction="right" />
        </div>

        <div className="mb-4 font-cartographCF">
          <ScrollMarquee items={techStack} direction="left" />
        </div>
        <div className="mb-12 font-cartographCF">
          <ScrollMarquee items={[...techStack].reverse()} direction="right" />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/pricing"
            className="relative z-30 h-12 px-6 rounded-lg text-sm text-white transition-all flex items-center gap-2 group"
          >
            Be a part now
            <div className="flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}