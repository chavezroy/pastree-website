'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ContactSupport from '@/components/ContactSupport';

// Force dynamic rendering to show skeleton every time
export const dynamic = 'force-dynamic';

export default function GettingStartedPage() {
  const [activeSection, setActiveSection] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay to show skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['getting-started', 'basic-clipboard', 'creating-lists', 'keyboard-shortcuts'];
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear().toString();
    }

    // Smooth scrolling for table of contents links
    const tocLinks = document.querySelectorAll('.table-of-contents a[href^="#"]');
    tocLinks.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector((e.target as HTMLAnchorElement).getAttribute('href') as string);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

  }, []);

  const handleNewsletterSubscribe = () => {
    const emailInput = document.querySelector('.footer-pastree input[type="email"]') as HTMLInputElement;
    if (emailInput) {
      if (emailInput.value.trim() && emailInput.value.includes('@')) {
        alert('Thank you for subscribing to Pastree updates!');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    }
  };

  const handleShortcutClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    target.style.backgroundColor = 'var(--pastree-orange)';
    target.style.color = 'white';
    setTimeout(() => {
      target.style.backgroundColor = '';
      target.style.color = '';
    }, 200);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pastree-light">
        {/* Page Header Skeleton */}
        <header className="bg-hero-support-gradient text-pastree-dark py-20 text-center mb-12">
          <div className="container mx-auto px-4">
            <div className="h-16 bg-white/20 rounded-lg mb-5 max-w-md mx-auto animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded-lg max-w-2xl mx-auto animate-pulse"></div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents Skeleton */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-8 shadow-lg sticky top-5">
                  <div className="h-6 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
                  <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Skeleton */}
              <div className="lg:col-span-3">
                {[...Array(4)].map((_, sectionIndex) => (
                  <div key={sectionIndex} className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-gray-200">
                    <div className="h-8 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-lg mb-6 w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
                    <div className="space-y-6">
                      {[...Array(4)].map((_, stepIndex) => (
                        <div key={stepIndex} className="relative pl-20 pb-6 border-b border-gray-200">
                          <div className="absolute left-0 top-0 w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="space-y-2">
                            <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pastree-light">
      {/* Page Header */}
      <header className="bg-hero-support-gradient text-pastree-dark py-20 text-center mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-5 text-pastree-purple">
            <i className="bi bi-clipboard-check mr-3"></i>Using Pastree
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Master your clipboard with our comprehensive guide. Learn how to organize, manage, and access your copied content efficiently.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-8 shadow-lg sticky top-5">
                <h5 className="text-lg font-semibold mb-6 text-pastree-dark">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline-block mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  Table of Contents
                </h5>
                <ul className="space-y-2">
                  <li><a href="#getting-started" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'getting-started' ? 'text-pastree-orange' : ''}`}>Getting Started</a></li>
                  <li><a href="#basic-clipboard" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'basic-clipboard' ? 'text-pastree-orange' : ''}`}>Basic Clipboard Management</a></li>
                  <li><a href="#creating-lists" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'creating-lists' ? 'text-pastree-orange' : ''}`}>Creating & Managing Lists</a></li>
                  <li><a href="#keyboard-shortcuts" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'keyboard-shortcuts' ? 'text-pastree-orange' : ''}`}>Keyboard Shortcuts</a></li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Getting Started */}
              <div id="getting-started" className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-pastree-orange">
                <h2 className="text-3xl font-bold mb-8 text-pastree-orange border-b-3 border-pastree-orange pb-4">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 inline">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                  </svg>Getting Started
                </h2>
                
                <h3 className="text-2xl font-semibold mb-6 text-pastree-dark">First Steps with Pastree</h3>
                <p className="text-lg mb-8">Once you've installed Pastree, you'll see the extension icon in your browser toolbar. Here's how to get started:</p>
                
                <ol className="space-y-6">
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <strong className="text-lg">Access Pastree</strong><br />
                      Click the Pastree icon in your browser toolbar to open the extension popup.
                    </div>
                  </li>
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <strong className="text-lg">Copy Some Text</strong><br />
                      Copy any text from a webpage or document using <span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm mx-1" onClick={handleShortcutClick}>Ctrl+C</span> (or <span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm mx-1" onClick={handleShortcutClick}>Cmd+C</span> on Mac).
                    </div>
                  </li>
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <strong className="text-lg">View Your Clipboard History</strong><br />
                      Open Pastree again to see your copied text appear in the clipboard history.
                    </div>
                  </li>
                  <li className="relative pl-20">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <div>
                      <strong className="text-lg">Click to Paste</strong><br />
                      Click any item in your history to automatically copy it to your clipboard for pasting.
                    </div>
                  </li>
                </ol>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-5 my-6 rounded-r-lg">
                  <i className="bi bi-info-circle text-blue-500 text-xl mr-3"></i>
                  <strong>Quick Tip:</strong> Pastree automatically saves your clipboard history as you copy text. No manual saving required!
                </div>
              </div>

              {/* Basic Clipboard Management */}
              <div id="basic-clipboard" className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-pastree-orange">
                <h2 className="text-3xl font-bold mb-8 text-pastree-orange border-b-3 border-pastree-orange pb-4">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="size-6 mr-2 inline">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
</svg>
Basic Clipboard Management
                </h2>
                
                <h3 className="text-2xl font-semibold mb-6 text-pastree-dark">Understanding Your Clipboard History</h3>
                <p className="text-lg mb-8">Pastree keeps track of everything you copy, organizing it in an easy-to-browse history:</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
                  <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 text-pastree-orange rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <h5 className="text-xl font-semibold mb-4">Recent Items</h5>
                    <p>Your most recently copied items appear at the top of the list for quick access.</p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 text-pastree-orange rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                    </div>
                    <h5 className="text-xl font-semibold mb-4">Search & Filter</h5>
                    <p>Use the search bar to quickly find specific text or content in your history.</p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 text-pastree-orange rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                      <svg fill="currentColor" viewBox="0 0 16 16">
                        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z" />
                      </svg>
                    </div>
                    <h5 className="text-xl font-semibold mb-4">Pin Important Items</h5>
                    <p>Pin frequently used items to keep them at the top of your clipboard history.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-6 text-pastree-dark">Managing Individual Items</h3>
                <ol className="space-y-6">
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <strong className="text-lg">Copy to Clipboard</strong><br />
                      Click any item to instantly copy it to your clipboard. You can then paste it anywhere with <span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm mx-1" onClick={handleShortcutClick}>Ctrl+V</span>.
                    </div>
                  </li>
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <strong className="text-lg">Pin/Unpin Items</strong><br />
                      Click the pin icon next to any item to keep it at the top of your history.
                    </div>
                  </li>
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <strong className="text-lg">Delete Items</strong><br />
                      Hover over an item and click the delete (×) button to remove it from your history.
                    </div>
                  </li>
                  <li className="relative pl-20">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <div>
                      <strong className="text-lg">Edit Text Items</strong><br />
                      Click the edit icon to modify text before copying it to your clipboard.
                    </div>
                  </li>
                </ol>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 my-6 rounded-r-lg">
                  <i className="bi bi-lightbulb text-green-500 text-xl mr-3"></i>
                  <strong>Pro Tip:</strong> Use the preview feature to see the full content of longer text items before copying them.
                </div>
              </div>

              {/* Creating Lists */}
              <div id="creating-lists" className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-pastree-orange">
                <h2 className="text-3xl font-bold mb-8 text-pastree-orange border-b-3 border-pastree-orange pb-4">
                <svg fill="currentColor" className="mr-2 size-6 inline" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5"></path>
                            </svg>Creating & Managing Lists
                </h2>
                
                <h3 className="text-2xl font-semibold mb-6 text-pastree-dark">What Are Pastree Lists?</h3>
                <p className="text-lg mb-8">Lists help you organize frequently used text, templates, and snippets into categories. Perfect for email signatures, addresses, code snippets, and more.</p>

                <h3 className="text-2xl font-semibold mb-6 text-pastree-dark">Creating Your First List</h3>
                <ol className="space-y-6">
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1
                    </div>
                    <div>
                      <strong className="text-lg">Open the Lists Tab</strong><br />
                      In the Pastree popup, click on the "Lists" tab to access the list management area.
                    </div>
                  </li>
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2
                    </div>
                    <div>
                      <strong className="text-lg">Create a New List</strong><br />
                      Click the "+" button or "Create New List" to start creating your first list.
                    </div>
                  </li>
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      3
                    </div>
                    <div>
                      <strong className="text-lg">Name Your List</strong><br />
                      Give your list a descriptive name like "Email Templates", "Addresses", or "Code Snippets".
                    </div>
                  </li>
                  <li className="relative pl-20 pb-6 border-b border-gray-200">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      4
                    </div>
                    <div>
                      <strong className="text-lg">Add Items to Your List</strong><br />
                      Click "Add Item" to create new entries. You can type directly or paste content from your clipboard history.
                    </div>
                  </li>
                  <li className="relative pl-20">
                    <div className="absolute left-0 top-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg">
                      5
                    </div>
                    <div>
                      <strong className="text-lg">Organize and Save</strong><br />
                      Arrange items in your preferred order and save your list for future use.
                    </div>
                  </li>
                </ol>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-5 my-6 rounded-r-lg">
                  <i className="bi bi-info-circle text-blue-500 text-xl mr-3"></i>
                  <strong>List Ideas:</strong> Create lists for email signatures, shipping addresses, frequently used passwords, code templates, social media posts, or any text you use regularly.
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <div id="keyboard-shortcuts" className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-pastree-orange">
                <h2 className="text-3xl font-bold mb-8 text-pastree-orange border-b-3 border-pastree-orange pb-4">
                <svg fill="currentColor" className="mr-2 size-6 inline" viewBox="0 0 16 16">
  <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
  <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25z"/>
</svg>Keyboard Shortcuts
                </h2>
                
                <h3 className="text-2xl font-semibold mb-6 text-pastree-dark">Essential Shortcuts</h3>
                <p className="text-lg mb-8">Speed up your workflow with these keyboard shortcuts:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h5 className="text-xl font-semibold mb-4">Global Shortcuts</h5>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="p-3"><span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm" onClick={handleShortcutClick}>Ctrl+Shift+V</span></td>
                            <td className="p-3">Open Pastree popup</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-3"><span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm" onClick={handleShortcutClick}>Ctrl+Shift+H</span></td>
                            <td className="p-3">Open clipboard history</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-3"><span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm" onClick={handleShortcutClick}>Ctrl+Shift+L</span></td>
                            <td className="p-3">Open lists view</td>
                          </tr>
                          <tr>
                            <td className="p-3"><span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm" onClick={handleShortcutClick}>Ctrl+Shift+S</span></td>
                            <td className="p-3">Search clipboard</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold mb-4">In-App Shortcuts</h5>
                    <div className="bg-gray-50 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="p-3"><span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm" onClick={handleShortcutClick}>↑ ↓</span></td>
                            <td className="p-3">Navigate items</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-3"><span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm" onClick={handleShortcutClick}>Enter</span></td>
                            <td className="p-3">Copy selected item</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="p-3"><span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm" onClick={handleShortcutClick}>Delete</span></td>
                            <td className="p-3">Remove selected item</td>
                          </tr>
                          <tr>
                            <td className="p-3"><span className="bg-gray-100 border border-gray-300 rounded px-2 py-1 font-mono text-sm" onClick={handleShortcutClick}>Esc</span></td>
                            <td className="p-3">Close popup</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-5 my-6 rounded-r-lg">
                  <i className="bi bi-exclamation-triangle text-yellow-600 text-xl mr-3"></i>
                  <strong>Note:</strong> Some keyboard shortcuts may conflict with other browser extensions or system shortcuts. Choose combinations that don't interfere with your existing workflow.
                </div>
              </div>

              <ContactSupport />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
