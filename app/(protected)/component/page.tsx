'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { BadgeAlert } from 'lucide-react';
import Navbar from '@/components/navbar';

interface ComponentCardProps {
  id?: string;
  title: string;
  videoSrc?: string;
  children?: React.ReactNode;
  span?: string;
  showBadge?: boolean;
}

const ComponentCard = ({
  id,
  title,
  videoSrc,
  children,
  span = '',
  showBadge = false,
}: ComponentCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between rounded-3xl bg-brand-accent border border-white/10 hover:border-brand-accent/40 p-1 shadow-xl shadow-brand-accent/5 hover:shadow-2xl hover:shadow-brand-accent/20 transition-all duration-500 h-full ${span}`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08)_0%,transparent_70%)] ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className='relative flex-grow overflow-hidden rounded-[22px] bg-brand-dark/80 flex items-center justify-center min-h-[200px] cursor-pointer shadow-inner border border-white/5'>
        {/* Top Right "New" Badge Icon */}
        {showBadge && (
          <div className='absolute z-20 flex items-center top-3 right-3 group/tooltip'>
            <BadgeAlert className='w-5 h-5 text-sky-400 drop-shadow-md' />

            {/* Tooltip Bubble */}
            <span className='absolute right-0 top-full mt-1 hidden group-hover/tooltip:block bg-brand-accent/90 text-brand-light text-[10px] font-inter px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none'>
              New
            </span>
          </div>
        )}

        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-40 scale-100'
            }`}
          />
        ) : (
          <div className='relative z-10 flex items-center justify-center w-full h-full'>
            {children}
          </div>
        )}
      </div>

      <div className='relative z-10 flex items-center justify-between px-4 py-3 bg-transparent'>
        <h3 className='text-sm font-medium transition-colors font-switzer text-zinc-400 group-hover:text-brand-light'>
          {title}
        </h3>

        {/* Reicon Bookmark Button */}
        <button
          type='button'
          onClick={toggleBookmark}
          title={isSaved ? 'Remove Bookmark' : 'Save Component'}
          className='z-20 p-1 transition-colors cursor-pointer text-zinc-400 hover:text-brand-light'
        >
          <ReiconBookmark filled={isSaved} />
        </button>
      </div>
    </div>
  );
};

{
  /* Reicon Bookmark SVG Component */
}
function ReiconBookmark({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill={filled ? 'currentColor' : 'none'}
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='transition-colors'
    >
      <path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z' />
    </svg>
  );
}

const ComponentsPage = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen px-6 pt-32 pb-20 bg-brand-dark text-brand-light font-inter'>
        <div className='mx-auto space-y-32 max-w-7xl'>
          {/* Group 1: Out of the Box */}
          <section>
            <div className='flex flex-wrap items-center gap-4 mb-10'>
              <h2 className='text-3xl font-bold text-transparent font-switzer bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text'>
                Some Random Components
              </h2>

              <span className='px-3 py-1 text-xs border rounded-full font-inter text-zinc-400 bg-brand-accent/10 border-brand-accent/20'>
                Interactive Components{' '}
                <span className='text-zinc-500'>[Click to view]</span>
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]'>
              <Link href='/component/stike-reveal' className='block'>
                <ComponentCard
                  title='Strike Reveal'
                  videoSrc='/compVideos/strike-reveal.mp4'
                  showBadge
                />
              </Link>

              <Link href='/component/floating-navbar' className='lg:col-span-2'>
                <ComponentCard
                  title='floating-navbar'
                  videoSrc='/compVideos/floating-navbar.mp4'
                  showBadge
                />
              </Link>

              <Link href='/component/infinity-slider' className='lg:row-span-2'>
                <ComponentCard
                  title='Infinity Slider'
                  videoSrc='/compVideos/infinite-slider.mp4'
                  showBadge
                />
              </Link>

              <Link href='/component/stroke-cards' className='block'>
                <ComponentCard
                  title='Stroke Cards'
                  videoSrc='/compVideos/stroke-cards.mp4'
                  showBadge
                />
              </Link>

              <Link href='/component/arc-slider' className='lg:col-span-2'>
                <ComponentCard
                  title='Arc Slider'
                  videoSrc='/compVideos/arc-slider.mp4'
                  showBadge
                />
              </Link>

              <Link href='/component/dot-cursor' className='block'>
                <ComponentCard
                  title='Dot Curser'
                  videoSrc='/compVideos/dot-cursor.mp4'
                  showBadge
                />
              </Link>

              <Link href='/component/animated-header' className='lg:col-span-2'>
                <ComponentCard
                  title='Animated Header'
                  videoSrc='/compVideos/animated-header.mp4'
                  showBadge
                />
              </Link>
              <Link href='/component/neubrutal-button' className='block'>
                <ComponentCard
                  title='Neubrutal-button'
                  videoSrc='/compVideos/neubrutal-button.mp4'
                  showBadge
                />
              </Link>
            </div>
          </section>

          {/* Group 2: Hover Interactions */}
          <section>
            <div className='flex flex-wrap items-center gap-4 mb-10'>
              <h2 className='text-3xl font-bold text-transparent font-switzer bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text'>
                Hover Interactions
              </h2>

              <span className='px-3 py-1 text-xs border rounded-full font-inter text-zinc-400 bg-brand-accent/10 border-brand-accent/20'>
                Interactive Components{' '}
                <span className='text-zinc-500'>[Click to view]</span>
              </span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]'>
              <Link href='/component/stike-reveal' className='block'>
                <ComponentCard
                  title='Strike Reveal'
                  videoSrc='/compVideos/strike-reveal.mp4'
                />
              </Link>

              <Link href='/component/stroke-cards' className='lg:col-span-2'>
                <ComponentCard
                  title='Stoke Cards'
                  videoSrc='/compVideos/stroke-cards.mp4'
                />
              </Link>
            </div>
          </section>

          {/* Group 3: 3D Collections */}
          <section>
            <div className='flex flex-wrap items-center gap-4 mb-10'>
              <h2 className='text-3xl font-bold text-transparent font-switzer bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text'>
                3D Interactions
              </h2>

              <span className='px-3 py-1 text-xs border rounded-full font-inter text-zinc-400 bg-brand-accent/10 border-brand-accent/20'>
                Interactive Components{' '}
                <span className='text-zinc-500'>[Click to view]</span>
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]'>
              <Link href='/component/arc-slider' className='block'>
                <ComponentCard
                  title='Arc Slider'
                  videoSrc='/compVideos/arc-slider.mp4'
                />
              </Link>

              <Link href='/component/infinity-slider' className='lg:col-span-2'>
                <ComponentCard
                  title='Infinity Slider'
                  videoSrc='/compVideos/infinite-slider.mp4'
                />
              </Link>
            </div>
          </section>

          {/* Group 4: Scroll Effects */}
          <section>
            <div className='flex flex-wrap items-center gap-4 mb-10'>
              <h2 className='text-3xl font-bold text-transparent font-switzer bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text'>
                Scroll Effects
              </h2>

              <span className='px-3 py-1 text-xs border rounded-full font-inter text-zinc-400 bg-brand-accent/10 border-brand-accent/20'>
                Interactive Components{' '}
                <span className='text-zinc-500'>[Click to view]</span>
              </span>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]'>
              <Link href='/component/' className='block'>
                <ComponentCard title='' videoSrc='/compVideos/' />
              </Link>

              <Link href='/component/' className='lg:col-span-2'>
                <ComponentCard title='' videoSrc='/compVideos/' />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ComponentsPage;
