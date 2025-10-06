export default function Loading() {
  return (
    <div className="min-h-screen bg-pastree-light">
      {/* Hero Section Skeleton */}
      <section className="bg-hero-gradient text-pastree-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="h-12 bg-white/20 rounded-lg mb-6 max-w-md mx-auto animate-pulse"></div>
          <div className="h-6 bg-white/20 rounded-lg mb-12 max-w-2xl mx-auto animate-pulse"></div>
          <div className="h-14 bg-white/20 rounded-full max-w-2xl mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Categories Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="h-10 bg-gray-200 rounded-lg mb-16 max-w-sm mx-auto animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-8 text-center h-64">
                <div className="w-12 h-12 bg-gray-200 rounded-xl mx-auto mb-6 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <hr className="section-divider" />

      {/* Articles Skeleton */}
      <section className="py-20 bg-pastree-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="h-8 bg-gray-200 rounded-lg mb-8 max-w-48 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white p-5 rounded-lg">
                    <div className="h-6 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-8 bg-gray-200 rounded-lg mb-8 max-w-40 animate-pulse"></div>
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="h-6 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="h-10 bg-gray-200 rounded-lg mb-4 max-w-64 mx-auto animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg mb-12 max-w-2xl mx-auto animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-8 h-64">
                <div className="w-8 h-8 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
