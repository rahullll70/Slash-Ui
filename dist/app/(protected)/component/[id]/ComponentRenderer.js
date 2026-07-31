'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Components } from '@/__registry__/components';
export default function ComponentRenderer({ id }) {
    const SelectedComponent = Components[id];
    if (!SelectedComponent)
        return null;
    return (_jsx(Suspense, { fallback: _jsx("div", { className: 'flex items-center justify-center h-40', children: _jsx("div", { className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-white' }) }), children: _jsx(SelectedComponent, {}) }));
}
