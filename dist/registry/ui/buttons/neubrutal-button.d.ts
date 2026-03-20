import React from 'react';
interface NeubrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
export default function NeubrutalButton({ children, className, ...props }: NeubrutalButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
