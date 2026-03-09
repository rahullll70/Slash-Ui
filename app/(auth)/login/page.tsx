'use client';

import { ArrowRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import { sendOtp, verifyOtp } from '@/lib/actions/auth.action';
import { Toast } from '@/components/toast';

interface ToastState {
  id: number;
  message: string;
}

function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, removeToast };
}

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-white px-4 font-sans selection:bg-zinc-800'>
      {/* Toast notifications */}
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          onClose={() => removeToast(t.id)}
        />
      ))}

      <div className='w-full max-w-2xl'>
        {/* EMAIL STEP */}
        {step === 'email' ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              const formData = new FormData();
              formData.append('email', email);

              await sendOtp(formData);

              setLoading(false);
              showToast('OTP sent to your email');
              setStep('otp');
            }}
            className='relative group'
          >
            <input
              type='email'
              autoFocus
              required
              disabled={loading}
              value={email}
              placeholder='you@example.com'
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-transparent text-xl md:text-5xl font-light py-4 outline-none border-b border-zinc-800 focus:border-zinc-400 transition-all duration-500 placeholder:text-zinc-800'
            />

            {loading ? (
              <Loader text='Sending' />
            ) : (
              <button
                type='submit'
                className='absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-white transition-colors'
              >
                <ArrowRight size={32} strokeWidth={1.5} />
              </button>
            )}
          </form>
        ) : (
          /* OTP STEP */
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              const formData = new FormData(e.currentTarget);
              formData.append('email', email);

              await verifyOtp(formData);
            }}
            className='space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700'
          >
            <label htmlFor='otp'>
              Enter the 6-digit code sent to your email
            </label>

            <div className='relative group'>
              <input
                type='text'
                name='otp'
                autoFocus
                maxLength={6}
                disabled={loading}
                placeholder='000000'
                className='w-full bg-transparent text-xl md:text-5xl font-light py-4 outline-none border-b border-zinc-800 focus:border-zinc-400 transition-all text-center tracking-[1em] placeholder:text-zinc-900'
              />

              {loading ? (
                <Loader text='Verifying' />
              ) : (
                <button
                  type='submit'
                  className='absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-white transition-colors'
                >
                  <ArrowRight size={32} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Footer Branding */}
      <footer className='fixed bottom-8 text-md text-zinc-600 uppercase font-hoshiko font-bold'>
        Slash/ui
      </footer>
    </div>
  );
}

/* Loader Component */

function Loader({ text }: { text: string }) {
  return (
    <div className='absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 text-sm flex items-center gap-1'>
      [{text}
      <span className='flex'>
        <span className='animate-bounce'>.</span>
        <span className='animate-bounce delay-150'>.</span>
        <span className='animate-bounce delay-300'>.</span>
      </span>
      ]
    </div>
  );
}
