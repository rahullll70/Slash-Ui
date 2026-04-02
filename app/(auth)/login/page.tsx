'use client';

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { sendOtp, verifyOtp } from '@/lib/actions/auth.action';
import { useToast } from '@/components/toast';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast, ToastContainer } = useToast();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center text-white px-4 font-sans selection:bg-zinc-800'>
      
      {/* Toast container at root level */}
      <ToastContainer />

      <div className='w-full max-w-2xl'>
        {step === 'email' ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              try {
                const formData = new FormData();
                formData.append('email', email);
                await sendOtp(formData);
                showToast('OTP sent to your email');
                setTimeout(() => setStep('otp'), 1500);
              } catch (err: any) {
                if (
                  err?.message === 'NEXT_REDIRECT' ||
                  err?.digest?.startsWith('NEXT_REDIRECT')
                ) {
                  throw err;
                }
                showToast('Failed to send OTP. Please try again.');
              } finally {
                setLoading(false);
              }
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
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);

              try {
                const formData = new FormData(e.currentTarget);
                formData.append('email', email);
                
                showToast('Logged in successfully');
                await new Promise((res) => setTimeout(res, 1000))

                await verifyOtp(formData)
              } catch (err: any) {
                if (
                  err?.message === 'NEXT_REDIRECT' ||
                  err?.digest?.startsWith('NEXT_REDIRECT')
                ) {
                  throw err;
                }
                showToast('Invalid OTP. Please try again.');
              } finally {
                setLoading(false);
              }
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

      <footer className='fixed bottom-8 text-md text-zinc-600 uppercase font-hoshiko font-bold'>
        Slash/ui
      </footer>
    </div>
  );
}

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