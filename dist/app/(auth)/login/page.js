'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import { sendOtp, verifyOtp } from '@/lib/actions/auth.action';
import { Toast } from '@/components/toast';
function useToast() {
    const [toasts, setToasts] = useState([]);
    const showToast = useCallback((message) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message }]);
    }, []);
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    return { toasts, showToast, removeToast };
}
export default function LoginPage() {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { toasts, showToast, removeToast } = useToast();
    return (_jsxs("div", { className: 'min-h-screen flex flex-col items-center justify-center text-white px-4 font-sans selection:bg-zinc-800', children: [toasts.map((t) => (_jsx(Toast, { message: t.message, onClose: () => removeToast(t.id) }, t.id))), _jsx("div", { className: 'w-full max-w-2xl', children: step === 'email' ? (_jsxs("form", { onSubmit: async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        const formData = new FormData();
                        formData.append('email', email);
                        await sendOtp(formData);
                        setLoading(false);
                        showToast('OTP sent to your email');
                        setStep('otp');
                    }, className: 'relative group', children: [_jsx("input", { type: 'email', autoFocus: true, required: true, disabled: loading, value: email, placeholder: 'you@example.com', onChange: (e) => setEmail(e.target.value), className: 'w-full bg-transparent text-xl md:text-5xl font-light py-4 outline-none border-b border-zinc-800 focus:border-zinc-400 transition-all duration-500 placeholder:text-zinc-800' }), loading ? (_jsx(Loader, { text: 'Sending' })) : (_jsx("button", { type: 'submit', className: 'absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-white transition-colors', children: _jsx(ArrowRight, { size: 32, strokeWidth: 1.5 }) }))] })) : (
                /* OTP STEP */
                _jsxs("form", { onSubmit: async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        const formData = new FormData(e.currentTarget);
                        formData.append('email', email);
                        await verifyOtp(formData);
                    }, className: 'space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700', children: [_jsx("label", { htmlFor: 'otp', children: "Enter the 6-digit code sent to your email" }), _jsxs("div", { className: 'relative group', children: [_jsx("input", { type: 'text', name: 'otp', autoFocus: true, maxLength: 6, disabled: loading, placeholder: '000000', className: 'w-full bg-transparent text-xl md:text-5xl font-light py-4 outline-none border-b border-zinc-800 focus:border-zinc-400 transition-all text-center tracking-[1em] placeholder:text-zinc-900' }), loading ? (_jsx(Loader, { text: 'Verifying' })) : (_jsx("button", { type: 'submit', className: 'absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-500 hover:text-white transition-colors', children: _jsx(ArrowRight, { size: 32, strokeWidth: 1.5 }) }))] })] })) }), _jsx("footer", { className: 'fixed bottom-8 text-md text-zinc-600 uppercase font-hoshiko font-bold', children: "Slash/ui" })] }));
}
/* Loader Component */
function Loader({ text }) {
    return (_jsxs("div", { className: 'absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 text-sm flex items-center gap-1', children: ["[", text, _jsxs("span", { className: 'flex', children: [_jsx("span", { className: 'animate-bounce', children: "." }), _jsx("span", { className: 'animate-bounce delay-150', children: "." }), _jsx("span", { className: 'animate-bounce delay-300', children: "." })] }), "]"] }));
}
