// registry/details/navbar/floating-navbar-details.tsx
import { DocShell } from "@/components/ui/DocShell";

export default function FloatingNavbarDetails() {
  return (
    <DocShell
      title="Floating Navbar"
      description="A sophisticated navigation bar with GSAP animations and audio toggles."
      dependencies={['gsap', 'framer-motion']}
      interaction={[
        { type: 'Scroll', description: 'Trigger opacity and size changes' },
        { type: 'Click', description: 'Audio toggle expansion' }
      ]}
      usage={
        <pre className="text-zinc-200">
          <code>{`import { FloatingNavbar } from "@/components/ui/navbar";
          
const App = () => <FloatingNavbar />`}</code>
        </pre>
      }
      propsData={[
        { prop: 'items', type: 'NavItem[]', desc: 'Array of nav links' },
        { prop: 'variant', type: "'default' | 'ghost'", desc: 'Navbar visual style' }
      ]}
      keepInMind="Ensure the GSAP context is wrapped in a useEffect or useGSAP hook to prevent hydration mismatch."
    />
  );
}