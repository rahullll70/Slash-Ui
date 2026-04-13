import React from 'react';

interface StrikeRevealProps {
  label: string;
  href?: string;
}

const StrikeReveal: React.FC<StrikeRevealProps> = ({ label, href = "#" }) => {
  return (
    <a
      href={href}
      data-letters={label}
      className="
        link--kukuri
        relative 
        text-[clamp(3rem,5vw,7rem)] 
        font-black 
        uppercase 
        no-underline 
        text-[#a8a39a] 
        overflow-hidden
        
        /* FIXED LINE (::after) */
        after:content-['']
        after:absolute 
        after:h-[0.8vw] 
        after:w-full 
        after:top-1/2 
        after:left-0 
        after:-translate-x-full 
        after:-translate-y-1/2 
        after:bg-white 
        after:transition-transform 
        after:duration-[400ms] 
        after:ease-[cubic-bezier(0.7,0,0.3,1)]
        hover:after:translate-x-full

        /* TEXT REVEAL (::before) */
        before:content-[attr(data-letters)] 
        before:absolute 
        before:text-[#2a2a2a] 
        before:whitespace-nowrap 
        before:w-0 
        before:overflow-hidden 
        before:transition-[width] 
        before:duration-400 
        before:delay-[300ms]
        hover:before:w-full
      "
    >
      Interaction
      {label}
    </a>
  );
};

export default StrikeReveal;