'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { Home, Box } from 'lucide-react';
import { SearchIndex } from '@/__registry__/search-index';

const SearchContext = createContext<any>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');

  const staticPages = useMemo(() => [
    { icon: Home, label: 'Home', category: 'Pages', path: '/' },
  ], []);

  const componentsList = useMemo(() => {
    return SearchIndex.map((comp) => ({
      icon: Box,
      label: comp.name,
      category: 'Components',
      path: comp.path,
    }));
  }, []);

  const allItems = useMemo(() => [...staticPages, ...componentsList], [staticPages, componentsList]);

  const filteredItems = useMemo(() => {
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
  if (!context) throw new Error('useSearch must be used within a SearchProvider');
  return context;
};