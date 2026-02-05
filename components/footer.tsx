import React from 'react';

const Footer = () => {
  return (
    <footer className=' text-white border-neutral-800 overflow-hidden relative'>
      {/* Top Full-Width Logo */}
      <div className='w-full'>
        <img
          src='/images/slash_1.svg'
          alt='Slash Logo'
          className='w-full h-auto object-cover block '
        />
      </div>

      {/* Main CTA Section with Background Glow */}
      <div className='relative max-w-7xl mx-auto pt-20 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden'>
        {/* Subtle Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-zinc-800/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="relative z-10 overflow-hidden text-center">
          <h1 className='text-center text-4xl md:text-6xl font-switzer capitalize font-bold tracking-tighter leading-tight text-neutral-100 overflow-hidden'>
            Start slashing your UI <br />
            development with <span className='italic font-hoshiko text-red-500 tracking-wider'>Slash/Ui</span> today!
          </h1>
          
          <div className="flex justify-center mt-10 overflow-x-hidden">
            <button className='group relative px-15 py-4 tracking-widest overflow-hidden  border text-white hover:text-black font-hoshiko rounded-full font-semibold transition-all duration-300 hover:bg-red-500 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2'>
              Slash Now
              <span className="transition-transform duration-300 group-hover:translate-x-1"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Credit Section */}
      <div className='py-8 border-t border-neutral-900'>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className='text-xs font-cartographCF text-neutral-500 tracking-widest uppercase'>
            © 2026 SLASH/UI. ALL RIGHTS RESERVED.
          </p>
          
          <h1 className='text-sm font-cartographCF text-neutral-500'>
            Designed and Developed by{' '}
            <a
              className='italic text-neutral-300 hover:text-white transition-colors duration-300 border-b border-neutral-700 hover:border-white'
              href='https://twitter.com/yourhandle'
              target='_blank'
              rel='noopener noreferrer'
            >
              @Rahul
            </a>
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;