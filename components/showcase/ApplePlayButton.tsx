'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const ApplePlayButton = () => {
  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex items-center justify-center group cursor-pointer"
    >
      {/* Dynamic Blur Glow */}
      <div className="absolute inset-0 bg-blue-500/30 blur-2xl group-hover:bg-blue-500/50 transition-all duration-500 rounded-full" />
      
      {/* Button Body */}
      <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
        <Play fill="black" className="text-black ml-1" size={32} />
      </div>

      {/* Border Ring Animation */}
      <svg className="absolute w-28 h-28 -rotate-90">
        <motion.circle
          cx="56"
          cy="56"
          r="54"
          stroke="white"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
};

export default ApplePlayButton;