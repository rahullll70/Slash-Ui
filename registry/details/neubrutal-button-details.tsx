'use client';

import React, { useState } from 'react';
import {
  MousePointer2,
  Zap,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

const NeubrutalButtonDetails = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null); 
  
  const command = 'npx slash-ui@latest add neubrutal-button';

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyDependency = (pkg: string) => {
    navigator.clipboard.writeText(`npm install ${pkg}`);
    setActiveTab(pkg);
    setTimeout(() => setActiveTab(null), 2000);
  };

  return (
    <div className='flex flex-col gap-16 py-8 animate-in fade-in slide-in-from-bottom-4 duration-1000'>
      {/* 1. Description */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-6 font-mono tracking-widest'>Description</h4>
        <p className='text-zinc-400 text-lg leading-relaxed max-w-2xl font-medium'>
          A high-performance 3D button built with Framer Motion. It features
          tactile depth, dynamic shadow scaling, and smooth state transitions.
        </p>
      </section>

      {/* 2. Dependencies */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-4 font-mono tracking-widest'>Dependencies</h4>
        <div className='flex items-center gap-3'>
          <button 
            onClick={() => copyDependency('framer-motion')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 border border-white/5 hover:border-white/20 transition-all active:scale-95"
          >
            {activeTab === 'framer-motion' ? (
              <Check size={12} className="text-white" />
            ) : (
              <svg width='12' height='12' viewBox='0 0 24 24' fill='currentColor' className="text-white">
                <path d='M0 0l12 12L24 0H0zm0 12l12 12V12H0z' />
              </svg>
            )}
            <span className="text-[11px] font-mono text-white">
              {activeTab === 'framer-motion' ? 'Copied!' : 'framer-motion'}
            </span>
          </button>

          <button 
            onClick={() => copyDependency('lucide-react')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 border border-white/5 hover:border-white/20 transition-all active:scale-95"
          >
            {activeTab === 'lucide-react' ? (
              <Check size={12} className="text-white" />
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                <path d='M14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 16.4183 9.58172 20 14 20C18.4183 20 22 16.4183 22 12C22 8.446 20.455 5.25285 18 3.05557' stroke='#fff' />
                <path d='M10 12C10 14.2091 11.7909 16 14 16C16.2091 16 18 14.2091 18 12C18 7.58172 14.4183 4 10 4C5.58172 4 2 7.58172 2 12C2 15.5841 3.57127 18.8012 6.06253 21' stroke='#fff' />
              </svg>
            )}
            <span className="text-[11px] font-mono text-white">
               {activeTab === 'lucide-react' ? 'Copied!' : 'lucide-react'}
            </span>
          </button>
        </div>
      </section>

      {/* 3. Interaction Type */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-6 font-mono tracking-widest'>Interaction</h4>
        <div className='space-y-4'>
          <div className='flex items-center gap-4 group'>
            <div className='p-2 rounded-lg bg-white/5 text-zinc-500 group-hover:text-white transition-colors'>
              <MousePointer2 size={16} />
            </div>
            <span className='text-sm font-medium text-zinc-400'>Realistic 3D depth on click</span>
          </div>
          <div className='flex items-center gap-4 group'>
            <div className='p-2 rounded-lg bg-white/5 text-zinc-500 group-hover:text-white transition-colors'>
              <Zap size={16} />
            </div>
            <span className='text-sm font-medium text-zinc-400'>Smooth hover effects</span>
          </div>
        </div>
      </section>

      {/* 4. Installation CLI */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-6 font-mono tracking-widest'>Installation</h4>
        <div 
          onClick={handleCopyCommand}
          className='group relative flex items-center justify-between p-5 rounded-2xl bg-black border border-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-[0.99]'
        >
          <code className='text-xs font-cartographCF text-zinc-300'>
            <span className='text-zinc-500'>npx</span> slash-ui@latest add <span className='text-white'>neubrutal-button</span>
          </code>
          <div className='p-2 hover:bg-white/5 rounded-lg text-zinc-500 group-hover:text-white transition-colors'>
            {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
          </div>
        </div>
      </section>

      {/* 5. Props */}
      <section>
        <h4 className='text-sm uppercase text-zinc-600 mb-6 font-mono tracking-widest'>Props</h4>
        <div className='w-full border-t border-white/5'>
          {[
            { prop: 'children', desc: 'Button label or content' },
            { prop: 'onClick', desc: 'Click handler function' },
            { prop: 'className', desc: 'Additional Tailwind classes' },
          ].map((item, i) => (
            <div key={i} className='flex py-4 border-b border-white/5 text-[13px] group'>
              <span className='w-1/3 font-mono font-bold text-white'>{item.prop}</span>
              <span className='w-2/3 text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors'>{item.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Footer */}
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

export default NeubrutalButtonDetails;