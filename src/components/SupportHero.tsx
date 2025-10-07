'use client';

import { useState } from 'react';

type Props = { title: string; subtitle: string };

export default function SupportHero({ title, subtitle }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: "${searchQuery}"`);
    }
  };

  return (
    <section className="bg-hero-support-gradient text-pastree-dark py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto">{subtitle}</p>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles, guides, and FAQs..."
              className="w-full bg-white text-gray-900 px-6 py-4 pr-16 rounded-full text-lg shadow-lg focus-glow-orange"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pastree-orange hover:bg-pastree-orange-hover text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}