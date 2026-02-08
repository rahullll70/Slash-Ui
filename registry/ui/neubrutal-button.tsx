import React from 'react';
import { cn } from '@/lib/utils';

interface NeubrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// 1. CHANGE THIS TO DEFAULT EXPORT
export default function NeubrutalButton({
  children = 'Click Me!',
  className,
  ...props
}: NeubrutalButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'group relative w-[140px] h-[50px] bg-none outline-none border-none p-0 cursor-pointer active:translate-y-[2px] transition-transform',
        className,
      )}
    >
      <div className='absolute top-[14px] -left-[1px] w-[calc(100%+2px)] h-full bg-[#8c8c8c] rounded-[7mm] outline outline-2 outline-[#242622] -z-10' />
      <div className='absolute top-[10px] left-0 w-full h-full bg-[#e5e5c7] rounded-[7mm] outline outline-2 outline-[#242622] -z-10'>
        <div className='absolute bottom-0 left-[15%] w-[2px] h-[9px] bg-[#242622]' />
        <div className='absolute bottom-0 left-[85%] w-[2px] h-[9px] bg-[#242622]' />
      </div>
      <div className='relative w-full h-full flex items-center justify-center bg-[#ffffee] rounded-[7mm] outline outline-2 outline-[#242622] text-[#242622] font-semibold text-base overflow-hidden transition-all duration-200 group-active:translate-y-[10px]'>
        <div className='absolute top-0 -left-[20px] w-[15px] h-full bg-black/10 skew-x-[30deg] transition-all duration-300 group-active:left-[calc(100%+20px)]' />
        {children}
      </div>
    </button>
  );
}
