'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  name: string;
  img: string;
}

interface SliderConfig {
  minHeight: number;
  maxHeight: number;
  aspectRatio: number;
  gap: number;
  distortionStrength: number;
  scrollSmoothing: number;
  wheelSpeed: number;
  wheelMax: number;
  dragSpeed: number;
  dragMomentumDecay: number;
  touchSpeed: number;
}

interface MeshUserData {
  originalVertices: number[];
  offset: number;
  index: number;
}

// ─── Data & Config ────────────────────────────────────────────────────────────

// example ---- remove this letter

// const SLIDES: Slide[] = [
//   {
//     name: 'Local Image',
//     img: '/images/img1.jpg', // ✅ correct
//   },
//   {
//     name: ' Image Url',
//     img: 'https://i.pinimg.com/1200x/03/21/9d/03219d776be2b5fe40658f7de94404d5.jpg',
//   },
// ];

const SLIDES: Slide[] = [
  {
    name: 'Vanguard Oversize',
    img: 'https://picsum.photos/800/1200?random=1',
  },
  { name: 'Arcane Graphic', img: 'https://picsum.photos/800/1200?random=2' },
  { name: 'Zenith Monolith', img: 'https://picsum.photos/800/1200?random=3' },
  { name: 'Echo Box Tee', img: 'https://picsum.photos/800/1200?random=4' },
  { name: 'Linear Core', img: 'https://picsum.photos/800/1200?random=5' },
  { name: 'Origin Heavy', img: 'https://picsum.photos/800/1200?random=6' },
  { name: 'Cipher Street', img: 'https://picsum.photos/800/1200?random=7' },
  { name: 'Nomad Essential', img: 'https://picsum.photos/800/1200?random=8' },
  { name: 'Aspect Relaxed', img: 'https://picsum.photos/800/1200?random=9' },
];

const DEFAULT_CONFIG: SliderConfig = {
  minHeight: 0.4,
  maxHeight: 0.6,
  aspectRatio: 1.6,
  gap: 0.15,
  distortionStrength: 8.5,
  scrollSmoothing: 0.055,
  wheelSpeed: 0.003,
  wheelMax: 100,
  dragSpeed: 0.004,
  dragMomentumDecay: 0.88,
  touchSpeed: 0.006,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const wrap = (v: number, r: number) => ((v % r) + r) % r;
const zeroPad = (n: number) => String(n).padStart(2, '0');
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ✅ Proxy fallback (fix for blocked images like Pinterest)
const withProxy = (url: string) =>
  `https://corsproxy.io/?${encodeURIComponent(url)}`;

// ─── Component ────────────────────────────────────────────────────────────────

interface InfiniteSliderProps {
  slides?: Slide[];
  config?: Partial<SliderConfig>;
}

export default function InfiniteSlider({
  slides = SLIDES,
  config: configOverride = {},
}: InfiniteSliderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeIndexRef = useRef(-1);

  const [activeSlide, setActiveSlide] = useState({
    name: slides[0]?.name ?? '',
    count: zeroPad(1),
  });
  const [isDragging, setIsDragging] = useState(false);

  const config = { ...DEFAULT_CONFIG, ...configOverride };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.z = 7;

    const slideHeights = slides.map(
      () =>
        config.minHeight +
        Math.random() * (config.maxHeight - config.minHeight),
    );

    const slideOffsets: number[] = [];
    let stackPosition = 0;

    for (let i = 0; i < slides.length; i++) {
      slideOffsets.push(stackPosition);
      stackPosition += slideHeights[i] + config.gap;
    }

    const loopLength = stackPosition;
    const halfLoop = loopLength / 2;

    const meshes: THREE.Mesh[] = [];
    const textureLoader = new THREE.TextureLoader();

    // ✅ FIX: enable CORS
    textureLoader.setCrossOrigin('anonymous');

    slides.forEach((slide, i) => {
      const height = slideHeights[i];
      const width = height * config.aspectRatio;

      const geometry = new THREE.PlaneGeometry(width, height, 48, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.userData = {
        originalVertices: [...geometry.attributes.position.array],
        offset: slideOffsets[i],
        index: i,
      } satisfies MeshUserData;

      // ✅ FIX: robust loader with fallback
      const loadTexture = (url: string, useProxy = false) => {
        const finalUrl = useProxy ? withProxy(url) : url;

        textureLoader.load(
          finalUrl,
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            material.map = tex;
            material.color.set(0xffffff);
            material.needsUpdate = true;
          },
          undefined,
          () => {
            console.warn('Failed loading:', url);

            // retry once using proxy
            if (!useProxy) {
              loadTexture(url, true);
            }
          },
        );
      };

      loadTexture(slide.img);

      scene.add(mesh);
      meshes.push(mesh);
    });

    function applyDistortion(mesh: THREE.Mesh, strength: number, yPos: number) {
      const pos = mesh.geometry.attributes.position;
      const original = (mesh.userData as MeshUserData).originalVertices;
      for (let i = 0; i < pos.count; i++) {
        const y = original[i * 3 + 1];
        const screenDist = Math.abs(y + yPos);
        const bend = Math.exp(-Math.pow(screenDist, 2) * 0.4);
        pos.setZ(i, bend * strength * config.distortionStrength);
      }
      pos.needsUpdate = true;
    }

    let scrollPosition = 0;
    let scrollTarget = 0;
    let scrollVelocity = 0;
    let lastFrameTime = 0;
    let rafId: number;

    const animate = (time: number) => {
      rafId = requestAnimationFrame(animate);

      const dt = lastFrameTime
        ? Math.min((time - lastFrameTime) / 1000, 0.05)
        : 0.016;
      lastFrameTime = time;

      scrollTarget += scrollVelocity;
      scrollVelocity *= config.dragMomentumDecay;
      if (Math.abs(scrollVelocity) < 0.00005) scrollVelocity = 0;

      const prevScroll = scrollPosition;
      scrollPosition = lerp(
        scrollPosition,
        scrollTarget,
        config.scrollSmoothing,
      );

      const delta = scrollPosition - prevScroll;
      const speed = Math.abs(delta) / dt;
      const distortion = Math.min(0.6, speed * 0.12) * (delta > 0 ? 1 : -1);

      let closestIndex = 0;
      let minCardDist = Infinity;

      meshes.forEach((mesh) => {
        const { offset, index } = mesh.userData as MeshUserData;
        let y = -(offset - wrap(scrollPosition, loopLength));
        if (y > halfLoop) y -= loopLength;
        if (y < -halfLoop) y += loopLength;

        mesh.position.y = y;
        applyDistortion(mesh, distortion, y);

        if (Math.abs(y) < minCardDist) {
          minCardDist = Math.abs(y);
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndexRef.current) {
        activeIndexRef.current = closestIndex;
        setActiveSlide({
          name: slides[closestIndex].name,
          count: zeroPad(closestIndex + 1),
        });
      }

      renderer.render(scene, camera);
    };

    rafId = requestAnimationFrame(animate);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollTarget +=
        Math.sign(e.deltaY) *
        Math.min(config.wheelMax, Math.abs(e.deltaY)) *
        config.wheelSpeed;
    };

    let isDraggingInternal = false;
    let dragLastY = 0;
    let dragVelocity = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDraggingInternal = true;
      dragLastY = e.clientY;
      dragVelocity = 0;
      scrollVelocity = 0;
      setIsDragging(true);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingInternal) return;
      const dy = e.clientY - dragLastY;
      dragLastY = e.clientY;
      dragVelocity = dy;
      scrollTarget -= dy * config.dragSpeed;
    };
    const onMouseUp = () => {
      if (!isDraggingInternal) return;
      isDraggingInternal = false;
      setIsDragging(false);
      scrollVelocity = -dragVelocity * config.dragSpeed * 12;
    };

    let touchLastY = 0;
    let touchVelocity = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchLastY = e.touches[0].clientY;
      touchVelocity = 0;
      scrollVelocity = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dy = e.touches[0].clientY - touchLastY;
      touchLastY = e.touches[0].clientY;
      touchVelocity = dy;
      scrollTarget -= dy * config.touchSpeed;
    };
    const onTouchEnd = () => {
      scrollVelocity = -touchVelocity * config.touchSpeed * 14;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      renderer.dispose();
      meshes.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.MeshBasicMaterial).dispose();
      });
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className='relative w-full h-screen bg-white'>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 w-full h-full ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      />

      <div className='fixed inset-0 flex flex-col justify-between p-8 md:p-16 pointer-events-none z-10'>
        <div className='flex justify-between items-start'>
          <h1
            className={`${bebas.className} text-black text-4xl md:text-6xl uppercase leading-none`}
          >
            Iris <br /> Frame
          </h1>
          <span className={`${bebas.className} text-black/20 text-2xl`}>
            Collection 2026
          </span>
        </div>

        <div className='flex justify-between items-end'>
          <div className='max-w-xs'>
            <p
              className={`${bebas.className} text-black text-5xl md:text-8xl uppercase leading-[0.8]`}
            >
              {activeSlide.name}
            </p>
          </div>
          <div className='text-right'>
            <span
              className={`${bebas.className} text-black text-7xl md:text-9xl leading-none`}
            >
              {activeSlide.count}
            </span>
          </div>
        </div>
      </div>

      <div className='fixed bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-40'>
        <p
          className={`${bebas.className} text-black text-sm tracking-widest uppercase`}
        >
          Drag to explore
        </p>
      </div>
    </section>
  );
}
