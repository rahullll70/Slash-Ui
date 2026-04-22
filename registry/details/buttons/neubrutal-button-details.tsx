'use client';

import React, { useState } from 'react';
import {
  MousePointer2,
  Zap,
  Copy,
  Check,
  ShieldCheck,
  // Add other icons here
} from 'lucide-react';

const ComponentDetails = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // 1. UPDATE: Change the package name
  const command = 'npx slash-ui@latest add [component-name]';

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='flex flex-col gap-16 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
      
      {/* Description */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-6 font-mono tracking-widest'>Description</h4>
        <p className='text-zinc-400 text-lg leading-relaxed max-w-2xl font-medium'>
          hi
        </p>
      </section>

      {/* Dependencies */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-4 font-mono tracking-widest'>Dependencies</h4>
        <div className='flex items-center gap-3'>
          {/* Add dependency badges here */}
          <span className="text-xs font-mono text-zinc-500">None required / or list them</span>
        </div>
      </section>

      {/* Interaction */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-6 font-mono tracking-widest'>Interaction</h4>
        <div className='space-y-4'>
          <div className='flex items-center gap-4 group'>
            <div className='p-2 rounded-lg bg-white/5 text-zinc-500 group-hover:text-white transition-colors'>
              <MousePointer2 size={16} />
            </div>
            <span className='text-sm font-medium text-zinc-400'>[Interaction point 1]</span>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-6 font-mono tracking-widest'>Installation</h4>
        <div 
          onClick={handleCopyCommand}
          className='group relative flex items-center justify-between p-5 rounded-2xl bg-black border border-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-[0.99]'
        >
          <code className='text-xs font-cartographCF text-zinc-300'>
            <span className='text-zinc-500'>npx</span> slash-ui@latest add <span className='text-white'>[component-name]</span>
          </code>
          <div className='p-2 hover:bg-white/5 rounded-lg text-zinc-500 group-hover:text-white transition-colors'>
            {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
          </div>
        </div>
      </section>

      {/* Props Table */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-6 font-mono tracking-widest'>Props</h4>
        <div className='w-full border-t border-white/5'>
          {[
            { prop: 'className', desc: 'Custom Tailwind classes' },
            // Add custom props here
          ].map((item, i) => (
            <div key={i} className='flex py-4 border-b border-white/5 text-[13px] group'>
              <span className='w-1/3 font-mono font-bold text-white'>{item.prop}</span>
              <span className='w-2/3 text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors'>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className='pt-8 border-t border-white/5'>
        <div className='flex items-center gap-2 text-zinc-600 text-[11px] font-bold uppercase tracking-widest font-mono'>
          <ShieldCheck size={14} />
          <span>License</span>
        </div>
        <p className='mt-4 text-xs text-zinc-500 leading-relaxed font-medium'>
          Free for all projects.
        </p>
      </footer>
    </div>
  );
};

export default ComponentDetails;