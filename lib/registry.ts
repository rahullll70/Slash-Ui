import dynamic from 'next/dynamic';

export const COMPONENTS = [
  { 
    id: 'dynamic-island', 
    title: 'Dynamic island', 
    component: dynamic(() => import('@/components/showcase/DynamicIsland')) 
  },
  { 
    id: 'apple-play-button', 
    title: 'Apple play button', 
    component: dynamic(() => import('@/components/showcase/ApplePlayButton')) 
  },
];