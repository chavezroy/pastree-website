'use client';

import { useEffect, useState } from 'react';
import useScrollAnimation from '@/hooks/useScrollAnimation';
import AnimatedSection from '@/components/AnimatedSection';

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use intersection observer for animations
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: contentRef } = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    setIsLoaded(true);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pastree-purple">About Pastree</h1>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Built with purpose. Effortless clipboard management 
              that is secure, and completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <AnimatedSection animation="fade-in-up" delay={100} threshold={0.2}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white rounded-xl p-8 hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-gray-500 mx-auto mb-6 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:text-pastree-orange transition-all duration-700 ease-out">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed text-center">
                    To make clipboard management simple, secure, and accessible to everyone. 
                    We&apos;re committed to keeping your data private while providing powerful tools 
                    to organize your digital workflow!!
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-8 hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-gray-500 mx-auto mb-6 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:text-pastree-orange transition-all duration-700 ease-out">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-6 text-center">Why We Built This</h2>
                  <p className="text-gray-600 leading-relaxed text-center">
                    After trying countless clipboard managers that were either too complex, 
                    too expensive, or too invasive, we decided to build something better. 
                    Pastree puts you in control of your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Section Divider */}
      <AnimatedSection animation="scale-in" delay={200} threshold={0.3}>
        <hr className="section-divider opacity-15" />
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection animation="fade-in-up" delay={300} threshold={0.2}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-8 hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 text-center group">
                <div className="w-16 h-16  rounded-2xl flex items-center justify-center text-gray-600 mx-auto mb-6 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:text-pastree-orange transition-all duration-700 ease-out">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Privacy First</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data stays on your device. No cloud sync, no tracking, no data collection.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 text-center group">
                <div className="w-16 h-16  rounded-2xl flex items-center justify-center text-gray-600 mx-auto mb-6 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:text-pastree-orange transition-all duration-700 ease-out">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Always Free</h3>
                <p className="text-gray-600 leading-relaxed">
                  No premium tiers, no subscriptions, no hidden costs. Pastree is free forever.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 text-center group">
                <div className="w-16 h-16  rounded-2xl flex items-center justify-center text-gray-600 mx-auto mb-6 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:text-pastree-orange transition-all duration-700 ease-out">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Simple & Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Clean interface, lightning-fast performance, and intuitive design.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}
