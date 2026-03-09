"use client";

import { useState, useEffect, useCallback } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);

    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, onClose]);

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div
        className={`
          inline-flex items-center gap-2.5
          bg-[#1c1c1e] text-[#f5f5f5]
          px-5 py-3 rounded-full
          text-sm font-medium tracking-wide
          shadow-[0_2px_8px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)]
          whitespace-nowrap
          transition-all duration-300 ease-out
          ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95"}
        `}
      >
        <span className="w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center flex-shrink-0">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5.5L4 7.5L8 3"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {message}
      </div>
    </div>
  );
}

// ─── useToast hook ────────────────────────────────────────────────────────────

interface ToastState {
  id: number;
  message: string;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, duration }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ToastContainer = useCallback(
    () => (
      <>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            duration={t.duration}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </>
    ),
    [toasts, removeToast]
  );

  return { showToast, ToastContainer };
}

