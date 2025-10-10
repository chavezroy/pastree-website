'use client';

import { useEffect, useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import { useImageSlideshow } from '@/hooks/useImageSlideshow';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Image slideshow for right column
  const images = [
    '/hero-pastree-context.png',
    '/hero-pastree-popup-1.png'
  ];
  
  const { currentImage, isTransitioning } = useImageSlideshow(images, 8000);
  
  // Use a single intersection observer for the entire hero section
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  // Separate observer for title to control gradient animation
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDownloadClick = () => {
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
              <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-pastree-purple">
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
                className="text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center download-group download-button gradient-download-button group"
              >
                <div className="download-icon-container w-5 h-5 mr-2">
                <svg className="w-5 h-5 mr-2 download-icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path className="download-arrow" strokeLinecap="round" strokeLinejoin="round" d="M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  <path className="download-box" strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5" />
                </svg>
                </div>
                Download Free
              </button>
              <button 
                onClick={handleSeeHowItWorksClick}
                className="border-2 border-pastree-purple text-pastree-purple hover:bg-white/50 hover:text-pastree-orange px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center how-it-works-button group"
              >
                <div className="w-5 h-5 mr-2 group-hover:scale-125 transition-all duration-700 ease-out">
                <svg className="w-5 h-5 mr-2 how-it-works-icon" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
                </div>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={currentImage}
                alt="Pastree Clipboard Manager" 
                width="256" 
                height="256"
                className={`w-full h-full object-contain float transition-opacity duration-1000 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}