'use client';

export default function DownloadSection() {
  const handleChromeDownload = () => {
    alert('Redirecting to Chrome Web Store to download Pastree...');
  };

  const handleFirefoxDownload = () => {
    alert('Redirecting to Firefox Add-ons to download Pastree...');
  };

  return (
    <section id="download" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Pastree for Your Browser</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Install Pastree in seconds and start organizing your clipboard items
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          {/* Chrome Extension */}
          <div className="flex-1 max-w-sm">
            <button 
              onClick={handleChromeDownload}
              className="w-full bg-orange-gradient hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-white rounded-xl p-6 flex items-center justify-center min-h-[80px]"
            >
              <div className="flex items-center">
                <svg className="w-8 h-8 mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
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
              className="w-full bg-orange-gradient hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 text-white rounded-xl p-6 flex items-center justify-center min-h-[80px]"
            >
              <div className="flex items-center">
                <svg className="w-8 h-8 mr-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
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
