'use client';

import Link from 'next/link';

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

type Props = {
  results: SearchResult[];
  query: string;
  isSearching: boolean;
  onResultClick: () => void;
};

export default function SearchResults({ results, query, isSearching, onResultClick }: Props) {
  if (isSearching) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50">
        <div className="p-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pastree-orange"></div>
            <span className="text-gray-600">Searching...</span>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0 && query.trim().length > 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50">
        <div className="p-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-500">No results found for</p>
            <p className="text-gray-700 font-medium">"{query}"</p>
            <p className="text-sm text-gray-400">Try different keywords or check spelling</p>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50">
      <div className="p-2">
        <div className="text-xs text-gray-500 px-3 py-2 border-b">
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </div>
        
        <div className="py-1">
          {results.map((result, index) => (
            <Link
              key={`${result.type}-${result.id}`}
              href={result.href}
              className="block p-3 hover:bg-gray-50 transition-colors group"
              onClick={onResultClick}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      result.type === 'article' 
                        ? 'bg-pastree-orange/10 text-pastree-orange' 
                        : 'bg-pastree-purple/10 text-pastree-purple'
                    }`}>
                      {result.type === 'article' ? 'Article' : 'Category'}
                    </span>
                    {result.updatedAt && (
                      <span className="text-xs text-gray-400">
                        Updated {new Date(result.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-pastree-dark group-hover:text-pastree-orange transition-colors mb-1 line-clamp-1">
                    {result.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {result.description}
                  </p>
                </div>
                
                <div className="ml-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-pastree-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {results.length > 0 && (
          <div className="px-3 py-2 border-t bg-gray-50 rounded-b-lg">
            <p className="text-xs text-gray-500 text-center">
              Press <kbd className="px-1 py-0.5 bg-white border rounded text-xs">Enter</kbd> to search or <kbd className="px-1 py-0.5 bg-white border rounded text-xs">Esc</kbd> to close
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
