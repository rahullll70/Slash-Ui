'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Home, LoaderCircle, MousePointer2, Rocket, Box } from 'lucide-react';
// Make sure this path correctly points to the registry file from your first screenshot
import { Index } from '@/__registry__';

export interface SearchItem {
  icon: any;
  label: string;
  category: string;
  path: string;
}

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredItems: SearchItem[];
  staticPages: SearchItem[];
  totalComponents: number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Define static pages
  const staticPages = useMemo(() => [
    { icon: Home, label: 'Home', category: 'Pages', path: '/' },
    { icon: LoaderCircle, label: 'Loader', category: 'Pages', path: '/loader' },
    { icon: MousePointer2, label: 'Cursor', category: 'Pages', path: '/cursor' },
    { icon: Rocket, label: 'Quick Start', category: 'Get Started', path: '/docs' },
  ], []);

  // 2. Get components from the registry shown in your screenshot
  const componentsList = useMemo(() => {
    const registryData = Index['default'] || {};
    return Object.values(registryData).map((comp: any) => ({
      icon: Box,
      label: comp.name,
      category: 'Components',
      path: `/component/${comp.name}`,
    }));
  }, []);

  const allItems = useMemo(() => [...staticPages, ...componentsList], [staticPages, componentsList]);

  // 3. Shared filtering logic
  const filteredItems = useMemo(() => {
    if (!searchQuery) return [];
    return allItems.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allItems]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredItems,
        staticPages,
        totalComponents: componentsList.length,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};