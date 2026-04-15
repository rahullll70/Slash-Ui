"use client";

import gsap from 'gsap';
import { useEffect } from 'react';

const DotCursor = () => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      gsap.to('#cursor', {
        x: clientX - 20 / 2,
        y: clientY - 20 / 2,
        duration: 1,
        delay: 0,
        ease: 'power4.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  return (
    <>
      <div
        id='cursor'
        className='hidden md:block fixed top-0 left-0 h-[20px] w-[20px] bg-white rounded-full z-50 pointer-events-none mix-blend-difference '
      />
    </>
  );
};

export default DotCursor;