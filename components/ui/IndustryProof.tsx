'use client';

import { ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

interface TechItem {
  name: string;
  icon: string;
}

type MarqueeItem = string | TechItem;

const inspirations: string[] = [
  'Codegrid',
  'Manu Arora',
  'Shadcn',
  'Skiper-Ui',
];

const techStack: TechItem[] = [
  { name: 'Tailwind CSS', icon: '' },
  { name: 'Next.js', icon: '' },
  { name: 'Motion.dev', icon: '' },
  { name: 'Framer Motion', icon: '' },
  { name: 'GSAP', icon: '' },
  { name: 'TypeScript', icon: '' },
  { name: 'React', icon: '' },
  { name: 'Vercel', icon: '' },
];

interface ScrollMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  direction?: 1 | -1;
}

const ScrollMarquee = ({ items, direction = 1 }: ScrollMarqueeProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      posRef.current -= direction * 0.5;
      const halfWidth = track.scrollWidth / 2;
      if (direction > 0 && Math.abs(posRef.current) >= halfWidth) {
        posRef.current = 0;
      } else if (direction < 0 && posRef.current >= 0) {
        posRef.current = -halfWidth;
      }
      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [direction]);

  return (
    <div className='overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
      <div
        ref={trackRef}
        className='flex gap-12 whitespace-nowrap will-change-transform'
        style={{ width: 'max-content' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className='inline-flex items-center gap-3 text-base font-medium text-white/75 tracking-widest'
          >
            {typeof item === 'string' ? (
              <>
                <span className='text-white/75 text-[10px]'>◆</span>
                {item}
              </>
            ) : (
              <>
                <span className='text-white/75 text-[13px]'>{item.icon}</span>
                {item.name}
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

interface DashedDividerProps {
  label: string;
}

const DashedDivider = ({ label }: DashedDividerProps) => (
  <div className='flex items-center gap-4 w-full my-10'>
    
    <div className='flex-1 h-px bg-gradient-to-r from-transparent to-white/20' />
    <span className='text-[9px] tracking-[0.2em] text-white/30 font-mono uppercase shrink-0'>
      {label}
    </span>
    <div className='flex-1 h-px bg-gradient-to-l from-transparent to-white/20' />
  </div>
);

export default function IndustryProof() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden '>
      {/* 2. Bottom fade-out (Transitions to the next section) */}
      {/* <div className='absolute  bottom-0 left-0 right-0 h-74 bg-gradient-to-t from-white/[0.1] to-transparent pointer-events-none' /> */}

      {/* --- CONTENT --- */}
      <div
        className={`relative z-10 w-full max-w-[860px] transition-all duration-[1000ms] ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <DashedDivider label='Inspired & Legends' />

        <div className='mb-4'>
          <ScrollMarquee items={inspirations} direction={1} />
        </div>
        <div className='mb-12'>
          <ScrollMarquee items={[...inspirations].reverse()} direction={-1} />
        </div>

        <DashedDivider label='Tools & Stack' />

        <div className='mb-4'>
          <ScrollMarquee items={techStack} direction={1} />
        </div>
        <div className='mb-12'>
          <ScrollMarquee items={[...techStack].reverse()} direction={-1} />
        </div>

        <div className='mt-8 flex justify-center'>
          <Link
            href='/pricing'
            className='relative z-30 h-12 px-6 rounded-lg text-sm text-white transition-all flex items-center gap-2 group'
          >
            Be a part now
            <div className='flex items-center justify-center transition-transform group-hover:translate-x-1'>
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
