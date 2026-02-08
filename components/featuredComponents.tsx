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
          
          {/* 1. Image Reveal */}
          <Link href={`/component/reveal`}>
            <ComponentCard title="Image Reveal" videoSrc={getComp("reveal")?.video} />
          </Link>

          {/* 2. Navbar */}
          <Link href={`/component/navbar`} className="lg:col-span-2">
            <ComponentCard title="Navbar" videoSrc={getComp("navbar")?.video} />
          </Link>

          {/* 3. Custom ScrollBar */}
          <Link href={`/component/scrollbar`} className="lg:row-span-3">
            <ComponentCard title="Custom ScrollBar" videoSrc={getComp("scrollbar")?.video} />
          </Link>

          {/* 4. Custom Cursor */}
          <Link href={`/component/cursor`} className="lg:col-span-2 lg:row-span-2">
            <ComponentCard title="Custom Cursor">
                <div className='w-32 h-10 bg-black rounded-full border border-zinc-800 flex items-center px-4 gap-2'>
                   <div className='w-2 h-2 rounded-full bg-blue-500 animate-pulse' />
                   <div className='w-16 h-1 bg-zinc-800 rounded-full' />
                </div>
            </ComponentCard>
          </Link>

          {/* 5. Devouring Details */}
          <Link href={`/component/details`}>
            <ComponentCard title="Devouring Details" videoSrc={getComp("details")?.video} />
          </Link>

          {/* 6. Neubrutal Button */}
          <Link href={`/component/neubrutal-button`}>
            <ComponentCard 
                title="Neubrutal Button" 
                videoSrc={getComp("neubrutal-button")?.video || "/compVideos/neubrutal-button.mp4"} 
            />
          </Link>

          {/* 7. Creative Layouts */}
          <Link href={`/component/creative-grid`} className="lg:col-span-3">
            <ComponentCard title="Creative Layouts" videoSrc={getComp("creative-grid")?.video} />
          </Link>

          {/* 8. User Feedback */}
          <Link href={`/component/feedback`}>
            <ComponentCard title="User Feedback" videoSrc={getComp("feedback")?.video}>
                <div className="text-2xl font-bold opacity-50 transition-opacity">?</div>
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