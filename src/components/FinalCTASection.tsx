'use client';

import Link from 'next/link';

export default function FinalCTASection() {
  const handleDownloadClick = () => {
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // For internal navigation prefer Next.js Link below

  return (
    <section className="py-20 bg-pastree-light">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl mb-4">Ready to organize your clipboard?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who have streamlined their workflow with Pastree
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          <Link 
            href="/support"
            className="border-2 border-pastree-purple text-pastree-purple hover:bg-white/50 hover:text-pastree-orange px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center how-it-works-button group"
          >
             <div className="w-5 h-5 mr-2 group-hover:scale-125 transition-all duration-700 ease-out">
            <svg className="w-5 h-5 mr-2 how-it-works-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </div>
            Get Support
          </Link>
        </div>
      </div>
    </section>
  );
}
