'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicIsland = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-black border border-white/10 cursor-pointer flex items-center justify-between px-4 overflow-hidden shadow-2xl"
      animate={{
        width: isExpanded ? 320 : 150,
        height: isExpanded ? 80 : 36,
        borderRadius: isExpanded ? 28 : 18,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-[10px] text-zinc-400 uppercase font-mono"
            >
              Recording... 0:02
            </motion.div>
          ) : (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-white">
              Find My
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      
      {isExpanded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
           <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">📞</div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DynamicIsland;