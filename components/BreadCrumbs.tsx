'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Optional: override how a raw URL segment is displayed.
// e.g. turn "component" into "Components", or a slug into title case.
const LABELS: Record<string, string> = {
  component: 'Components',
  docs: 'Docs',
  loader: 'Loader',
  cursor: 'Cursor',
};

function formatSegment(segment: string) {
  if (LABELS[segment]) return LABELS[segment];
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs({
  extra,
  className = '',
}: {
  // extra trailing segments that aren't part of the URL,
  // e.g. ["Info"] or ["Source"] when a side panel is open
  extra?: string[];
  className?: string;
}) {
  const pathname = usePathname();
  const segments = (pathname || '').split('/').filter(Boolean);

  // build up cumulative hrefs: /component/foo -> ["/component", "/component/foo"]
  const crumbs = segments.map((seg, i) => ({
    label: formatSegment(seg),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));

  const isLast = (i: number) => i === crumbs.length - 1 && !(extra && extra.length);

  return (
    <nav
      aria-label='breadcrumb'
      className={`flex items-center gap-2 text-xs ${className}`}
    >
      <Link href='/' className='transition-colors text-zinc-500 hover:text-white'>
        Home
      </Link>

      {crumbs.map((crumb, i) => (
        <React.Fragment key={crumb.href}>
          <span className='text-zinc-700'>/</span>
          {isLast(i) ? (
            <span className='text-white truncate max-w-[160px]'>
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className='text-zinc-500 hover:text-white transition-colors truncate max-w-[140px]'
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}

      {extra?.map((label, i) => (
        <React.Fragment key={label}>
          <span className='text-zinc-700'>/</span>
          <span
            className={`capitalize ${
              i === extra.length - 1 ? 'text-white' : 'text-zinc-500'
            } truncate max-w-[140px]`}
          >
            {label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}