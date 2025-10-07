'use client';

import { useState, useEffect } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function HeroSection() {
  const [isDownloadClicked, setIsDownloadClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use a single intersection observer for the entire hero section
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  // Separate observer for title to control gradient animation
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownloadClick = () => {
    setIsDownloadClicked(true);
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeeHowItWorksClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="bg-hero-gradient text-pastree-dark relative overflow-hidden"
    >
      {/* Background overlay with subtle animation */}
      <div className="absolute inset-0 z-10">
        <div className={`absolute inset-0 bg-gradient-to-br from-orange-100/20 to-purple-100/20 transition-opacity duration-2000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
      
      <div className="container mx-auto px-4 relative z-20 h-full">
        <div className="flex flex-col lg:flex-row items-stretch h-full">
          {/* Left content */}
          <div className="lg:w-1/2 mb-0 py-5 md:py-16 lg:py-24 flex flex-col justify-center">
            <div 
              className={`transition-all duration-1000 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Every clipboard item lives in{' '}
                <span className={`text-gradient-purple ${titleVisible ? 'gradient-text-animated-2x' : ''}`}>Pastree</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed">
                Organize your frequently used text into smart lists. Never lose important clipboard items again with the browser extension that remembers everything for you.
              </p>
            </div>
            
            <div 
              className={`flex flex-col sm:flex-row gap-4 mb-6 transition-all duration-1000 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <button 
                onClick={handleDownloadClick}
                className="bg-pastree-purple hover:bg-pastree-purple-hover text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center hover-scale"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Free
              </button>
              <button 
                onClick={handleSeeHowItWorksClick}
                className="border-2 border-gray-400 text-gray-500 hover:bg-white hover:text-pastree-orange px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center hover-lift"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                See How It Works
              </button>
            </div>
            
            <div 
              className={`text-sm opacity-75 flex items-center transition-all duration-1000 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free forever • No registration required • Works offline
            </div>
          </div>

          {/* Right content - Context Menu Group SVG */}
          <div className="lg:w-1/2 flex items-end justify-center h-full mt-auto lg:mt-0 min-h-[350px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[675px]">
            <div 
              className={`w-full max-w-md md:max-w-none h-full pt-0 pl-8 pr-0 mx-auto md:mx-0 transition-all duration-1200 ${
                heroVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <img 
                src="/icons/context-menu-group.svg" 
                alt="Context Menu Group" 
                width="256" 
                height="256"
                className="w-full h-full object-contain float"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load context-menu-group.svg:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}