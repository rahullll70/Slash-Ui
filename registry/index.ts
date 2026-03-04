// registry/index.ts

export const registry = [
  {
    name: 'neubrutal-button',
    type: 'ui',
    files: ['ui/buttons/neubrutal-button.tsx'],
    category: 'buttons',
    install: 'npm install framer-motion lucide-react',
  },

  {
    name: 'dot-cursor',
    type: 'ui',
    files: ['ui/cursors/dot-cursor.tsx'],
    category: 'cursors',
    install: 'npm install framer-motion',
  },

  {
    name: 'flaoting-navbar',
    type: 'ui',
    files: ['ui/navbars/floating-navbar.tsx'],
    category: 'navbars',
    install: 'npm install lucide-react framer-motion gsap',
  },

  {
    name: 'minimal-scrollbar',
    type: 'ui',
    files: ['ui/scrollbars/minimal-scrollbar.tsx'],
    category: 'scrollbars',
    install: '',
  }
];
