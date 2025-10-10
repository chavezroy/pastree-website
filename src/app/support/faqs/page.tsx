'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactSupport from '@/components/ContactSupport';
export const dynamic = 'force-dynamic';
export default function FAQPage() {
  const [activeSection, setActiveSection] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const pathname = usePathname();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
    setOpenFAQ(prev => prev === index ? null : index);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay to show skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);
  const faqSections = [
    {
      id: 'general',
      title: 'General Questions',
      icon: 'bi-question-circle',
      items: [
        {
          question: 'What is Pastree?',
          answer: 'Pastree is a powerful clipboard management browser extension that helps you organize, manage, and access your copied content efficiently. It keeps track of everything you copy and allows you to create organized lists for frequently used text, templates, and snippets.'
        },
        {
          question: 'How does Pastree work?',
          answer: 'Pastree automatically captures and stores everything you copy (text, images, links) in your browser. You can then access your clipboard history, organize items into lists, search through your content, and quickly paste previously copied items.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes, Pastree prioritizes your privacy and security. All your clipboard data is stored locally in your browser and is not sent to external servers. You have complete control over your data and can delete items at any time.'
        },
        {
          question: 'Which browsers are supported?',
          answer: 'Pastree currently supports Chrome, Firefox, Edge, and other Chromium-based browsers. We\'re working on expanding support to Safari and other browsers in the future.'
        }
      ]
    },
    {
      id: 'installation',
      title: 'Installation & Setup',
      icon: 'bi-download',
      items: [
        {
          question: 'How do I install Pastree?',
          answer: 'You can install Pastree from the Chrome Web Store or Firefox Add-ons. Simply search for "Pastree" in your browser\'s extension store, click "Add to Browser", and follow the installation prompts.'
        },
        {
          question: 'Do I need to create an account?',
          answer: 'No account is required! Pastree works entirely locally in your browser. However, if you want to sync your data across devices, you can optionally create a free account.'
        },
        {
          question: 'How do I access Pastree after installation?',
          answer: 'After installation, you\'ll see the Pastree icon in your browser toolbar. Click it to open the extension popup where you can view your clipboard history and manage your lists.'
        },
        {
          question: 'Can I customize Pastree settings?',
          answer: 'Yes! Click the settings icon in the Pastree popup to customize storage limits, keyboard shortcuts, notification preferences, and other options to match your workflow.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Features & Usage',
      icon: 'bi-gear',
      items: [
        {
          question: 'How do I create and manage lists?',
          answer: 'Click the "Lists" tab in Pastree, then click "Create New List". Give your list a name and start adding items. You can organize items by dragging them, pinning important ones, or using tags for easy filtering.'
        },
        {
          question: 'Can I search through my clipboard history?',
          answer: 'Absolutely! Use the search bar at the top of Pastree to quickly find specific text or content. The search works across all your clipboard items and lists.'
        },
        {
          question: 'How do keyboard shortcuts work?',
          answer: 'Pastree provides several keyboard shortcuts: Ctrl+Shift+V to open Pastree, arrow keys to navigate items, Enter to copy selected items, and Delete to remove items. You can customize these in settings.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export your clipboard history and lists as JSON files for backup purposes. This feature is available in the settings menu under "Data Management".'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: 'bi-wrench',
      items: [
        {
          question: 'Pastree isn\'t capturing my copied content',
          answer: 'Make sure Pastree is enabled and has the necessary permissions. Check if you\'re copying from a secure (HTTPS) page, as some browsers restrict clipboard access on HTTP pages. Try refreshing the page and copying again.'
        },
        {
          question: 'The extension icon disappeared from my toolbar',
          answer: 'This usually happens when the extension is disabled or needs to be reinstalled. Go to your browser\'s extension management page and make sure Pastree is enabled. If it\'s missing, reinstall it from the store.'
        },
        {
          question: 'My clipboard history is not syncing across devices',
          answer: 'Syncing requires you to be signed in to the same account on all devices. Make sure you\'re logged in and have a stable internet connection. Check your sync settings in the Pastree options.'
        },
        {
          question: 'Pastree is using too much storage space',
          answer: 'You can manage storage by setting limits on clipboard history size, regularly cleaning old items, or exporting and deleting old data. Go to Settings > Storage to adjust these options.'
        }
      ]
    }
  ];
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
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ Content Skeleton */}
              <div className="lg:col-span-3">
                {/* FAQ Sections Skeleton */}
                {[...Array(5)].map((_, sectionIndex) => (
                  <div key={sectionIndex} className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-gray-200">
                    {/* Section Title */}
                    <div className="h-8 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
                    
                    {/* FAQ Items Skeleton */}
                    <div className="space-y-4">
                      {[...Array(4)].map((_, itemIndex) => (
                        <div key={itemIndex} className="bg-gray-50 rounded-lg overflow-hidden">
                          {/* Question Button Skeleton */}
                          <div className="px-6 py-4 flex justify-between items-center">
                            <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Contact Support Skeleton */}
                <div className="bg-gray-200 p-8 rounded-xl text-center my-10 animate-pulse">
                  <div className="h-8 bg-gray-300 rounded-lg mb-5 max-w-xs mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded-lg mb-8 max-w-md mx-auto"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="bg-gray-300 px-6 py-3 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                </div>
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
            <i className="bi bi-question-circle mr-3"></i>Frequently Asked Questions
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find answers to common questions about Pastree. Can't find what you're looking for? Contact our support team.
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
                  <i className="bi bi-list-ul mr-2"></i>FAQ Categories
                </h5>
                <ul className="space-y-2">
                  {faqSections.map((section) => (
                    <li key={section.id}>
                      <a 
                        href={`#${section.id}`}
                        className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${
                          activeSection === section.id ? 'text-pastree-orange' : ''
                        }`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {faqSections.map((section, sectionIndex) => (
                <div key={section.id} id={section.id} className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-pastree-orange">
                  <h2 className="text-3xl font-bold mb-8 text-pastree-orange border-b-3 border-pastree-orange pb-4">
                    <i className={`bi ${section.icon} mr-2`}></i>{section.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {section.items.map((item, itemIndex) => {
                      const globalIndex = sectionIndex * 100 + itemIndex;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div key={itemIndex} className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
                            openFAQ === globalIndex ? 'shadow-[var(--box-shadow-pastree)]' : 'shadow-md-light'
                          }`}>
                          <button
                            className={`w-full px-6 py-4 text-left font-semibold text-lg transition-all duration-500 flex justify-between items-center ${
                                openFAQ === globalIndex 
                                  ? 'bg-pastree-orange/5 text-pastree-orange' 
                                  : 'hover:bg-pastree-orange/5 hover:text-pastree-orange'
                              }`}
                            onClick={() => toggleItem(globalIndex)}
                          >
                            <h3 className="text-lg font-semibold pr-4">
                              {item.question}
                            </h3>
                            <svg 
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      openFAQ === globalIndex ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                          </button>
                          
                          {isOpen && (
                            <div className="px-6 py-4 bg-white">
                              <p className="text-gray-700 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Contact Support */}
              <ContactSupport />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
