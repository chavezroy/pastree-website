'use client';

import { useState, useRef, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useSearch } from '@/hooks/useSearch';
import SearchResults from '@/components/SearchResults';

type Props = { title: string; subtitle: string };

export default function SupportHero({ title, subtitle }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use intersection observer for animations
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const { searchState, handleSearchChange, clearSearch } = useSearch();
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchState.query.trim()) {
      // If there are results, navigate to the first one
      if (searchState.results.length > 0) {
        window.location.href = searchState.results[0].href;
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearchChange(value);
    setShowResults(value.trim().length > 0);
  };

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
    if (searchState.query.trim().length > 0) {
      setShowResults(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding results to allow clicking on them
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      clearSearch();
      setShowResults(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter' && searchState.results.length > 0) {
      e.preventDefault();
      window.location.href = searchState.results[0].href;
    }
  };

  // Handle result click
  const handleResultClick = () => {
    setShowResults(false);
    setIsFocused(false);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="bg-hero-support-gradient text-pastree-dark py-20 relative"
    >
      {/* Background overlay with subtle animation */}
      <div className="absolute inset-0 z-10">
        <div className={`absolute inset-0 bg-gradient-to-br from-orange-100/20 to-purple-100/20 transition-opacity duration-2000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
      
      <div className="container mx-auto px-4 relative z-20 text-center">
        <div 
          ref={contentRef}
          className={`transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pastree-purple">{title}</h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div 
          className={`max-w-2xl mx-auto relative transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          ref={searchRef}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="text-left">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={inputRef}
                id="support-search"
                name="search"
                type="text"
                value={searchState.query}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                placeholder="Search for help articles, guides, and FAQs..."
                aria-label="Search support articles and help guides"
                aria-describedby="search-help"
                className={`w-full bg-white border border-transparent text-gray-900 px-6 py-4 pr-16 rounded-full text-lg shadow-lg transition-all duration-200 ${isFocused ? 'focus-glow-orange' : 'focus-glow-orange'
                  }`}
                autoComplete="off"
                spellCheck="false"
              />
              
              {/* Clear button */}
              {searchState.query && (
                <button
                  type="button"
                  onClick={() => {
                    clearSearch();
                    setShowResults(false);
                    inputRef.current?.focus();
                  }}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              
              {/* Search button */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pastree-orange hover:bg-pastree-orange-hover text-white px-6 py-2 rounded-full font-semibold transition-colors"
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            
            {/* Search Results Dropdown */}
            {showResults && (
              <SearchResults
                results={searchState.results}
                query={searchState.query}
                isSearching={searchState.isSearching}
                onResultClick={handleResultClick}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
