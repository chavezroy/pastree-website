'use client';

import useScrollAnimation from '@/hooks/useScrollAnimation';

export default function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -400px 0px',
    triggerOnce: true
  });

  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Quick Access",
      description: "Right-click context menu and keyboard shortcuts for lightning-fast clipboard operations."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      ),
      title: "Instant Search",
      description: "Find any clipboard item instantly with powerful search capabilities."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      title: "Organize with Lists",
      description: "Create custom lists for different types of content - emails, addresses, snippets, and more."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Recent History",
      description: "Access your recently copied items with one click. Never lose important clipboard content again."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Customize Settings",
      description: "Set hot keys, adjust retention period, and more."
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Privacy First",
      description: "All data stays local on your device. No cloud sync, no tracking, no data collection."
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 overflow-y-visible">
        <div ref={ref} className="text-center mb-8 overflow-y-visible">
          <h2 className="text-3xl md:text-4xl mb-4">Eliminate clipboard frustration</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your workflow with intelligent clipboard management
          </p>
        </div>
        

<div 
  className="flex gap-8 overflow-x-auto overflow-y-visible p-8 scrollbar-none relative scroll-fade-mask"
>
          {features.map((feature, index) => (
       <div 
       key={index}
       className={`bg-white rounded-xl p-8 hover-shadow-pastree text-center group flex-shrink-0 w-80 hover:-translate-y-2 transition-all duration-600 ease-out ${
         isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[200%] opacity-0'
       }`}
     >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-orange-600/30 group-hover:text-pastree-orange transition-all duration-700 ease-out mx-auto mb-6 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
