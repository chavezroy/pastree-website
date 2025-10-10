'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

    // Highlight active section in table of contents
    const handleScroll = () => {
      const sections = document.querySelectorAll('.guide-section');
      const navLinks = document.querySelectorAll('.table-of-contents a');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
                  <i className="bi bi-list-ul mr-2"></i>Table of Contents
                </h5>
                <ul className="space-y-2">
                  <li><a href="#getting-started" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'getting-started' ? 'text-pastree-orange' : ''}`}>Getting Started</a></li>
                  <li><a href="#basic-clipboard" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'basic-clipboard' ? 'text-pastree-orange' : ''}`}>Basic Clipboard Management</a></li>
                  <li><a href="#creating-lists" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'creating-lists' ? 'text-pastree-orange' : ''}`}>Creating & Managing Lists</a></li>
                  <li><a href="#organizing-content" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'organizing-content' ? 'text-pastree-orange' : ''}`}>Organizing Your Content</a></li>
                  <li><a href="#keyboard-shortcuts" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'keyboard-shortcuts' ? 'text-pastree-orange' : ''}`}>Keyboard Shortcuts</a></li>
                  {/* <li><a href="#advanced-features" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'advanced-features' ? 'text-pastree-orange' : ''}`}>Advanced Features</a></li>
                  <li><a href="#sync-settings" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'sync-settings' ? 'text-pastree-orange' : ''}`}>Sync & Settings</a></li>
                  <li><a href="#tips-tricks" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'tips-tricks' ? 'text-pastree-orange' : ''}`}>Tips & Tricks</a></li> */}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Getting Started */}
              <div id="getting-started" className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-pastree-orange">
                <h2 className="text-3xl font-bold mb-8 text-pastree-orange border-b-3 border-pastree-orange pb-4">
                  <i className="bi bi-play-circle mr-2"></i>Getting Started
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
                  <i className="bi bi-clipboard-data mr-2"></i>Basic Clipboard Management
                </h2>
                
                <h3 className="text-2xl font-semibold mb-6 text-pastree-dark">Understanding Your Clipboard History</h3>
                <p className="text-lg mb-8">Pastree keeps track of everything you copy, organizing it in an easy-to-browse history:</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
                  <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-pastree-orange text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                      <i className="bi bi-clock-history"></i>
                    </div>
                    <h5 className="text-xl font-semibold mb-4">Recent Items</h5>
                    <p>Your most recently copied items appear at the top of the list for quick access.</p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-pastree-orange text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                      <i className="bi bi-search"></i>
                    </div>
                    <h5 className="text-xl font-semibold mb-4">Search & Filter</h5>
                    <p>Use the search bar to quickly find specific text or content in your history.</p>
                  </div>
                  
                  <div className="bg-white p-8 rounded-xl shadow-md text-center hover:transform hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-pastree-orange text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                      <i className="bi bi-pin-angle"></i>
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
                  <i className="bi bi-list-task mr-2"></i>Creating & Managing Lists
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
                  <i className="bi bi-keyboard mr-2"></i>Keyboard Shortcuts
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

              {/* Quick Navigation */}
              <div className="bg-gradient-to-r from-pastree-orange to-orange-400 text-white p-8 rounded-xl text-center my-10">
                <h4 className="text-2xl font-bold mb-5">
                  <i className="bi bi-compass mr-2"></i>What's Next?
                </h4>
                <p className="text-lg mb-8">Continue exploring Pastree with these helpful resources:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/support/installation/complete-setup-guide" className="bg-white text-pastree-orange px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    <i className="bi bi-download mr-2"></i>Installation Guide
                  </Link>
                  <Link href="/support" className="bg-white text-pastree-orange px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    <i className="bi bi-question-circle mr-2"></i>FAQ
                  </Link>
                  <Link href="/support" className="bg-white text-pastree-orange px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    <i className="bi bi-envelope mr-2"></i>Get Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
