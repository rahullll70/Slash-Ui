'use client';

import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';

interface InspirationItem {
  name: string;
  url: string;
}

interface TechItem {
  name: string;
  url: string;
  icon: ReactNode;
}

const inspirations: InspirationItem[] = [
  { name: 'Codegrid', url: 'https://youtube.com/codegrid' },
  { name: 'Manu Arora', url: 'https://twitter.com/mannupaaji' },
  { name: 'Shadcn', url: 'https://twitter.com/shadcn' },
  { name: 'Skiper-Ui', url: 'https://github.com' },
];

const techStack: TechItem[] = [
  {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    icon: (
      <svg className='w-3.5 h-3.5 shrink-0 fill-current' viewBox='0 0 24 24'>
        <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    url: 'https://nextjs.org',
    icon: (
      <svg className='w-3.5 h-3.5 shrink-0 fill-current' viewBox='0 0 24 24'>
        <path d='M18.665 21.978C16.758 23.255 14.465 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0c5.475 0 10.085 3.664 11.556 8.683l-10.463 13.295zM15.5 8h-2v8h2V8zm-7 0H6.75l4.5 7.5L9.5 8z' />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    url: 'https://framer.com',
    icon: (
      <svg className='w-3.5 h-3.5 shrink-0 fill-current' viewBox='0 0 24 24'>
        <path d='M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z' />
      </svg>
    ),
  },
  {
    name: 'GSAP',
    url: 'https://gsap.com',
    icon: (
      <svg className='w-3.5 h-3.5 shrink-0 fill-current' viewBox='0 0 24 24'>
        <path d='M9.83 7.59c.817.005 1.437.238 1.842.692c.383.431.567 1.054.547 1.85l-.014.061a.16.16 0 0 1-.148.095h-1.659a.2.2 0 0 1-.199-.195q.002-.634-.39-.71l-.12-.011c-.342 0-.564.211-.57.579c-.007.41.225.783.885 1.423c.868.816 1.217 1.539 1.2 2.493c-.027 1.544-1.077 2.543-2.673 2.543c-.815 0-1.438-.219-1.853-.649c-.42-.437-.612-1.078-.572-1.906a.17.17 0 0 1 .049-.112a.16.16 0 0 1 .112-.045h1.716a.2.2 0 0 1 .069.017a.17.17 0 0 1 .083.098q.008.03.002.06c-.019.298.034.521.151.645a.4.4 0 0 0 .311.121c.317 0 .503-.225.51-.615c.006-.337-.102-.634-.682-1.232c-.751-.734-1.424-1.492-1.403-2.684a2.48 2.48 0 0 1 .774-1.781c.514-.482 1.216-.737 2.032-.737m-5.783.028c.747-.006 1.334.224 1.742.685c.432.487.651 1.221.652 2.182a.16.16 0 0 1-.161.158H4.479a.13.13 0 0 1-.084-.036a.13.13 0 0 1-.035-.085c-.014-.623-.188-.946-.532-.984l-.071-.004c-.69.001-1.097.938-1.313 1.458a5.5 5.5 0 0 0-.426 2.301c.015.366.074.88.42 1.093c.308.189.747.064 1.013-.146c.265-.209.479-.571.569-.901q.02-.07.001-.098q-.01-.011-.032-.015l-.504-.004a.18.18 0 0 1-.129-.06a.1.1 0 0 1-.025-.05a.1.1 0 0 1 0-.056l.316-1.374a.18.18 0 0 1 .157-.134v-.003h3.035l.021.001c.079.01.135.084.134.164v.004l-.316 1.371c-.017.078-.095.135-.184.135h-.381a.064.064 0 0 0-.061.046c-.352 1.194-.829 2.016-1.458 2.509c-.536.42-1.195.616-2.077.616c-.792 0-1.326-.255-1.779-.758c-.598-.666-.845-1.754-.695-3.067c.27-2.463 1.546-4.948 4.004-4.948m16.969.132c2.01 0 3.014.912 2.983 2.711c-.037 2.108-1.321 3.658-3.254 4.016q-.413.073-.833.068l-.934-.004a.06.06 0 0 0-.058.057q0 .015.008.029a.1.1 0 0 0 .022.021l.794.414q.098.053.076.164l-.207.933c-.017.078-.08.123-.171.123h-1.703a.2.2 0 0 1-.071-.015a.2.2 0 0 1-.058-.044a.12.12 0 0 1-.025-.107l1.896-8.241c.019-.086.1-.124.172-.124zm-3.743.012a.2.2 0 0 1 .051.033a.2.2 0 0 1 .034.052a.2.2 0 0 1 .011.059l-.011 8.213a.14.14 0 0 1-.003.058a.14.14 0 0 1-.081.091a.14.14 0 0 1-.064.013h-1.813a.16.16 0 0 1-.111-.045a.2.2 0 0 1-.033-.051a.2.2 0 0 1-.012-.06l.039-.797c.002-.087 0-.111-.051-.117l-.068-.002h-1.714c-.124 0-.133.011-.177.125l-.356.857q-.048.09-.192.09h-1.795c-.109 0-.187-.108-.146-.209l3.718-8.199c.025-.049.063-.123.149-.123h2.566q.03 0 .059.012M15.5 9.985c-.008-.032-.034-.029-.055.013a1 1 0 0 0-.04.093l-1.284 3.183l-.016.048q-.002.01-.001.019l.007.017a.04.04 0 0 0 .015.012a.04.04 0 0 0 .017.006l1.072.014c.119-.01.125-.016.137-.137c.002-.043.154-3.231.148-3.268m4.612-.403a.06.06 0 0 0-.04.017a.06.06 0 0 0-.018.04a.06.06 0 0 0 .03.051l.842.445c.042.023.043.063.029.132c-.007.031-.54 2.375-.539 2.377c.003.003.019.011.099.011h.036c.895-.036 1.383-1.094 1.401-2.121c.009-.555-.18-.896-.523-.946l-.071-.006z' />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    url: 'https://typescriptlang.org',
    icon: (
      <svg className='w-3.5 h-3.5 shrink-0 fill-current' viewBox='0 0 128 128'>
        <path d='M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z' />
      </svg>
    ),
  },
  {
    name: 'React',
    url: 'https://react.dev',
    icon: (
      <svg className='w-3.5 h-3.5 shrink-0 fill-current' viewBox='0 0 128 128'>
        <circle cx='64' cy='64' r='11.4' />
        <path d='M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z' />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    url: 'https://vercel.com',
    icon: (
      <svg className='w-3.5 h-3.5 shrink-0 fill-current' viewBox='0 0 24 24'>
        <path d='M24 22.525H0l12-21.05 12 21.05z' />
      </svg>
    ),
  },
];

interface ScrollMarqueeProps {
  items: (InspirationItem | TechItem)[];
  direction?: 'left' | 'right';
}

const isTechItem = (item: InspirationItem | TechItem): item is TechItem => {
  return 'icon' in item;
};

const ScrollMarquee = ({ items, direction = 'left' }: ScrollMarqueeProps) => {
  return (
    <div className='overflow-hidden w-full group/marquee relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-6 -my-3'>
      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 35s linear infinite;
        }
      `}</style>

      <div
        className={`flex gap-8 w-max will-change-transform group-hover/marquee:[animation-play-state:paused] ${
          direction === 'left'
            ? 'animate-marquee-left'
            : 'animate-marquee-right'
        }`}
      >
        {[...items, ...items, ...items].map((item, i) => {
          const hasIcon = isTechItem(item);

          return (
            <a
              key={i}
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              className='relative group/item inline-flex items-center gap-2 text-md font-inter text-zinc-500 transition-all duration-300 hover:text-white/90 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] cursor-pointer select-none'
            >
              <span className='transition-colors duration-300 text-zinc-700 group-hover/item:text-zinc-500'>
                /
              </span>

              {hasIcon && (
                <span className='flex items-center justify-center w-3.5 h-3.5 shrink-0 text-zinc-500 transition-colors duration-300 group-hover/item:text-white [&>svg]:w-3.5 [&>svg]:h-3.5'>
                  {item.icon}
                </span>
              )}

              <span>{item.name}</span>

              {/* Minimal Tooltip with Lucide Arrow Icon */}
              <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 text-[9px] font-mono text-zinc-400  rounded pointer-events-none opacity-0 translate-y-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-y-0 whitespace-nowrap z-[100] shadow-xl backdrop-blur-md flex items-center gap-1'>
                <span>Visit {item.name}</span>
                <ArrowUpRight className='w-2.5 h-2.5 stroke-[2] text-zinc-400 shrink-0' />
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
  <div className='flex items-center justify-center w-full my-4'>
    <span className='text-[12px] font-switzer  text-zinc-500/80'>{label}</span>
  </div>
);

export default function IndustryProof() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className='relative flex flex-col items-center justify-center px-6 py-16 overflow-hidden font-inter'>
      <div
        className={`relative z-10 w-full max-w-4xl transition-all duration-[1000ms] ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Inspirations Block */}
        <SectionLabel label='Inspired & Legends' />
        <div className='space-y-0.5'>
          <ScrollMarquee items={inspirations} direction='left' />
          <ScrollMarquee
            items={[...inspirations].reverse()}
            direction='right'
          />
        </div>

        {/* Tech Stack Block */}
        <div className='mt-6'>
          <SectionLabel label='Powered By Technology' />
          <div className='space-y-0.5'>
            <ScrollMarquee items={techStack} direction='left' />
            <ScrollMarquee items={[...techStack].reverse()} direction='right' />
          </div>
        </div>

        {/* Borderless Link Text & Visible Arrow Icon */}
        <div className='flex justify-center mt-10'>
          <Link
            href='/pricing'
            className='group relative z-30 flex items-center gap-1.5 text-xs font-inter font-medium text-zinc-500 hover:text-white transition-colors duration-300 cursor-pointer'
          >
            <span>Be a part now</span>
            <div className='flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 text-zinc-400 group-hover:text-white shrink-0'>
              <ChevronRight className='w-3.5 h-3.5 stroke-[2]' />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
