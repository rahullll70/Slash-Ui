import { ChevronRight } from 'lucide-react';
import React from 'react';

const FeaturedComponents = () => {
  return (
    <div className='min-h-screen w-full p-8 text-white mt-5'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]'>
          {/* Card 1:  */}
          <div className='rounded-3xl bg-red-500 border border-neutral-800 shadow-xl'>
            <div>
              <video />
            </div>
          </div>

          {/* Card 2:  */}
          <div className='rounded-3xl bg-neutral-900/50 border border-neutral-800 shadow-xl lg:col-span-2'>
            {' '}
          </div>

          {/* Card 3:  */}
          <div className='rounded-3xl bg-neutral-900/50 border border-neutral-800 shadow-xl lg:row-span-3'>
            {' '}
          </div>

          {/* Card 4:  */}
          <div className='rounded-3xl bg-neutral-900/50 border border-neutral-800 shadow-xl lg:col-span-2 lg:row-span-2'>
            {' '}
          </div>

          {/* Card 5:  */}
          <div className='rounded-3xl bg-neutral-900/50 border border-neutral-800 shadow-xl'>
            {' '}
          </div>

          {/* Card 6:  */}
          <div className='rounded-3xl bg-neutral-900/50 border border-neutral-800 shadow-xl'>
            {' '}
          </div>

          {/* Card 7:  */}
          <div className='rounded-3xl bg-neutral-900/50 border border-neutral-800 shadow-xl lg:col-span-3'>
            {' '}
          </div>

          {/* Card 8: */}
          <div className='rounded-3xl bg-neutral-900/50 border border-neutral-800 shadow-xl lg:col-span-1'>
            {' '}
          </div>
        </div>
        <div className='mt-5 flex justify-center'>
          <a
            href='/component'
            className='relative z-30 h-12 px-6 rounded-lg text-sm text-white font-cartographCF cursor-pointer transition-all flex items-center gap-2 group'
          >
            Explore Components
            <div className='flex items-center justify-center w-6 h-6  rounded-[4px] transition-transform group-hover:translate-x-1'>
              <ChevronRight size={20} className='' />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedComponents;
