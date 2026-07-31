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
    <div className='flex flex-col items-center justify-center min-h-screen px-4 font-inter bg-brand-dark text-brand-light selection:bg-brand-light selection:text-brand-dark'>
      
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
              className='w-full py-4 text-xl font-medium transition-all duration-500 bg-transparent border-b outline-none font-switzer md:text-5xl border-zinc-800 focus:border-brand-light text-brand-light placeholder:text-zinc-700'
            />

            {loading ? (
              <Loader text='Sending' />
            ) : (
              <button
                type='submit'
                className='absolute right-0 p-2 transition-colors -translate-y-1/2 cursor-pointer top-1/2 text-zinc-500 hover:text-brand-light'
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
                await new Promise((res) => setTimeout(res, 1000));

                await verifyOtp(formData);
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
            className='space-y-8 duration-700 animate-in fade-in slide-in-from-bottom-4'
          >
            <label htmlFor='otp' className='block text-sm font-inter text-zinc-400 md:text-base'>
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
                className='w-full bg-transparent text-xl md:text-5xl font-switzer font-medium py-4 outline-none border-b border-zinc-800 focus:border-brand-light transition-all text-center tracking-[1em] text-brand-light placeholder:text-zinc-800'
              />

              {loading ? (
                <Loader text='Verifying' />
              ) : (
                <button
                  type='submit'
                  className='absolute right-0 p-2 transition-colors -translate-y-1/2 cursor-pointer top-1/2 text-zinc-500 hover:text-brand-light'
                >
                  <ArrowRight size={32} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      <footer className='fixed bottom-8 text-md font-hoshiko text-zinc-500'>
        Slash/ui
      </footer>
    </div>
  );
}

function Loader({ text }: { text: string }) {
  return (
    <div className='absolute right-0 flex items-center gap-1 text-sm -translate-y-1/2 top-1/2 text-zinc-400 font-inter'>
      [{text}
      <span className='flex'>
        <span className='animate-bounce'>.</span>
        <span className='delay-150 animate-bounce'>.</span>
        <span className='delay-300 animate-bounce'>.</span>
      </span>
      ]
    </div>
  );
}