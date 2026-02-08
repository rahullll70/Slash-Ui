import React, { Suspense } from 'react';
import { Index } from '@/__registry__';
import ShowcaseContainer from '@/components/ShowcaseContainer';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const activeItem = (Index['default'] as any)[id];

  if (!activeItem) {
    return <div>Component "{id}" not found in __registry__/index.ts</div>;
  }
  const SelectedComponent = activeItem?.component;

  return (
    <ShowcaseContainer
      title={activeItem?.name || id}
      code={activeItem?.content}
      description={activeItem?.description}
      install={activeItem?.install}
    >
      {SelectedComponent ? (
        <Suspense
          fallback={
            <div className='flex items-center justify-center h-40'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
            </div>
          }
        >
          <SelectedComponent />
        </Suspense>
      ) : (
        <div className='flex flex-col items-center justify-center h-64 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/50'>
          <p className='text-zinc-500 font-mono text-xs uppercase tracking-widest'>
            Component "{id}" not found
          </p>
          <span className='text-[10px] text-zinc-700 mt-2'>
            Check registry/index.ts and run build-registry.ts
          </span>
        </div>
      )}
    </ShowcaseContainer>
  );
}