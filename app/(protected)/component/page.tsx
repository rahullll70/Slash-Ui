'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { BadgeAlert } from 'lucide-react';
import Navbar from '@/components/ui/navbar';

interface ComponentCardProps {
  title: string;
  videoSrc?: string;
  children?: React.ReactNode;
  span?: string;
  showBadge?: boolean;
}

const ComponentCard = ({
  title,
  videoSrc,
  children,
  span = '',
  showBadge = false,
}: ComponentCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between rounded-3xl bg-[#161616] border border-white/5 p-1 hover:border-white/20 transition-all duration-500 h-full ${span}`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-500 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_70%)] ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className='relative flex-grow overflow-hidden rounded-[22px] bg-[#0A0A0A] flex items-center justify-center min-h-[200px] cursor-pointer border border-white/[0.03]'>
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-30 scale-100'
            }`}
          />
        ) : (
          <div className='relative z-10 w-full h-full flex items-center justify-center'>
            {children}
          </div>
        )}
      </div>

      <div className='px-4 py-3 flex justify-between items-center bg-transparent relative z-10'>
        <h3 className='text-sm font-medium text-zinc-400 group-hover:text-white transition-colors'>
          {title}
        </h3>

        {showBadge && (
          <div className='group/tooltip relative flex items-center'>
            <BadgeAlert className='w-4 h-4 text-cyan-400' />

            {/* Tooltip Bubble */}
            <span className='absolute bottom-full mb-2 hidden group-hover/tooltip:block bg-zinc-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap'>
              New
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const ComponentsPage = () => {
  return (
    <>
    <Navbar />
    <div className='min-h-screen  pt-32 pb-20 px-6'>
      <div className='max-w-7xl mx-auto space-y-32'>
        {/* Group 1: Out of the Box */}
        <section>
          <div className='mb-12'>
            <h2 className='text-white text-3xl font-bold flex items-center gap-3'>
              Some Random Components{' '}
            </h2>
            <p className='text-zinc-500 text-sm mt-2'>
              Collection of interactive components [Click to view]
            </p>
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

        {/* Group 2: 3d components */}
        <section>
          <div className='mb-12'>
            <h2 className='text-white text-3xl font-bold flex items-center gap-3'>
              Some Random Components{' '}
            </h2>
            <p className='text-zinc-500 text-sm mt-2'>
              Collection of interactive components [Click to view]
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]'>
            <Link href='/component/stike-reveal' className='block'>
              <ComponentCard
                title='Strike Reveal'
                videoSrc='/compVideos/strike-reveal.mp4'
              />
            </Link>

            <Link href='/component/floating-navbar' className='lg:col-span-2'>
              <ComponentCard
                title='floating-navbar'
                videoSrc='/compVideos/floating-navbar.mp4'
              />
            </Link>

            <Link href='/component/infinity-slider' className='lg:row-span-2'>
              <ComponentCard
                title='Infinity Slider'
                videoSrc='/compVideos/infinite-slider.mp4'
              />
            </Link>

            <Link href='/component/stroke-cards' className='block'>
              <ComponentCard
                title='Stroke Cards'
                videoSrc='/compVideos/stroke-cards.mp4'
              />
            </Link>

            <Link href='/component/arc-slider' className='lg:col-span-2'>
              <ComponentCard
                title='Arc Slider'
                videoSrc='/compVideos/arc-slider.mp4'
              />
            </Link>

            <Link href='/component/dot-cursor' className='block'>
              <ComponentCard
                title='Dot Curser'
                videoSrc='/compVideos/dot-cursor.mp4'
              />
            </Link>

            <Link href='/component/animated-header' className='lg:col-span-2'>
              <ComponentCard
                title='Animated Header'
                videoSrc='/compVideos/animated-header.mp4'
              />
            </Link>
            <Link href='/component/neubrutal-button' className='block'>
              <ComponentCard
                title='Neubrutal-button'
                videoSrc='/compVideos/neubrutal-button.mp4'
              />
            </Link>
          </div>
        </section>

        {/* You can add 3nd and 4th Groups below following the same pattern */}
      </div>
    </div>
    </>
  );
};

export default ComponentsPage;
