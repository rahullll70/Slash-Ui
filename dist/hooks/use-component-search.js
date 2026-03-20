'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useMemo } from 'react';
import { Home, Box } from 'lucide-react';
import { Index } from '@/__registry__';
const SearchContext = createContext(undefined);
export function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState('');
    const staticPages = useMemo(() => [
        { icon: Home, label: 'Home', category: 'Pages', path: '/' },
    ], []);
    const componentsList = useMemo(() => {
        return Object.values(Index['default'] || {}).map((comp) => ({
            icon: Box,
            label: comp.name,
            category: 'Components',
            path: `/component/${comp.name}`,
        }));
    }, []);
    const allItems = useMemo(() => [...staticPages, ...componentsList], [staticPages, componentsList]);
    const filteredItems = useMemo(() => {
        return allItems.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, allItems]);
    return (_jsx(SearchContext.Provider, { value: {
            searchQuery,
            setSearchQuery,
            filteredItems,
            staticPages,
            totalComponents: componentsList.length,
        }, children: children }));
}
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context)
        throw new Error('useSearch must be used within a SearchProvider');
    return context;
};
