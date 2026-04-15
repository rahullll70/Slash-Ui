'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Index } from "@/__registry__"; 

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
  bg = 'bg-[#161616]',
}: ComponentCardProps) => {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-3xl ${bg} border border-white/5 p-1 hover:border-white/20 transition-all duration-500 h-full cursor-pointer ${span}`}
    >
      <div className='relative flex-grow overflow-hidden rounded-[22px] bg-[#0A0A0A] flex items-center justify-center min-h-[140px] border border-white/[0.03]'>
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-100 scale-100"
          />
        ) : (
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {children}
          </div>
        )}
      </div>

      <div className='px-4 py-3 flex justify-between items-center bg-transparent relative z-10'>
        <h3 className='text-[13px] font-medium text-zinc-400 group-hover:text-white transition-colors'>
          {title}
        </h3>
      </div>
    </div>
  );
};

const FeaturedComponents = () => {
  const getComp = (name: string) => (Index as any)["default"]?.[name];

  return (
    <div className='min-h-screen w-full p-8 text-white mt-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]'>
          
         
          <Link href={`/component/strike-reveal`}>
            <ComponentCard title="Strike Reveal" videoSrc={getComp("reveal")?.video || '/compVideos/strike-reveal.mp4'} />
          </Link>

          {/* 2. Floating Navbar */}
          <Link href={`/component/floating-navbar`} className="lg:col-span-2">
            <ComponentCard title="Floating Navbar" videoSrc={getComp("navbar")?.video || '/compVideos/floating-navbar.mp4'} />
          </Link>

          {/* 3. Infinity Slider */}
          <Link href={`/component/infinity-slider`} className="lg:row-span-3">
            <ComponentCard title="Infinity Slider" videoSrc={getComp("minimal-scrollbar")?.video || '/compVideos/infinite-slider.mp4'} />
          </Link>

          {/* 4. Stroke Cards */}
          <Link href={`/component/stroke-cards`} className="lg:col-span-2 lg:row-span-2">
            <ComponentCard title="Stroke Cards" videoSrc={getComp('stroke-cards')?.video || '/compVideos/stroke-cards.mp4'}>
                
            </ComponentCard>
          </Link>

          {/* 5.  Dot Cursor */}
          <Link href={`/component/`}>
            <ComponentCard title="" videoSrc={getComp("details")?.video || '/compVideos/dot-cursor.mp4'} />
          </Link>

          {/* 6. Neubrutal Button */}
          <Link href={`/component/neubrutal-button`}>
            <ComponentCard 
                title="Neubrutal Button" 
                videoSrc={getComp("neubrutal-button")?.video || "/compVideos/neubrutal-button.mp4"} 
            />
          </Link>

          {/* 7. Arc Slider */}
          <Link href={`/component/arc-slider`} className="lg:col-span-3 lg:row-span-2">
            <ComponentCard title="Arc Slider" videoSrc={getComp("arc-slider")?.video || '/compVideos/arc-slider.mp4'} />
          </Link>

          {/* 8.  */}
          <Link href={`/component/`} className='lg:row-span-2'>
            <ComponentCard title="" videoSrc={getComp("feedback")?.video || '/compVideos/animated-header.mp4'}>
                
            </ComponentCard>
          </Link>
        </div>

        {/* Explore Button */}
        <div className='mt-8 flex justify-center'>
          <Link
            href='/component'
            className='relative z-30 h-12 px-6 rounded-lg text-sm text-white transition-all flex items-center gap-2 group'
          >
            Explore All Components
            <div className='flex items-center justify-center transition-transform group-hover:translate-x-1'>
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedComponents;