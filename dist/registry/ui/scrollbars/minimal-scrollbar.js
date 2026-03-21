'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
const VisualScrollbar = () => {
    const [thumbTop, setThumbTop] = useState(0);
    const channelRef = useRef(null);
    const thumbRef = useRef(null);
    const tickingRef = useRef(false);
    const measurementsRef = useRef({
        height: 0,
        thumbH: 0,
        paddingTop: 0,
        paddingBottom: 0,
        available: 0,
    });
    // Hide scrollbar on contact page
    const pathname = usePathname();
    const shouldHide = pathname === '/contact';
    const measure = useCallback(() => {
        if (!channelRef.current || !thumbRef.current)
            return;
        const chRect = channelRef.current.getBoundingClientRect();
        const thumbRect = thumbRef.current.getBoundingClientRect();
        const style = window.getComputedStyle(channelRef.current);
        const height = chRect.height;
        const thumbH = thumbRect.height;
        const paddingTop = parseFloat(style.paddingTop) || 0;
        const paddingBottom = parseFloat(style.paddingBottom) || 0;
        const available = Math.max(height - thumbH - (paddingTop + paddingBottom), 0);
        measurementsRef.current = {
            height,
            thumbH,
            paddingTop,
            paddingBottom,
            available,
        };
    }, []);
    const updateThumb = useCallback(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const maxScroll = Math.max(scrollHeight - clientHeight, 1);
        const scrollPercent = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        const topPx = measurementsRef.current.paddingTop +
            scrollPercent * measurementsRef.current.available;
        setThumbTop(topPx);
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            if (!tickingRef.current) {
                tickingRef.current = true;
                requestAnimationFrame(() => {
                    updateThumb();
                    tickingRef.current = false;
                });
            }
        };
        let resizeTimeout = null;
        const handleResize = () => {
            if (resizeTimeout)
                clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                measure();
                updateThumb();
            }, 150);
        };
        // Initial setup with small delay to ensure DOM is ready
        const initTimeout = setTimeout(() => {
            measure();
            updateThumb();
        }, 100);
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            clearTimeout(initTimeout);
            if (resizeTimeout)
                clearTimeout(resizeTimeout);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [measure, updateThumb]);
    // Return null if on contact page
    if (shouldHide)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
        :root {
          --left-offset: 20px;
          --track-h: 50vh;
          --track-w: 3px;
          --thumb-w: 2px;
          --thumb-h: 50px;
          --track-bg: #212121;
          --channel-bg: rgba(255,255,255,0.15);
          --thumb-gradient: linear-gradient(180deg,#ffffff,#d7d7d7);
          --track-radius: 0px;
          --thumb-radius: 0px;
          --transition-speed: 1ms;
        }

        * {
          box-sizing: border-box;
        }

        body {
          background: #0a0a0a;
          color: #e6e6e6;
          margin: 0;
          padding: 0;
        }

        .vs {
          position: fixed;
          left: var(--left-offset);
          top: 50%;
          transform: translateY(-50%);
          width: var(--track-w);
          height: var(--track-h);
          background: var(--track-bg);
          border-radius: var(--track-radius);
          overflow: hidden;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 10px 24px rgba(0,0,0,0.6);
          backdrop-filter: blur(6px);
          pointer-events: none;
          z-index: 9999;
          display: flex;
          justify-content: center;
          will-change: transform;
        }

        .vs__channel {
          position: relative;
          width: 100%;
          height: 100%;
          background: var(--channel-bg);
          border-radius: var(--track-radius);
          overflow: hidden;
        }

        .vs__thumb {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateZ(0);
          width: var(--thumb-w);
          height: var(--thumb-h);
          border-radius: var(--thumb-radius);
          background: var(--thumb-gradient);
          box-shadow:
            0 4px 14px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.4);
          will-change: top;
        }

        .vs:hover .vs__thumb {
          transform: translateX(-50%) translateZ(0) scaleY(1.05);
          transition: transform 180ms ease;
        }

        @media (max-width:720px) {
          :root {
            --left-offset: 10px;
            --thumb-h: 30px;
            --track-w: 3px;
            --track-h: 30vh;
          }
        }
      ` }), _jsx("div", { className: 'vs', children: _jsx("div", { className: 'vs__channel', ref: channelRef, children: _jsx("div", { className: 'vs__thumb', ref: thumbRef, style: { top: `${thumbTop}px` }, "aria-hidden": 'true' }) }) })] }));
};
export default VisualScrollbar;
