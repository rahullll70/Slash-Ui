'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';

export interface SearchItem {
  label: string;
  path: string;
  category?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  filteredItems?: SearchItem[];
  userEmail?: string | null;
  authLoaded?: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
  filteredItems: externalFilteredItems,
  userEmail,
  authLoaded = false,
}) => {
  const [internalQuery, setInternalQuery] = useState('');

  const searchQuery = externalSearchQuery ?? internalQuery;
  const setSearchQuery = externalSetSearchQuery ?? setInternalQuery;

  // Dynamically build default pages depending on authentication state
  const defaultPages: SearchItem[] = [
    { label: 'Home', path: '/', category: 'Pages' },
    { label: 'Docs', path: '/docs', category: 'Pages' },
    { label: 'Components', path: '/component', category: 'Pages' },
    { label: 'Pricing', path: '/pricing', category: 'Pages' },
    ...(authLoaded
      ? userEmail
        ? [{ label: 'Account', path: '/account', category: 'Pages' }]
        : [{ label: 'Login', path: '/login', category: 'Pages' }]
      : [{ label: 'Login', path: '/login', category: 'Pages' }]),
  ];

  // If a search query exists, use filteredItems or filter defaultPages
  const itemsToDisplay =
    searchQuery.trim().length > 0
      ? externalFilteredItems && externalFilteredItems.length > 0
        ? externalFilteredItems
        : defaultPages.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
          )
      : defaultPages;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[14vh] px-4 font-inter">
          {/* Backdrop — Clean dark overlay without backdrop-blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
          />

          {/* Search Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-[580px] bg-brand-accent rounded-2xl p-4 shadow-2xl overflow-hidden border-none font-inter z-10"
          >
            {/* Input Container */}
            <div className="relative flex items-center px-4 transition-colors duration-200 bg-zinc-900/90 focus-within:bg-zinc-900 rounded-xl">
              <Search className="text-zinc-500 shrink-0" size={18} />
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Anything"
                className="w-full h-12 px-3 text-sm text-white bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 placeholder:text-zinc-600 font-inter"
              />
            </div>

            {/* List Section */}
            <div className="mt-4 max-h-[360px] overflow-y-auto custom-scrollbar space-y-1 pr-1">
              <p className="px-3 mb-2 text-[11px] font-medium text-zinc-500 tracking-wide">
                {searchQuery.trim().length > 0 ? 'Results' : 'Pages'}
              </p>

              {itemsToDisplay.length > 0 ? (
                itemsToDisplay.map((item) => (
                  <SearchRow
                    key={item.path}
                    item={item}
                    onClose={() => {
                      onClose();
                      setSearchQuery('');
                    }}
                  />
                ))
              ) : (
                <p className="px-3 py-6 text-sm text-zinc-600">
                  No results matching &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* Subcomponent for individual search result rows */
const SearchRow: React.FC<{ item: SearchItem; onClose: () => void }> = ({
  item,
  onClose,
}) => {
  return (
    <Link
      href={item.path}
      onClick={onClose}
      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all group cursor-pointer"
    >
      <span className="text-sm font-medium transition-colors text-zinc-200 group-hover:text-white">
        {item.label}
      </span>
      <span className="text-[10px] text-zinc-500 uppercase ">
        {item.category || 'PAGES'}
      </span>
    </Link>
  );
};

export default SearchModal;