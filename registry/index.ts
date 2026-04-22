// registry/index.ts

export const Index = [
  {
    name: 'neubrutal-button',
    type: 'ui',
    files: ['ui/buttons/neubrutal-button.tsx'],
    category: 'buttons',
    description:
      'A high-contrast "Neubrutalist" button component. It features a manually constructed layered shadow system to create depth, utilizing outline properties for sharp edges and a built-in "shimmer" effect that triggers upon interaction to provide immediate visual feedback.',
    install: 'npm install tailwindcss',
    dependencies: ['tailwindcss'],
    interactionType: [
      {
        type: 'Layered Depth System',
        description:
          'Uses stacked, absolute-positioned div elements to simulate a physical, multi-layered "Neubrutalist" shadow effect.',
      },
      {
        type: 'Mechanical Click Depression',
        description:
          'Implements dual-phase translation (via active/group-active) to simulate a physical mechanical button press.',
      },
      {
        type: 'Active Glare Swipe',
        description:
          'Triggers a skewed div overlay that slides across the button surface on click, providing an animated visual "glare" feedback.',
      },
    ],
    howToUse: `import { NeubrutalButton } from "@/components/ui/buttons/neubrutal-button";

  export default function NeubrutalButton = () => {
  return (
    <div>
      <NeubrutalButton children='Click me!' />
    </div>
  );
};
    

    `,
  },
  {
    name: 'dot-cursor',
    type: 'ui',
    files: ['ui/cursors/dot-cursor.tsx'],
    category: 'cursors',
    description:
      "A bespoke, hardware-accelerated custom cursor that enhances immersion. It uses GSAP's physics-based easing to create a sophisticated, slightly delayed follow effect, offering a much more premium feel than the standard OS pointer.",
    install: 'npm install gsap',
    dependencies: ['tailwindcss', 'gsap'],
    interactionType: [
      {
        type: 'Smooth Cursor Follow',
        description:
          'Uses GSAP interpolation with custom easing to create a fluid, lagging follow effect on mouse movement.',
      },
      {
        type: 'Visual Blend Mode',
        description:
          'Utilizes CSS mix-blend-difference to dynamically invert background colors for high-contrast visibility.',
      },
      {
        type: 'Responsive Visibility',
        description:
          'Automatically hides the element on mobile devices (screens < 768px) to preserve touch-device UX.',
      },
      {
        type: 'Non-blocking UX',
        description:
          'Implements pointer-events-none to ensure the custom cursor does not interfere with clicking or hovering on page elements.',
      },
    ],
    howToUse: `import { DotCursor } from "@/components/ui/cursors/dot-cursor";
    
    export default function layout = () => {
    return (
        <body>
        // cursor should be always in bottom
        <DotCursor />
        </body>
      )
    }
    
    `,
  },
  {
    name: 'floating-navbar',
    type: 'ui',
    files: ['ui/navbars/floating-navbar.tsx'],
    category: 'navbars',
    description:
      'A sophisticated floating navigation interface designed for immersive, high-end web experiences. It features a persistent state manager for ambient audio, route-aware active states, and proprietary staggered GSAP letter-scramble animations for navigation links.',
    install: 'npm install gsap',
    dependencies: ['gsap', 'tailwindcss'],
    interactionType: [
      {
        type: 'Entrance Animation',
        description: 'GSAP-powered slide-in and fade-in effect on mount.',
      },
      {
        type: 'Audio Toggle',
        description:
          'Interactive button that plays/pauses ambient audio with visual feedback.',
      },
      {
        type: 'Staggered Hover',
        description:
          'Letter-by-letter vertical scramble animation on navigation links.',
      },
      {
        type: 'Path Detection',
        description:
          'Automatically highlights the active route with an animated underline.',
      },
    ],
    howToUse: `import { FloatingNavbar } from "@/components/ui/navbars/floating-navbar";
    
    export default function layout = () => {
    return (
        <body>
        <FloatingNavbar />
        </body>
      )
    }
    `,
  },
  {
    name: 'VisualScrollbar',
    type: 'ui',
    files: ['ui/scrollbars/minimal-scrollbar.tsx'],
    category: 'scrollbars',
    description:
      "A performance-oriented visual scroll indicator that maps the document's vertical scroll percentage to a custom UI thumb. Built with requestAnimationFrame and passive event listeners to ensure 60fps synchronization, preventing jank during heavy scroll operations",
    install: 'npm install gsap',
    dependencies: ['tailwindcss', 'gsap'],
    interactionType: [
      {
        type: 'Scroll Progress Tracking',
        description:
          'Maps the document scroll position to a percentage-based vertical translation of the thumb.',
      },
      {
        type: 'Performance-Optimized Renders',
        description:
          'Uses requestAnimationFrame and passive event listeners to ensure smooth performance without main-thread blocking.',
      },
      {
        type: 'Responsive Geometry',
        description:
          'Calculates track dimensions and offsets dynamically on resize to accommodate layout changes.',
      },
    ],
    howToUse: `import { MinimalScrollbar } from "@/components/ui/scrollbars/minimal-scrollbar";`,
  },
  {
    name: 'strike-reveal',
    type: 'ui',
    files: ['ui/hover-effects/strike-reveal.tsx'],
    category: 'hover-effects',
    description:
      'A sophisticated "Kukuri" typography interaction designed for high-impact headlines or navigation. It utilizes CSS pseudo-elements to decouple the underline transition from the text color reveal, creating a layered, multi-stage animation that feels fluid and precise. The effect uses attribute-based data binding to ensure the revealing text aligns perfectly with the original label.',
    install: '',
    dependencies: ['framer-motion'],
    interactionType: [
      {
        type: 'Dual-Stage Line Strike',
        description:
          'Uses the ::after pseudo-element with a cubic-bezier transition to sweep a horizontal strike-through line across the component.',
      },
      {
        type: 'Text Mask Reveal',
        description:
          'Utilizes the ::before pseudo-element and the data-letters attribute to trigger a width-based mask reveal of the colored text on hover.',
      },
      {
        type: 'Fluid Typography',
        description:
          'Implements the clamp() function to ensure responsive text scaling across diverse viewport widths while maintaining aspect ratios.',
      },
    ],
    howToUse: `import { StrikeReveal } from "@/components/ui/hover-effects/strike-reveal";
    
    export default function StrikeReveal = () => {
  return (
    <div>
      <StrikeReveal text='INTERACTIONS!' />
    </div>
  );
};
    `,
  },
  {
    name: 'infinity-slider',
    type: 'ui',
    files: ['ui/3d-sliders/infinity-slider.tsx'],
    category: '3d-sliders',
    description:
      'A high-performance WebGL-based infinite scroll component built with Three.js. It features a physics-driven kinetic scrolling engine that supports both touch and mouse interactions with inertia-based momentum. The component applies real-time vertex distortion to images based on scroll velocity, creating a dynamic, high-fidelity motion effect. It includes seamless state synchronization between the 3D scene and the DOM-based UI overlay.',
    install: 'npm install three tailwindcss',
    dependencies: ['threejs'],
    interactionType: [
      {
        type: 'Kinetic Drag & Scroll',
        description:
          'Implements a physics-based velocity engine using requestAnimationFrame, allowing for smooth momentum-based scrolling with mouse and touch inputs.',
      },
      {
        type: 'Vertex Distortion Effect',
        description:
          'Calculates scroll velocity to dynamically manipulate plane geometry vertices in real-time, creating a physical "stretch" or "bend" distortion effect.',
      },
      {
        type: 'Infinite Looping Logic',
        description:
          'Manages a modular wrapping system that recycles 3D planes seamlessly, allowing for an endless vertical gallery without performance degradation.',
      },
      {
        type: 'Active State Synchronization',
        description:
          'Continuously tracks the 3D element closest to the viewport center and maps it to the 2D UI components (title and counter) in real-time.',
      },
    ],
    howToUse: `import { InfinitySlider } from "@/components/ui/3d-sliders/infinity-slider";`,
  },
  {
    name: 'stroke-cards',
    type: 'ui',
    files: ['ui/cards/stroke-cards.tsx'],
    category: 'cards',
    description:
      'A high-end "Stroke Reveal" gallery card component that utilizes GSAP-driven SVG path animation. The component synchronizes a two-layer stroke effect (a dynamic colored swirl and a static grey spiral) with a refined text-reveal interaction, creating a sophisticated motion language suitable for high-impact landing pages.',
    install: 'npm install gsap',
    dependencies: ['gsap', 'tailwindcss'],
    interactionType: [
      {
        type: 'SVG Stroke Draw',
        description:
          'Calculates path length via SVG API and uses GSAP to animate stroke-dashoffset, creating a "drawing" effect on hover.',
      },
      {
        type: 'Layered Motion Reveal',
        description:
          'Coordinates simultaneous trigger of CSS properties and SVG stroke widths for a multi-layered design transition.',
      },
      {
        type: 'GSAP Timeline Orchestration',
        description:
          'Manages conflicting enter/leave states by killing existing timelines, ensuring smooth state transitions without animation "glitching".',
      },
    ],
    howToUse: `import { StrokeCards } from "@/components/ui/cards/stroke-cards";`,
  },
  {
    name: 'arc-slider',
    type: 'ui',
    files: ['ui/3d-sliders/arc-slider.tsx'],
    category: '3d-sliders',
    description:
      'A physics-driven "Arc Slider" that projects 2D images onto a simulated 3D arc path. It utilizes a custom requestAnimationFrame loop for hardware-accelerated motion, calculating scale, z-index, and Y-offset dynamically based on the scroll vector. The component provides a high-fidelity, kinetic user experience optimized for desktop and mobile touch interaction.',
    install: 'npm install three',
    dependencies: ['threejs'],
    interactionType: [
      {
        type: 'Kinetic Scroll Engine',
        description:
          'Implements custom velocity-based inertia using requestAnimationFrame and linear interpolation (LERP).',
      },
      {
        type: 'Arc Projection',
        description:
          'Calculates dynamic transform matrix (scale, opacity, Y-position) to map elements onto a parabolic curve.',
      },
      {
        type: 'State Sync',
        description:
          'Real-time calculation of viewport proximity to trigger active slide state.',
      },
    ],
    howToUse: `import { ArcSlider } from "@/components/ui/3d-sliders/arc-slider";`,
  },
  {
    name: 'animated-header',
    type: 'ui',
    files: ['ui/scroll-effects/animated-header.tsx'],
    category: 'scroll-effects',
    description:
      'A data-driven animation controller that leverages SplitType for text-splitting and GSAP ScrollTrigger for diverse animation states.',
    install: 'npm install gsap @studio-freight/lenis split/type',
    dependencies: ['gsap', '@studio-freight/lenis', 'split/type'],
    interactionType: [
      {
        type: 'Staggered Character Animation',
        description:
          'Uses SplitType to manipulate character-level DOM nodes for high-end micro-interactions.',
      },
      {
        type: 'Hybrid Trigger Logic',
        description:
          'Conditional mapping of GSAP timelines to ScrollTrigger states: Immediate, Viewport-Enter, and Scrubbed.',
      },
    ],
    howToUse: `import { AnimatedHeader } from "@/components/ui/scroll-effects/animated-header";`,
  },
];
