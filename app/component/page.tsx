'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';

interface ComponentCardProps {
  title: string;
  author: string;
  videoSrc?: string;
  children?: React.ReactNode;
  span?: string;
}

const ComponentCard = ({
  title,
  author,
  videoSrc,
  children,
  span = '',
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
        <span className='text-[10px] text-zinc-600 font-mono italic'>
          {author || 'skiper'}
        </span>
      </div>
    </div>
  );
};

const ComponentsPage = () => {
  return (
    <div className='min-h-screen  pt-32 pb-20 px-6'>
      <div className='max-w-7xl mx-auto space-y-32'>
        {/* Group 1: Out of the Box */}
        <section>
          <div className='mb-12'>
            <h2 className='text-white text-3xl font-bold flex items-center gap-3'>
              Out of the box{' '}
              <span className='text-zinc-500 font-normal text-lg'>[06]</span>
            </h2>
            <p className='text-zinc-500 text-sm mt-2'>
              Collection of interactive components [Click to view]
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]'>
            <Link href='/component/image-reveal' className='block'>
              <ComponentCard
                title='Image reveal'
                author='skiper1'
                videoSrc='/videos/reveal-demo.mp4'
              />
            </Link>

            <Link href='/component/hover-members' className='lg:col-span-2'>
              <ComponentCard
                title='Hover members'
                author='skiper2'
                videoSrc='/videos/members-demo.mp4'
              />
            </Link>

            <Link href='/component/drag-scroll' className='lg:row-span-2'>
              <ComponentCard
                title='Things drag and scroll'
                author='skiper3'
                videoSrc='/videos/drag-demo.mp4'
              />
            </Link>

            <Link href='/component/dynamic-island' className='block'>
              <ComponentCard title='Dynamic island' author='skiper4'>
                <div className='w-32 h-10 bg-black rounded-full border border-zinc-800 flex items-center px-4 gap-2'>
                  <div className='w-2 h-2 rounded-full bg-red-500' />
                  <div className='w-12 h-1 bg-zinc-800 rounded-full' />
                </div>
              </ComponentCard>
            </Link>

            <Link href='/component/devouring-details' className='lg:col-span-2'>
              <ComponentCard
                title='Devouring details'
                author='skiper5'
                videoSrc='/videos/details-demo.mp4'
              />
            </Link>

            <Link href='/component/scrollbar' className='block'>
              <ComponentCard
                title='Anime js scrollbar'
                author='skiper6'
                videoSrc='/videos/scrollbar.mp4'
              />
            </Link>
          </div>
        </section>

        {/* You can add 2nd and 3rd Groups below following the same pattern */}
      </div>
    </div>
  );
};

export default ComponentsPage;
