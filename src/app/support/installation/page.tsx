'use client';

import React, { useState, useEffect } from 'react';
import ContactSupport from '@/components/ContactSupport';
import SupportHeader from '@/components/SupportHeader';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function InstallationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const handleChromeDownload = () => {
    const element = document.getElementById('chrome-install');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFirefoxDownload = () => {
    const element = document.getElementById('firefox-install');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 10 seconds for inspection

    return () => clearTimeout(timer);
  }, []);

  // Separate effect that runs when isLoading becomes false
  useEffect(() => {
    if (!isLoading) {
      // Wait a bit for the skeleton to unmount, then animate
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pastree-light">
        {/* Hero Section Skeleton */}
        <section className="bg-hero-support-gradient text-pastree-dark py-20 relative">
          {/* Background overlay */}
          <div className="absolute inset-0 z-10">
            <div className="absolute inset-0 bg-linear-to-br from-orange-100/20 to-purple-100/20 opacity-0" />
          </div>

          <div className="container mx-auto px-4 relative z-20 text-center">
            <div className="opacity-0 translate-y-8">
              <div className="h-16 bg-gray-200/20 rounded-lg mb-6 max-w-md mx-auto animate-pulse"></div>
              <div className="h-6 bg-gray-200/20 rounded-lg max-w-2xl mx-auto animate-pulse mb-12"></div>
            </div>
          </div>
        </section>

        {/* Main Content Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Quick Start Section Skeleton */}
              <div className="bg-linear-to-r from-gray-200 to-gray-300 rounded-xl p-12 text-center mb-12 animate-pulse">
                <div className="h-8 bg-gray-300 rounded mb-4 max-w-xs mx-auto"></div>
                <div className="h-6 bg-gray-300 rounded mb-8 max-w-md mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Chrome Installation Skeleton */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-gray-200 animate-pulse">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4 max-w-sm mx-auto"></div>
                </div>
                <div className="space-y-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-6"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded mb-2 w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Firefox Installation Skeleton */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-gray-200 animate-pulse">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  <div className="h-8 bg-gray-200 rounded mb-4 max-w-sm mx-auto"></div>
                </div>
                <div className="space-y-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-6"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded mb-2 w-1/3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Initial Setup Skeleton */}
              <div className="py-16 animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-12 max-w-md mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-lg p-8 text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <div className="h-6 bg-gray-200 rounded mb-6 w-1/3"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-5 h-5 bg-gray-200 rounded mr-2 mt-0.5"></div>
                          <div className="h-4 bg-gray-200 rounded flex-1"></div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-5 h-5 bg-gray-200 rounded mr-2 mt-0.5"></div>
                          <div className="h-4 bg-gray-200 rounded flex-1"></div>
                        </div>
                      ))}
                    </div>
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


      {/* Hero Section with fade-in animation */}

      <section className="bg-hero-support-gradient text-pastree-dark py-20 relative">
        {/* Background overlay */}
        <div className="absolute inset-0 z-10">
          <div className={`absolute inset-0 bg-linear-to-br from-orange-100/20 to-purple-100/20 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`} />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pastree-purple">
              Installation & Setup
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Get started with Pastree in just a few minutes. Follow our step-by-step guide to install and configure the extension on your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Quick Start Section */}
            <div className="rounded-xl transition-all duration-300 p-8 text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
                {/* <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg> */}
                Quick Start
              </h2>
              <p className="text-lg mb-8">Choose your browser below to get started with Pastree. Installation takes less than 2 minutes!</p>
              <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {/* Chrome Extension */}
          <div className="flex-1 max-w-sm">
            <button 
              onClick={handleChromeDownload}
              className="w-full bg-orange-gradient hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-white rounded-xl p-6 flex items-center justify-center min-h-[80px] group"
            >
              <div className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/chrome-icon.svg" alt="Chrome" width={48} height={48} className="mr-4 group-hover:text-pastree-orange transition-all duration-700 ease-out mx-auto group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3" />
                <div className="text-left">
                  <div className="font-bold text-lg">Chrome Extension</div>
                  <div className="text-sm opacity-90">Works with Chrome & Edge</div>
                </div>
              </div>
            </button>
          </div>

          {/* Firefox Add-on */}
          <div className="flex-1 max-w-sm">
            <button 
              onClick={handleFirefoxDownload}
              className="w-full bg-orange-gradient hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-white rounded-xl p-6 flex items-center justify-center min-h-[80px] group"
            >
              <div className="flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/firefox-icon.svg" alt="Firefox" width={48} height={48} className="mr-4 group-hover:text-pastree-orange transition-all duration-700 ease-out mx-auto group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3" />
                <div className="text-left">
                  <div className="font-bold text-lg">Firefox Add-on</div>
                  <div className="text-sm opacity-90">For Firefox browsers</div>
                </div>
              </div>
            </button>
          </div>
        </div>
            </div>

            {/* Chrome Installation */}
            <div id="chrome-install" className="py-16">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-pastree-orange">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-pastree-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <img src="/icons/chrome-icon.svg" alt="Chrome" className="w-full h-full " />
                  </div>
                  <h2 className="text-3xl font-bold text-pastree-orange mb-4 border-b-4 border-pastree-orange pb-4 inline-block">
                    Installing for Google Chrome
                  </h2>
                </div>

                <div className="text-center mb-8">
                  <div className="inline-block hover:cursor-pointer p-4 bg-gray-100 rounded-lg hover:scale-105 transition-transform duration-200">
                    <a href='https://chromewebstore.google.com/detail/pastree/hmpkhdecieajldekfckmgoeiodfipfdd' target='_blank'>
                    <img
                      src="/chrome-badge.png"
                      alt="Available in the Chrome Web Store"
                      className="h-16 border border-gray-200 rounded-sm"
                    />
                    </a>
                  </div>
                </div>

                <ol className="space-y-6">
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Visit the Chrome Web Store</h3>
                      <p className="text-gray-600">
                        Click the &quot;Available in Chrome Web Store&quot; button above or search for &quot;Pastree&quot; in the Chrome Web Store.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Add to Chrome</h3>
                      <p className="text-gray-600">
                        Click the blue &quot;Add to Chrome&quot; button on the Pastree extension page.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Review Permissions</h3>
                      <p className="text-gray-600">
                        A popup will appear showing the permissions Pastree needs. Review them and click &quot;Add extension&quot; to confirm.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Pin the Extension</h3>
                      <p className="text-gray-600">
                        After installation, click the puzzle piece icon in your toolbar, then click the pin icon next to Pastree to keep it visible.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Start Using Pastree</h3>
                      <p className="text-gray-600">
                        Click the Pastree icon in your toolbar to open the extension and start organizing your clipboard!
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mt-8">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">System Requirements</h4>
                      <p className="text-blue-700">Chrome version 88 or higher for Windows 10 or later, or macOS 10.15 or later. Ensure your browser is updated to the latest version for optimal performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Firefox Installation */}
            <div id="firefox-install" className="pt-16">
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-pastree-orange">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-pastree-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <img src="/icons/firefox-icon.svg" alt="Firefox" className="w-full h-full" />
                  </div>
                  <h2 className="text-3xl font-bold text-pastree-orange mb-4 border-b-4 border-pastree-orange pb-4 inline-block">
                    Installing for Mozilla Firefox
                  </h2>
                </div>

                <div className="text-center mb-8">
                  <div className="inline-block hover:cursor-pointer p-4 bg-gray-100 rounded-lg hover:scale-105 transition-transform duration-200">
                    <a href='https://addons.mozilla.org/en-US/firefox/addon/pastree/' target='_blank'>  
                    <img
                      src="https://blog.mozilla.org/addons/files/2015/11/get-the-addon.png"
                      alt="Get the Add-on for Firefox"
                      className="h-16"
                    /></a>
                  </div>
                </div>

                <ol className="space-y-6">
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Visit Firefox Add-ons</h3>
                      <p className="text-gray-600">
                        Click the &quot;Get the Add-on&quot; button above or search for &quot;Pastree&quot; on the Firefox Add-ons website.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Add to Firefox</h3>
                      <p className="text-gray-600">
                        Click the blue &quot;Add to Firefox&quot; button on the Pastree add-on page.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Confirm Installation</h3>
                      <p className="text-gray-600">
                        A permission dialog will appear. Review the permissions and click &quot;Add&quot; to install the extension.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Access the Extension</h3>
                      <p className="text-gray-600">
                        The Pastree icon will appear in your Firefox toolbar. If you don&apos;t see it, click the menu button and select &quot;Customize toolbar...&quot;
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start mb-14">
                    <div className="shrink-0 w-12 h-12 bg-pastree-orange text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                      5
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Customize Toolbar (Optional)</h3>
                      <p className="text-gray-600">
                        Drag the Pastree icon to your preferred location in the toolbar for easy access.
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mt-8">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-500 mr-3 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">System Requirements</h4>
                      <p className="text-blue-700">Firefox versions 109 and later for Windows 10 or later, or macOS 10.15 or later. Ensure your browser is updated to the latest version for optimal performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Initial Setup */}
            <div className="pt-16">
              {/* <h2 className="text-3xl font-bold text-pastree-orange text-center mb-12 border-b-4 border-pastree-orange pb-4 inline-block">
                <svg className="w-8 h-8 inline-block mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Initial Setup & Configuration
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
                  <div className="w-16 h-16 bg-pastree-orange rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Create Account (Optional)</h3>
                  <p className="text-gray-600">Sign up for a Pastree account to sync your clipboard history across multiple devices and browsers.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
                  <div className="w-16 h-16 bg-pastree-orange rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Customize Settings</h3>
                  <p className="text-gray-600">Right-click the Pastree icon and select "Options" to customize clipboard history size, shortcuts, and appearance.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
                  <div className="w-16 h-16 bg-pastree-orange rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Set Keyboard Shortcuts</h3>
                  <p className="text-gray-600">Configure custom keyboard shortcuts for quick access to your clipboard history and frequently used items.</p>
                </div>
              </div> */}

              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h3 className="text-2xl font-semibold text-pastree-orange mb-6 flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Getting Started Tips
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">First Steps:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pastree-orange mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copy some text to see it appear in Pastree
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pastree-orange mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Click the Pastree icon to view your clipboard history
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pastree-orange mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Try creating your first clipboard list
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pastree-orange mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Explore the settings to customize your experience
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Pro Tips:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pastree-orange mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Use keyboard shortcuts for faster access
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pastree-orange mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Organize frequently used text into categories
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pastree-orange mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Enable sync to access your clips on any device
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-pastree-orange mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Pin important items to keep them at the top
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-0">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-500 mr-3 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Privacy Note</h4>
                    <p className="text-yellow-700">Pastree stores your clipboard data locally on your device.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Contact Support */}
            <ContactSupport />
          </div>
        </div>
      </section>
    </div>
  );
}

