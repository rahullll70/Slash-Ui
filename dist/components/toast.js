"use client";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
export function Toast({ message, duration = 3000, onClose }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const enterTimer = setTimeout(() => setVisible(true), 10);
        const exitTimer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => onClose === null || onClose === void 0 ? void 0 : onClose(), 300);
        }, duration);
        return () => {
            clearTimeout(enterTimer);
            clearTimeout(exitTimer);
        };
    }, [duration, onClose]);
    return (_jsx("div", { className: `
        fixed top-6 right-6 z-50
        px-5 py-3.5 rounded-2xl
        bg-zinc-900 border border-zinc-800
        text-white text-sm font-medium
        shadow-xl
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
      `, role: "status", "aria-live": "polite", children: message }));
}
export function useToast() {
    const [toasts, setToasts] = useState([]);
    const showToast = useCallback((message, duration = 3000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, duration }]);
    }, []);
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const ToastContainer = useCallback(() => (_jsx(_Fragment, { children: toasts.map((t) => (_jsx(Toast, { message: t.message, duration: t.duration, onClose: () => removeToast(t.id) }, t.id))) })), [toasts, removeToast]);
    return { showToast, ToastContainer };
}
