'use client';

import { useState } from 'react';

export default function SupportArticles() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const popularArticles = [
    {
      title: "How to install Pastree browser extension",
      description: "Step-by-step installation guide for Chrome and Firefox"
    },
    {
      title: "Creating and managing clipboard lists",
      description: "Organize your frequently used text into categories"
    },
    {
      title: "Keyboard shortcuts and hotkeys",
      description: "Speed up your workflow with keyboard shortcuts"
    },
    {
      title: "Troubleshooting clipboard sync issues",
      description: "Fix problems with clipboard not working properly"
    }
  ];

  const recentUpdates = [
    {
      date: "Dec 15, 2024",
      title: "Pastree v1.1 - New list categories and improved UI"
    },
    {
      date: "Nov 28, 2024", 
      title: "Firefox extension now available"
    },
    {
      date: "Nov 10, 2024",
      title: "Enhanced security features and bug fixes"
    }
  ];

  const handleArticleClick = (title: string) => {
    alert(`Opening article: "${title}"`);
  };

  const handleTutorialClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-pastree-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Popular Articles */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Popular Articles</h3>
            
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <button
                  key={index}
                  onClick={() => handleArticleClick(article.title)}
                  className="w-full text-left bg-white p-5 rounded-lg border-l-4 border-pastree-orange hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg mb-2 group-hover:text-pastree-orange transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{article.description}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-pastree-orange transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Getting Started & Recent Updates */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Getting Started</h3>
            
            {/* Quick Start Guide Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-pastree-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-xl font-bold">Quick Start Guide</h4>
              </div>
              <p className="text-gray-600 mb-6">
                New to Pastree? Start here to learn the basics and get up and running in minutes.
              </p>
              <button 
                onClick={handleTutorialClick}
                className="bg-pastree-orange hover:bg-pastree-orange-hover text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Start Tutorial
              </button>
            </div>

            {/* Recent Updates */}
            <div>
              <h4 className="text-xl font-bold mb-6">Recent Updates</h4>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">{update.date}</p>
                    <p className="font-medium hover:text-pastree-orange transition-colors cursor-pointer">
                      {update.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-pastree-orange mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold">Pastree Quick Start Tutorial</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600">Tutorial video placeholder</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                This tutorial covers the basics of organizing your clipboard items with Pastree
              </p>
              <div className="flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
