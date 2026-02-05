import { COMPONENTS } from '@/lib/registry';
import ShowcaseContainer from '@/components/ShowcaseContainer';

// Ensure the params are awaited in Next.js 15+ or typed correctly
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Find the exact match in your registry
  const activeItem = COMPONENTS.find((c) => c.id === id);
  const SelectedComponent = activeItem?.component;

  return (
    <ShowcaseContainer>
      {SelectedComponent ? (
        <SelectedComponent />
      ) : (
        <div className="text-zinc-500 font-mono text-xs">
          Component "{id}" not found in registry.
        </div>
      )}
    </ShowcaseContainer>
  );
}