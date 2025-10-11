export default function InstallationLoading() {
  return (
    <div className="min-h-screen bg-pastree-light">
        {/* Skeleton Loading */}
        <div className="bg-hero-gradient py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="h-16 bg-white/20 rounded mb-6 animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded mb-4 animate-pulse"></div>
              <div className="h-6 bg-white/20 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="h-8 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="h-8 bg-gray-200 rounded mb-6 animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="h-8 bg-gray-200 rounded mb-6 animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
