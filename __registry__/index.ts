// @ts-nocheck
import * as React from 'react';

export const Index: Record<string, any> = {
  default: {
    'neubrutal-button': {
      name: 'neubrutal-button',
      type: 'ui',
      component: React.lazy(
        () => import('@/registry/ui/buttons/neubrutal-button'),
      ),
      details: React.lazy(
        () => import('@/registry/details/buttons/neubrutal-button-details'),
      ),
      files: ['registry/ui/buttons/neubrutal-button.tsx'],
      category: 'buttons',
      content: '',
      description: 'A modern 3D button component with a soft neumorphic depth.',

      meta: {
        bgColor: 'bg-[#538F37]',
        center: true,
      },
    },

    'dot-cursor': {
      name: 'dot-cursor',
      type: 'ui',
      component: React.lazy(() => import('@/registry/ui/cursors/dot-cursor')),
      details: React.lazy(
        () => import('@/registry/details/cursor/dot-cursor-details'),
      ),
      files: ['registry/ui/cursors/dot-cursor.tsx'],
      category: 'cursors',
      content: '',
      description:
        'A custom dot cursor that changes color based on background brightness.',
      meta: {
        bgColor: 'bg-white',
        center: true,
      },
    },

    'floating-navbar': {
      name: 'floating-navbar',
      type: 'ui',
      component: React.lazy(
        () => import('@/registry/ui/navbars/floating-navbar'),
      ),
      details: React.lazy(
        () => import('@/registry/details/navbar/floating-navbar-details'),
      ),
      files: ['registry/ui/navbars/floating-navbar.tsx'],
      category: 'navbars',
      content: '',
      description: 'A responsive navigation bar with a modern design.',

      meta: {
        bgColor: 'bg-[#0A0A0A]',
        scrollable: true,
        height: 'h-[200vh]',
      },
    },

    'minimal-scrollbar': {
      name: 'minimal-scrollbar',
      type: 'ui',
      component: React.lazy(
        () => import('@/registry/ui/scrollbars/minimal-scrollbar'),
      ),
      details: React.lazy(
        () => import('@/registry/details/scrollbars/minimal-scrollbar-details'),
      ),
      files: ['registry/ui/scrollbars/minimal-scrollbar.tsx'],
      category: 'scrollbars',
      content: '',
      description: 'A minimalistic scrollbar component with a clean design.',

      meta: {
        bgColor: 'bg-[#0A0A0A]',
        scrollable: true,
        height: 'h-[200vh]',
      },
    },

    //  more components...
  },
};
