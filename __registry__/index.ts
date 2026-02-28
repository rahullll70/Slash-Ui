// @ts-nocheck
import * as React from "react"

export const Index: Record<string, any> = {
  "default": {
    "neubrutal-button": {
      name: "neubrutal-button",
      type: "ui",
      component: React.lazy(() => import("@/registry/ui/buttons/neubrutal-button")),
      details: React.lazy(() => import("@/registry/details/buttons/neubrutal-button-details")),
      files: ["registry/ui/buttons/neubrutal-button.tsx"],
      category: "buttons",
      content: '',
      description: "A modern 3D button component with a soft neumorphic depth.",
    },
    "dot-cursor": {
      name: "dot-cursor",
      type: "ui",
      component: React.lazy(() => import("@/registry/ui/cursor/dot-cursor")),
      details: React.lazy(() => import("@/registry/details/cursor/dot-cursor-details")),
      files: ["registry/ui/cursor/dot-cursor.tsx"],
      category: "cursors",
      content: '',
      description: "A custom dot cursor that changes color based on background brightness.",
    },
    'navbar1': {
      name: 'floating-navbar',
      type: 'ui',
      component: React.lazy(() => import('@/registry/ui/navbar/floating-navbar')),
      details: React.lazy(() => import('@/registry/details/navbar/floating-navbar-details')),
      files: ['registry/ui/navbar/floating-navbar.tsx'],
      category: 'navbars',
      content: '',
      description: 'A responsive navigation bar with a modern design.',
    },
    // Add more components here...
  }
}