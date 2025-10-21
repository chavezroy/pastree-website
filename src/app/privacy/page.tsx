'use client';

import { useEffect, useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import AnimatedSection from '@/components/AnimatedSection';

export default function PrivacyPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Use intersection observer for animations
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: contentRef } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'data-collection', 'data-usage', 'permissions', 'data-security', 'third-party', 'your-rights', 'contact', 'changes', 'compliance'];
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

  return (
    <div className="min-h-screen bg-pastree-light">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="bg-hero-support-gradient text-pastree-dark py-20 relative overflow-hidden"
      >
        {/* Background overlay with subtle animation */}
        <div className="absolute inset-0 z-10">
          <div className={`absolute inset-0 bg-linear-to-br from-orange-100/20 to-purple-100/20 transition-opacity duration-2000 ${
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pastree-purple">Privacy Policy</h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Your privacy is our priority. Learn how we protect your data 
              and keep your clipboard history secure.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <AnimatedSection animation="fade-in-up" delay={10} threshold={0.1}>
        <section className="py-20">
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
                  <ul className="space-y-2 table-of-contents">
                    <li><a href="#overview" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'overview' ? 'text-pastree-orange' : ''}`}>Overview</a></li>
                    <li><a href="#data-collection" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'data-collection' ? 'text-pastree-orange' : ''}`}>Data Collection & Storage</a></li>
                    <li><a href="#data-usage" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'data-usage' ? 'text-pastree-orange' : ''}`}>Data Usage</a></li>
                    <li><a href="#permissions" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'permissions' ? 'text-pastree-orange' : ''}`}>Permissions</a></li>
                    <li><a href="#data-security" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'data-security' ? 'text-pastree-orange' : ''}`}>Data Security</a></li>
                    <li><a href="#third-party" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'third-party' ? 'text-pastree-orange' : ''}`}>Third-Party Services</a></li>
                    <li><a href="#your-rights" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'your-rights' ? 'text-pastree-orange' : ''}`}>Your Rights</a></li>
                    <li><a href="#contact" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'contact' ? 'text-pastree-orange' : ''}`}>Contact Us</a></li>
                    <li><a href="#changes" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'changes' ? 'text-pastree-orange' : ''}`}>Policy Changes</a></li>
                    <li><a href="#compliance" className={`block py-2 text-pastree-dark hover:text-pastree-orange transition-colors ${activeSection === 'compliance' ? 'text-pastree-orange' : ''}`}>Compliance</a></li>
                  </ul>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 mb-8">
                    <strong>Last updated</strong>: October 21, 2025
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-blue-800">Summary</h2>
                    <p className="text-blue-700">
                      <strong>In simple terms</strong>: Pastree stores your clipboard history locally on your device. 
                      We don&apos;t collect, share, or transmit any of your data. Your privacy is our priority.
                    </p>
                  </div>

                  <h2 id="overview" className="text-2xl font-bold mb-6 text-pastree-purple">Overview</h2>
                  <p className="text-gray-600 mb-8">
                    Pastree is a clipboard manager browser extension that helps you organize and manage your clipboard history. 
                    This privacy policy explains how we handle your data.
                  </p>

                  <h2 id="data-collection" className="text-2xl font-bold mb-6 text-pastree-purple">Data Collection and Storage</h2>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">What Data We Collect</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>Clipboard Content</strong>: Text that you copy to your clipboard</li>
                    <li><strong>Timestamps</strong>: When items were copied to your clipboard</li>
                    <li><strong>Custom Lists</strong>: Lists and organization you create</li>
                    <li><strong>List Items</strong>: Items you add to custom lists</li>
                    <li><strong>Starred Items</strong>: Items you mark as favorites</li>
                    <li><strong>Settings</strong>: Your preferences for the extension (theme, max items, etc.)</li>
                    <li><strong>Search History</strong>: Your search queries (stored locally only)</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">How We Store Your Data</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>Local Storage Only</strong>: All your data is stored locally on your device</li>
                    <li><strong>No Cloud Storage</strong>: We do not upload, sync, or store your data on any external servers</li>
                    <li><strong>No Data Transmission</strong>: Your clipboard content never leaves your device</li>
                  </ul>

                  <h2 id="data-usage" className="text-2xl font-bold mb-6 text-pastree-purple">Data Usage</h2>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">How We Use Your Data</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>Clipboard Management</strong>: To provide clipboard history and organization features</li>
                    <li><strong>Custom Lists</strong>: To save and organize your custom lists and list items</li>
                    <li><strong>Starred Items</strong>: To remember which items you&apos;ve marked as favorites</li>
                    <li><strong>Search Functionality</strong>: To provide search and filtering capabilities</li>
                    <li><strong>Settings</strong>: To remember your preferences, theme choices, and configuration</li>
                    <li><strong>Context Menu</strong>: To provide right-click access to your clipboard items and lists</li>
                    <li><strong>No Analytics</strong>: We do not collect analytics or usage statistics</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">What We Don&apos;t Do</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li>We do not track your browsing activity</li>
                    <li>We do not collect personal information</li>
                    <li>We do not share your data with third parties</li>
                    <li>We do not use your data for advertising</li>
                    <li>We do not sell your data</li>
                  </ul>

                  <h2 id="permissions" className="text-2xl font-bold mb-6 text-pastree-purple">Permissions</h2>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">Required Permissions</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>storage</strong>: To save your clipboard history, custom lists, and settings locally</li>
                    <li><strong>contextMenus</strong>: To provide right-click menu access to your clipboard items and lists</li>
                    <li><strong>activeTab</strong>: To paste content into the current tab and monitor clipboard changes</li>
                    <li><strong>clipboardRead</strong>: To read your clipboard content for automatic capture</li>
                    <li><strong>clipboardWrite</strong>: To write content to your clipboard when copying items</li>
                    <li><strong>scripting</strong>: To inject content scripts for pasting functionality and clipboard monitoring</li>
                    <li><strong>host_permissions</strong> (&lt;all_urls&gt;): To monitor clipboard changes and paste content on any website</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">Why We Need These Permissions</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>storage</strong>: Essential for saving your clipboard history, custom lists, and preferences</li>
                    <li><strong>contextMenus</strong>: Allows you to access clipboard items and lists via right-click menu</li>
                    <li><strong>activeTab</strong>: Required to paste content into web pages and monitor clipboard changes</li>
                    <li><strong>clipboardRead</strong>: Core functionality for automatic clipboard capture</li>
                    <li><strong>clipboardWrite</strong>: Core functionality for copying items back to clipboard</li>
                    <li><strong>scripting</strong>: Required for pasting content into web pages and clipboard monitoring</li>
                    <li><strong>host_permissions</strong>: Required to work on all websites for clipboard monitoring and pasting</li>
                  </ul>

                  <h2 id="data-security" className="text-2xl font-bold mb-6 text-pastree-purple">Data Security</h2>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">Security Measures</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>Local Storage</strong>: Your data is stored securely on your device</li>
                    <li><strong>No Network Access</strong>: The extension does not make network requests</li>
                    <li><strong>Open Source</strong>: The code is open source and can be audited</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">Data Retention</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>As Long As You Use The Extension</strong>: Your data persists as long as you have the extension installed</li>
                    <li><strong>Manual Deletion</strong>: You can clear your data at any time through the extension settings</li>
                    <li><strong>Uninstall</strong>: Removing the extension will delete all stored data</li>
                  </ul>

                  <h2 id="third-party" className="text-2xl font-bold mb-6 text-pastree-purple">Third-Party Services</h2>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">No Third-Party Services</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li>We do not use any third-party analytics services</li>
                    <li>We do not use any third-party advertising services</li>
                    <li>We do not integrate with any external APIs</li>
                    <li>The only external links are to our support pages (pastr.ee)</li>
                  </ul>

                  <h2 id="your-rights" className="text-2xl font-bold mb-6 text-pastree-purple">Your Rights</h2>

                  <h3 className="text-xl font-semibold mb-4 text-pastree-orange">Data Control</h3>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>Access</strong>: You can view all your data through the extension interface</li>
                    <li><strong>Modification</strong>: You can edit, organize, and delete your clipboard items and lists</li>
                    <li><strong>Starring</strong>: You can mark items as favorites for quick access</li>
                    <li><strong>Search</strong>: You can search through all your clipboard history and lists</li>
                    <li><strong>Deletion</strong>: You can clear all data through the extension settings</li>
                    <li><strong>Export</strong>: You can export your data using the built-in export feature</li>
                    <li><strong>Import</strong>: You can import previously exported data to restore your information</li>
                  </ul>

                  <div id="contact" className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-green-800">Contact Us</h3>
                    <p className="text-green-700 mb-4">If you have any questions about this privacy policy or your data:</p>
                    <ul className="list-disc pl-6 text-green-700 space-y-2">
                      <li><strong>Website</strong>: <a href="https://pastr.ee/email-support" target="_blank" className="text-pastree-orange hover:underline">https://pastr.ee/email-support</a> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline-block align-bottom">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>
</li>
                      <li><strong>GitHub</strong>: <a href="https://github.com/chavezroy/pastree-extension" target="_blank" className="text-pastree-orange hover:underline">https://github.com/chavezroy/pastree-extension</a> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline-block align-bottom">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>
</li>
                    </ul>
                  </div>

                  <h2 id="changes" className="text-2xl font-bold mb-6 text-pastree-purple">Changes to This Policy</h2>
                  <p className="text-gray-600 mb-4">We may update this privacy policy from time to time. We will notify you of any changes by:</p>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li>Updating the &quot;Last updated&quot; date at the top of this policy</li>
                    <li>Posting the new privacy policy on our website</li>
                    <li>Notifying you through the extension (if significant changes)</li>
                  </ul>

                  <h2 id="compliance" className="text-2xl font-bold mb-6 text-pastree-purple">Compliance</h2>
                  <p className="text-gray-600 mb-4">This privacy policy complies with:</p>
                  <ul className="list-disc pl-6 mb-8 text-gray-600 space-y-2">
                    <li><strong>GDPR</strong>: European General Data Protection Regulation</li>
                    <li><strong>CCPA</strong>: California Consumer Privacy Act</li>
                    <li><strong>Browser Store Requirements</strong>: Chrome Web Store and Firefox Add-ons policies</li>
                  </ul>

                  <hr className="my-8 border-gray-200" />
                  <p className="text-gray-500 italic">
                    This privacy policy is effective as of October 21, 2025 and applies to all versions of the Pastree browser extension.
                  </p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
