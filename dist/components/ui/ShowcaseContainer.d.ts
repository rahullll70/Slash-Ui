import React from 'react';
type Interaction = {
    type: string;
    description: string;
};
export interface RegistryItem {
    name: string;
    description: string;
    content: React.ReactNode;
}
export default function ShowcaseContainer({ children, title, code: propsCode, description: propsDescription, install: propsInstall, dependencies: propsDependencies, interactionType: propsInteraction, howToUse: propsHowToUse, }: {
    children: React.ReactNode;
    title: string;
    code?: string;
    description?: string;
    install?: string;
    dependencies?: string[];
    interactionType?: Interaction[];
    howToUse?: string;
}): import("react/jsx-runtime").JSX.Element;
export {};
