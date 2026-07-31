'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
// Optional: override how a raw URL segment is displayed.
// e.g. turn "component" into "Components", or a slug into title case.
const LABELS = {
    component: 'Components',
    docs: 'Docs',
    loader: 'Loader',
    cursor: 'Cursor',
};
function formatSegment(segment) {
    if (LABELS[segment])
        return LABELS[segment];
    return segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}
export default function Breadcrumbs({ extra, className = '', }) {
    const pathname = usePathname();
    const segments = (pathname || '').split('/').filter(Boolean);
    // build up cumulative hrefs: /component/foo -> ["/component", "/component/foo"]
    const crumbs = segments.map((seg, i) => ({
        label: formatSegment(seg),
        href: '/' + segments.slice(0, i + 1).join('/'),
    }));
    const isLast = (i) => i === crumbs.length - 1 && !(extra && extra.length);
    return (_jsxs("nav", { "aria-label": 'breadcrumb', className: `flex items-center gap-2 text-xs ${className}`, children: [_jsx(Link, { href: '/', className: 'text-zinc-500 hover:text-white transition-colors', children: "Home" }), crumbs.map((crumb, i) => (_jsxs(React.Fragment, { children: [_jsx("span", { className: 'text-zinc-700', children: "/" }), isLast(i) ? (_jsx("span", { className: 'text-white truncate max-w-[160px]', children: crumb.label })) : (_jsx(Link, { href: crumb.href, className: 'text-zinc-500 hover:text-white transition-colors truncate max-w-[140px]', children: crumb.label }))] }, crumb.href))), extra === null || extra === void 0 ? void 0 : extra.map((label, i) => (_jsxs(React.Fragment, { children: [_jsx("span", { className: 'text-zinc-700', children: "/" }), _jsx("span", { className: `capitalize ${i === extra.length - 1 ? 'text-white' : 'text-zinc-500'} truncate max-w-[140px]`, children: label })] }, label)))] }));
}
