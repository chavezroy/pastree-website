import AnimatedSection from '@/components/AnimatedSection';
import DownloadSection from '@/components/DownloadSection';

export default function FeaturesPage() {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Automatic Clipboard Tracking",
      description: "Automatically saves everything you copy without any manual intervention. Never lose important text again.",
      // highlight: "📋"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Keyboard Shortcuts",
      description: "Quick access with customizable hotkeys. Navigate your clipboard history with lightning speed.",
      // highlight: "⌨️"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      title: "Custom Lists",
      description: "Organize your clipboard items into custom categories. Perfect for different projects and workflows.",
      // highlight: "📝"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      title: "Smart Search",
      description: "Find any copied text instantly with powerful search capabilities. No more scrolling through endless history.",
      // highlight: "🔍"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Quick Paste",
      description: "Paste items directly from the extension popup. Streamlined workflow for maximum productivity.",
      // highlight: "🎯"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Cross-Platform",
      description: "Works seamlessly on Chrome, Firefox, and other Chromium-based browsers. Your workflow, everywhere.",
      // highlight: "🔄"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
      ),
      title: "Persistent Storage",
      description: "Your clipboard history is saved locally on your device. Complete privacy and data control.",
      // highlight: "💾"
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: "Modern UI",
      description: "Clean, intuitive interface built with modern design principles. Beautiful and functional.",
      // highlight: "🎨"
    }
  ];

  const benefits = [
    {
      title: "For Developers",
      description: "Store code snippets, API keys, and configuration strings. Organize by project or language.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      )
    },
    {
      title: "For Writers",
      description: "Keep research notes, quotes, and reference materials. Never lose that perfect phrase again.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      )
    },
    {
      title: "For Productivity Enthusiasts",
      description: "Streamline repetitive tasks with organized clipboard management. Work smarter, not harder.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>

      )
    }
  ];

  return (
    <div className="min-h-screen bg-pastree-light">
      {/* Hero Section */}
      <section className="bg-hero-support-gradient text-pastree-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Features</h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Organize and manage your clipboard history with ease. Pastree automatically saves copied text, 
            provides keyboard shortcuts for quick access, and lets you organize frequently used text into custom lists.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <span className="bg-white/20 px-4 py-2 rounded-full">Perfect for Developers</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Ideal for Writers</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">Productivity Enthusiasts</span>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <AnimatedSection animation="fade-in-up" delay={100} threshold={0.2}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl mb-4">Features</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to master your clipboard workflow
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-8 hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 text-center group h-full"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-gray-500 mx-auto mb-6 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:text-pastree-orange transition-all duration-700 ease-out">
                    {feature.icon}
                  </div>
                  {/* <div className="text-3xl mb-4">{feature.highlight}</div> */}
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Section Divider */}
      <AnimatedSection animation="scale-in" delay={200} threshold={0.3}>
        <hr className="section-divider opacity-15" />
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection animation="fade-in-up" delay={300} threshold={0.2}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl mb-4">Perfect For</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tailored workflows for different professionals and use cases
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-8 hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-gray-500 mx-auto mb-6 group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:text-pastree-orange transition-all duration-700 ease-out">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Section Divider */}
      <AnimatedSection animation="scale-in" delay={400} threshold={0.3}>
        <hr className="section-divider opacity-15" />
      </AnimatedSection>

      {/* Download Section */}
      <AnimatedSection animation="fade-in-up" delay={500} threshold={0.2}>
        <DownloadSection />
      </AnimatedSection>
    </div>
  );
}