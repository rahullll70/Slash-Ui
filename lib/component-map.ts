// lib/component-map.ts
import dynamic from 'next/dynamic';

const DynamicIsland = dynamic(() => import('@/components/showcase/DynamicIsland'));
const ApplePlayButton = dynamic(() => import('@/components/showcase/ApplePlayButton'));


export const COMPONENT_MAP: Record<string, React.ComponentType> = {
  'dynamic-island': DynamicIsland,
  'apple-play-button': ApplePlayButton,
};

export const SIDEBAR_LINKS = [
  { id: 'dynamic-island', name: '02 Dynamic island' },
  { id: 'apple-play-button', name: '03 Apple play button' },
];