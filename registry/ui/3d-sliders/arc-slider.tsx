"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─────────────────────────────────────────────
//  CONFIGURATION — edit these as needed
// ─────────────────────────────────────────────
const SLIDE_WIDTH = 250;
const SLIDE_HEIGHT = 350;
const SLIDE_GAP = 200;
const ARC_DEPTH = 250;
const CENTER_LIFT = 100;
const SCROLL_LERP = 0.05;

interface Slide {
  /** Any valid path ("/images/shirt.jpg") or full URL ("https://…/img.jpg") */
  src: string;
  title: string;
}

// ── PUT YOUR IMAGES HERE ─────────────────────
const SLIDES: Slide[] = [
  { src: "https://i.pinimg.com/1200x/dd/1b/74/dd1b74532e5916a84b3d4251fd5749c2.jpg", title: "Vanguard Oversize" },
  { src: "https://i.pinimg.com/736x/69/65/46/69654666e24a29a17669e9521326c2e8.jpg", title: "Arcane Graphic" },
  { src: "https://i.pinimg.com/1200x/42/8d/5c/428d5c02e41fd23862abd8f3aa8723a7.jpg", title: "Zenith Monolith" },
  { src: "https://i.pinimg.com/736x/a5/0b/67/a50b6771a4292416d9c9257f94285b39.jpg", title: "Echo Box Tee" },
  { src: "https://i.pinimg.com/1200x/e4/f7/34/e4f7344221d1827617e77e22bbe9327f.jpg", title: "Linear Core" },
  { src: "https://i.pinimg.com/1200x/7c/1e/09/7c1e0985cb7578ce8d2b70354f30b66f.jpg", title: "Origin Heavy" },
  { src: "https://i.pinimg.com/736x/ac/60/95/ac60958bab075f99d753a2e23a65d719.jpg", title: "Cipher Street" },
  { src: "https://i.pinimg.com/1200x/ed/d4/4f/edd44f32aa85240345e1eec94c2b3014.jpg", title: "Nomad Essential" },
  { src: "https://i.pinimg.com/1200x/75/80/8e/75808ef21b3b24b4487d7ca3e3321086.jpg", title: "Aspect Relaxed" },
  // Add more slides:
  // { src: "https://images.unsplash.com/photo-xxx", title: "My Slide" },
];
// ─────────────────────────────────────────────

interface SlideTransform {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  distanceFromCenter: number;
}

export default function ArcSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef(0);
  const scrollCurrentRef = useRef(0);
  const rafRef = useRef<number>(0);
  const touchStartXRef = useRef(0);

  const [transforms, setTransforms] = useState<SlideTransform[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const slideCount = SLIDES.length;
  const trackWidth = slideCount * SLIDE_GAP;

  // Compute layout values per slide
  const computeTransform = useCallback(
    (
      slideIndex: number,
      scrollOffset: number,
      winW: number,
      winH: number
    ): SlideTransform => {
      const centerX = winW / 2;
      const arcBaselineY = winH * 0.45;

      let wrappedOffsetX =
        (((slideIndex * SLIDE_GAP - scrollOffset) % trackWidth) +
          trackWidth) %
        trackWidth;
      if (wrappedOffsetX > trackWidth / 2) wrappedOffsetX -= trackWidth;

      const slideCenterX = centerX + wrappedOffsetX;
      const normalizedDist = (slideCenterX - centerX) / (winW * 0.5);
      const absDist = Math.min(Math.abs(normalizedDist), 1.5);

      const scaleFactor = Math.max(1 - absDist * 0.6, 0.4);
      const scaledWidth = SLIDE_WIDTH * scaleFactor;
      const scaledHeight = SLIDE_HEIGHT * scaleFactor;

      const clampedDist = Math.min(absDist, 1);
      const arcDropY =
        (1 - Math.cos(clampedDist * Math.PI)) * 0.5 * ARC_DEPTH;
      const centerLiftY = Math.max(1 - absDist * 2, 0) * CENTER_LIFT;

      return {
        x: slideCenterX - scaledWidth / 2,
        y: arcBaselineY - scaledHeight / 2 + arcDropY - centerLiftY,
        width: scaledWidth,
        height: scaledHeight,
        zIndex: Math.round((1 - absDist) * 100),
        distanceFromCenter: Math.abs(wrappedOffsetX),
      };
    },
    [trackWidth]
  );

  // Main animation loop
  useEffect(() => {
    const getDims = () => ({
      w: window.innerWidth,
      h: window.innerHeight,
    });

    setDims(getDims());

    const onResize = () => setDims(getDims());
    window.addEventListener("resize", onResize);

    const tick = () => {
      scrollCurrentRef.current +=
        (scrollTargetRef.current - scrollCurrentRef.current) * SCROLL_LERP;

      const { w, h } = getDims();
      const newTransforms = SLIDES.map((_, i) =>
        computeTransform(i, scrollCurrentRef.current, w, h)
      );
      setTransforms(newTransforms);

      // Sync active title
      let closestIndex = 0;
      let closestDist = Infinity;
      newTransforms.forEach((t, i) => {
        if (t.distanceFromCenter < closestDist) {
          closestDist = t.distanceFromCenter;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [computeTransform]);

  // Wheel scroll
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      scrollTargetRef.current += e.deltaY * 0.8;
    };
    window.addEventListener("wheel", onWheel);
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Touch scroll
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const dx = touchStartXRef.current - e.touches[0].clientX;
    scrollTargetRef.current += dx * 2;
    touchStartXRef.current = e.touches[0].clientX;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {/* Google Font — self-contained inside the component */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>
      {/* Slides */}
      {SLIDES.map((slide, i) => {
        const t = transforms[i];
        if (!t) return null;

        return (
          <div
            key={i}
            className="absolute will-change-transform flex items-center justify-center"
            style={{
              left: t.x,
              top: t.y,
              width: t.width,
              height: t.height,
              zIndex: t.zIndex,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover rounded-[4px]"
              style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              onError={(e) => {
                console.error(`Image not found: ${slide.src}`);
                (e.target as HTMLImageElement).style.background = "#eee";
              }}
            />
          </div>
        );
      })}

      {/* Active slide title */}
      <p
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-[1000] text-center w-full text-black tracking-widest"
        style={{
          bottom: "15vh",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "5rem",
          letterSpacing: "2px",
        }}
      >
        {SLIDES[activeIndex]?.title ?? ""}
      </p>
    </div>
  );
}