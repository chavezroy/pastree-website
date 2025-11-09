'use client';

export default function DownloadSection() {
  const handleChromeDownload = () => {
    window.open('https://chromewebstore.google.com/detail/pastree/klilbjinhibiinhlljddhdjhmnkmmiil?authuser=2&hl=en', '_blank', 'noopener,noreferrer');
  };

  const handleFirefoxDownload = () => {
    window.open('https://addons.mozilla.org/en-US/firefox/addon/pastree/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="download" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Get Pastree for Your Browser</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Install Pastree in seconds and start organizing your clipboard items
          </p>
        </div>
        
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
        
        <div className="text-center mt-8">
          <p className="text-gray-600 flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Open source • Privacy focused • No data collection
          </p>
        </div>
      </div>
    </section>
  );
}
