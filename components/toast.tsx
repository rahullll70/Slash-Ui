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
      className={`
        fixed top-6 right-6 z-50
        px-5 py-3.5 rounded-2xl
        bg-zinc-900 border border-zinc-800
        text-white text-sm font-medium
        shadow-xl
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
      `}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

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