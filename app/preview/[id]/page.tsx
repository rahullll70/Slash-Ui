import React, { Suspense } from 'react';
import { Index } from '@/__registry__';

const FULLSCREEN_COMPONENTS = [
  'flaoting-navbar',
  'dot-cursor',
  'minimal-scrollbar',
  'arc-slider',
  'infinity-slider',
  'stroke-cards',
  'animated-header',
];

const getPreviewBg = (id: string) => {
  switch (id) {
    // Buttons
    case 'neubrutal-button':
      return 'bg-[#538F37]';

    // Navbars
    case 'floating-navbar':
      return 'bg-[#f0ebe5]';

    // Cursors
    case 'dot-cursor':
      return 'cursor-none bg-white';

    // Scrollbars
    case 'minimal-scrollbar':
      return 'h-[100vh]';
    // Hover Effect
    case 'strike-reveal':
      return 'bg-[#E8E0DA]';

    //3d sliders
    case 'infinity-slider':
      return 'w-full h-screen';

    case 'arc-slider':
      return '';

    // scroll effects
    case 'animated-header':
      return '';

    // hover effect

    case 'stroke-cards':
      return 'h-[200vh] bg-[#fff]';

    default:
      return '';
  }
};

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activeItem = (Index['default'] as any)[id];

  if (!activeItem) {
    return (
      <div className='flex items-center justify-center h-screen bg-[#0a0908] text-zinc-500 text-sm font-mono'>
        Component "{id}" not found
      </div>
    );
  }

  const SelectedComponent = activeItem?.component;
  const isFullscreen = FULLSCREEN_COMPONENTS.includes(id);

  return (
    <div
      className={`w-full min-h-screen ${getPreviewBg(id)} ${
        !isFullscreen ? 'flex items-center justify-center p-24' : ''
      }`}
      style={{
        perspective: '1000px',
      }}
    >
      {SelectedComponent ? (
        <Suspense
          fallback={
            <div className='flex items-center justify-center h-screen'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white' />
            </div>
          }
        >
          <SelectedComponent />
        </Suspense>
      ) : (
        <div className='flex items-center justify-center h-screen text-zinc-500 text-xs font-mono'>
          No component registered for "{id}"
        </div>
      )}
    </div>
  );
}
