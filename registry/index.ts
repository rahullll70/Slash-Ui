// registry/index.ts

export const registry = [
  {
    name: "neubrutal-button",
    type: "ui",
    files: ["ui/neubrutal-button.tsx"],
    category: "buttons",
    install: "npm install framer-motion lucide-react",
    description:`
### Neubrutal 3D Button
A modern 3D button component with a soft neumorphic depth and smooth press animation. Designed to feel tactile and interactive, it visually responds to user interaction with layered shadows and subtle motion.

**Interaction Type**
* Click to press with realistic depth animation
* Smooth transition between idle and active states
* Optional hover and focus effects

---

### How to use
\`\`\`tsx
import { NeubrutalButton } from "@/components/ui/neubrutal-button";

const Example = () => {
  return (
    <NeubrutalButton onClick={() => alert("Clicked!")}>
      Click Me!
    </NeubrutalButton>
  );
};
\`\`\`

---

### Props
| Prop | Description |
| :--- | :--- |
| **children** | Button label or content |
| **onClick** | Click handler function |
| **className** | Additional Tailwind classes |

---

**License & Usage**
Free to use and modify in both personal and commercial projects.
`,
  },
];