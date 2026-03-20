import React from 'react';
export default function ShowcaseContainer({ children, title, code: propsCode, description: propsDescription, install: propsInstall, }: {
    children: React.ReactNode;
    title: string;
    code?: string;
    description?: string;
    install?: string;
}): import("react/jsx-runtime").JSX.Element;
