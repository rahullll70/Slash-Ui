'use client';

import React, { JSX, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Index } from '@/__registry__';

interface ComponentCardProps {
  title: string;
  videoSrc?: string;
  children?: React.ReactNode;
  span?: string;
  bg?: string;
}

const ComponentCard = ({
  title,
  videoSrc,
  children,
  span = '',
  bg = 'bg-brand-accent',
}: ComponentCardProps) => {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-3xl ${bg}  p-1 shadow-xl shadow-brand-accent/10 hover:shadow-2xl transition-all duration-500 h-full cursor-pointer ${span}`}
    >
      <div className='relative flex-grow overflow-hidden rounded-[22px] bg-brand-dark flex items-center justify-center min-h-[140px] '>
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className='absolute inset-0 object-cover w-full h-full scale-100 opacity-100'
          />
        ) : (
          <div className='relative z-10 flex items-center justify-center w-full h-full'>
            {children}
          </div>
        )}
      </div>

      <div className='relative z-10 flex items-center justify-between px-4 py-3 bg-transparent'>
        <h3 className='text-[13px] font-switzer font-medium text-brand-light group-hover:text-white transition-colors'>
          {title}
        </h3>
      </div>
    </div>
  );
};

const FeaturedComponents = () => {
  const getComp = (name: string) => (Index as any)['default']?.[name];

  return (
    <div className='w-full min-h-screen p-8 mt-10 text-brand-light font-inter'>
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]'>
          <Link href={`/component/strike-reveal`}>
            <ComponentCard
              title='Strike Reveal'
              videoSrc={
                getComp('reveal')?.video || '/compVideos/strike-reveal.mp4'
              }
            />
          </Link>

          {/* 2. Floating Navbar */}
          <Link href={`/component/floating-navbar`} className='lg:col-span-2'>
            <ComponentCard
              title='Floating Navbar'
              videoSrc={
                getComp('navbar')?.video || '/compVideos/floating-navbar.mp4'
              }
            />
          </Link>

          {/* 3. Infinity Slider */}
          <Link href={`/component/infinity-slider`} className='lg:row-span-3'>
            <ComponentCard
              title='Infinity Slider'
              videoSrc={
                getComp('minimal-scrollbar')?.video ||
                '/compVideos/infinite-slider.mp4'
              }
            />
          </Link>

          {/* 4. Stroke Cards */}
          <Link
            href={`/component/stroke-cards`}
            className='lg:col-span-2 lg:row-span-2'
          >
            <ComponentCard
              title='Stroke Cards'
              videoSrc={
                getComp('stroke-cards')?.video || '/compVideos/stroke-cards.mp4'
              }
            ></ComponentCard>
          </Link>

          {/* 5. Dot Cursor */}
          <Link href={`/component/dot-cursor`}>
            <ComponentCard
              title='Dot Cursor'
              videoSrc={
                getComp('details')?.video || '/compVideos/dot-cursor.mp4'
              }
            />
          </Link>

          {/* 6. Neubrutal Button */}
          <Link href={`/component/neubrutal-button`}>
            <ComponentCard
              title='Neubrutal Button'
              videoSrc={
                getComp('neubrutal-button')?.video ||
                '/compVideos/neubrutal-button.mp4'
              }
            />
          </Link>

          {/* 7. Arc Slider */}
          <Link
            href={`/component/arc-slider`}
            className='lg:col-span-3 lg:row-span-2'
          >
            <ComponentCard
              title='Arc Slider'
              videoSrc={
                getComp('arc-slider')?.video || '/compVideos/arc-slider.mp4'
              }
            />
          </Link>

          {/* 8. Animated Header */}
          <Link href={`/component/animated-header`} className='lg:row-span-2'>
            <ComponentCard
              title='Animated Header'
              videoSrc={
                getComp('feedback')?.video || '/compVideos/animated-header.mp4'
              }
            ></ComponentCard>
          </Link>
        </div>

        {/* Explore Button */}
        <div className='flex justify-center mt-8'>
          <Link
            href='/component'
            className='relative z-30 flex items-center gap-2 px-5 text-xs font-medium transition-colors group h-11 font-inter text-brand-light/80 hover:text-white'
          >
            Explore All Components
            <div className='flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5'>
              <ChevronRight size={16} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedComponents;
