'use client';

import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);

  useEffect(() => {
    
    // document.body.style.cursor = 'none';
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const brightness = getBrightness(bgColor);
        setIsDarkBackground(brightness < 128);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      
     
    };
  }, []);

  const getBrightness = (color: string) => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 255;
    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  return (
    <div 
    style={{ 
      cursor: 'none', 
      width: '100vw', 
      height: '100vh', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      pointerEvents: 'none' 
    }}>
    
    <div 
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'none',
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        transition: 'transform 0.2s ease',
        zIndex: 9999,
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24"
        style={{
          display: 'block',
          transition: 'all 0.2s ease',
        }}
      >
        <path 
          fill={isDarkBackground ? '#ffffff' : '#000000'}
          stroke={isDarkBackground ? '#000000' : '#ffffff'}
          strokeWidth="2"
          d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z"
        />
      </svg>
    </div>
    </div>
  );
};

export default CustomCursor;