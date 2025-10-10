export default function GettingStartedLoading() {
    return (
      <div className="min-h-screen bg-pastree-light">
        {/* Page Header Skeleton */}
        <header className="bg-hero-support-gradient text-pastree-dark py-20 text-center mb-12">
          <div className="container mx-auto px-4">
            <div className="h-16 bg-gray-200 rounded-lg mb-5 max-w-md mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg max-w-2xl mx-auto animate-pulse"></div>
          </div>
        </header>
  
        {/* Main Content Skeleton */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents Skeleton */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-8 shadow-lg sticky top-5">
                  <div className="h-6 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
                  <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
  
              {/* Main Content Skeleton */}
              <div className="lg:col-span-3">
                {/* Guide Sections Skeleton */}
                {[...Array(4)].map((_, sectionIndex) => (
                  <div key={sectionIndex} className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-gray-200">
                    {/* Section Title */}
                    <div className="h-8 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
                    
                    {/* Subtitle */}
                    <div className="h-6 bg-gray-200 rounded-lg mb-6 w-3/4 animate-pulse"></div>
                    
                    {/* Description */}
                    <div className="h-4 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
                    
                    {/* Step List Skeleton */}
                    <div className="space-y-6">
                      {[...Array(4)].map((_, stepIndex) => (
                        <div key={stepIndex} className="relative pl-20 pb-6 border-b border-gray-200">
                          <div className="absolute left-0 top-0 w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="space-y-2">
                            <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Info Box Skeleton */}
                    <div className="bg-gray-50 border-l-4 border-gray-200 p-5 my-6 rounded-r-lg">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-200 rounded mr-3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
  
                {/* Feature Cards Skeleton */}
                <div className="bg-white rounded-xl p-10 mb-10 shadow-lg border-l-4 border-gray-200">
                  <div className="h-8 bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-10">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-gray-50 p-8 rounded-xl text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6 animate-pulse"></div>
                        <div className="h-6 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Quick Navigation Skeleton */}
                <div className="bg-gray-200 p-8 rounded-xl text-center my-10 animate-pulse">
                  <div className="h-8 bg-gray-300 rounded-lg mb-5 max-w-xs mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded-lg mb-8 max-w-md mx-auto"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-gray-300 px-6 py-3 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  