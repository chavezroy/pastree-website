'use client';

import { useState, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';
import { popularArticles } from '@/content/support/articles';
import { categories } from '@/content/support/categories';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'category';
  href: string;
  categoryId?: string;
  slug?: string;
  updatedAt?: string;
};

type SearchState = {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  hasSearched: boolean;
};

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setIsSearched] = useState(false);

  // Prepare search data by combining articles and categories
  const searchData = useMemo((): SearchResult[] => {
    return [
      ...popularArticles.map(article => ({
        ...article,
        type: 'article' as const,
        href: `/support/${article.categoryId}/${article.slug}`
      })),
      ...categories.map(category => ({
        ...category,
        type: 'category' as const,
        href: category.href
      }))
    ];
  }, []);

  // Initialize Fuse.js with options
  const fuse = useMemo(() => new Fuse(searchData, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'description', weight: 0.3 }
    ],
    threshold: 0.3, // Fuzziness of the match (0 = exact, 1 = fuzzy)
    includeScore: true,
    ignoreLocation: true, // Search anywhere in the string
  }), [searchData]);

  // Perform search
  const results = useMemo(() => {
    if (query.trim().length < 2) { // Only search if query has at least 2 characters
      setIsSearching(false);
      return [];
    }

    setIsSearching(true);
    const searchResults = fuse.search(query).map(result => result.item);
    setIsSearching(false);
    setIsSearched(true);
    return searchResults;
  }, [query, fuse]);

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      setIsSearching(true);
      setIsSearched(true);
    } else {
      setIsSearching(false);
      setIsSearched(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
    setIsSearched(false);
  }, []);

  const searchState: SearchState = {
    query,
    results,
    isSearching,
    hasSearched,
  };

  return { searchState, handleSearchChange, clearSearch };
}
