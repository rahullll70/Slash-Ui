import React from 'react';
import { Index } from '@/__registry__';
import ShowcaseContainer from '@/components/ui/ShowcaseContainer';
import ComponentRenderer from './ComponentRenderer';

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

  return (
    <ShowcaseContainer
      title={activeItem?.name || id}
      code={activeItem?.content}
      description={activeItem?.description}
      install={activeItem?.install}
      dependencies={activeItem?.dependencies}
      interactionType={activeItem?.interactionType}
      howToUse={activeItem?.howToUse}
    >
      {activeItem ? (
        <ComponentRenderer id={id} />
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